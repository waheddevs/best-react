import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import styles from "@/css/public/exams.module.css";
import { getExamPreviewCopy } from "@/dictionaries/public/ExamPreview";
import { getDictionary } from "@/dictionaries/public/GetDictionary";
import { createPageMetadata } from "@/lib/Metadata";
import { getPublicExamData } from "@/lib/PublicContentApi";

import { ExamInstructions } from "./ExamInstructions";
import { ExamOptions } from "./ExamOptions";
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
  const examData = await getPublicExamData(locale);

  return (
    <main className={styles.exams}>
      <ExamsHero eyebrow={dictionary.navigation.exams} copy={copy} />
      <ExamInstructions copy={copy} />
      <ExamOptions copy={copy} dates={examData.dates} locale={locale} options={examData.options} />
      <ExamResults copy={copy} />
    </main>
  );
}
