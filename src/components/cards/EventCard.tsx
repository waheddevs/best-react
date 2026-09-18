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
      <article className="events__catalogCard">
        <div className="events__catalogCardMedia">
          <Image
            alt={event.imageAlt[locale]}
            className="events__catalogCardImage"
            fill
            sizes="(min-width: 1280px) 390px, (min-width: 768px) 50vw, 100vw"
            src={event.image}
          />
        </div>
        <span className="events__catalogCardScrim" aria-hidden="true" />

        <div className="events__catalogCardPanel">
          <div className="events__catalogCardHeading">
            <div>
              <h2 className="events__catalogCardTitle">{event.title[locale]}</h2>
              <p className="events__catalogCardLocation">
                <LocationOnRounded aria-hidden="true" />
                {event.locationLabel[locale]}
              </p>
            </div>
          </div>

          <dl className="events__catalogCardMeta">
            <div className="events__catalogCardMetaItem">
              <dt>
                <CalendarMonthRounded aria-hidden="true" />
                {copy.events.date}:
              </dt>
              <dd>{event.dateLabel[locale]}</dd>
            </div>
            <div className="events__catalogCardMetaItem">
              <dt>
                <ScheduleRounded aria-hidden="true" />
                {copy.events.time}:
              </dt>
              <dd>{event.timeLabel[locale]}</dd>
            </div>
            <div className="events__catalogCardMetaItem">
              <dt>
                <TimelapseRounded aria-hidden="true" />
                {copy.events.duration}:
              </dt>
              <dd>{event.durationLabel[locale]}</dd>
            </div>
          </dl>

          <div className="events__catalogCardActions">
            <ScrollToTopLink
              aria-label={`${copy.common.details}: ${event.title[locale]}`}
              className="events__catalogCardDetails"
              href={`/${locale}/events/${event.slug}`}
            >
              <span>{copy.common.details}</span>
              <ArrowOutwardRounded aria-hidden="true" />
            </ScrollToTopLink>
            <Button
              aria-label={`${copy.events.attend}: ${event.title[locale]}`}
              className="events__catalogCardAttend"
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
    <article className="events__card">
      <div className="events__cardVisual">
        <div className="events__cardDecoration" />
        <span className="events__cardIcon">
          <CalendarMonthRounded aria-hidden="true" />
        </span>
        <p className="events__cardDate">{event.dateLabel[locale]}</p>
      </div>
      <div className="events__cardContent">
        <h2 className="events__cardTitle">{event.title[locale]}</h2>
        <p className="events__cardSummary">{event.summary[locale]}</p>
        <p className="events__cardLocation">
          <LocationOnRounded aria-hidden="true" className="events__cardLocationIcon" />
          {event.formatLabel[locale]}
        </p>
        <ScrollToTopLink href={`/${locale}/events/${event.slug}`} className="events__cardLink">
          {copy.common.details}
          <ArrowOutwardRounded aria-hidden="true" />
        </ScrollToTopLink>
      </div>
    </article>
  );
}
