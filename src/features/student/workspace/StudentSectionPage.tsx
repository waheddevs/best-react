"use client";

import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import { useWorkspaceRecordSearch } from "@/hooks/useWorkspaceRecordSearch";
import type { StudentHeroKind } from "@/dictionaries/student/StudentHero";
import type { StudentSectionCopy, StudentWorkspaceCopy } from "@/types/student/StudentWorkspace";

import { StudentSectionHero } from "./StudentSectionHero";

type StudentSectionPageProps = {
  common: StudentWorkspaceCopy["common"];
  heroKind: StudentHeroKind;
  heroLabel?: string;
  heroValue?: number | string;
  locale: Locale;
  section: StudentSectionCopy;
};

export function StudentSectionPage({
  common,
  heroKind,
  heroLabel,
  heroValue,
  locale,
  section,
}: StudentSectionPageProps) {
  /* HOOKS */
  const {
    handleQueryChange,
    matchingRecords: records,
    query,
  } = useWorkspaceRecordSearch(section.records, locale);

  return (
    <article className="studentWorkspace">
      <StudentSectionHero
        description={section.description}
        eyebrow={section.eyebrow}
        kind={heroKind}
        label={heroLabel}
        locale={locale}
        preview={heroKind !== "dashboard"}
        title={section.title}
        value={heroKind === "payments" ? undefined : (heroValue ?? section.records.length)}
      />

      <section aria-label={section.title} className="studentWorkspace__summary">
        <div>
          <span>{common.all}</span>
          <strong>{section.records.length}</strong>
        </div>
        <div>
          <span>{common.previewNotice}</span>
          <strong>2026</strong>
        </div>
        <div className="studentWorkspace__journey">
          <span>{common.previewNotice}</span>
          <strong>78%</strong>
          <i>
            <b style={{ width: "78%" }} />
          </i>
        </div>
      </section>

      <div className="studentWorkspace__toolbar">
        <label>
          <span className="studentWorkspace__srOnly">{common.searchLabel}</span>
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

      <section className="studentWorkspace__grid">
        {records.map((record, index) => {
          const content = (
            <>
              <div className="studentWorkspace__cardTop">
                <span
                  className={`studentWorkspace__status studentWorkspace__status_${record.status}`}
                >
                  {record.detail}
                </span>
                <strong>0{index + 1}</strong>
              </div>
              <h2>{record.title}</h2>
              <p>{record.meta}</p>
              {typeof record.progress === "number" ? (
                <div aria-label={`${record.progress}%`} className="studentWorkspace__progress">
                  <span style={{ width: `${record.progress}%` }} />
                </div>
              ) : null}
              <span className="studentWorkspace__open">
                {common.continueLabel}
                <ArrowForwardRounded aria-hidden="true" fontSize="small" />
              </span>
            </>
          );
          return record.href ? (
            <Link
              className="studentWorkspace__card"
              href={`/${locale}${record.href}`}
              key={record.id}
            >
              {content}
            </Link>
          ) : (
            <div className="studentWorkspace__card" key={record.id}>
              {content}
            </div>
          );
        })}
        {records.length === 0 ? (
          <p className="studentWorkspace__empty">{common.emptyLabel}</p>
        ) : null}
      </section>
    </article>
  );
}
