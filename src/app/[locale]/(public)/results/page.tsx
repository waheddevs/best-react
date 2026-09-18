import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getDictionary } from "@/dictionaries/public/GetDictionary";
import { getPageCopy } from "@/dictionaries/public/PageCopy";
import { createPageMetadata } from "@/lib/Metadata";
import { getPublicResultVideos } from "@/lib/PublicContentApi";

import { LearningJourney } from "./LearningJourney";
import { OutcomeCategories } from "./OutcomeCategories";
import { ResultStories } from "./ResultStories";
import { ResultsCta } from "./ResultsCta";
import { ResultsHero } from "./ResultsHero";

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
  const videos = await getPublicResultVideos(locale);

  return (
    <main className={"results"}>
      <ResultsHero eyebrow={dictionary.navigation.results} copy={copy} />
      <ResultStories copy={copy} locale={locale} videos={videos} />
      <LearningJourney copy={copy} />
      <OutcomeCategories copy={copy} />
      <ResultsCta locale={locale} copy={copy} />
    </main>
  );
}
