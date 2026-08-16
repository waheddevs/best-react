import type { Metadata } from "next";

import { HomeHero } from "@/components/sections/home-hero";
import { HomeSections } from "@/components/sections/home-sections";
import { defaultLocale } from "@/config/locales";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  const locale = defaultLocale;
  const dictionary = getDictionary(locale);
  return createPageMetadata(dictionary.navigation.home, dictionary.home.description);
}

export default function HomePage() {
  const locale = defaultLocale;

  const dictionary = getDictionary(locale);
  const copy = getPageCopy(locale);

  return (
    <main>
      <HomeHero content={dictionary.home} />
      <HomeSections locale={locale} copy={copy} />
    </main>
  );
}
