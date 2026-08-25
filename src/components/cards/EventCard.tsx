"use client";

import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import LocationOnRounded from "@mui/icons-material/LocationOnRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import TimelapseRounded from "@mui/icons-material/TimelapseRounded";
import Image from "next/image";
import type { MouseEvent } from "react";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/events.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { useEventRegistration } from "@/hooks/public/events/useEventRegistration";
import type { PublicEvent } from "@/types/PublicContent";

type EventCardProps = {
  event: PublicEvent;
  locale: Locale;
  copy: PageCopy;
  variant?: "catalog" | "summary";
};

export function EventCard({ event, locale, copy, variant = "summary" }: EventCardProps) {
  /* HOOKS */
  const { openRegistration } = useEventRegistration();

  /* HANDLERS */
  const handleAttendClick = (clickEvent: MouseEvent<HTMLButtonElement>) => {
    clickEvent.currentTarget.blur();
    openRegistration(event);
  };

  if (variant === "catalog") {
    return (
      <article className={styles.events__catalogCard}>
        <div className={styles.events__catalogCardMedia}>
          <Image
            alt={event.imageAlt[locale]}
            className={styles.events__catalogCardImage}
            fill
            sizes="(min-width: 1280px) 390px, (min-width: 768px) 50vw, 100vw"
            src={event.image}
          />
        </div>
        <span className={styles.events__catalogCardScrim} aria-hidden="true" />

        <div className={styles.events__catalogCardPanel}>
          <div className={styles.events__catalogCardHeading}>
            <div>
              <h2 className={styles.events__catalogCardTitle}>{event.title[locale]}</h2>
              <p className={styles.events__catalogCardLocation}>
                <LocationOnRounded aria-hidden="true" />
                {event.locationLabel[locale]}
              </p>
            </div>
          </div>

          <dl className={styles.events__catalogCardMeta}>
            <div className={styles.events__catalogCardMetaItem}>
              <dt>
                <CalendarMonthRounded aria-hidden="true" />
                {copy.events.date}:
              </dt>
              <dd>{event.dateLabel[locale]}</dd>
            </div>
            <div className={styles.events__catalogCardMetaItem}>
              <dt>
                <ScheduleRounded aria-hidden="true" />
                {copy.events.time}:
              </dt>
              <dd>{event.timeLabel[locale]}</dd>
            </div>
            <div className={styles.events__catalogCardMetaItem}>
              <dt>
                <TimelapseRounded aria-hidden="true" />
                {copy.events.duration}:
              </dt>
              <dd>{event.durationLabel[locale]}</dd>
            </div>
          </dl>

          <div className={styles.events__catalogCardActions}>
            <ScrollToTopLink
              aria-label={`${copy.common.details}: ${event.title[locale]}`}
              className={styles.events__catalogCardDetails}
              href={`/${locale}/events/${event.slug}`}
            >
              <span>{copy.common.details}</span>
              <ArrowOutwardRounded aria-hidden="true" />
            </ScrollToTopLink>
            <Button
              aria-label={`${copy.events.attend}: ${event.title[locale]}`}
              className={styles.events__catalogCardAttend}
              hoverEffect="jump"
              onClick={handleAttendClick}
              size="small"
              variant="surface"
            >
              {copy.events.attend}
            </Button>
          </div>
        </div>
      </article>
    );
  }

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
