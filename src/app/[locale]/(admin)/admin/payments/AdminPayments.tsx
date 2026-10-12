"use client";

import { useQuery } from "@apollo/client/react";
import { useDeferredValue, useState } from "react";
import type { Locale } from "@/config/Locales";
import { AdminOperationsDocument, type AdminDirectoryInput } from "@/gql/graphql";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import { getAdminPaymentsCopy } from "@/dictionaries/admin/AdminPayments";
import { AdminCatalogFilters } from "@/features/admin/operations/AdminCatalogFilters";
import { AdminContentPagination } from "@/features/admin/content/AdminContentPagination";
import { AdminPaymentSummary } from "@/features/admin/payments/AdminPaymentSummary";
import { AdminPaymentHistory } from "@/features/admin/payments/AdminPaymentHistory";
import type { AdminPaymentRecord } from "@/types/admin/AdminPayments";
import { AdminPaymentsTable } from "./AdminPaymentsTable";

export function AdminPayments({ locale }: { locale: Locale }) {
  const t = getAdminRegistryText(locale);
  const copy = getAdminPaymentsCopy(locale);
  const [input, setInput] = useState<AdminDirectoryInput>({
    page: 1,
    pageSize: 15,
    descending: false,
  });
  const deferred = useDeferredValue(input);
  const [detail, setDetail] = useState<AdminPaymentRecord | null>(null);
  const query = useQuery(AdminOperationsDocument, {
    variables: { input: deferred, groups: false, schedule: false, payments: true },
    context: { authenticated: true },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  const loading = query.loading || deferred !== input;
  const page = query.data?.adminPaymentDirectory;
  const options = query.data?.adminDirectoryOptions;
  const metric = (key: string) =>
    loading || query.error ? undefined : page?.metrics.find((item) => item.key === key)?.value;
  const update = (next: Partial<AdminDirectoryInput>) => {
    setDetail(null);
    setInput((current) => ({ ...current, ...next, page: 1 }));
  };

  return (
    <article className="adminWorkspace adminRegistry adminPayments">
      <header className="adminWorkspace__header">
        <div>
          <h1>{t("payments")}</h1>
          <p>{t("paymentsDescription")}</p>
        </div>
      </header>
      <AdminPaymentSummary
        locale={locale}
        items={["billed", "paid", "outstanding"].map((key) => ({ key, value: metric(key) }))}
      />
      <div className="adminPayments__overview">
        <span>{copy.filteredTotals}</span>
        <div>
          <span>
            {t("UNPAID")} <strong>{metric("UNPAID") ?? "—"}</strong>
          </span>
          <span>
            {t("collection")}{" "}
            <strong>{metric("collection") === undefined ? "—" : `${metric("collection")}%`}</strong>
          </span>
        </div>
      </div>
      <AdminCatalogFilters
        locale={locale}
        input={input}
        month
        onChange={update}
        filters={[
          {
            key: "status",
            label: t("status"),
            options: ["PAID", "UNPAID"].map((id) => ({ id, label: t(id) })),
          },
          { key: "groupId", label: t("group"), options: options?.groups ?? [], wide: true },
          { key: "studentId", label: t("student"), options: options?.students ?? [], wide: true },
        ]}
      />
      <section className="adminPayments__panel" aria-label={t("payments")} aria-busy={loading}>
        {loading ? (
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
        ) : page?.nodes.length ? (
          <AdminPaymentsTable
            locale={locale}
            records={page.nodes}
            descending={Boolean(input.descending)}
            onSort={() => update({ descending: !input.descending })}
            onOpen={setDetail}
          />
        ) : (
          <p className="adminPayments__empty">{t("empty")}</p>
        )}
      </section>
      {!query.error && (
        <AdminContentPagination
          locale={locale}
          section="payments"
          page={input.page ?? 1}
          pageCount={page?.pageCount ?? 1}
          totalCount={page?.totalCount ?? 0}
          busy={loading}
          onChange={(next) => setInput((current) => ({ ...current, page: next }))}
        />
      )}
      <AdminPaymentHistory locale={locale} record={detail} onClose={() => setDetail(null)} />
    </article>
  );
}
