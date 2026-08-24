import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Section } from "@/components/ui/Section";
import { isLocale, locales } from "@/config/Locales";
import { events } from "@/data/PublicContent";
import styles from "@/css/public/events.module.css";
import { getPageCopy } from "@/dictionaries/public/PageCopy";
import { createPageMetadata } from "@/lib/Metadata";

import { EventDetails } from "./EventDetails";
import { EventHero } from "./EventHero";
import { EventTopics } from "./EventTopics";

type EventDetailPageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => events.map((event) => ({ locale, slug: event.slug })));
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const event = events.find((item) => item.slug === slug);
  if (!event) return {};
  return createPageMetadata(
    locale,
    event.title[locale],
    event.summary[locale],
    `/events/${slug}`,
    null,
  );
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const event = events.find((item) => item.slug === slug);
  if (!event) notFound();

  const copy = getPageCopy(locale);

  return (
    <main className={styles.events}>
      <EventHero event={event} locale={locale} copy={copy} />
      <Section tone="surface">
        <div className={styles.events__detailLayout}>
          <EventTopics event={event} locale={locale} copy={copy} />
          <EventDetails event={event} locale={locale} copy={copy} />
        </div>
      </Section>
    </main>
  );
}
