import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import LocationOnRounded from "@mui/icons-material/LocationOnRounded";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/events.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicEvent } from "@/types/PublicContent";

type EventCardProps = {
  event: PublicEvent;
  locale: Locale;
  copy: PageCopy;
};

export function EventCard({ event, locale, copy }: EventCardProps) {
  return (
    <article className={styles.events__card}>
      <div className={styles.events__cardVisual}>
        <div className={styles.events__cardDecoration} />
        <span className={styles.events__cardIcon}>
          <CalendarMonthRounded aria-hidden="true" />
        </span>
        <p className={styles.events__cardDate}>{event.dateLabel[locale]}</p>
      </div>
      <div className={styles.events__cardContent}>
        <h2 className={styles.events__cardTitle}>{event.title[locale]}</h2>
        <p className={styles.events__cardSummary}>{event.summary[locale]}</p>
        <p className={styles.events__cardLocation}>
          <LocationOnRounded aria-hidden="true" className={styles.events__cardLocationIcon} />
          {event.formatLabel[locale]}
        </p>
        <ScrollToTopLink
          href={`/${locale}/events/${event.slug}`}
          className={styles.events__cardLink}
        >
          {copy.common.details}
          <ArrowOutwardRounded aria-hidden="true" />
        </ScrollToTopLink>
      </div>
    </article>
  );
}
