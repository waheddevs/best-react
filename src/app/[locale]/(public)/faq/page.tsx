import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/locales";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

import { FaqContent } from "./FaqContent";
import { FaqHero } from "./FaqHero";

type FaqPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: FaqPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getPageCopy(locale);
  return createPageMetadata(locale, copy.faq.title, copy.faq.description, "/faq");
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = getPageCopy(locale);
  const dictionary = getDictionary(locale);

  return (
    <main>
      <FaqHero eyebrow={dictionary.navigation.faq} copy={copy} />
      <FaqContent locale={locale} copy={copy} />
    </main>
  );
}
