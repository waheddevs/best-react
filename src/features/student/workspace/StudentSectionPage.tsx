"use client";

import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import styles from "@/css/student/workspace.module.css";
import { useWorkspaceRecordSearch } from "@/hooks/useWorkspaceRecordSearch";
import type { StudentSectionCopy, StudentWorkspaceCopy } from "@/types/student/StudentWorkspace";

type StudentSectionPageProps = {
  common: StudentWorkspaceCopy["common"];
  locale: Locale;
  section: StudentSectionCopy;
};

export function StudentSectionPage({ common, locale, section }: StudentSectionPageProps) {
  /* HOOKS */
  const {
    handleQueryChange,
    matchingRecords: records,
    query,
  } = useWorkspaceRecordSearch(section.records, locale);

  return (
    <article className={styles.studentWorkspace}>
      <header className={styles.studentWorkspace__hero}>
        <div>
          <span className={styles.studentWorkspace__eyebrow}>{section.eyebrow}</span>
          <h1>{section.title}</h1>
          <p>{section.description}</p>
        </div>
        <div className={styles.studentWorkspace__streak}>
          <strong>12</strong>
          <span>{common.previewNotice}</span>
        </div>
      </header>

      <section aria-label={section.title} className={styles.studentWorkspace__summary}>
        <div>
          <span>{common.all}</span>
          <strong>{section.records.length}</strong>
        </div>
        <div>
          <span>{common.previewNotice}</span>
          <strong>2026</strong>
        </div>
        <div className={styles.studentWorkspace__journey}>
          <span>{common.previewNotice}</span>
          <strong>78%</strong>
          <i>
            <b style={{ width: "78%" }} />
          </i>
        </div>
      </section>

      <div className={styles.studentWorkspace__toolbar}>
        <label>
          <span className={styles.studentWorkspace__srOnly}>{common.searchLabel}</span>
          <SearchRounded aria-hidden="true" />
          <input
            onChange={handleQueryChange}
            placeholder={common.searchPlaceholder}
            type="search"
            value={query}
          />
        </label>
        <span>{common.previewNotice}</span>
      </div>

      <section className={styles.studentWorkspace__grid}>
        {records.map((record, index) => {
          const content = (
            <>
              <div className={styles.studentWorkspace__cardTop}>
                <span
                  className={`${styles.studentWorkspace__status} ${styles[`studentWorkspace__status_${record.status}`]}`}
                >
                  {record.detail}
                </span>
                <strong>0{index + 1}</strong>
              </div>
              <h2>{record.title}</h2>
              <p>{record.meta}</p>
              {typeof record.progress === "number" ? (
                <div
                  aria-label={`${record.progress}%`}
                  className={styles.studentWorkspace__progress}
                >
                  <span style={{ width: `${record.progress}%` }} />
                </div>
              ) : null}
              <span className={styles.studentWorkspace__open}>
                {common.continueLabel}
                <ArrowForwardRounded aria-hidden="true" fontSize="small" />
              </span>
            </>
          );
          return record.href ? (
            <Link
              className={styles.studentWorkspace__card}
              href={`/${locale}${record.href}`}
              key={record.id}
            >
              {content}
            </Link>
          ) : (
            <div className={styles.studentWorkspace__card} key={record.id}>
              {content}
            </div>
          );
        })}
        {records.length === 0 ? (
          <p className={styles.studentWorkspace__empty}>{common.emptyLabel}</p>
        ) : null}
      </section>
    </article>
  );
}
