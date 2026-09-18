import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import EventSeatRounded from "@mui/icons-material/EventSeatRounded";
import LocationOnRounded from "@mui/icons-material/LocationOnRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import TimelapseRounded from "@mui/icons-material/TimelapseRounded";

import type { Locale } from "@/config/Locales";
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
    <aside className="events__details">
      <div className="events__detailsHeader">
        <div>
          <span className="events__detailsEyebrow">
            {isUpcoming ? copy.events.upcoming : copy.events.past}
          </span>
          <h2 className="events__detailsTitle">{copy.events.eventDetails}</h2>
        </div>
      </div>

      <dl className="events__detailsList">
        <div>
          <dt className="events__detailsLabel">
            <CalendarMonthRounded aria-hidden="true" className="events__detailsIcon" />
            {copy.events.date}
          </dt>
          <dd className="events__detailsValue">{event.dateLabel[locale]}</dd>
        </div>
        <div>
          <dt className="events__detailsLabel">
            <ScheduleRounded aria-hidden="true" className="events__detailsIcon" />
            {copy.events.time}
          </dt>
          <dd className="events__detailsValue">{event.timeLabel[locale]}</dd>
        </div>
        <div>
          <dt className="events__detailsLabel">
            <TimelapseRounded aria-hidden="true" className="events__detailsIcon" />
            {copy.events.duration}
          </dt>
          <dd className="events__detailsValue">{event.durationLabel[locale]}</dd>
        </div>
        <div>
          <dt className="events__detailsLabel">
            <EventSeatRounded aria-hidden="true" className="events__detailsIcon" />
            {copy.events.format}
          </dt>
          <dd className="events__detailsValue">{event.formatLabel[locale]}</dd>
        </div>
        <div>
          <dt className="events__detailsLabel">
            <LocationOnRounded aria-hidden="true" className="events__detailsIcon" />
            {copy.events.location}
          </dt>
          <dd className="events__detailsValue">{event.locationLabel[locale]}</dd>
        </div>
      </dl>

      <p className="events__detailsNotice">
        {isUpcoming ? copy.events.registrationNote : copy.events.eventCompleted}
      </p>
      <div className="events__detailsAction">
        {isUpcoming ? (
          <EventAttendAction event={event} fullWidth label={copy.events.attend} locale={locale} />
        ) : (
          <span className="events__detailsCompleted">{copy.events.eventCompleted}</span>
        )}
      </div>
    </aside>
  );
}
