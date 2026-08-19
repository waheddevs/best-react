import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getDictionary } from "@/dictionaries/public/GetDictionary";
import { getPageCopy } from "@/dictionaries/public/PageCopy";
import styles from "@/css/public/faq.module.css";
import { createPageMetadata } from "@/lib/Metadata";

import { FaqContent } from "./FaqContent";
import { FaqHero } from "./FaqHero";

type FaqPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: FaqPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getPageCopy(locale);
  return createPageMetadata(locale, copy.faq.title, copy.faq.description, "/faq");
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = getPageCopy(locale);
  const dictionary = getDictionary(locale);

  return (
    <main className={styles.faq}>
      <FaqHero eyebrow={dictionary.navigation.faq} copy={copy} />
      <FaqContent locale={locale} copy={copy} />
    </main>
  );
}
