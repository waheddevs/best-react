"use server";

import { auth } from "@/Auth";
import type { Locale } from "@/config/Locales";
import {
  TeacherArchiveLessonResourceDocument,
  TeacherConfirmLessonUploadDocument,
  TeacherCreateLessonDocument,
  TeacherCreateLessonResourceCategoryDocument,
  TeacherCreateLessonResourceDocument,
  TeacherCreateLessonResourceItemDocument,
  TeacherLessonFileDownloadDocument,
  TeacherLessonUploadIntentDocument,
  TeacherLessonWorkspaceDocument,
  TeacherSetLessonArchivedDocument,
  TeacherUpdateLessonDocument,
  type CreateLessonInput,
  type CreateLessonMaterialInput,
  type CreateLibraryItemInput,
  type CreateMediaUploadIntentInput,
  type Language,
  type LessonMaterialKind,
  type TeacherArchiveLessonResourceMutation,
  type TeacherConfirmLessonUploadMutation,
  type TeacherCreateLessonMutation,
  type TeacherCreateLessonResourceCategoryMutation,
  type TeacherCreateLessonResourceItemMutation,
  type TeacherCreateLessonResourceMutation,
  type TeacherLessonFileDownloadMutation,
  type TeacherLessonUploadIntentMutation,
  type TeacherLessonWorkspaceQuery,
  type TeacherSetLessonArchivedMutation,
  type TeacherUpdateLessonMutation,
  type UpdateLessonInput,
} from "@/gql/graphql";
import { PublicApiError } from "@/lib/ApiError";
import { executeApolloMutation, executeApolloQuery } from "@/lib/apollo/ApolloServerClient";
import { lessonResourceCategoryName } from "@/lib/teacher/TeacherLessonPlanData";
import type { TeacherLessonSchedule } from "@/types/teacher/TeacherLessonPlan";

type LessonPlanWriteInput = {
  categoryId: string | null;
  groupId: string;
  locale: Locale;
  materialMediaObjectId?: string;
  name: string;
  schedule: TeacherLessonSchedule;
  taskMediaObjectId?: string;
};

type UpdateLessonPlanInput = {
  endsAt: string;
  groupId: string;
  lessonId: string;
  name: string;
  room: string | null;
  startsAt: string;
};

type ReplaceLessonResourceInput = {
  categoryId: string | null;
  groupId: string;
  kind: LessonMaterialKind;
  lessonId: string;
  locale: Locale;
  mediaObjectId: string;
  name: string;
  replacedMaterialId?: string;
};

async function teacherToken(): Promise<string | null> {
  const session = await auth();
  return session?.bestApi?.role === "TEACHER" ? (session.bestApi.accessToken ?? null) : null;
}

function resultCode(error: unknown): string {
  return error instanceof PublicApiError ? (error.code ?? "FAILED") : "FAILED";
}

export async function createTeacherLessonUploadIntent(input: CreateMediaUploadIntentInput) {
  const accessToken = await teacherToken();
  if (!accessToken) return { ok: false as const, code: "UNAUTHORIZED" };
  try {
    const data = await executeApolloMutation<
      TeacherLessonUploadIntentMutation,
      { input: CreateMediaUploadIntentInput }
    >(TeacherLessonUploadIntentDocument, { input }, { accessToken, cache: "no-store" });
    return { ok: true as const, uploadIntent: data.createMediaUploadIntent.uploadIntent };
  } catch (error) {
    return { ok: false as const, code: resultCode(error) };
  }
}

export async function confirmTeacherLessonUpload(mediaObjectId: string) {
  const accessToken = await teacherToken();
  if (!accessToken) return { ok: false as const, code: "UNAUTHORIZED" };
  try {
    const data = await executeApolloMutation<
      TeacherConfirmLessonUploadMutation,
      { input: { mediaObjectId: string } }
    >(
      TeacherConfirmLessonUploadDocument,
      { input: { mediaObjectId } },
      { accessToken, cache: "no-store" },
    );
    return { ok: true as const, mediaObject: data.confirmMediaUpload.mediaObject };
  } catch (error) {
    return { ok: false as const, code: resultCode(error) };
  }
}

