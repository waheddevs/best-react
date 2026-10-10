"use client";

import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import FactCheckOutlined from "@mui/icons-material/FactCheckOutlined";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import type {
  AdminNavigationKey,
  AdminWorkspaceCopy,
  AdminWorkspaceRecord,
} from "@/types/admin/AdminWorkspace";

import { AdminTablePagination } from "./AdminTablePagination";

type AdminSpecializedContentProps = {
  common: AdminWorkspaceCopy["common"];
  locale: Locale;
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
  locale,
  onPageChange,
  page,
  pageCount,
  records,
  sectionKey,
  totalRecords,
}: AdminSpecializedContentProps) {
  let content;

  if (sectionKey === "schedule") {
    content = (
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
  } else if (sectionKey === "tests") {
    content = (
      <div className="adminOperations__testGrid">
        {records.map((record) => (
          <article className="adminOperations__testCard" key={record.id}>
            <div className="adminOperations__cardTopline">
              <FactCheckOutlined aria-hidden="true" />
              {status(record)}
            </div>
            <h2>{record.title}</h2>
            <p>{value(record, "group")}</p>
            <dl>
              {record.fields?.slice(1).map((field) => (
                <div key={field.key}>
                  <dt>{field.label}</dt>
                  <dd>{field.value}</dd>
                </div>
              ))}
            </dl>
            {record.href ? (
              <Link href={`/${locale}${record.href}`}>
                {common.detailLabel}
                <ArrowOutwardRounded aria-hidden="true" />
              </Link>
            ) : null}
          </article>
        ))}
      </div>
    );
  } else if (sectionKey === "results" || sectionKey === "reports") {
    content = (
      <div className="adminOperations__progressGrid">
        {records.map((record) => {
          const completion = Math.min(
            100,
            Math.max(0, Number.parseInt(value(record, "completion"), 10) || 0),
          );
          return (
            <article className="adminOperations__progressCard" key={record.id}>
              <div className="adminOperations__progressHeading">
                <div>
                  <small>{record.id}</small>
                  <h2>{record.title}</h2>
                </div>
                <strong>{completion}%</strong>
              </div>
              <p>{value(record, "teacher")}</p>
              <div
                aria-label={`${record.title}: ${completion}%`}
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={completion}
                className="adminOperations__progressBar"
                role="progressbar"
              >
                <span style={{ width: `${completion}%` }} />
              </div>
              <div className="adminOperations__progressFooter">
                <span>{record.fields?.find((field) => field.key === "average")?.label}</span>
                <strong>{value(record, "average")}</strong>
              </div>
            </article>
          );
        })}
      </div>
    );
  } else {
    content = (
      <ol className="adminOperations__auditTimeline">
        {records.map((record) => (
          <li key={record.id}>
            <span aria-hidden="true" />
            <article>
              <div>
                <h2>{record.title}</h2>
                <time>{value(record, "created")}</time>
              </div>
              <p>{value(record, "target")}</p>
              <dl>
                <div>
                  <dt>{record.fields?.find((field) => field.key === "actor")?.label}</dt>
                  <dd>{value(record, "actor")}</dd>
                </div>
                <div>
                  <dt>{record.fields?.find((field) => field.key === "reason")?.label}</dt>
                  <dd>{value(record, "reason")}</dd>
                </div>
              </dl>
            </article>
          </li>
        ))}
      </ol>
    );
  }

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
