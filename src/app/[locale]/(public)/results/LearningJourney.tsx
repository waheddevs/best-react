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
      <SectionHeading title={copy.results.journeyTitle} />
      <ol className={styles.results__journeyList}>
        {copy.results.journeySteps.map((step, index) => (
          <li key={step.title} className={styles.results__journeyItem}>
            <span className={styles.results__journeyNumber}>{index + 1}</span>
            <h2 className={styles.results__journeyTitle}>{step.title}</h2>
            <p className={styles.results__journeyDescription}>{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
