import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getDictionary } from "@/dictionaries/public/GetDictionary";
import { getPageCopy } from "@/dictionaries/public/PageCopy";
import { createPageMetadata } from "@/lib/Metadata";

import { EventsCatalogSection } from "./EventsCatalogSection";
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
    <main className={"events"}>
      <EventsHero eyebrow={dictionary.navigation.events} copy={copy} />
      <EventsCatalogSection locale={locale} copy={copy} />
    </main>
  );
}
