import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import ArticleRounded from "@mui/icons-material/ArticleRounded";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import type { Locale } from "@/config/Locales";
import styles from "@/css/student/library.module.css";
import type { StudentLibraryCopy } from "@/dictionaries/student/Library";
import type { LibraryResource } from "@/types/student/Library";

type ResourceCardProps = {
  resource: LibraryResource;
  locale: Locale;
  copy: StudentLibraryCopy;
};

export function ResourceCard({ resource, locale, copy }: ResourceCardProps) {
  return (
    <article className={styles.library__card}>
      <div className={styles.library__cardHeader}>
        <span className={styles.library__cardIcon}>
          <ArticleRounded aria-hidden="true" />
        </span>
        <span className={styles.library__cardReadingTime}>{resource.readingTime[locale]}</span>
      </div>
      <p className={styles.library__cardType}>{resource.typeLabel[locale]}</p>
      <h2 className={styles.library__cardTitle}>{resource.title[locale]}</h2>
      <p className={styles.library__cardSummary}>{resource.summary[locale]}</p>
      <ScrollToTopLink
        href={`/${locale}/student/library/${resource.slug}`}
        className={styles.library__cardLink}
      >
        {copy.readResource}
        <ArrowOutwardRounded aria-hidden="true" />
      </ScrollToTopLink>
    </article>
  );
}
