import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "@/css/public/exams.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type ExamPreparationProps = {
  copy: PageCopy;
};

export function ExamPreparation({ copy }: ExamPreparationProps) {
  return (
    <Section>
      <SectionHeading title={copy.exams.preparationTitle} />
      <ol className={styles.exams__preparationList}>
        {copy.exams.preparation.map((item, index) => (
          <li key={item.title} className={styles.exams__preparationItem}>
            <span className={styles.exams__preparationNumber}>
              {index + 1}
            </span>
            <h2 className={styles.exams__preparationTitle}>{item.title}</h2>
            <p className={styles.exams__preparationDescription}>{item.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
