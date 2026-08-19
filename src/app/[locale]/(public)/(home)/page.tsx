import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/locales";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

import { FaqPreview } from "./FaqPreview";
import { FeaturedCourses } from "./FeaturedCourses";
import { FinalCta } from "./FinalCta";
import { HomeHero } from "./HomeHero";
import { LearningProcess } from "./LearningProcess";
import { LibraryPreview } from "./LibraryPreview";
import { ResultsPreview } from "./ResultsPreview";
import { TrustStrip } from "./TrustStrip";
import { UpcomingEvents } from "./UpcomingEvents";
import { WhyBest } from "./WhyBest";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return createPageMetadata(locale, dictionary.navigation.home, dictionary.home.description);
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const copy = getPageCopy(locale);

  return (
    <main>
      <HomeHero locale={locale} content={dictionary.home} />
      <TrustStrip content={dictionary.home} />
      <FeaturedCourses locale={locale} copy={copy} />
      <WhyBest copy={copy} />
      <LearningProcess copy={copy} />
      <ResultsPreview locale={locale} copy={copy} />
      <UpcomingEvents locale={locale} copy={copy} />
      <LibraryPreview locale={locale} copy={copy} />
      <FaqPreview locale={locale} copy={copy} />
      <FinalCta locale={locale} copy={copy} />
    </main>
  );
}
