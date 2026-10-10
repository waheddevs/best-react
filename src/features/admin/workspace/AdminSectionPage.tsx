"use client";

import FilterListRounded from "@mui/icons-material/FilterListRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";

import type { Locale } from "@/config/Locales";
import { AdminProvisionUserForm } from "@/features/admin/users/AdminProvisionUserForm";
import { useAdminWorkspaceRecords } from "@/hooks/admin/useAdminWorkspaceRecords";
import type {
  AdminProvisionUserCopy,
  ProvisionableUserRole,
} from "@/types/admin/AdminProvisionUser";
import type {
  AdminNavigationKey,
  AdminSectionCopy,
  AdminWorkspaceCopy,
} from "@/types/admin/AdminWorkspace";

import { AdminDataTable } from "./AdminDataTable";
import { AdminSpecializedContent } from "./AdminSpecializedContent";

type AdminSectionPageProps = {
  common: AdminWorkspaceCopy["common"];
  locale: Locale;
  provisionCopy?: AdminProvisionUserCopy;
  provisionRole?: ProvisionableUserRole;
  section: AdminSectionCopy;
  sectionKey: AdminNavigationKey;
};

export function AdminSectionPage({
  common,
  locale,
  provisionCopy,
  provisionRole,
  section,
  sectionKey,
}: AdminSectionPageProps) {
  /* HOOKS */
  const {
    attentionOnly,
    handleFilterToggle,
    handlePageChange,
    handleQueryChange,
    handleSort,
    page,
    pageCount,
    query,
    sortDirection,
    sortKey,
    totalRecords,
    visibleRecords,
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
      {["schedule", "tests", "results", "reports", "audit"].includes(sectionKey) ? (
        <AdminSpecializedContent
          common={common}
          locale={locale}
          onPageChange={handlePageChange}
          page={page}
          pageCount={pageCount}
          records={visibleRecords}
          sectionKey={sectionKey}
          totalRecords={totalRecords}
        />
      ) : (
        <AdminDataTable
          columns={section.records.find((record) => record.fields?.length)?.fields ?? []}
          common={common}
          locale={locale}
          onPageChange={handlePageChange}
          onSort={handleSort}
          page={page}
          pageCount={pageCount}
          records={visibleRecords}
          sectionTitle={section.title}
          sortDirection={sortDirection}
          sortKey={sortKey}
          totalRecords={totalRecords}
        />
      )}
    </article>
  );
}
