"use server";

import { auth } from "@/Auth";
import type { Locale } from "@/config/Locales";
import {
  StudentLibraryBookDownloadDocument,
  StudentLibraryBooksDocument,
  type StudentLibraryBooksQuery,
} from "@/gql/graphql";
import { executeApolloMutation, executeApolloQuery } from "@/lib/apollo/ApolloServerClient";

async function studentToken(): Promise<string | null> {
  const session = await auth();
  return session?.bestApi?.role === "STUDENT" ? (session.bestApi.accessToken ?? null) : null;
}

export async function loadStudentLibraryBooks(locale: Locale, after?: string) {
  const accessToken = await studentToken();
  if (!accessToken) return { ok: false as const };
  try {
    const data = await executeApolloQuery<
      StudentLibraryBooksQuery,
      { language: "EN" | "RU" | "UZ"; first: number; after?: string }
    >(
      StudentLibraryBooksDocument,
      { language: locale.toUpperCase() as "EN" | "RU" | "UZ", first: 50, after },
      { accessToken, cache: "no-store" },
    );
    return { ok: true as const, page: data.studentLibraryItems };
  } catch {
    return { ok: false as const };
  }
}

export async function getStudentLibraryBookDownload(libraryItemId: string, mediaObjectId: string) {
  const accessToken = await studentToken();
  if (!accessToken) return { ok: false as const };
  try {
    const data = await executeApolloMutation<
      { createStudentLibraryDownloadIntent: { downloadIntent: { url: string } } },
      { input: { libraryItemId: string; mediaObjectId: string } }
    >(
      StudentLibraryBookDownloadDocument,
      { input: { libraryItemId, mediaObjectId } },
      { accessToken, cache: "no-store" },
    );
    return { ok: true as const, url: data.createStudentLibraryDownloadIntent.downloadIntent.url };
  } catch {
    return { ok: false as const };
  }
}
