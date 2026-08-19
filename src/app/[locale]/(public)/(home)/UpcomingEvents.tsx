import { EventCard } from "@/components/cards/event-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/config/locales";
import { events } from "@/data/public-content";
import type { PageCopy } from "@/dictionaries/page-copy";

type UpcomingEventsProps = {
  locale: Locale;
  copy: PageCopy;
};

export function UpcomingEvents({ locale, copy }: UpcomingEventsProps) {
  return (
    <Section>
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading eyebrow={copy.home.eventsEyebrow} title={copy.home.eventsTitle} />
        <ButtonLink href={`/${locale}/events`} variant="secondary">
          {copy.common.learnMore}
        </ButtonLink>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {events.map((event) => (
          <EventCard key={event.slug} event={event} locale={locale} copy={copy} />
        ))}
      </div>
    </Section>
  );
}
