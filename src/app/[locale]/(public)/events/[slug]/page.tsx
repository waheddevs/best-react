import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import LocationOnRounded from "@mui/icons-material/LocationOnRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { DraftNotice } from "@/components/ui/draft-notice";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { isLocale, locales } from "@/config/locales";
import { events } from "@/data/public-content";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

type EventDetailPageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => events.map((event) => ({ locale, slug: event.slug })));
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const event = events.find((item) => item.slug === slug);
  if (!event) return {};
  return createPageMetadata(
    locale,
    event.title[locale],
    event.summary[locale],
    `/events/${slug}`,
    null,
  );
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const event = events.find((item) => item.slug === slug);
  if (!event) notFound();
  const copy = getPageCopy(locale);

  return (
    <main>
      <PageHero
        eyebrow={copy.events.upcoming}
        title={event.title[locale]}
        description={event.summary[locale]}
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <DraftNotice badge={copy.common.draftBadge} note={copy.common.draftNote} />
            <h2 className="mt-10 text-3xl font-black tracking-[-0.04em] text-heading">
              {copy.events.topics}
            </h2>
            <ol className="mt-6 grid gap-4">
              {event.topics[locale].map((topic, index) => (
                <li
                  key={topic}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5"
                >
                  <span className="grid size-10 place-items-center rounded-full bg-sun text-sm font-black text-heading">
                    {index + 1}
                  </span>
                  <span className="font-bold text-heading">{topic}</span>
                </li>
              ))}
            </ol>
          </div>
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
                <dd className="mt-1.5 font-extrabold text-heading">
                  {event.locationLabel[locale]}
                </dd>
              </div>
            </dl>
            <p className="mt-7 rounded-2xl bg-background p-4 text-xs leading-5 text-muted">
              {copy.events.registrationNote}
            </p>
            <div className="mt-5">
              <ButtonLink href={`/${locale}/contact`}>{copy.common.contactCta}</ButtonLink>
            </div>
          </aside>
        </div>
      </Section>
    </main>
  );
}
