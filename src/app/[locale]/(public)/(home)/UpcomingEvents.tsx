import { EventCard } from "@/components/cards/EventCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/home.module.css";
import { events } from "@/data/PublicContent";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type UpcomingEventsProps = {
  locale: Locale;
  copy: PageCopy;
};

export function UpcomingEvents({ locale, copy }: UpcomingEventsProps) {
  const upcomingEvents = events.filter((event) => event.status === "upcoming");

  return (
    <Section tone="surface">
      <Reveal className={styles.home__eventsHeader}>
        <SectionHeading
          align="center"
          eyebrow={copy.home.eventsEyebrow}
          title={copy.home.eventsTitle}
        />
        <ButtonLink href={`/${locale}/events`} variant="secondary">
          {copy.common.learnMore}
        </ButtonLink>
      </Reveal>
      <StaggerGroup className={styles.home__eventsGrid} delay={0.08}>
        {upcomingEvents.map((event) => (
          <StaggerItem className={styles.home__eventsItem} initialScale={0.99} key={event.slug}>
            <EventCard event={event} locale={locale} copy={copy} variant="catalog" />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
