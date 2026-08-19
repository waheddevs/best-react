import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import styles from "@/css/student/library.module.css";
import { getStudentLibraryCopy } from "@/dictionaries/student/Library";
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

  return (
    <main className={styles.library}>
      <LibraryHero copy={copy} />
      <LibraryCatalog locale={locale} copy={copy} />
    </main>
  );
}
