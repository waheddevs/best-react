import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getStudentLibraryCopy } from "@/dictionaries/student/Library";
import { loadStudentLibraryBooks } from "@/features/student/library/StudentLibraryActions";
import { isDashboardPreviewEnabled } from "@/lib/DashboardAccess";
import { createPageMetadata } from "@/lib/Metadata";

import { LibraryCatalog } from "./LibraryCatalog";
import { LibraryHero } from "./LibraryHero";

type LibraryPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LibraryPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getStudentLibraryCopy(locale);
  return createPageMetadata(locale, copy.title, copy.description, "/student/library");
}

export default async function LibraryPage({ params }: LibraryPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = getStudentLibraryCopy(locale);
  const preview = isDashboardPreviewEnabled();
  const books = preview ? null : await loadStudentLibraryBooks(locale);

  return (
    <main className="library">
      <LibraryHero copy={copy} />
      <LibraryCatalog
        locale={locale}
        copy={copy}
        bookPage={books?.ok ? books.page : null}
        preview={preview}
      />
    </main>
  );
}
