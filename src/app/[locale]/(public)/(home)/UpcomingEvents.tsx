"use client";

import { useQuery } from "@apollo/client/react";

import { EventCard } from "@/components/cards/EventCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { PublicEventsDocument } from "@/gql/graphql";
import { getApiLanguage } from "@/lib/ApiLanguage";
import { mapPublicEvent } from "@/lib/PublicContentMapper";
import type { PublicEvent } from "@/types/PublicContent";

type UpcomingEventsProps = {
  locale: Locale;
  copy: PageCopy;
  events: PublicEvent[];
};

export function UpcomingEvents({ locale, copy, events }: UpcomingEventsProps) {
  /* APOLLO REQUESTS */
  const { data: eventsData } = useQuery(PublicEventsDocument, {
    variables: { first: 50, language: getApiLanguage(locale) },
    fetchPolicy: "cache-and-network",
    ssr: false,
  });
  const visibleEvents = eventsData
    ? eventsData.publicEvents.edges.map(({ node }) => mapPublicEvent(node))
    : events;
  const upcomingEvents = visibleEvents.filter((event) => event.status === "upcoming");

  return (
    <Section tone="surface">
      <Reveal className="home__eventsHeader">
        <SectionHeading
          align="center"
          eyebrow={copy.home.eventsEyebrow}
          title={copy.home.eventsTitle}
        />
        <ButtonLink href={`/${locale}/events`} variant="secondary">
          {copy.common.learnMore}
        </ButtonLink>
      </Reveal>
      <StaggerGroup className="home__eventsGrid" delay={0.08}>
        {upcomingEvents.map((event) => (
          <StaggerItem className="home__eventsItem" initialScale={0.99} key={event.slug}>
            <EventCard event={event} locale={locale} copy={copy} variant="catalog" />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
