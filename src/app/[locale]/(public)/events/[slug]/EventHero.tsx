import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import LocationOnRounded from "@mui/icons-material/LocationOnRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import Image from "next/image";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicEvent } from "@/types/PublicContent";

import { EventAttendAction } from "./EventAttendAction";
import { EventHeroMotion } from "./EventHeroMotion";
import { EventTopics } from "./EventTopics";

type EventHeroProps = {
  event: PublicEvent;
  locale: Locale;
  copy: PageCopy;
};

export function EventHero({ event, locale, copy }: EventHeroProps) {
  const isUpcoming = event.status === "upcoming";
  const statusLabel = isUpcoming ? copy.events.upcoming : copy.events.past;
  const statusClassName = isUpcoming
    ? "events__detailHeroStatusUpcoming"
    : "events__detailHeroStatusPast";

  return (
    <section className="events__detailHero">
      <Container>
        <ScrollToTopLink className="events__detailBackLink" href={`/${locale}/events`}>
          <ArrowBackRounded aria-hidden="true" />
          {copy.events.backToEvents}
        </ScrollToTopLink>

        <div className="events__detailHeroGrid">
          <EventHeroMotion className="events__detailHeroVisual" variant="visual">
            <Image
              alt={event.imageAlt[locale]}
              className="events__detailHeroImage"
              fill
              preload
              sizes="(max-width: 1024px) calc(100vw - 2.5rem), 30rem"
              src={event.image}
            />
          </EventHeroMotion>

          <EventHeroMotion className="events__detailHeroCopy" variant="copy">
            <div className="events__detailHeroStatusRow">
              <span className={`events__detailHeroStatus ${statusClassName}`}>{statusLabel}</span>
              <span className="events__detailHeroFormat">{event.formatLabel[locale]}</span>
            </div>

            <h1 className="events__detailHeroTitle">{event.title[locale]}</h1>
            <p className="events__detailHeroDescription">{event.summary[locale]}</p>
            <EventTopics copy={copy} event={event} locale={locale} />

            <div className="events__detailHeroMeta">
              <span>
                <CalendarMonthRounded aria-hidden="true" />
                <small>{copy.events.date}</small>
                <strong>{event.dateLabel[locale]}</strong>
              </span>
              <span>
                <ScheduleRounded aria-hidden="true" />
                <small>{copy.events.time}</small>
                <strong>{event.timeLabel[locale]}</strong>
              </span>
              <span className="events__detailHeroLocation">
                <LocationOnRounded aria-hidden="true" />
                <small>{copy.events.location}</small>
                <strong>{event.locationLabel[locale]}</strong>
              </span>
            </div>

            <div className="events__detailHeroAction">
              {isUpcoming ? (
                <EventAttendAction
                  event={event}
                  label={copy.events.attend}
                  locale={locale}
                  size="large"
                />
              ) : (
                <span className="events__detailCompleted">
                  <CheckCircleOutlineRounded aria-hidden="true" />
                  {copy.events.eventCompleted}
                </span>
              )}
            </div>
          </EventHeroMotion>
        </div>
      </Container>
    </section>
  );
}
