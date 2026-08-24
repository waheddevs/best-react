import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/results.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type ResultsCtaProps = {
  locale: Locale;
  copy: PageCopy;
};

export function ResultsCta({ locale, copy }: ResultsCtaProps) {
  return (
    <Section className={styles.results__ctaSection} tone="background">
      <div className={styles.results__cta}>
        <h2 className={styles.results__ctaTitle}>{copy.results.ctaTitle}</h2>
        <div className={styles.results__ctaAction}>
          <ButtonLink href={`/${locale}/courses`} variant="secondary">
            {copy.common.coursesCta}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
