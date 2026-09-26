import "server-only";

import { auth } from "@/Auth";
import type { Locale } from "@/config/Locales";
import {
  TeacherLessonWorkspaceDocument,
  type Language,
  type TeacherLessonWorkspaceQuery,
} from "@/gql/graphql";
import { executeApolloQuery } from "@/lib/apollo/ApolloServerClient";
import type {
  TeacherLessonPlan,
  TeacherLessonResource,
  TeacherLessonWorkspaceData,
} from "@/types/teacher/TeacherLessonPlan";
import { redirect } from "next/navigation";

const lessonResourceCategoryName = "Lesson resources";

export function localeToLanguage(locale: Locale): Language {
  if (locale === "uz") return "UZ";
  if (locale === "ru") return "RU";
  return "EN";
}

export async function loadConnectedTeacherLessonWorkspace(
  locale: Locale,
  groupId: string,
): Promise<TeacherLessonWorkspaceData> {
  const session = await auth();
  if (session?.bestApi?.role !== "TEACHER" || !session.bestApi.accessToken) {
    redirect(`/${locale}/login?role=teacher`);
  }

  const language = localeToLanguage(locale);
  const data = await executeApolloQuery<
    TeacherLessonWorkspaceQuery,
    { groupId: string; language: Language }
  >(
    TeacherLessonWorkspaceDocument,
    { groupId, language },
    { accessToken: session.bestApi.accessToken, cache: "no-store" },
  );

  return {
    categoryId:
      data.teacherLibraryCategories.find(({ name }) => name === lessonResourceCategoryName)?.id ??
      null,
    lessons: data.teacherGroupLessons.edges.map(({ node }) => mapLesson(node, language)),
    resources: data.teacherGroupMaterials.edges.map(({ node }) => mapResource(node)),
  };
}

type LessonNode = TeacherLessonWorkspaceQuery["teacherGroupLessons"]["edges"][number]["node"];
type ResourceNode = TeacherLessonWorkspaceQuery["teacherGroupMaterials"]["edges"][number]["node"];

function mapLesson(node: LessonNode, language: Language): TeacherLessonPlan {
  const translation =
    node.translations.find((item) => item.language === language) ?? node.translations[0];
  return {
    createdAt: node.createdAt,
    endsAt: node.endsAt,
    groupId: node.groupId,
    id: node.id,
    lessonNumber: node.lessonNumber,
    name: translation?.title ?? `Lesson ${String(node.lessonNumber)}`,
    room: node.room,
    startsAt: node.startsAt,
    status: node.status,
    summary: translation?.summary ?? null,
  };
}

function mapResource(node: ResourceNode): TeacherLessonResource {
  return {
    createdAt: node.createdAt,
    description: node.description,
    id: node.id,
    kind: node.kind,
    lessonId: node.lessonId,
    libraryItemId: node.libraryItemId,
    mediaObjectId: node.mediaObject.id,
    mimeType: node.mediaObject.mimeType,
    originalName: node.mediaObject.originalName,
    sizeBytes: node.mediaObject.sizeBytes ?? null,
    title: node.title,
  };
}

export { lessonResourceCategoryName };
