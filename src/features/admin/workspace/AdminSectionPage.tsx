"use client";

import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import FilterListRounded from "@mui/icons-material/FilterListRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import styles from "@/css/admin/workspace.module.css";
import { AdminProvisionUserForm } from "@/features/admin/users/AdminProvisionUserForm";
import { useAdminWorkspaceRecords } from "@/hooks/admin/useAdminWorkspaceRecords";
import type {
  AdminProvisionUserCopy,
  ProvisionableUserRole,
} from "@/types/admin/AdminProvisionUser";
import type { AdminSectionCopy, AdminWorkspaceCopy } from "@/types/admin/AdminWorkspace";

type AdminSectionPageProps = {
  common: AdminWorkspaceCopy["common"];
  locale: Locale;
  provisionCopy?: AdminProvisionUserCopy;
  provisionRole?: ProvisionableUserRole;
  section: AdminSectionCopy;
};

export function AdminSectionPage({
  common,
  locale,
  provisionCopy,
  provisionRole,
  section,
}: AdminSectionPageProps) {
  /* HOOKS */
  const {
    attentionOnly,
    handleFilterToggle,
    handleQueryChange,
    query,
    visibleRecords: rows,
  } = useAdminWorkspaceRecords(section.records, locale);

  return (
    <article className={styles.adminWorkspace}>
      <header className={styles.adminWorkspace__header}>
        <div>
          <span>{section.eyebrow}</span>
          <h1>{section.title}</h1>
          <p>{section.description}</p>
        </div>
        <div className={styles.adminWorkspace__health}>
          <i />
          <span>{common.connectedNotice}</span>
        </div>
      </header>
      <section className={styles.adminWorkspace__metrics} aria-label={section.title}>
        <div>
          <span>{common.all}</span>
          <strong>{section.records.length}</strong>
        </div>
        <div>
          <span>{common.openQueueLabel}</span>
          <strong>
            {
              section.records.filter(
                (record) => record.status === "warning" || record.status === "danger",
              ).length
            }
          </strong>
        </div>
        {section.metrics.map((metric) => (
          <div key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </div>
        ))}
      </section>
      {provisionCopy && provisionRole ? (
        <AdminProvisionUserForm copy={provisionCopy} role={provisionRole} />
      ) : null}
      <div className={styles.adminWorkspace__toolbar}>
        <label>
          <SearchRounded aria-hidden="true" />
          <span className={styles.adminWorkspace__srOnly}>{common.searchLabel}</span>
          <input
            onChange={handleQueryChange}
            placeholder={common.searchPlaceholder}
            type="search"
            value={query}
          />
        </label>
        <button aria-pressed={attentionOnly} onClick={handleFilterToggle} type="button">
          <FilterListRounded aria-hidden="true" />
          {attentionOnly ? common.all : common.openQueueLabel}
        </button>
      </div>
      <section className={styles.adminWorkspace__table} role="table" aria-label={section.title}>
        <div className={styles.adminWorkspace__tableHead} role="row">
          <span role="columnheader">{common.idRecordLabel}</span>
          <span role="columnheader">{common.contextLabel}</span>
          <span role="columnheader">{common.statusLabel}</span>
          <span role="columnheader" />
        </div>
        {rows.map((record) => (
          <div className={styles.adminWorkspace__row} key={record.id} role="row">
            <div role="cell">
              <small>{record.id}</small>
              <strong>{record.title}</strong>
            </div>
            <p role="cell">{record.meta}</p>
            <span
              className={`${styles.adminWorkspace__status} ${styles[`adminWorkspace__status_${record.status}`]}`}
              role="cell"
            >
              {record.detail}
            </span>
            <div role="cell">
              {record.href ? (
                <Link
                  aria-label={`${common.detailLabel}: ${record.title}`}
                  href={`/${locale}${record.href}`}
                >
                  <ArrowOutwardRounded />
                </Link>
              ) : (
                <span>—</span>
              )}
            </div>
          </div>
        ))}
        {rows.length === 0 ? (
          <p className={styles.adminWorkspace__empty}>{common.emptyLabel}</p>
        ) : null}
      </section>
    </article>
  );
}
