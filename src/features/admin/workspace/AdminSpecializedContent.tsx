"use client";

import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";

import type {
  AdminNavigationKey,
  AdminWorkspaceCopy,
  AdminWorkspaceRecord,
} from "@/types/admin/AdminWorkspace";

import { AdminTablePagination } from "./AdminTablePagination";

type AdminSpecializedContentProps = {
  common: AdminWorkspaceCopy["common"];
  onPageChange: (page: number) => void;
  page: number;
  pageCount: number;
  records: AdminWorkspaceRecord[];
  sectionKey: AdminNavigationKey;
  totalRecords: number;
};

function value(record: AdminWorkspaceRecord, key: string): string {
  return record.fields?.find((field) => field.key === key)?.value ?? "—";
}

function status(record: AdminWorkspaceRecord) {
  return (
    <span className={`adminWorkspace__status adminWorkspace__status_${record.status}`}>
      {record.detail}
    </span>
  );
}

export function AdminSpecializedContent({
  common,
  onPageChange,
  page,
  pageCount,
  records,
  sectionKey,
  totalRecords,
}: AdminSpecializedContentProps) {
  const content = (
    <div className="adminOperations__agenda">
      {records.map((record) => (
        <article className="adminOperations__lesson" key={record.id}>
          <div className="adminOperations__lessonDate">
            <CalendarMonthOutlined aria-hidden="true" />
            <span>{value(record, "date")}</span>
          </div>
          <div className="adminOperations__lessonTime">
            <strong>{value(record, "start")}</strong>
            <span>—</span>
            <strong>{value(record, "end")}</strong>
          </div>
          <div className="adminOperations__lessonMain">
            <h2>{record.title}</h2>
            <p>{value(record, "room")}</p>
          </div>
          {status(record)}
        </article>
      ))}
    </div>
  );

  return (
    <section className="adminOperations" data-layout={sectionKey}>
      {records.length ? content : <p className="adminWorkspace__empty">{common.emptyLabel}</p>}
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
