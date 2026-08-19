import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Section } from "@/components/ui/section";
import { isLocale, locales } from "@/config/locales";
import { events } from "@/data/public-content";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

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
    <main>
      <EventHero event={event} locale={locale} copy={copy} />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <EventTopics event={event} locale={locale} copy={copy} />
          <EventDetails event={event} locale={locale} copy={copy} />
        </div>
      </Section>
    </main>
  );
}
