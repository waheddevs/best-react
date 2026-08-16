import type { Metadata } from "next";

import { EventCard } from "@/components/cards/event-card";
import { DraftNotice } from "@/components/ui/draft-notice";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { defaultLocale } from "@/config/locales";
import { events } from "@/data/public-content";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  const locale = defaultLocale;
  const copy = getPageCopy(locale);
  return createPageMetadata(copy.events.title, copy.events.description, "/events");
}

export default function EventsPage() {
  const locale = defaultLocale;
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
        <div className="events-page">
          <SectionHeading title={copy.events.upcoming} />
        </div>
        <div className="events-page__2">
          {upcoming.map((event) => (
            <EventCard key={event.slug} event={event} locale={locale} copy={copy} />
          ))}
        </div>
        <div className="events-page__3">
          <SectionHeading title={copy.events.past} />
        </div>
        {past.length > 0 ? (
          <div className="events-page__4">
            {past.map((event) => (
              <EventCard key={event.slug} event={event} locale={locale} copy={copy} />
            ))}
          </div>
        ) : (
          <div className="events-page__5">{copy.events.noPast}</div>
        )}
      </Section>
    </main>
  );
}
