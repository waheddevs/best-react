"use client";

import AccountBalanceWalletRounded from "@mui/icons-material/AccountBalanceWalletRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import PaidRounded from "@mui/icons-material/PaidRounded";
import PaymentsRounded from "@mui/icons-material/PaymentsRounded";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import { useState } from "react";

import type { Locale } from "@/config/Locales";
import styles from "@/css/teacher/finance.module.css";
import { TeacherPageHeader } from "@/features/teacher/layout/TeacherPageHeader";
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

  const currency = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "UZS",
  });
  const formatMetric = (metric: TeacherFinanceMetric) => {
    if (metric.valueType === "currency") return currency.format(metric.value);
    if (metric.valueType === "percentage") return `${metric.value}%`;
    return new Intl.NumberFormat(locale).format(metric.value);
  };

  return (
    <main>
      <TeacherPageHeader
        description={copy.finance.description}
        eyebrow={copy.common.previewLabel}
        title={copy.finance.pageTitle}
      />

      <div
        aria-label={copy.finance.pageTitle}
        className={styles.teacherFinance__monthTabs}
        role="tablist"
      >
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

      <section className={styles.teacherFinance__summary}>
        <article className={styles.teacherFinance__heroCard}>
          <span>{copy.finance.income}</span>
          <strong>{currency.format(snapshot.income)}</strong>
          <div>
            <span>{copy.finance.expectedAmount}</span>
            <b>{currency.format(snapshot.expectedAmount)}</b>
          </div>
          <div className={styles.teacherFinance__bar}>
            <span style={{ width: `${snapshot.paymentRate}%` }} />
          </div>
          <small>{snapshot.paymentRate}%</small>
        </article>
        <article className={styles.teacherFinance__rateCard}>
          <span>{copy.finance.attendanceRate}</span>
          <strong>{snapshot.attendanceRate}%</strong>
          <span
            className={styles.teacherFinance__ring}
            style={
              { "--finance-progress": `${snapshot.attendanceRate * 3.6}deg` } as React.CSSProperties
            }
          >
            <TrendingUpRounded />
          </span>
        </article>
      </section>

      <section className={styles.teacherFinance__metrics}>
        {snapshot.metrics.map((metric) => {
          const MetricIcon = financeIcons[metric.id];
          return (
            <article
              className={styles.teacherFinance__metric}
              data-tone={metric.tone}
              key={metric.id}
            >
              <span className={styles.teacherFinance__metricIcon}>
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
