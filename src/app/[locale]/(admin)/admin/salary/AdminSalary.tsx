"use client";

import { useQuery } from "@apollo/client/react";
import { useDeferredValue, useState } from "react";
import type { Locale } from "@/config/Locales";
import { AdminSalaryReportDocument, type AdminDirectoryInput } from "@/gql/graphql";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import { getAdminSalaryCopy } from "@/dictionaries/admin/AdminSalary";
import { AdminCatalogFilters } from "@/features/admin/operations/AdminCatalogFilters";
import { AdminContentPagination } from "@/features/admin/content/AdminContentPagination";
import { AdminSalaryHistory } from "@/features/admin/salary/AdminSalaryHistory";
import type { AdminSalaryRecord } from "@/types/admin/AdminSalary";
import { AdminSalarySummary } from "./AdminSalarySummary";
import { AdminSalaryTable } from "./AdminSalaryTable";

export function AdminSalary({ locale, currentMonth }: { locale: Locale; currentMonth: string }) {
  const t = getAdminRegistryText(locale);
  const copy = getAdminSalaryCopy(locale);
  const [input, setInput] = useState<AdminDirectoryInput>({
    page: 1,
    pageSize: 15,
    descending: false,
  });
  const deferred = useDeferredValue(input);
  const [detail, setDetail] = useState<AdminSalaryRecord | null>(null);
  const query = useQuery(AdminSalaryReportDocument, {
    variables: { input: deferred },
    context: { authenticated: true },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  const busy = query.loading || deferred !== input;
  const report = query.data?.adminSalaryReport;
  const options = query.data?.adminDirectoryOptions;
  const update = (next: Partial<AdminDirectoryInput>) => {
    setDetail(null);
    setInput((current) => ({ ...current, ...next, page: 1 }));
  };
  return (
    <article className="adminWorkspace adminRegistry adminPayments adminSalary">
      <header className="adminWorkspace__header">
        <div>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
        </div>
      </header>
      <AdminSalarySummary
        locale={locale}
        report={!busy && !query.error ? report : undefined}
        currentMonth={input.month === currentMonth}
      />
      <AdminCatalogFilters
        locale={locale}
        input={input}
        month
        onChange={update}
        filters={[
          { key: "teacherId", label: t("teacher"), options: options?.teachers ?? [], wide: true },
          { key: "groupId", label: t("group"), options: options?.groups ?? [], wide: true },
        ]}
      />
      <section className="adminPayments__panel" aria-label={copy.title} aria-busy={busy}>
        {busy ? (
          <p className="adminPayments__empty" role="status">
            {t("loading")}
          </p>
        ) : query.error ? (
          <div className="adminPayments__empty" role="alert">
            <p>{t("error")}</p>
            <button type="button" onClick={() => void query.refetch().catch(() => undefined)}>
              {t("retry")}
            </button>
          </div>
        ) : report?.nodes.length ? (
          <AdminSalaryTable
            locale={locale}
            records={report.nodes}
            descending={Boolean(input.descending)}
            onSort={() => update({ descending: !input.descending })}
            onOpen={setDetail}
          />
        ) : (
          <p className="adminPayments__empty">{copy.empty}</p>
        )}
      </section>
      {!query.error && (
        <AdminContentPagination
          locale={locale}
          section="salary"
          page={input.page ?? 1}
          pageCount={report?.pageCount ?? 1}
          totalCount={report?.totalCount ?? 0}
          busy={busy}
          onChange={(page) => setInput((current) => ({ ...current, page }))}
        />
      )}
      {detail && (
        <AdminSalaryHistory
          key={detail.id}
          locale={locale}
          record={detail}
          groupId={input.groupId ?? undefined}
          onClose={() => setDetail(null)}
        />
      )}
    </article>
  );
}
