import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/home.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type FinalCtaProps = {
  locale: Locale;
  copy: PageCopy;
};

export function FinalCta({ locale, copy }: FinalCtaProps) {
  return (
    <Section className={styles.home__finalCtaSection}>
      <div className={styles.home__finalCta}>
        <div className={styles.home__finalCtaDecoration} />
        <h2 className={styles.home__finalCtaTitle}>{copy.home.finalTitle}</h2>
        <p className={styles.home__finalCtaDescription}>{copy.home.finalDescription}</p>
        <div className={styles.home__finalCtaActions}>
          <ScrollToTopLink href={`/${locale}/courses`} className={styles.home__finalCtaPrimary}>
            {copy.common.coursesCta}
          </ScrollToTopLink>
          <ScrollToTopLink href={`/${locale}/contact`} className={styles.home__finalCtaSecondary}>
            {copy.common.contactCta}
          </ScrollToTopLink>
        </div>
      </div>
    </Section>
  );
}
