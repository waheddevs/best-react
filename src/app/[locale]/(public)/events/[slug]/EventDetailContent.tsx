"use client";

import { useQuery } from "@apollo/client/react";

import { Section } from "@/components/ui/Section";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { PublicEventDocument, PublicEventsDocument } from "@/gql/graphql";
import { getApiLanguage } from "@/lib/ApiLanguage";
import { mapPublicEvent, mapPublicEventDetail } from "@/lib/PublicContentMapper";
import type { EventDetailLocaleContent } from "@/types/EventDetail";
import type { PublicEvent } from "@/types/PublicContent";

import { EventAudience } from "./EventAudience";
import { EventDetails } from "./EventDetails";
import { EventHero } from "./EventHero";
import { EventOverview } from "./EventOverview";
import { EventPracticalInfo } from "./EventPracticalInfo";
import { EventProgramme } from "./EventProgramme";
import { OtherEvents } from "./OtherEvents";

type EventDetailContentProps = {
  copy: PageCopy;
  initialDetail: EventDetailLocaleContent;
  initialEvent: PublicEvent;
  initialRelatedEvents: PublicEvent[];
  locale: Locale;
};

export function EventDetailContent({
  copy,
  initialDetail,
  initialEvent,
  initialRelatedEvents,
  locale,
}: EventDetailContentProps) {
  /* APOLLO REQUESTS */
  const { data: eventDetailData } = useQuery(PublicEventDocument, {
    variables: { language: getApiLanguage(locale), slug: initialEvent.slug },
    fetchPolicy: "cache-and-network",
    ssr: false,
  });
  const { data: eventsData } = useQuery(PublicEventsDocument, {
    variables: { first: 50, language: getApiLanguage(locale) },
    fetchPolicy: "cache-and-network",
    ssr: false,
  });
  const { detail, event } = eventDetailData
    ? mapPublicEventDetail(eventDetailData.publicEvent)
    : { detail: initialDetail, event: initialEvent };
  const relatedEvents = eventsData
    ? eventsData.publicEvents.edges
        .map(({ node }) => mapPublicEvent(node))
        .filter((item) => item.slug !== event.slug)
        .slice(0, 3)
    : initialRelatedEvents;

  return (
    <main className="events">
      <EventHero event={event} locale={locale} copy={copy} />
      <Section tone="surface">
        <div className="events__detailLayout">
          <EventOverview copy={copy} paragraphs={detail.overview} />
          <EventDetails event={event} locale={locale} copy={copy} />
        </div>
      </Section>
      <EventProgramme copy={copy} items={detail.programme} />
      <EventAudience audience={detail.audience} copy={copy} takeaways={detail.takeaways} />
      <EventPracticalInfo copy={copy} faq={detail.faq} items={detail.practicalInfo} />
      <OtherEvents copy={copy} events={relatedEvents} locale={locale} />
    </main>
  );
}
