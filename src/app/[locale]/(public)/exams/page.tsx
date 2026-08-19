import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/locales";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

import { ExamDirections } from "./ExamDirections";
import { ExamPreparation } from "./ExamPreparation";
import { ExamRules } from "./ExamRules";
import { ExamsHero } from "./ExamsHero";

type ExamsPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: ExamsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getPageCopy(locale);
  return createPageMetadata(locale, copy.exams.title, copy.exams.description, "/exams");
}

export default async function ExamsPage({ params }: ExamsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = getPageCopy(locale);
  const dictionary = getDictionary(locale);

  return (
    <main>
      <ExamsHero eyebrow={dictionary.navigation.exams} copy={copy} />
      <ExamDirections copy={copy} />
      <ExamRules locale={locale} copy={copy} />
      <ExamPreparation copy={copy} />
    </main>
  );
}
