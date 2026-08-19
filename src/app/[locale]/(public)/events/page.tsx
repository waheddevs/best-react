import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/locales";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

import { EventsCatalog } from "./EventsCatalog";
import { EventsHero } from "./EventsHero";

type EventsPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: EventsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getPageCopy(locale);
  return createPageMetadata(locale, copy.events.title, copy.events.description, "/events");
}

export default async function EventsPage({ params }: EventsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = getPageCopy(locale);
  const dictionary = getDictionary(locale);

  return (
    <main>
      <EventsHero eyebrow={dictionary.navigation.events} copy={copy} />
      <EventsCatalog locale={locale} copy={copy} />
    </main>
  );
}
