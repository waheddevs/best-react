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
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[0_12px_34px_rgb(16_42_67_/_6%)] transition duration-200 hover:-translate-y-1 hover:border-brand">
      <div className="relative min-h-44 overflow-hidden bg-(image:--gradient-hero) p-6">
        <div className="absolute -top-12 -right-12 size-40 rounded-full border-24 border-brand/15" />
        <span className="relative grid size-14 place-items-center rounded-2xl bg-surface text-action shadow-sm">
          <CalendarMonthRounded aria-hidden="true" />
        </span>
        <p className="relative mt-7 inline-flex rounded-full bg-sun px-3 py-1.5 text-xs font-black text-heading">
          {event.dateLabel[locale]}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-2xl font-black tracking-[-0.04em] text-heading">
          {event.title[locale]}
        </h2>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted">{event.summary[locale]}</p>
        <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-heading">
          <LocationOnRounded aria-hidden="true" sx={{ fontSize: 19 }} className="text-brand" />
          {event.formatLabel[locale]}
        </p>
        <Link
          href={`/${locale}/events/${event.slug}`}
          className="mt-6 inline-flex min-h-11 items-center justify-between rounded-xl border border-border px-4 font-bold text-heading transition-colors group-hover:border-action group-hover:text-action"
        >
          {copy.common.details}
          <ArrowOutwardRounded aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
