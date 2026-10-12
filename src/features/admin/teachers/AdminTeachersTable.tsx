"use client";

import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import UnfoldMoreRounded from "@mui/icons-material/UnfoldMoreRounded";

import type { Locale } from "@/config/Locales";
import type { AdminTeachersCopy } from "@/types/admin/AdminTeachers";
import type {
  AdminWorkspaceCopy,
  AdminWorkspaceRecord,
  AdminWorkspaceRecordField,
} from "@/types/admin/AdminWorkspace";

import { AdminRecordAvatar } from "../workspace/AdminRecordAvatar";
import { AdminTeacherActions } from "./AdminTeacherActions";

type SortKey = "detail" | "meta" | "title";
type AdminTeachersTableProps = {
  columns: AdminWorkspaceRecordField[];
  common: AdminWorkspaceCopy["common"];
  copy: AdminTeachersCopy;
  locale: Locale;
  onPageChange: (page: number) => void;
  onTeacherDeleted: (teacherId: string) => void;
  onSort: (key: SortKey) => void;
  page: number;
  pageCount: number;
  records: AdminWorkspaceRecord[];
  sectionTitle: string;
  sortDirection: "ascending" | "descending";
  sortKey: SortKey;
  totalRecords: number;
};

const columnOrder = ["phone", "email", "groups"];

export function AdminTeachersTable({
  columns,
  common,
  copy,
  locale,
  onPageChange,
  onTeacherDeleted,
  onSort,
  page,
  pageCount,
  records,
  sectionTitle,
  sortDirection,
  sortKey,
  totalRecords,
}: AdminTeachersTableProps) {
  const orderedColumns = [...columns].sort(
    (first, second) => columnOrder.indexOf(first.key) - columnOrder.indexOf(second.key),
  );
  const sortButton = (label: string, key: SortKey) => (
    <button onClick={() => onSort(key)} type="button">
      <span>{label}</span>
      <UnfoldMoreRounded aria-hidden="true" />
    </button>
  );

  return (
    <section aria-label={sectionTitle} className="adminTeachers__tableSection">
      <div className="adminTeachers__tablePanel">
        <div className="adminTeachers__tableScroll">
          <table className="adminTeachers__table">
            <colgroup>
              <col className="adminTeachers__identityColumn" />
              <col className="adminTeachers__statusColumn" />
              {orderedColumns.map((column) => (
                <col
                  className={`adminTeachers__dataColumn adminTeachers__dataColumn_${column.key}`}
                  key={column.key}
                />
              ))}
              <col className="adminTeachers__actionColumn" />
            </colgroup>
            <thead>
              <tr>
                <th aria-sort={sortKey === "title" ? sortDirection : "none"} scope="col">
                  {sortButton(copy.nameLabel, "title")}
                </th>
                <th aria-sort={sortKey === "detail" ? sortDirection : "none"} scope="col">
                  {sortButton(common.statusLabel, "detail")}
                </th>
                {orderedColumns.map((column) => (
                  <th key={column.key} scope="col">
                    {column.label}
                  </th>
                ))}
                <th className="adminTeachers__actionHeading" scope="col">
                  {copy.actionsLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>
                    <div className="adminTeachers__identity">
                      <AdminRecordAvatar
                        avatarUrl={record.avatarUrl ?? null}
                        className="adminTeachers__avatar"
                        displayName={record.title}
                      />
                      <strong>{record.title}</strong>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`adminTeachers__status adminTeachers__status_${record.status}`}
                    >
                      {record.detail}
                    </span>
                  </td>
                  {orderedColumns.map((column) => {
                    const value = record.fields?.find((field) => field.key === column.key)?.value;
                    return (
                      <td key={column.key}>
                        <span
                          className={
                            column.key === "groups"
                              ? "adminTeachers__groupCount"
                              : "adminTeachers__dataCell"
                          }
                        >
                          {value ?? "—"}
                        </span>
                      </td>
                    );
                  })}
                  <td className="adminTeachers__actionCell">
                    {record.href ? (
                      <AdminTeacherActions
                        copy={copy}
                        href={record.href}
                        locale={locale}
                        name={record.title}
                        onDeleted={onTeacherDeleted}
                        teacherId={record.id}
                      />
                    ) : (
                      <span>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {records.length === 0 ? (
            <p className="adminTeachers__empty">{common.emptyLabel}</p>
          ) : null}
        </div>
      </div>
      <footer className="adminTeachers__pagination">
        <div className="adminTeachers__paginationCard">
          <button
            aria-label={common.previousLabel}
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            type="button"
          >
            <ChevronLeftRounded aria-hidden="true" />
            <span>{common.previousLabel}</span>
          </button>
          <strong>
            {common.pageLabel} {page} / {pageCount}
          </strong>
          <button
            aria-label={common.nextLabel}
            disabled={page === pageCount}
            onClick={() => onPageChange(page + 1)}
            type="button"
          >
            <span>{common.nextLabel}</span>
            <ChevronRightRounded aria-hidden="true" />
          </button>
        </div>
        <span className="adminTeachers__recordCount">
          {totalRecords} {common.recordsLabel}
        </span>
      </footer>
    </section>
  );
}
