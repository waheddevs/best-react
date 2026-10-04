"use server";

import { auth } from "@/Auth";
import type { Locale } from "@/config/Locales";
import {
  TeacherConfirmLessonUploadDocument,
  TeacherLibraryArchiveItemDocument,
  TeacherLibraryCategoriesDocument,
  TeacherLibraryCreateCategoryDocument,
  TeacherLibraryCreateItemDocument,
  TeacherLibraryItemsDocument,
  type TeacherLibraryItemsQuery,
} from "@/gql/graphql";
import { executeApolloMutation, executeApolloQuery } from "@/lib/apollo/ApolloServerClient";

const bookCategoryName = "Books";
const pageSize = 24;

type BookPage = TeacherLibraryItemsQuery["teacherLibraryItems"];

async function teacherToken(): Promise<string | null> {
  const session = await auth();
  return session?.bestApi?.role === "TEACHER" ? (session.bestApi.accessToken ?? null) : null;
}

async function findBookCategory(accessToken: string) {
  const data = await executeApolloQuery<
    { teacherLibraryCategories: { id: string; name: string }[] },
    Record<string, never>
  >(TeacherLibraryCategoriesDocument, {}, { accessToken, cache: "no-store" });
  return data.teacherLibraryCategories.find((category) => category.name === bookCategoryName);
}

async function getBookPage(
  accessToken: string,
  categoryId: string,
  after?: string,
): Promise<BookPage> {
  const data = await executeApolloQuery<
    TeacherLibraryItemsQuery,
    { after?: string; categoryId: string; first: number }
  >(
    TeacherLibraryItemsDocument,
    { after, categoryId, first: pageSize },
    { accessToken, cache: "no-store" },
  );
  return data.teacherLibraryItems;
}

export async function loadTeacherLibraryBooks(after?: string) {
  const accessToken = await teacherToken();
  if (!accessToken) return { ok: false as const, code: "UNAUTHORIZED" };
  try {
    const category = await findBookCategory(accessToken);
    const page = category
      ? await getBookPage(accessToken, category.id, after)
      : { edges: [], pageInfo: { endCursor: null, hasNextPage: false } };
    return { ok: true as const, page };
  } catch {
    return { ok: false as const, code: "LOAD_FAILED" };
  }
}

export async function createTeacherLibraryBook(input: {
  description: string;
  locale: Locale;
  mediaObjectId: string;
  title: string;
}) {
  const accessToken = await teacherToken();
  if (!accessToken) return { ok: false as const, code: "UNAUTHORIZED" };
  const title = input.title.trim();
  const description = input.description.trim();
  if (!title || title.length > 240 || description.length > 2000) {
    return { ok: false as const, code: "INVALID_INPUT" };
  }

  try {
    const confirmed = await executeApolloMutation<
      {
        confirmMediaUpload: {
          mediaObject: { mimeType: string; status: string; malwareStatus: string };
        };
      },
      { input: { mediaObjectId: string } }
    >(
      TeacherConfirmLessonUploadDocument,
      { input: { mediaObjectId: input.mediaObjectId } },
      { accessToken, cache: "no-store" },
    );
    const media = confirmed.confirmMediaUpload.mediaObject;
    if (
      media.mimeType !== "application/pdf" ||
      media.status !== "READY" ||
      media.malwareStatus !== "CLEAN"
    ) {
      return { ok: false as const, code: "PDF_NOT_READY" };
    }

    let category = await findBookCategory(accessToken);
    if (!category) {
      try {
        const created = await executeApolloMutation<
          { createLibraryCategory: { category: { id: string; name: string } } },
          { input: { name: string } }
        >(
          TeacherLibraryCreateCategoryDocument,
          { input: { name: bookCategoryName } },
          { accessToken, cache: "no-store" },
        );
        category = created.createLibraryCategory.category;
      } catch {
        category = await findBookCategory(accessToken);
        if (!category) throw new Error("CATEGORY_FAILED");
      }
    }

    const primaryLanguage = input.locale.toUpperCase() as "EN" | "RU" | "UZ";
    const data = await executeApolloMutation<
      { createLibraryItem: { item: { id: string } } },
      {
        input: {
          categoryId: string;
          groupIds: string[];
          mediaObjectIds: string[];
          primaryLanguage: "EN" | "RU" | "UZ";
          translations: {
            language: "EN" | "RU" | "UZ";
            title: string;
            description: string | null;
          }[];
          visibility: "ALL_GROUPS";
        };
      }
    >(
      TeacherLibraryCreateItemDocument,
      {
        input: {
          categoryId: category.id,
          groupIds: [],
          mediaObjectIds: [input.mediaObjectId],
          primaryLanguage,
          translations: (["UZ", "RU", "EN"] as const).map((language) => ({
            description: description || null,
            language,
            title,
          })),
          visibility: "ALL_GROUPS",
        },
      },
      { accessToken, cache: "no-store" },
    );
    return { ok: true as const, id: data.createLibraryItem.item.id };
  } catch {
    return { ok: false as const, code: "SAVE_FAILED" };
  }
}

export async function archiveTeacherLibraryBook(libraryItemId: string) {
  const accessToken = await teacherToken();
  if (!accessToken) return { ok: false as const, code: "UNAUTHORIZED" };
  try {
    await executeApolloMutation<
      { setLibraryItemArchived: { item: { id: string } } },
      { input: { archived: boolean; libraryItemId: string } }
    >(
      TeacherLibraryArchiveItemDocument,
      { input: { archived: true, libraryItemId } },
      { accessToken, cache: "no-store" },
    );
    return { ok: true as const };
  } catch {
    return { ok: false as const, code: "ARCHIVE_FAILED" };
  }
}
