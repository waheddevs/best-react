import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getExamPreviewCopy } from "@/dictionaries/public/ExamPreview";
import { getDictionary } from "@/dictionaries/public/GetDictionary";
import { createPageMetadata } from "@/lib/Metadata";

import { ExamInstructions } from "./ExamInstructions";
import { ExamOptionsSection } from "./ExamOptionsSection";
import { ExamResults } from "./ExamResults";
import { ExamsHero } from "./ExamsHero";

type ExamsPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: ExamsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getExamPreviewCopy(locale);
  return createPageMetadata(locale, copy.title, copy.description, "/exams");
}

export default async function ExamsPage({ params }: ExamsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = getExamPreviewCopy(locale);
  const dictionary = getDictionary(locale);
  return (
    <main className={"exams"}>
      <ExamsHero eyebrow={dictionary.navigation.exams} copy={copy} />
      <ExamInstructions copy={copy} />
      <ExamOptionsSection copy={copy} locale={locale} />
      <ExamResults copy={copy} />
    </main>
  );
}
