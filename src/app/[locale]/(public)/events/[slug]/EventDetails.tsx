import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import LocationOnRounded from "@mui/icons-material/LocationOnRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";

import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/events.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicEvent } from "@/types/PublicContent";

type EventDetailsProps = {
  event: PublicEvent;
  locale: Locale;
  copy: PageCopy;
};

export function EventDetails({ event, locale, copy }: EventDetailsProps) {
  return (
    <aside className={styles.events__details}>
      <dl className={styles.events__detailsList}>
        <div>
          <dt className={styles.events__detailsLabel}>
            <CalendarMonthRounded aria-hidden="true" className={styles.events__detailsIcon} />
            {copy.events.date}
          </dt>
          <dd className={styles.events__detailsValue}>{event.dateLabel[locale]}</dd>
        </div>
        <div>
          <dt className={styles.events__detailsLabel}>
            <ScheduleRounded aria-hidden="true" className={styles.events__detailsIcon} />
            {copy.events.time}
          </dt>
          <dd className={styles.events__detailsValue}>{event.timeLabel[locale]}</dd>
        </div>
        <div>
          <dt className={styles.events__detailsLabel}>
            <LocationOnRounded aria-hidden="true" className={styles.events__detailsIcon} />
            {copy.events.location}
          </dt>
          <dd className={styles.events__detailsValue}>{event.locationLabel[locale]}</dd>
        </div>
      </dl>
      <p className={styles.events__detailsNotice}>
        {copy.events.registrationNote}
      </p>
      <div className={styles.events__detailsAction}>
        <ButtonLink href={`/${locale}/contact`}>{copy.common.contactCta}</ButtonLink>
      </div>
    </aside>
  );
}