export async function createConnectedTeacherLessonPlan(input: LessonPlanWriteInput) {
  const accessToken = await teacherToken();
  if (!accessToken) return { ok: false as const, code: "UNAUTHORIZED" };
  let lessonId: string | null = null;
  const resourceIds: string[] = [];
  try {
    const language = localeLanguage(input.locale);
    const workspace = await executeApolloQuery<
      TeacherLessonWorkspaceQuery,
      { groupId: string; language: Language }
    >(
      TeacherLessonWorkspaceDocument,
      { groupId: input.groupId, language },
      { accessToken, cache: "no-store" },
    );
    const slot = nextLessonSlot(input.schedule, workspace.teacherGroupLessons.edges);
    const lessonInput: CreateLessonInput = {
      endsAt: slot.endsAt,
      groupId: input.groupId,
      room: input.schedule.room || null,
      startsAt: slot.startsAt,
      translations: allTranslations(input.name),
    };
    const lessonData = await executeApolloMutation<
      TeacherCreateLessonMutation,
      { input: CreateLessonInput }
    >(TeacherCreateLessonDocument, { input: lessonInput }, { accessToken, cache: "no-store" });
    lessonId = lessonData.createLesson.lesson.id;

    let categoryId = input.categoryId;
    if (!categoryId) {
      categoryId =
        workspace.teacherLibraryCategories.find(({ name }) => name === lessonResourceCategoryName)
          ?.id ?? (await createResourceCategory(accessToken));
    }

    if (input.materialMediaObjectId) {
      const material = await createResource(accessToken, {
        categoryId,
        groupId: input.groupId,
        kind: "MATERIAL",
        lessonId,
        mediaObjectId: input.materialMediaObjectId,
        name: input.name,
      });
      resourceIds.push(material.id);
    }
    if (input.taskMediaObjectId) {
      const task = await createResource(accessToken, {
        categoryId,
        groupId: input.groupId,
        kind: "TASK",
        lessonId,
        mediaObjectId: input.taskMediaObjectId,
        name: input.name,
      });
      resourceIds.push(task.id);
    }
    return { ok: true as const, lesson: lessonData.createLesson.lesson };
  } catch (error) {
    await Promise.all(
      resourceIds.map((materialId) => archiveResourceQuietly(accessToken, materialId)),
    );
    if (lessonId) {
      await archiveLessonQuietly(accessToken, lessonId);
    }
    return { ok: false as const, code: resultCode(error) };
  }
}

export async function updateConnectedTeacherLessonPlan(input: UpdateLessonPlanInput) {
  const accessToken = await teacherToken();
  if (!accessToken) return { ok: false as const, code: "UNAUTHORIZED" };
  try {
    const updateInput: UpdateLessonInput = {
      endsAt: input.endsAt,
      groupId: input.groupId,
      lessonId: input.lessonId,
      room: input.room,
      startsAt: input.startsAt,
      translations: allTranslations(input.name),
    };
    const data = await executeApolloMutation<
      TeacherUpdateLessonMutation,
      { input: UpdateLessonInput }
    >(TeacherUpdateLessonDocument, { input: updateInput }, { accessToken, cache: "no-store" });
    return { ok: true as const, lesson: data.updateLesson.lesson };
  } catch (error) {
    return { ok: false as const, code: resultCode(error) };
  }
}

export async function replaceConnectedTeacherLessonResource(input: ReplaceLessonResourceInput) {
  const accessToken = await teacherToken();
  if (!accessToken) return { ok: false as const, code: "UNAUTHORIZED" };
  let replacementId: string | null = null;
  try {
    const categoryId =
      input.categoryId ??
      (await getOrCreateResourceCategory(accessToken, input.groupId, localeLanguage(input.locale)));
    const replacement = await createResource(accessToken, {
      categoryId,
      groupId: input.groupId,
      kind: input.kind,
      lessonId: input.lessonId,
      mediaObjectId: input.mediaObjectId,
      name: input.name,
    });
    replacementId = replacement.id;

    if (input.replacedMaterialId) {
      await executeApolloMutation<
        TeacherArchiveLessonResourceMutation,
        { input: { archived: boolean; materialId: string } }
      >(
        TeacherArchiveLessonResourceDocument,
        { input: { archived: true, materialId: input.replacedMaterialId } },
        { accessToken, cache: "no-store" },
      );
    }

    return { ok: true as const, material: replacement };
  } catch (error) {
    if (replacementId) await archiveResourceQuietly(accessToken, replacementId);
    return { ok: false as const, code: resultCode(error) };
  }
}

