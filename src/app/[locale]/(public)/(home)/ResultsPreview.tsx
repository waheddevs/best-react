import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/home.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type ResultsPreviewProps = {
  locale: Locale;
  copy: PageCopy;
};

export function ResultsPreview({ locale, copy }: ResultsPreviewProps) {
  const journeyPreview = copy.results.journeySteps.slice(0, 2);

  return (
    <Section className={styles.home__results}>
      <div className={styles.home__resultsLayout}>
        <div>
          <SectionHeading
            eyebrow={copy.home.resultsEyebrow}
            title={copy.home.resultsTitle}
            description={copy.home.resultsDescription}
          />
          <div className={styles.home__resultsAction}>
            <ButtonLink href={`/${locale}/results`} variant="secondary">
              {copy.common.learnMore}
            </ButtonLink>
          </div>
        </div>
        <div className={styles.home__resultsPanel}>
          <div className={styles.home__resultsGrid}>
            {journeyPreview.map((item, index) => (
              <div
                key={item.title}
                className={`${styles.home__resultsCard} ${index === 0 ? styles.home__resultsCardPrimary : ""}`}
              >
                <CheckCircleRounded
                  aria-hidden="true"
                  className={`${styles.home__resultsIcon} ${index === 0 ? styles.home__resultsIconPrimary : ""}`}
                />
                <h3
                  className={`${styles.home__resultsTitle} ${index === 0 ? styles.home__resultsTitlePrimary : ""}`}
                >
                  {item.title}
                </h3>
                <p
                  className={`${styles.home__resultsDescription} ${index === 0 ? styles.home__resultsDescriptionPrimary : ""}`}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
