import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/config/Locales";
import styles from "@/css/student/library.module.css";
import type { StudentLibraryCopy } from "@/dictionaries/student/Library";
import type { LibraryResource } from "@/types/student/Library";

type ResourceContentProps = {
  resource: LibraryResource;
  locale: Locale;
  copy: StudentLibraryCopy;
};

export function ResourceContent({ resource, locale, copy }: ResourceContentProps) {
  return (
    <Section containerClassName={styles.library__contentContainer}>
      <ScrollToTopLink href={`/${locale}/student/library`} className={styles.library__backLink}>
        <ArrowBackRounded aria-hidden="true" />
        {copy.back}
      </ScrollToTopLink>
      <article className={styles.library__article}>
        {resource.sections[locale].map((section, index) => (
          <section key={section.heading} className={styles.library__articleSection}>
            <span className={styles.library__articleNumber}>{index + 1}</span>
            <div>
              <h2 className={styles.library__articleHeading}>{section.heading}</h2>
              <p className={styles.library__articleBody}>{section.body}</p>
            </div>
          </section>
        ))}
      </article>
    </Section>
  );
}
