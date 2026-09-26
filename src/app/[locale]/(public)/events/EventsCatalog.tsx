"use client";

import { useQuery } from "@apollo/client/react";

import { EventCard } from "@/components/cards/EventCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { PublicEventsDocument } from "@/gql/graphql";
import { getApiLanguage } from "@/lib/ApiLanguage";
import { mapPublicEvent } from "@/lib/PublicContentMapper";
import type { PublicEvent } from "@/types/PublicContent";

type EventsCatalogProps = {
  locale: Locale;
  copy: PageCopy;
  events: PublicEvent[];
};

export function EventsCatalog({ locale, copy, events }: EventsCatalogProps) {
  /* APOLLO REQUESTS */
  const { data: eventsData } = useQuery(PublicEventsDocument, {
    variables: { first: 50, language: getApiLanguage(locale) },
    fetchPolicy: "cache-and-network",
    ssr: false,
  });
  const visibleEvents = eventsData
    ? eventsData.publicEvents.edges.map(({ node }) => mapPublicEvent(node))
    : events;
  const upcoming = visibleEvents.filter((event) => event.status === "upcoming");
  const past = visibleEvents.filter((event) => event.status === "past");

  return (
    <>
      <Section tone="surface">
        <Reveal>
          <SectionHeading align="center" title={copy.events.upcoming} />
        </Reveal>
        <StaggerGroup className="events__catalogGrid" delay={0.08}>
          {upcoming.map((event) => (
            <StaggerItem key={event.slug} initialScale={0.99}>
              <EventCard event={event} locale={locale} copy={copy} variant="catalog" />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>
      <Section tone="background">
        <Reveal>
          <SectionHeading align="center" title={copy.events.past} />
        </Reveal>
        {past.length > 0 ? (
          <StaggerGroup className="events__catalogGrid" delay={0.08}>
            {past.map((event) => (
              <StaggerItem key={event.slug} initialScale={0.99}>
                <EventCard event={event} locale={locale} copy={copy} variant="catalog" />
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : (
          <div className="events__catalogEmpty">{copy.events.noPast}</div>
        )}
      </Section>
    </>
  );
}