export async function archiveConnectedTeacherLessonPlan(lessonId: string) {
  const accessToken = await teacherToken();
  if (!accessToken) return { ok: false as const, code: "UNAUTHORIZED" };
  try {
    const data = await executeApolloMutation<
      TeacherSetLessonArchivedMutation,
      { input: { archived: boolean; lessonId: string } }
    >(
      TeacherSetLessonArchivedDocument,
      { input: { archived: true, lessonId } },
      { accessToken, cache: "no-store" },
    );
    return { ok: true as const, lesson: data.setLessonArchived.lesson };
  } catch (error) {
    return { ok: false as const, code: resultCode(error) };
  }
}

export async function createConnectedTeacherMaterial(input: {
  categoryId: string | null;
  groupId: string;
  locale: Locale;
  mediaObjectId: string;
  name: string;
}) {
  const accessToken = await teacherToken();
  if (!accessToken) return { ok: false as const, code: "UNAUTHORIZED" };
  try {
    const categoryId =
      input.categoryId ??
      (await getOrCreateResourceCategory(accessToken, input.groupId, localeLanguage(input.locale)));
    const material = await createResource(accessToken, {
      categoryId,
      groupId: input.groupId,
      kind: "MATERIAL",
      lessonId: null,
      mediaObjectId: input.mediaObjectId,
      name: input.name,
    });
    return { ok: true as const, material };
  } catch (error) {
    return { ok: false as const, code: resultCode(error) };
  }
}

export async function archiveConnectedTeacherLessonResource(materialId: string) {
  const accessToken = await teacherToken();
  if (!accessToken) return { ok: false as const, code: "UNAUTHORIZED" };
  try {
    const data = await executeApolloMutation<
      TeacherArchiveLessonResourceMutation,
      { input: { archived: boolean; materialId: string } }
    >(
      TeacherArchiveLessonResourceDocument,
      { input: { archived: true, materialId } },
      { accessToken, cache: "no-store" },
    );
    return { ok: true as const, material: data.setLessonMaterialArchived.material };
  } catch (error) {
    return { ok: false as const, code: resultCode(error) };
  }
}

export async function getTeacherLessonFileDownload(mediaObjectId: string) {
  const accessToken = await teacherToken();
  if (!accessToken) return { ok: false as const, code: "UNAUTHORIZED" };
  try {
    const data = await executeApolloMutation<
      TeacherLessonFileDownloadMutation,
      { input: { mediaObjectId: string } }
    >(
      TeacherLessonFileDownloadDocument,
      { input: { mediaObjectId } },
      { accessToken, cache: "no-store" },
    );
    return { ok: true as const, downloadIntent: data.createMediaDownloadIntent.downloadIntent };
  } catch (error) {
    return { ok: false as const, code: resultCode(error) };
  }
}

async function createResourceCategory(accessToken: string): Promise<string> {
  try {
    const data = await executeApolloMutation<
      TeacherCreateLessonResourceCategoryMutation,
      { input: { name: string } }
    >(
      TeacherCreateLessonResourceCategoryDocument,
      { input: { name: lessonResourceCategoryName } },
      { accessToken, cache: "no-store" },
    );
    return data.createLibraryCategory.category.id;
  } catch (error) {
    throw error;
  }
}

async function getOrCreateResourceCategory(
  accessToken: string,
  groupId: string,
  language: Language,
): Promise<string> {
  const workspace = await executeApolloQuery<
    TeacherLessonWorkspaceQuery,
    { groupId: string; language: Language }
  >(TeacherLessonWorkspaceDocument, { groupId, language }, { accessToken, cache: "no-store" });
  const existing = workspace.teacherLibraryCategories.find(
    ({ name }) => name === lessonResourceCategoryName,
  );
  if (existing) return existing.id;
  return createResourceCategory(accessToken);
}

