import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import LocationOnRounded from "@mui/icons-material/LocationOnRounded";
import Link from "next/link";

import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import type { PublicEvent } from "@/types/public-content";

type EventCardProps = {
  event: PublicEvent;
  locale: Locale;
  copy: PageCopy;
};

export function EventCard({ event, locale, copy }: EventCardProps) {
  return (
    <article className="event-card">
      <div className="event-card__2">
        <div className="event-card__3" />
        <span className="event-card__4">
          <CalendarMonthRounded aria-hidden="true" />
        </span>
        <p className="event-card__5">{event.dateLabel[locale]}</p>
      </div>
      <div className="event-card__6">
        <h2 className="event-card__7">{event.title[locale]}</h2>
        <p className="event-card__8">{event.summary[locale]}</p>
        <p className="event-card__9">
          <LocationOnRounded aria-hidden="true" sx={{ fontSize: 19 }} className="event-card__10" />
          {event.formatLabel[locale]}
        </p>
        <Link href={`/website/events/${event.slug}`} className="event-card__11">
          {copy.common.details}
          <ArrowOutwardRounded aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
