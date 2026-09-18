import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Section } from "@/components/ui/Section";
import { isLocale, locales } from "@/config/Locales";
import { getPageCopy } from "@/dictionaries/public/PageCopy";
import { createPageMetadata } from "@/lib/Metadata";
import { getPublicEvent, getPublicEvents } from "@/lib/PublicContentApi";

import { EventAudience } from "./EventAudience";
import { EventDetails } from "./EventDetails";
import { EventHero } from "./EventHero";
import { EventOverview } from "./EventOverview";
import { EventPracticalInfo } from "./EventPracticalInfo";
import { EventProgramme } from "./EventProgramme";
import { OtherEvents } from "./OtherEvents";

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
  const { detail: detailContent, event } = result;

  const copy = getPageCopy(locale);
  const relatedEvents = events.filter((item) => item.slug !== event.slug).slice(0, 3);

  return (
    <main className="events">
      <EventHero event={event} locale={locale} copy={copy} />
      <Section tone="surface">
        <div className="events__detailLayout">
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
