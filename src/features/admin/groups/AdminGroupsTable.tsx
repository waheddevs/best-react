"use client";

import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import UnfoldMoreRounded from "@mui/icons-material/UnfoldMoreRounded";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { Locale } from "@/config/Locales";
import { getAdminGroupCategoryLabel } from "@/dictionaries/admin/AdminGroups";
import { formatAdminGroupSchedule } from "@/lib/admin/AdminGroupPresentation";
import type { AdminGroupsCopy } from "@/types/admin/AdminGroups";
import type { AdminWorkspaceCopy, AdminWorkspaceRecord } from "@/types/admin/AdminWorkspace";

import { AdminTablePagination } from "../workspace/AdminTablePagination";
import { AdminGroupCapacity } from "./AdminGroupCapacity";

type SortKey = "detail" | "meta" | "title";

type AdminGroupsTableProps = {
  common: AdminWorkspaceCopy["common"];
  copy: AdminGroupsCopy;
  locale: Locale;
  onPageChange: (page: number) => void;
  onSort: (key: SortKey) => void;
  page: number;
  pageCount: number;
  records: AdminWorkspaceRecord[];
  sectionTitle: string;
  sortDirection: "ascending" | "descending";
  sortKey: SortKey;
  totalRecords: number;
};

export function AdminGroupsTable({
  common,
  copy,
  locale,
  onPageChange,
  onSort,
  page,
  pageCount,
  records,
  sectionTitle,
  sortDirection,
  sortKey,
  totalRecords,
}: AdminGroupsTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const groupRecords = records.filter((record) => record.group);
  const allVisibleSelected = useMemo(
    () => groupRecords.length > 0 && groupRecords.every((record) => selectedIds.has(record.id)),
    [groupRecords, selectedIds],
  );

  const handleClearSelection = () => setSelectedIds(new Set());
  const handleRecordSelection = (id: string) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const handleVisibleSelection = () => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (allVisibleSelected) groupRecords.forEach((record) => next.delete(record.id));
      else groupRecords.forEach((record) => next.add(record.id));
      return next;
    });
  };
  const renderSortButton = (label: string, key: SortKey) => (
    <button onClick={() => onSort(key)} type="button">
      <span>{label}</span>
      <UnfoldMoreRounded aria-hidden="true" />
    </button>
  );

  return (
    <section
      aria-label={sectionTitle}
      className="adminWorkspace__tablePanel adminGroups__tablePanel"
    >
      {selectedIds.size ? (
        <div className="adminWorkspace__bulkBar" role="status">
          <strong>
            {selectedIds.size} {common.selectedLabel}
          </strong>
          <button onClick={handleClearSelection} type="button">
            {common.clearSelectionLabel}
          </button>
        </div>
      ) : null}
      <div className="adminWorkspace__tableScroll">
        <table className="adminGroups__table">
          <colgroup>
            <col className="adminGroups__selectionColumn" />
            <col className="adminGroups__groupColumn" />
            <col className="adminGroups__teacherColumn" />
            <col className="adminGroups__scheduleColumn" />
            <col className="adminGroups__roomColumn" />
            <col className="adminGroups__capacityColumn" />
            <col className="adminGroups__statusColumn" />
            <col className="adminGroups__actionColumn" />
          </colgroup>
          <thead>
            <tr>
              <th className="adminWorkspace__selectionCell" scope="col">
                <input
                  aria-label={common.all}
                  checked={allVisibleSelected}
                  onChange={handleVisibleSelection}
                  type="checkbox"
                />
              </th>
              <th aria-sort={sortKey === "title" ? sortDirection : "none"} scope="col">
                {renderSortButton(copy.groupLabel, "title")}
              </th>
              <th aria-sort={sortKey === "meta" ? sortDirection : "none"} scope="col">
                {renderSortButton(copy.teacherLabel, "meta")}
              </th>
              <th scope="col">{copy.scheduleLabel}</th>
              <th scope="col">{copy.roomLabel}</th>
              <th scope="col">{copy.capacityLabel}</th>
              <th aria-sort={sortKey === "detail" ? sortDirection : "none"} scope="col">
                {renderSortButton(common.statusLabel, "detail")}
              </th>
              <th aria-label={common.detailLabel} scope="col" />
            </tr>
          </thead>
          <tbody>
            {groupRecords.map((record) => {
              const group = record.group!;
              return (
                <tr
                  className={selectedIds.has(record.id) ? "adminWorkspace__rowSelected" : undefined}
                  key={record.id}
                >
                  <td className="adminWorkspace__selectionCell">
                    <input
                      aria-label={`${common.detailLabel}: ${record.title}`}
                      checked={selectedIds.has(record.id)}
                      onChange={() => handleRecordSelection(record.id)}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <span className="adminGroups__identity">
                      <strong>{record.title}</strong>
                      <small>
                        {getAdminGroupCategoryLabel(locale, group.category)} · {record.id}
                      </small>
                    </span>
                  </td>
                  <td>
                    <span className="adminGroups__teacher">
                      <strong>{group.teacherName}</strong>
                      <small>{group.branchName ?? "—"}</small>
                    </span>
                  </td>
                  <td>{formatAdminGroupSchedule(group, locale)}</td>
                  <td>{group.room ?? "—"}</td>
                  <td>
                    <AdminGroupCapacity
                      current={group.activeStudentCount}
                      label={copy.capacityLabel}
                      total={group.capacity}
                    />
                  </td>
                  <td>
                    <span
                      className={`adminWorkspace__status adminWorkspace__status_${record.status}`}
                    >
                      {record.detail}
                    </span>
                  </td>
                  <td className="adminWorkspace__actionCell">
                    {record.href ? (
                      <Link
                        aria-label={`${common.detailLabel}: ${record.title}`}
                        href={`/${locale}${record.href}`}
                      >
                        <ArrowOutwardRounded aria-hidden="true" />
                      </Link>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {groupRecords.length === 0 ? (
          <p className="adminWorkspace__empty">{common.emptyLabel}</p>
        ) : null}
      </div>
      <AdminTablePagination
        common={common}
        onPageChange={onPageChange}
        page={page}
        pageCount={pageCount}
        totalRecords={totalRecords}
      />
    </section>
  );
}
