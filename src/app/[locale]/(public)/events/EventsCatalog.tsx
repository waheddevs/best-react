import { EventCard } from "@/components/cards/EventCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/events.module.css";
import { events } from "@/data/PublicContent";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type EventsCatalogProps = {
  locale: Locale;
  copy: PageCopy;
};

export function EventsCatalog({ locale, copy }: EventsCatalogProps) {
  const upcoming = events.filter((event) => event.status === "upcoming");
  const past = events.filter((event) => event.status === "past");

  return (
    <>
      <Section tone="surface">
        <Reveal>
          <SectionHeading align="center" title={copy.events.upcoming} />
        </Reveal>
        <StaggerGroup className={styles.events__catalogGrid} delay={0.08}>
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
          <StaggerGroup className={styles.events__catalogGrid} delay={0.08}>
            {past.map((event) => (
              <StaggerItem key={event.slug} initialScale={0.99}>
                <EventCard event={event} locale={locale} copy={copy} variant="catalog" />
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : (
          <div className={styles.events__catalogEmpty}>{copy.events.noPast}</div>
        )}
      </Section>
    </>
  );
}
