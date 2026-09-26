import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getDictionary } from "@/dictionaries/public/GetDictionary";
import { getPageCopy } from "@/dictionaries/public/PageCopy";
import { createPageMetadata } from "@/lib/Metadata";

import { AboutFaqSection } from "./AboutFaqSection";
import { AboutHero } from "./AboutHero";
import { Mission } from "./Mission";
import { Testimonials } from "./Testimonials";
import { Values } from "./Values";
import { WhyBest } from "./WhyBest";

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
    <main className={"about"}>
      <AboutHero eyebrow={dictionary.navigation.about} copy={copy} />
      <WhyBest copy={copy} />
      <Mission locale={locale} copy={copy} />
      <Values copy={copy} />
      <Testimonials copy={copy} />
      <AboutFaqSection copy={copy} locale={locale} />
    </main>
  );
}
