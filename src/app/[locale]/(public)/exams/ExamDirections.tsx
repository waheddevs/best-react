import InfoRounded from "@mui/icons-material/InfoRounded";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "@/css/public/exams.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type ExamDirectionsProps = {
  copy: PageCopy;
};

export function ExamDirections({ copy }: ExamDirectionsProps) {
  return (
    <Section tone="surface">
      <div className={styles.exams__notice}>
        <InfoRounded aria-hidden="true" className={styles.exams__noticeIcon} />
        <p className={styles.exams__noticeText}>{copy.exams.notice}</p>
      </div>
      <div className={styles.exams__directionsHeading}>
        <SectionHeading title={copy.exams.directionsTitle} />
      </div>
      <div className={styles.exams__directionsGrid}>
        {copy.exams.directions.map((item) => (
          <article key={item.title} className={styles.exams__directionCard}>
            <h2 className={styles.exams__directionTitle}>{item.title}</h2>
            <p className={styles.exams__directionDescription}>{item.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
