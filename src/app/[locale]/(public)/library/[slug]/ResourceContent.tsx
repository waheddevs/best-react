import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/library.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { LibraryResource } from "@/types/PublicContent";

type ResourceContentProps = {
  resource: LibraryResource;
  locale: Locale;
  copy: PageCopy;
};

export function ResourceContent({ resource, locale, copy }: ResourceContentProps) {
  return (
    <Section containerClassName={styles.library__contentContainer}>
      <Link
        href={`/${locale}/library`}
        className={styles.library__backLink}
      >
        <ArrowBackRounded aria-hidden="true" />
        {copy.common.back}
      </Link>
      <article className={styles.library__article}>
        {resource.sections[locale].map((section, index) => (
          <section
            key={section.heading}
            className={styles.library__articleSection}
          >
            <span className={styles.library__articleNumber}>
              {index + 1}
            </span>
            <div>
              <h2 className={styles.library__articleHeading}>
                {section.heading}
              </h2>
              <p className={styles.library__articleBody}>{section.body}</p>
            </div>
          </section>
        ))}
      </article>
    </Section>
  );
}
