import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "@/css/public/results.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type OutcomeCategoriesProps = {
  copy: PageCopy;
};

export function OutcomeCategories({ copy }: OutcomeCategoriesProps) {
  return (
    <Section>
      <SectionHeading title={copy.results.categoriesTitle} />
      <div className={styles.results__categoriesGrid}>
        {copy.results.categories.map((item) => (
          <article
            key={item.title}
            className={styles.results__category}
          >
            <CheckCircleRounded aria-hidden="true" className={styles.results__categoryIcon} />
            <h2 className={styles.results__categoryTitle}>{item.title}</h2>
            <p className={styles.results__categoryDescription}>{item.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
