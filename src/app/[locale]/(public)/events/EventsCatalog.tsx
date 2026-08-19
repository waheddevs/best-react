import { EventCard } from "@/components/cards/event-card";
import { DraftNotice } from "@/components/ui/draft-notice";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/config/locales";
import { events } from "@/data/public-content";
import type { PageCopy } from "@/dictionaries/page-copy";

type EventsCatalogProps = {
  locale: Locale;
  copy: PageCopy;
};

export function EventsCatalog({ locale, copy }: EventsCatalogProps) {
  const upcoming = events.filter((event) => event.status === "upcoming");
  const past = events.filter((event) => event.status === "past");

  return (
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
  );
}
