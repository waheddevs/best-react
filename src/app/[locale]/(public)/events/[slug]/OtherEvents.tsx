import { EventCard } from "@/components/cards/EventCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/events.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicEvent } from "@/types/PublicContent";

type OtherEventsProps = {
  copy: PageCopy;
  events: PublicEvent[];
  locale: Locale;
};

export function OtherEvents({ copy, events, locale }: OtherEventsProps) {
  return (
    <Section tone="surface">
      <Reveal>
        <SectionHeading
          align="center"
          description={copy.events.otherEventsDescription}
          title={copy.events.otherEventsTitle}
        />
      </Reveal>
      <StaggerGroup className={styles.events__otherEventsGrid} delay={0.08}>
        {events.map((event) => (
          <StaggerItem
            className={styles.events__otherEventsItem}
            key={event.slug}
            initialScale={0.985}
          >
            <EventCard copy={copy} event={event} locale={locale} variant="catalog" />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
