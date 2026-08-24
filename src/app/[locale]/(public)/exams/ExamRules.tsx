import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/exams.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type ExamRulesProps = {
  locale: Locale;
  copy: PageCopy;
};

export function ExamRules({ locale, copy }: ExamRulesProps) {
  return (
    <Section tone="background">
      <div className={styles.exams__rulesLayout}>
        <div>
          <SectionHeading title={copy.exams.rulesTitle} />
          <ul className={styles.exams__rulesList}>
            {copy.exams.rules.map((rule) => (
              <li key={rule} className={styles.exams__rule}>
                <CheckCircleOutlineRounded aria-hidden="true" className={styles.exams__ruleIcon} />
                {rule}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.exams__schedule}>
          <h2 className={styles.exams__scheduleTitle}>{copy.exams.scheduleTitle}</h2>
          <p className={styles.exams__scheduleDescription}>{copy.exams.scheduleBody}</p>
          <div className={styles.exams__scheduleAction}>
            <ButtonLink href={`/${locale}/contact`} variant="secondary">
              {copy.common.contactCta}
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
