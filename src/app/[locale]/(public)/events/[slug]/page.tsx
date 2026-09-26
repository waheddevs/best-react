import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, locales } from "@/config/Locales";
import { getPageCopy } from "@/dictionaries/public/PageCopy";
import { createPageMetadata } from "@/lib/Metadata";
import { getPublicEvent, getPublicEvents } from "@/lib/PublicContentApi";

import { EventDetailContent } from "./EventDetailContent";

type EventDetailPageProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const localizedEvents = await Promise.all(
    locales.map(async (locale) => ({ events: await getPublicEvents(locale), locale })),
  );
  return localizedEvents.flatMap(({ events, locale }) =>
    events.map((event) => ({ locale, slug: event.slug })),
  );
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const result = await getPublicEvent(locale, slug);
  if (!result) return {};
  const { event } = result;
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

  const [result, events] = await Promise.all([
    getPublicEvent(locale, slug),
    getPublicEvents(locale),
  ]);
  if (!result) notFound();
  const { detail, event } = result;

  const copy = getPageCopy(locale);
  const relatedEvents = events.filter((item) => item.slug !== event.slug).slice(0, 3);

  return (
    <EventDetailContent
      copy={copy}
      initialDetail={detail}
      initialEvent={event}
      initialRelatedEvents={relatedEvents}
      locale={locale}
    />
  );
}
