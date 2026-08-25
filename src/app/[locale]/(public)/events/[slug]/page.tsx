import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Section } from "@/components/ui/Section";
import { isLocale, locales } from "@/config/Locales";
import { eventDetailsBySlug } from "@/data/EventDetails";
import { events } from "@/data/PublicContent";
import styles from "@/css/public/events.module.css";
import { getPageCopy } from "@/dictionaries/public/PageCopy";
import { createPageMetadata } from "@/lib/Metadata";

import { EventAudience } from "./EventAudience";
import { EventDetails } from "./EventDetails";
import { EventHero } from "./EventHero";
import { EventOverview } from "./EventOverview";
import { EventPracticalInfo } from "./EventPracticalInfo";
import { EventProgramme } from "./EventProgramme";
import { OtherEvents } from "./OtherEvents";

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
  const detailContent = eventDetailsBySlug[event.slug][locale];
  const relatedEvents = events.filter((item) => item.slug !== event.slug).slice(0, 3);

  return (
    <main className={styles.events}>
      <EventHero event={event} locale={locale} copy={copy} />
      <Section tone="surface">
        <div className={styles.events__detailLayout}>
          <EventOverview copy={copy} paragraphs={detailContent.overview} />
          <EventDetails event={event} locale={locale} copy={copy} />
        </div>
      </Section>
      <EventProgramme copy={copy} items={detailContent.programme} />
      <EventAudience
        audience={detailContent.audience}
        copy={copy}
        takeaways={detailContent.takeaways}
      />
      <EventPracticalInfo copy={copy} faq={detailContent.faq} items={detailContent.practicalInfo} />
      <OtherEvents copy={copy} events={relatedEvents} locale={locale} />
    </main>
  );
}
