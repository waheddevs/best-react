"use client";

import FilterListRounded from "@mui/icons-material/FilterListRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";

import { getAdminRecordLabel } from "@/dictionaries/admin/AdminRecordCount";
import type { Locale } from "@/config/Locales";
import { useAdminWorkspaceRecords } from "@/hooks/admin/useAdminWorkspaceRecords";
import type { AdminGroupsCopy } from "@/types/admin/AdminGroups";
import type { AdminSectionCopy, AdminWorkspaceCopy } from "@/types/admin/AdminWorkspace";

import { AdminGroupsTable } from "./AdminGroupsTable";

type AdminGroupsProps = {
  common: AdminWorkspaceCopy["common"];
  copy: AdminGroupsCopy;
  locale: Locale;
  section: AdminSectionCopy;
};

export function AdminGroups({ common, copy, locale, section }: AdminGroupsProps) {
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
  const paginationCommon = {
    ...common,
    recordsLabel: getAdminRecordLabel(locale, "groups", totalRecords),
  };

  const groupRecords = section.records.filter((record) => record.group);
  const totalLearners = groupRecords.reduce(
    (total, record) => total + (record.group?.activeStudentCount ?? 0),
    0,
  );
  const availableSeats = groupRecords.reduce(
    (total, record) =>
      total + Math.max(0, (record.group?.capacity ?? 0) - (record.group?.activeStudentCount ?? 0)),
    0,
  );
  const attentionCount = groupRecords.filter(
    (record) => record.status === "warning" || record.status === "danger",
  ).length;

  return (
    <article className="adminWorkspace adminGroups">
      <header className="adminWorkspace__header">
        <div>
          <h1>{section.title}</h1>
          <p>{section.description}</p>
        </div>
      </header>
      <section aria-label={copy.groupsSummaryLabel} className="adminWorkspace__metrics">
        <div>
          <span>{common.all}</span>
          <strong>{groupRecords.length}</strong>
        </div>
        <div>
          <span>{copy.totalLearnersLabel}</span>
          <strong>{totalLearners}</strong>
        </div>
        <div>
          <span>{copy.availableSeatsLabel}</span>
          <strong>{availableSeats}</strong>
        </div>
        <div>
          <span>{common.openQueueLabel}</span>
          <strong>{attentionCount}</strong>
        </div>
      </section>
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
      <AdminGroupsTable
        common={paginationCommon}
        copy={copy}
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
    </article>
  );
}
