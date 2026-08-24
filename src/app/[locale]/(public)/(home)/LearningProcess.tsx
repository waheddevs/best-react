import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "@/css/public/home.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type LearningProcessProps = {
  copy: PageCopy;
};

export function LearningProcess({ copy }: LearningProcessProps) {
  return (
    <Section tone="surface">
      <SectionHeading eyebrow={copy.home.processEyebrow} title={copy.home.processTitle} />
      <ol className={styles.home__processList}>
        {copy.home.processItems.map((item, index) => (
          <li key={item.title} className={styles.home__processItem}>
            <span className={styles.home__processNumber}>{String(index + 1).padStart(2, "0")}</span>
            <h3 className={styles.home__processTitle}>{item.title}</h3>
            <p className={styles.home__processDescription}>{item.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
