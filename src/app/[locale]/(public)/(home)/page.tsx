import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getDictionary } from "@/dictionaries/public/GetDictionary";
import { getPageCopy } from "@/dictionaries/public/PageCopy";
import { createPageMetadata } from "@/lib/Metadata";
import styles from "@/css/public/home.module.css";

import { FaqPreview } from "./FaqPreview";
import { FeaturedCourses } from "./FeaturedCourses";
import { FinalCta } from "./FinalCta";
import { HomeHero } from "./HomeHero";
import { LearningProcess } from "./LearningProcess";
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
    <main className={styles.home}>
      <HomeHero locale={locale} content={dictionary.home} />
      <TrustStrip content={dictionary.home} />
      <FeaturedCourses locale={locale} copy={copy} />
      <WhyBest copy={copy} />
      <LearningProcess copy={copy} />
      <ResultsPreview locale={locale} copy={copy} />
      <UpcomingEvents locale={locale} copy={copy} />
      <FaqPreview locale={locale} copy={copy} />
      <FinalCta locale={locale} copy={copy} />
    </main>
  );
}
