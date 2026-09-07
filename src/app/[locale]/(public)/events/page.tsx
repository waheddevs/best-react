import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getDictionary } from "@/dictionaries/public/GetDictionary";
import { getPageCopy } from "@/dictionaries/public/PageCopy";
import styles from "@/css/public/events.module.css";
import { createPageMetadata } from "@/lib/Metadata";
import { getPublicEvents } from "@/lib/PublicContentApi";

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
  const events = await getPublicEvents(locale);

  return (
    <main className={styles.events}>
      <EventsHero eyebrow={dictionary.navigation.events} copy={copy} />
      <EventsCatalog locale={locale} copy={copy} events={events} />
    </main>
  );
}
