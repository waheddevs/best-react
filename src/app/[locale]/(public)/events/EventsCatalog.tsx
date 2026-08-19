import { EventCard } from "@/components/cards/EventCard";
import { DraftNotice } from "@/components/ui/DraftNotice";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/events.module.css";
import { events } from "@/data/PublicContent";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

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
      <div className={styles.events__catalogHeading}>
        <SectionHeading title={copy.events.upcoming} />
      </div>
      <div className={styles.events__catalogGrid}>
        {upcoming.map((event) => (
          <EventCard key={event.slug} event={event} locale={locale} copy={copy} />
        ))}
      </div>
      <div className={styles.events__catalogHeadingPast}>
        <SectionHeading title={copy.events.past} />
      </div>
      {past.length > 0 ? (
        <div className={styles.events__catalogGrid}>
          {past.map((event) => (
            <EventCard key={event.slug} event={event} locale={locale} copy={copy} />
          ))}
        </div>
      ) : (
        <div className={styles.events__catalogEmpty}>
          {copy.events.noPast}
        </div>
      )}
    </Section>
  );
}
