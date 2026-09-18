import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type EventOverviewProps = {
  copy: PageCopy;
  paragraphs: string[];
};

export function EventOverview({ copy, paragraphs }: EventOverviewProps) {
  return (
    <section className="events__overview">
      <Reveal>
        <SectionHeading title={copy.events.overview} />
      </Reveal>
      <Reveal className="events__overviewBody" delay={0.06}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Reveal>
    </section>
  );
}
