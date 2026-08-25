import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import EventSeatRounded from "@mui/icons-material/EventSeatRounded";
import LocationOnRounded from "@mui/icons-material/LocationOnRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import TimelapseRounded from "@mui/icons-material/TimelapseRounded";

import type { Locale } from "@/config/Locales";
import styles from "@/css/public/events.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicEvent } from "@/types/PublicContent";

import { EventAttendAction } from "./EventAttendAction";

type EventDetailsProps = {
  event: PublicEvent;
  locale: Locale;
  copy: PageCopy;
};

export function EventDetails({ event, locale, copy }: EventDetailsProps) {
  const isUpcoming = event.status === "upcoming";

  return (
    <aside className={styles.events__details}>
      <div className={styles.events__detailsHeader}>
        <div>
          <span className={styles.events__detailsEyebrow}>
            {isUpcoming ? copy.events.upcoming : copy.events.past}
          </span>
          <h2 className={styles.events__detailsTitle}>{copy.events.eventDetails}</h2>
        </div>
      </div>

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
            <TimelapseRounded aria-hidden="true" className={styles.events__detailsIcon} />
            {copy.events.duration}
          </dt>
          <dd className={styles.events__detailsValue}>{event.durationLabel[locale]}</dd>
        </div>
        <div>
          <dt className={styles.events__detailsLabel}>
            <EventSeatRounded aria-hidden="true" className={styles.events__detailsIcon} />
            {copy.events.format}
          </dt>
          <dd className={styles.events__detailsValue}>{event.formatLabel[locale]}</dd>
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
        {isUpcoming ? copy.events.registrationNote : copy.events.eventCompleted}
      </p>
      <div className={styles.events__detailsAction}>
        {isUpcoming ? (
          <EventAttendAction event={event} fullWidth label={copy.events.attend} locale={locale} />
        ) : (
          <span className={styles.events__detailsCompleted}>{copy.events.eventCompleted}</span>
        )}
      </div>
    </aside>
  );
}
