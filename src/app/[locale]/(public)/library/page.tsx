import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getDictionary } from "@/dictionaries/public/GetDictionary";
import { getPageCopy } from "@/dictionaries/public/PageCopy";
import styles from "@/css/public/library.module.css";
import { createPageMetadata } from "@/lib/Metadata";

import { LibraryCatalog } from "./LibraryCatalog";
import { LibraryHero } from "./LibraryHero";

type LibraryPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LibraryPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getPageCopy(locale);
  return createPageMetadata(locale, copy.library.title, copy.library.description, "/library");
}

export default async function LibraryPage({ params }: LibraryPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = getPageCopy(locale);
  const dictionary = getDictionary(locale);

  return (
    <main className={styles.library}>
      <LibraryHero eyebrow={dictionary.navigation.library} copy={copy} />
      <LibraryCatalog locale={locale} copy={copy} />
    </main>
  );
}
