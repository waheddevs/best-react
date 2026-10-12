"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import type { Locale } from "@/config/Locales";
import { AdminOverviewFinanceDocument } from "@/gql/graphql";
import { getAdminOverviewCopy } from "@/dictionaries/admin/AdminOverview";
import { AdminMonthFilter } from "@/features/admin/operations/AdminMonthFilter";
import { AdminOverviewFinanceSummary } from "./AdminOverviewFinanceSummary";

export function AdminOverviewFinance({ locale, active }: { locale: Locale; active: boolean }) {
  const copy = getAdminOverviewCopy(locale);
  const [month, setMonth] = useState("");
  const query = useQuery(AdminOverviewFinanceDocument, {
    variables: { input: { page: 1, pageSize: 1, ...(month ? { month } : {}) } },
    context: { authenticated: true },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  const outstanding = query.data?.adminPaymentDirectory.metrics.find(
    (metric) => metric.key === "outstanding",
  )?.value;
  const failed =
    Boolean(query.error) || (!query.loading && (!query.data || outstanding === undefined));

  return (
    <section
      className="adminOverview__panel adminOverviewFinance"
      data-active={active}
      aria-labelledby="overview-finance-title"
      aria-busy={query.loading}
    >
      <header>
        <h2 id="overview-finance-title">{copy.finance}</h2>
        <div className="adminOverviewFinance__actions">
          <div className="adminOverviewFinance__period">
            <AdminMonthFilter locale={locale} value={month} onChange={setMonth} />
          </div>
          <Link href={`/${locale}/admin/payments`}>
            {copy.payments}
            <ArrowOutwardRounded />
          </Link>
          <Link href={`/${locale}/admin/salary`}>
            {copy.salary}
            <ArrowOutwardRounded />
          </Link>
        </div>
      </header>
      {query.loading || failed ? (
        <div className="adminOverview__empty" role={failed ? "alert" : "status"}>
          <p>{failed ? copy.error : copy.loading}</p>
          {failed && (
            <button type="button" onClick={() => void query.refetch().catch(() => undefined)}>
              {copy.retry}
            </button>
          )}
        </div>
      ) : query.data && outstanding !== undefined ? (
        <AdminOverviewFinanceSummary
          locale={locale}
          report={query.data.adminSalaryReport}
          outstanding={outstanding}
        />
      ) : null}
    </section>
  );
}
