import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "@/css/public/results.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type LearningJourneyProps = {
  copy: PageCopy;
};

export function LearningJourney({ copy }: LearningJourneyProps) {
  return (
    <Section tone="background">
      <Reveal>
        <SectionHeading
          align="center"
          description={copy.results.journeyDescription}
          eyebrow={copy.results.journeyEyebrow}
          title={copy.results.journeyTitle}
        />
      </Reveal>
      <Reveal delay={0.08}>
        <ol className={styles.results__journeyList}>
          {copy.results.journeySteps.map((step, index) => (
            <li key={step.title} className={styles.results__journeyItem}>
              <div className={styles.results__journeyTopline}>
                <span className={styles.results__journeyNumber}>{index + 1}</span>
                <span className={styles.results__journeyMeta}>{step.meta}</span>
              </div>
              <h3 className={styles.results__journeyTitle}>{step.title}</h3>
              <p className={styles.results__journeyDescription}>{step.description}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
