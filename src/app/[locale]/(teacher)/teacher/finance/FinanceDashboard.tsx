"use client";

import AccountBalanceWalletRounded from "@mui/icons-material/AccountBalanceWalletRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import PaidRounded from "@mui/icons-material/PaidRounded";
import PaymentsRounded from "@mui/icons-material/PaymentsRounded";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import { useState } from "react";

import type { Locale } from "@/config/Locales";
import { TeacherPageHeader } from "@/features/teacher/layout/TeacherPageHeader";
import { formatTeacherCurrency, formatTeacherNumber } from "@/lib/teacher/TeacherNumberFormat";
import type {
  TeacherCopy,
  TeacherFinanceMetric,
  TeacherFinanceSnapshot,
} from "@/types/teacher/Teacher";

type FinanceDashboardProps = {
  copy: TeacherCopy;
  locale: Locale;
  snapshots: TeacherFinanceSnapshot[];
};

const financeIcons: Record<TeacherFinanceMetric["id"], typeof PaidRounded> = {
  paid: PaidRounded,
  rate: TrendingUpRounded,
  expected: AccountBalanceWalletRounded,
  debt: PaymentsRounded,
  learners: GroupsRounded,
  groups: GroupsRounded,
  salary: PaymentsRounded,
  penalty: AccountBalanceWalletRounded,
};

export function FinanceDashboard({ copy, locale, snapshots }: FinanceDashboardProps) {
  /* HOOKS */
  const [selectedMonth, setSelectedMonth] = useState(snapshots[0]?.month ?? "");
  const snapshot = snapshots.find((item) => item.month === selectedMonth) ?? snapshots[0];

  if (!snapshot) return null;

  const formatMetric = (metric: TeacherFinanceMetric) => {
    if (metric.valueType === "currency") return formatTeacherCurrency(metric.value);
    if (metric.valueType === "percentage") return `${metric.value}%`;
    return formatTeacherNumber(metric.value);
  };

  return (
    <main>
      <TeacherPageHeader eyebrow={copy.finance.eyebrow} title={copy.finance.pageTitle} />

      <div aria-label={copy.finance.pageTitle} className="teacherFinance__monthTabs" role="tablist">
        {snapshots.map((item) => (
          <button
            aria-selected={selectedMonth === item.month}
            data-active={selectedMonth === item.month}
            key={item.month}
            onClick={() => setSelectedMonth(item.month)}
            role="tab"
            type="button"
          >
            {item.label[locale]}
          </button>
        ))}
      </div>

      <section className="teacherFinance__summary">
        <article className="teacherFinance__heroCard">
          <span>{copy.finance.income}</span>
          <strong>{formatTeacherCurrency(snapshot.income)}</strong>
          <div>
            <span>{copy.finance.expectedAmount}</span>
            <b>{formatTeacherCurrency(snapshot.expectedAmount)}</b>
          </div>
          <div className="teacherFinance__bar">
            <span style={{ width: `${snapshot.paymentRate}%` }} />
          </div>
          <small>{snapshot.paymentRate}%</small>
        </article>
        <article className="teacherFinance__rateCard">
          <span>{copy.finance.attendanceRate}</span>
          <strong>{snapshot.attendanceRate}%</strong>
          <span
            className="teacherFinance__ring"
            style={
              { "--finance-progress": `${snapshot.attendanceRate * 3.6}deg` } as React.CSSProperties
            }
          >
            <TrendingUpRounded />
          </span>
        </article>
      </section>

      <section className="teacherFinance__metrics">
        {snapshot.metrics.map((metric) => {
          const MetricIcon = financeIcons[metric.id];
          return (
            <article className="teacherFinance__metric" data-tone={metric.tone} key={metric.id}>
              <span className="teacherFinance__metricIcon">
                <MetricIcon />
              </span>
              <div>
                <small>{copy.finance.labels[metric.id]}</small>
                <strong>{formatMetric(metric)}</strong>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
