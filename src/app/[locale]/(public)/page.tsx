import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HomeHero } from "@/components/sections/home-hero";
import { HomeSections } from "@/components/sections/home-sections";
import { isLocale } from "@/config/locales";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

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
      <HomeSections locale={locale} copy={copy} />
    </main>
  );
}
