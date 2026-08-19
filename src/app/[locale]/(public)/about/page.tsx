import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/locales";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

import { AboutHero } from "./AboutHero";
import { Mission } from "./Mission";
import { Story } from "./Story";
import { Values } from "./Values";

type AboutPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getPageCopy(locale);
  return createPageMetadata(locale, copy.about.title, copy.about.description, "/about");
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = getPageCopy(locale);
  const dictionary = getDictionary(locale);

  return (
    <main>
      <AboutHero eyebrow={dictionary.navigation.about} copy={copy} />
      <Mission locale={locale} copy={copy} />
      <Values copy={copy} />
      <Story copy={copy} />
    </main>
  );
}
