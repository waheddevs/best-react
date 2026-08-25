import CheckRounded from "@mui/icons-material/CheckRounded";

import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "@/css/public/results.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type OutcomeCategoriesProps = {
  copy: PageCopy;
};

export function OutcomeCategories({ copy }: OutcomeCategoriesProps) {
  return (
    <Section tone="surface">
      <Reveal>
        <SectionHeading
          align="center"
          description={copy.results.categoriesDescription}
          eyebrow={copy.results.categoriesEyebrow}
          title={copy.results.categoriesTitle}
        />
      </Reveal>
      <Reveal delay={0.08}>
        <div className={styles.results__categoriesGrid}>
          {copy.results.categories.map((item, index) => (
            <article key={item.title} className={styles.results__category}>
              <span className={styles.results__categoryIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.results__categoryTitle}>{item.title}</h3>
              <p className={styles.results__categoryDescription}>{item.description}</p>
              <ul className={styles.results__categoryHighlights}>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>
                    <CheckRounded aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