async function createResource(
  accessToken: string,
  input: {
    categoryId: string;
    groupId: string;
    kind: LessonMaterialKind;
    lessonId: string | null;
    mediaObjectId: string;
    name: string;
  },
) {
  const suffix = input.kind === "TASK" ? "task" : "material";
  const itemInput: CreateLibraryItemInput = {
    categoryId: input.categoryId,
    groupIds: [input.groupId],
    mediaObjectIds: [input.mediaObjectId],
    primaryLanguage: "EN",
    translations: allLibraryTranslations(`${input.name} — ${suffix}`),
    visibility: "SELECTED_GROUPS",
  };
  const itemData = await executeApolloMutation<
    TeacherCreateLessonResourceItemMutation,
    { input: CreateLibraryItemInput }
  >(
    TeacherCreateLessonResourceItemDocument,
    { input: itemInput },
    { accessToken, cache: "no-store" },
  );
  const materialInput: CreateLessonMaterialInput = {
    groupId: input.groupId,
    kind: input.kind,
    lessonId: input.lessonId,
    libraryItemId: itemData.createLibraryItem.item.id,
    position: input.kind === "TASK" ? 2 : 1,
  };
  const materialData = await executeApolloMutation<
    TeacherCreateLessonResourceMutation,
    { input: CreateLessonMaterialInput }
  >(
    TeacherCreateLessonResourceDocument,
    { input: materialInput },
    { accessToken, cache: "no-store" },
  );
  return materialData.createLessonMaterial.material;
}

async function archiveLessonQuietly(accessToken: string, lessonId: string): Promise<void> {
  try {
    await executeApolloMutation<
      TeacherSetLessonArchivedMutation,
      { input: { archived: boolean; lessonId: string } }
    >(
      TeacherSetLessonArchivedDocument,
      { input: { archived: true, lessonId } },
      { accessToken, cache: "no-store" },
    );
  } catch {
    // The original failure is more useful to the form; the partial lesson remains auditable.
  }
}

async function archiveResourceQuietly(accessToken: string, materialId: string): Promise<void> {
  try {
    await executeApolloMutation<
      TeacherArchiveLessonResourceMutation,
      { input: { archived: boolean; materialId: string } }
    >(
      TeacherArchiveLessonResourceDocument,
      { input: { archived: true, materialId } },
      { accessToken, cache: "no-store" },
    );
  } catch {
    // Keep the original create error while preserving the uploaded media for audit/retry.
  }
}

function localeLanguage(locale: Locale): Language {
  if (locale === "uz") return "UZ";
  if (locale === "ru") return "RU";
  return "EN";
}

function allTranslations(title: string): CreateLessonInput["translations"] {
  const normalized = title.trim();
  return (["UZ", "RU", "EN"] as const).map((language) => ({ language, title: normalized }));
}

function allLibraryTranslations(title: string): CreateLibraryItemInput["translations"] {
  return (["UZ", "RU", "EN"] as const).map((language) => ({ language, title }));
}

function nextLessonSlot(
  schedule: TeacherLessonSchedule,
  edges: TeacherLessonWorkspaceQuery["teacherGroupLessons"]["edges"],
): { endsAt: string; startsAt: string } {
  const startMinutes = schedule.startsAtMinutes ?? 9 * 60;
  const endMinutes = schedule.endsAtMinutes ?? startMinutes + 90;
  const lastLessonTime = edges.reduce(
    (latest, { node }) => Math.max(latest, new Date(node.startsAt).getTime()),
    Date.now(),
  );
  const localCursor = new Date(lastLessonTime + 5 * 60 * 60 * 1000);
  localCursor.setUTCHours(0, 0, 0, 0);
  localCursor.setUTCDate(localCursor.getUTCDate() + 1);
  const allowedDays = schedule.scheduleDays.length > 0 ? schedule.scheduleDays : [1, 2, 3, 4, 5];

  for (let offset = 0; offset < 21; offset += 1) {
    const candidate = new Date(localCursor);
    candidate.setUTCDate(candidate.getUTCDate() + offset);
    const isoWeekday = candidate.getUTCDay() === 0 ? 7 : candidate.getUTCDay();
    if (!allowedDays.includes(isoWeekday)) continue;
    const startUtc = Date.UTC(
      candidate.getUTCFullYear(),
      candidate.getUTCMonth(),
      candidate.getUTCDate(),
      Math.floor(startMinutes / 60) - 5,
      startMinutes % 60,
    );
    const endUtc = Date.UTC(
      candidate.getUTCFullYear(),
      candidate.getUTCMonth(),
      candidate.getUTCDate(),
      Math.floor(endMinutes / 60) - 5,
      endMinutes % 60,
    );
    return { endsAt: new Date(endUtc).toISOString(), startsAt: new Date(startUtc).toISOString() };
  }

  throw new Error("Unable to derive the next lesson slot");
}
