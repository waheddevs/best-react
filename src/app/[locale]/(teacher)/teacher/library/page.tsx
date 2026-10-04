import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { createTeacherMetadata } from "@/features/teacher/layout/TeacherMetadata";
import { loadTeacherLibraryBooks } from "@/features/teacher/library/TeacherLibraryActions";
import { isDashboardPreviewEnabled } from "@/lib/DashboardAccess";

import { TeacherLibraryCatalog } from "./TeacherLibraryCatalog";

type TeacherLibraryPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: TeacherLibraryPageProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? createTeacherMetadata(locale, "library") : {};
}

export default async function TeacherLibraryPage({ params }: TeacherLibraryPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const preview = isDashboardPreviewEnabled();
  const result = preview ? null : await loadTeacherLibraryBooks();
  return (
    <TeacherLibraryCatalog
      initialPage={
        result?.ok
          ? result.page
          : preview
            ? { edges: [], pageInfo: { endCursor: null, hasNextPage: false } }
            : null
      }
      locale={locale}
      preview={preview}
    />
  );
}
