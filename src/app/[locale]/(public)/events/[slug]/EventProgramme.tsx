import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "@/css/public/events.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { EventProgrammeItem } from "@/types/EventDetail";

type EventProgrammeProps = {
  copy: PageCopy;
  items: EventProgrammeItem[];
};

export function EventProgramme({ copy, items }: EventProgrammeProps) {
  return (
    <Section tone="background">
      <Reveal>
        <SectionHeading
          description={copy.events.programmeDescription}
          title={copy.events.programme}
        />
      </Reveal>
      <StaggerGroup className={styles.events__programme} delay={0.08}>
        {items.map((item, index) => (
          <StaggerItem key={`${item.time}-${item.title}`} initialScale={0.985}>
            <article className={styles.events__programmeItem}>
              <div className={styles.events__programmeTopline}>
                <span className={styles.events__programmeNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <time className={styles.events__programmeTime}>{item.time}</time>
              </div>
              <h3 className={styles.events__programmeTitle}>{item.title}</h3>
              <p className={styles.events__programmeDescription}>{item.description}</p>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
