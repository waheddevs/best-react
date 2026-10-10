"use client";

import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import UnfoldMoreRounded from "@mui/icons-material/UnfoldMoreRounded";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { Locale } from "@/config/Locales";
import type {
  AdminWorkspaceCopy,
  AdminWorkspaceRecord,
  AdminWorkspaceRecordField,
} from "@/types/admin/AdminWorkspace";

import { AdminRecordAvatar } from "./AdminRecordAvatar";
import { AdminTablePagination } from "./AdminTablePagination";

type SortKey = "detail" | "meta" | "title";

type AdminDataTableProps = {
  columns: AdminWorkspaceRecordField[];
  common: AdminWorkspaceCopy["common"];
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

export function AdminDataTable({
  columns,
  common,
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
}: AdminDataTableProps) {
  /* HOOKS */
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const allVisibleSelected = useMemo(
    () => records.length > 0 && records.every((record) => selectedIds.has(record.id)),
    [records, selectedIds],
  );

  /* HANDLERS */
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
      if (allVisibleSelected) records.forEach((record) => next.delete(record.id));
      else records.forEach((record) => next.add(record.id));
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
    <section aria-label={sectionTitle} className="adminWorkspace__tablePanel">
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
        <table
          className={`adminWorkspace__table${columns.length ? "adminWorkspace__table_domain" : ""}`}
        >
          <colgroup>
            <col className="adminWorkspace__selectionColumn" />
            <col className="adminWorkspace__identityColumn" />
            {columns.length ? (
              columns.map((column) => (
                <col className="adminWorkspace__dataColumn" key={column.key} />
              ))
            ) : (
              <col className="adminWorkspace__contextColumn" />
            )}
            <col className="adminWorkspace__statusColumn" />
            <col className="adminWorkspace__actionColumn" />
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
                {renderSortButton(common.idRecordLabel, "title")}
              </th>
              {columns.length ? (
                columns.map((column) => (
                  <th key={column.key} scope="col">
                    {column.label}
                  </th>
                ))
              ) : (
                <th aria-sort={sortKey === "meta" ? sortDirection : "none"} scope="col">
                  {renderSortButton(common.contextLabel, "meta")}
                </th>
              )}
              <th aria-sort={sortKey === "detail" ? sortDirection : "none"} scope="col">
                {renderSortButton(common.statusLabel, "detail")}
              </th>
              <th aria-label={common.detailLabel} scope="col" />
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
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
                  <div className="adminWorkspace__recordIdentity">
                    {record.avatarUrl !== undefined ? (
                      <AdminRecordAvatar avatarUrl={record.avatarUrl} displayName={record.title} />
                    ) : null}
                    <span className="adminWorkspace__recordLabel">
                      <small>{record.id}</small>
                      <strong>{record.title}</strong>
                    </span>
                  </div>
                </td>
                {columns.length ? (
                  columns.map((column) => (
                    <td key={column.key}>
                      <span className="adminWorkspace__dataCell">
                        {record.fields?.find((item) => item.key === column.key)?.value ?? "—"}
                      </span>
                    </td>
                  ))
                ) : (
                  <td>{record.meta}</td>
                )}
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
                  ) : (
                    <span>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {records.length === 0 ? <p className="adminWorkspace__empty">{common.emptyLabel}</p> : null}
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
