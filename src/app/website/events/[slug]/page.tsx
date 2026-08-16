import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import LocationOnRounded from "@mui/icons-material/LocationOnRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { DraftNotice } from "@/components/ui/draft-notice";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { defaultLocale } from "@/config/locales";
import { events } from "@/data/public-content";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

type EventDetailPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return events.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = defaultLocale;
  const event = events.find((item) => item.slug === slug);
  if (!event) return {};
  return createPageMetadata(event.title[locale], event.summary[locale], `/events/${slug}`, null);
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const locale = defaultLocale;
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
        <div className="events-page__6">
          <div>
            <DraftNotice badge={copy.common.draftBadge} note={copy.common.draftNote} />
            <h2 className="events-page__7">{copy.events.topics}</h2>
            <ol className="events-page__8">
              {event.topics[locale].map((topic, index) => (
                <li key={topic} className="events-page__9">
                  <span className="events-page__10">{index + 1}</span>
                  <span className="events-page__11">{topic}</span>
                </li>
              ))}
            </ol>
          </div>
          <aside className="events-page__12">
            <dl className="events-page__13">
              <div>
                <dt className="events-page__14">
                  <CalendarMonthRounded aria-hidden="true" sx={{ fontSize: 19 }} />
                  {copy.events.date}
                </dt>
                <dd className="events-page__15">{event.dateLabel[locale]}</dd>
              </div>
              <div>
                <dt className="events-page__16">
                  <ScheduleRounded aria-hidden="true" sx={{ fontSize: 19 }} />
                  {copy.events.time}
                </dt>
                <dd className="events-page__17">{event.timeLabel[locale]}</dd>
              </div>
              <div>
                <dt className="events-page__18">
                  <LocationOnRounded aria-hidden="true" sx={{ fontSize: 19 }} />
                  {copy.events.location}
                </dt>
                <dd className="events-page__19">{event.locationLabel[locale]}</dd>
              </div>
            </dl>
            <p className="events-page__20">{copy.events.registrationNote}</p>
            <div className="events-page__21">
              <ButtonLink href={`/website/contact`}>{copy.common.contactCta}</ButtonLink>
            </div>
          </aside>
        </div>
      </Section>
    </main>
  );
}
