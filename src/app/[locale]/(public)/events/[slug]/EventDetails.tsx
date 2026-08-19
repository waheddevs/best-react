import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import LocationOnRounded from "@mui/icons-material/LocationOnRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";

import { ButtonLink } from "@/components/ui/button-link";
import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import type { PublicEvent } from "@/types/public-content";

type EventDetailsProps = {
  event: PublicEvent;
  locale: Locale;
  copy: PageCopy;
};

export function EventDetails({ event, locale, copy }: EventDetailsProps) {
  return (
    <aside className="h-fit rounded-[1.75rem] border border-border bg-surface p-6">
      <dl className="space-y-5 text-sm">
        <div>
          <dt className="flex items-center gap-2 text-muted">
            <CalendarMonthRounded aria-hidden="true" sx={{ fontSize: 19 }} />
            {copy.events.date}
          </dt>
          <dd className="mt-1.5 font-extrabold text-heading">{event.dateLabel[locale]}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-2 text-muted">
            <ScheduleRounded aria-hidden="true" sx={{ fontSize: 19 }} />
            {copy.events.time}
          </dt>
          <dd className="mt-1.5 font-extrabold text-heading">{event.timeLabel[locale]}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-2 text-muted">
            <LocationOnRounded aria-hidden="true" sx={{ fontSize: 19 }} />
            {copy.events.location}
          </dt>
          <dd className="mt-1.5 font-extrabold text-heading">{event.locationLabel[locale]}</dd>
        </div>
      </dl>
      <p className="mt-7 rounded-2xl bg-background p-4 text-xs leading-5 text-muted">
        {copy.events.registrationNote}
      </p>
      <div className="mt-5">
        <ButtonLink href={`/${locale}/contact`}>{copy.common.contactCta}</ButtonLink>
      </div>
    </aside>
  );
}
