import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import ArticleRounded from "@mui/icons-material/ArticleRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import styles from "@/css/public/library.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { LibraryResource } from "@/types/PublicContent";

type ResourceCardProps = {
  resource: LibraryResource;
  locale: Locale;
  copy: PageCopy;
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
      <p className={styles.library__cardType}>
        {resource.typeLabel[locale]}
      </p>
      <h2 className={styles.library__cardTitle}>
        {resource.title[locale]}
      </h2>
      <p className={styles.library__cardSummary}>{resource.summary[locale]}</p>
      <Link
        href={`/${locale}/library/${resource.slug}`}
        className={styles.library__cardLink}
      >
        {copy.library.readResource}
        <ArrowOutwardRounded aria-hidden="true" />
      </Link>
    </article>
  );
}
