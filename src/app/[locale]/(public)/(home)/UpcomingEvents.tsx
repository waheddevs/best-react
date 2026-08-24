import { EventCard } from "@/components/cards/EventCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/home.module.css";
import { events } from "@/data/PublicContent";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type UpcomingEventsProps = {
  locale: Locale;
  copy: PageCopy;
};

export function UpcomingEvents({ locale, copy }: UpcomingEventsProps) {
  return (
    <Section tone="surface">
      <div className={styles.home__eventsHeader}>
        <SectionHeading eyebrow={copy.home.eventsEyebrow} title={copy.home.eventsTitle} />
        <ButtonLink href={`/${locale}/events`} variant="secondary">
          {copy.common.learnMore}
        </ButtonLink>
      </div>
      <div className={styles.home__eventsGrid}>
        {events.map((event) => (
          <EventCard key={event.slug} event={event} locale={locale} copy={copy} />
        ))}
      </div>
    </Section>
  );
}
