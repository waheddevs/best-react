import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/locales";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

import { LearningJourney } from "./LearningJourney";
import { OutcomeCategories } from "./OutcomeCategories";
import { ResultsCta } from "./ResultsCta";
import { ResultsHero } from "./ResultsHero";
import { ResultsNotice } from "./ResultsNotice";

type ResultsPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: ResultsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getPageCopy(locale);
  return createPageMetadata(locale, copy.results.title, copy.results.description, "/results");
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = getPageCopy(locale);
  const dictionary = getDictionary(locale);

  return (
    <main>
      <ResultsHero eyebrow={dictionary.navigation.results} copy={copy} />
      <ResultsNotice copy={copy} />
      <LearningJourney copy={copy} />
      <OutcomeCategories copy={copy} />
      <ResultsCta locale={locale} copy={copy} />
    </main>
  );
}
