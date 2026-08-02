import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventCard } from "@/components/cards/event-card";
import { DraftNotice } from "@/components/ui/draft-notice";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { isLocale } from "@/config/locales";
import { events } from "@/data/public-content";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

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
  const upcoming = events.filter((event) => event.status === "upcoming");
  const past = events.filter((event) => event.status === "past");

  return (
    <main>
      <PageHero
        eyebrow={dictionary.navigation.events}
        title={copy.events.title}
        description={copy.events.description}
      />
      <Section>
        <DraftNotice badge={copy.common.draftBadge} note={copy.common.draftNote} />
        <div className="mt-10">
          <SectionHeading title={copy.events.upcoming} />
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {upcoming.map((event) => (
            <EventCard key={event.slug} event={event} locale={locale} copy={copy} />
          ))}
        </div>
        <div className="mt-16">
          <SectionHeading title={copy.events.past} />
        </div>
        {past.length > 0 ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {past.map((event) => (
              <EventCard key={event.slug} event={event} locale={locale} copy={copy} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[1.75rem] border border-dashed border-border bg-surface p-8 text-center text-muted">
            {copy.events.noPast}
          </div>
        )}
      </Section>
    </main>
  );
}
