"use client";

import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import UnfoldMoreRounded from "@mui/icons-material/UnfoldMoreRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import { AdminStudentActions } from "@/features/admin/students/AdminStudentActions";
import type { AdminStudentsCopy } from "@/types/admin/AdminStudents";
import type {
  AdminWorkspaceCopy,
  AdminWorkspaceRecord,
  AdminWorkspaceRecordField,
} from "@/types/admin/AdminWorkspace";

import { AdminRecordAvatar } from "./AdminRecordAvatar";
import { AdminTablePagination } from "./AdminTablePagination";

type SortKey = "detail" | "meta" | "title";

type AdminDataTableProps = {
  actionLabel?: string;
  columns: AdminWorkspaceRecordField[];
  common: AdminWorkspaceCopy["common"];
  identityLabel?: string;
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
  onStudentDeleted?: (studentId: string) => void;
  studentCopy?: AdminStudentsCopy;
  variant?: "default" | "students";
};

export function AdminDataTable({
  actionLabel,
  columns,
  common,
  identityLabel,
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
  onStudentDeleted,
  studentCopy,
  variant = "default",
}: AdminDataTableProps) {
  const isStudentTable = variant === "students";

  const renderSortButton = (label: string, key: SortKey) => (
    <button onClick={() => onSort(key)} type="button">
      <span>{label}</span>
      <UnfoldMoreRounded aria-hidden="true" />
    </button>
  );

  const renderIdentity = (record: AdminWorkspaceRecord) => (
    <div className="adminWorkspace__recordIdentity">
      {record.avatarUrl !== undefined ? (
        <AdminRecordAvatar avatarUrl={record.avatarUrl} displayName={record.title} />
      ) : null}
      <span className="adminWorkspace__recordLabel">
        {isStudentTable ? null : <small>{record.id}</small>}
        <strong>{record.title}</strong>
      </span>
    </div>
  );

  const renderField = (record: AdminWorkspaceRecord, column: AdminWorkspaceRecordField) => {
    const recordField = record.fields?.find((item) => item.key === column.key);

    if (recordField?.tone) {
      return (
        <span className={`adminWorkspace__status adminWorkspace__status_${recordField.tone}`}>
          {recordField.value}
        </span>
      );
    }

    return <span className="adminWorkspace__dataCell">{recordField?.value ?? "—"}</span>;
  };

  return (
    <section aria-label={sectionTitle} className="adminWorkspace__tableSection">
      <div className="adminWorkspace__tablePanel">
        <div className="adminWorkspace__tableScroll">
          <table
            className={[
              "adminWorkspace__table",
              columns.length ? "adminWorkspace__table_domain" : null,
              isStudentTable ? "adminWorkspace__table_students" : null,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <colgroup>
              <col className="adminWorkspace__identityColumn" />
              {isStudentTable ? <col className="adminWorkspace__statusColumn" /> : null}
              {columns.length ? (
                columns.map((column) => (
                  <col className="adminWorkspace__dataColumn" key={column.key} />
                ))
              ) : (
                <col className="adminWorkspace__contextColumn" />
              )}
              {isStudentTable ? null : <col className="adminWorkspace__statusColumn" />}
              <col className="adminWorkspace__actionColumn" />
            </colgroup>
            <thead>
              <tr>
                <th aria-sort={sortKey === "title" ? sortDirection : "none"} scope="col">
                  {renderSortButton(identityLabel ?? common.idRecordLabel, "title")}
                </th>
                {isStudentTable ? (
                  <th aria-sort={sortKey === "detail" ? sortDirection : "none"} scope="col">
                    {renderSortButton(common.statusLabel, "detail")}
                  </th>
                ) : null}
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
                {isStudentTable ? null : (
                  <th aria-sort={sortKey === "detail" ? sortDirection : "none"} scope="col">
                    {renderSortButton(common.statusLabel, "detail")}
                  </th>
                )}
                <th className="adminWorkspace__actionHeading" scope="col">
                  {actionLabel ?? (
                    <span className="adminWorkspace__srOnly">{common.detailLabel}</span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{renderIdentity(record)}</td>
                  {isStudentTable ? (
                    <td>
                      <span
                        className={`adminWorkspace__status adminWorkspace__status_${record.status}`}
                      >
                        {record.detail}
                      </span>
                    </td>
                  ) : null}
                  {columns.length ? (
                    columns.map((column) => <td key={column.key}>{renderField(record, column)}</td>)
                  ) : (
                    <td>{record.meta}</td>
                  )}
                  {isStudentTable ? null : (
                    <td>
                      <span
                        className={`adminWorkspace__status adminWorkspace__status_${record.status}`}
                      >
                        {record.detail}
                      </span>
                    </td>
                  )}
                  <td className="adminWorkspace__actionCell">
                    {isStudentTable && record.href && studentCopy && onStudentDeleted ? (
                      <AdminStudentActions
                        copy={studentCopy}
                        href={record.href}
                        locale={locale}
                        name={record.title}
                        onDeleted={onStudentDeleted}
                        studentId={record.id}
                      />
                    ) : record.href ? (
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
          {records.length === 0 ? (
            <p className="adminWorkspace__empty">{common.emptyLabel}</p>
          ) : null}
        </div>
      </div>
      <AdminTablePagination
        common={common}
        detached={isStudentTable}
        onPageChange={onPageChange}
        page={page}
        pageCount={pageCount}
        totalRecords={totalRecords}
      />
    </section>
  );
}
