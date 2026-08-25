import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "@/css/public/events.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type EventOverviewProps = {
  copy: PageCopy;
  paragraphs: string[];
};

export function EventOverview({ copy, paragraphs }: EventOverviewProps) {
  return (
    <section className={styles.events__overview}>
      <Reveal>
        <SectionHeading title={copy.events.overview} />
      </Reveal>
      <Reveal className={styles.events__overviewBody} delay={0.06}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Reveal>
    </section>
  );
}
