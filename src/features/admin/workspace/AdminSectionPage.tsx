"use client";

import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import FilterListRounded from "@mui/icons-material/FilterListRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import { AdminProvisionUserForm } from "@/features/admin/users/AdminProvisionUserForm";
import { AdminAssignTeacherTaskForm } from "@/features/admin/notifications/AdminAssignTeacherTaskForm";
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
  taskRecipients?: Array<{ id: string; name: string }>;
};

export function AdminSectionPage({
  common,
  locale,
  provisionCopy,
  provisionRole,
  section,
  taskRecipients,
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
    <article className="adminWorkspace">
      <header className="adminWorkspace__header">
        <div>
          <span>{section.eyebrow}</span>
          <h1>{section.title}</h1>
          <p>{section.description}</p>
        </div>
        <div className="adminWorkspace__health">
          <i />
          <span>{common.connectedNotice}</span>
        </div>
      </header>
      <section className="adminWorkspace__metrics" aria-label={section.title}>
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
      {taskRecipients ? (
        <AdminAssignTeacherTaskForm locale={locale} teachers={taskRecipients} />
      ) : null}
      <div className="adminWorkspace__toolbar">
        <label>
          <SearchRounded aria-hidden="true" />
          <span className="adminWorkspace__srOnly">{common.searchLabel}</span>
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
      <section className="adminWorkspace__table" role="table" aria-label={section.title}>
        <div className="adminWorkspace__tableHead" role="row">
          <span role="columnheader">{common.idRecordLabel}</span>
          <span role="columnheader">{common.contextLabel}</span>
          <span role="columnheader">{common.statusLabel}</span>
          <span role="columnheader" />
        </div>
        {rows.map((record) => (
          <div className="adminWorkspace__row" key={record.id} role="row">
            <div role="cell">
              <small>{record.id}</small>
              <strong>{record.title}</strong>
            </div>
            <p role="cell">{record.meta}</p>
            <span
              className={`adminWorkspace__status adminWorkspace__status_${record.status}`}
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
        {rows.length === 0 ? <p className="adminWorkspace__empty">{common.emptyLabel}</p> : null}
      </section>
    </article>
  );
}
