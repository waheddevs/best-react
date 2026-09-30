"use client";

import AccountBalanceWalletRounded from "@mui/icons-material/AccountBalanceWalletRounded";
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import PaidRounded from "@mui/icons-material/PaidRounded";
import PaymentsRounded from "@mui/icons-material/PaymentsRounded";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { usePathname, useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";

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
  currentYear: number;
  locale: Locale;
  selectedYear: number;
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

export function FinanceDashboard({
  copy,
  currentYear,
  locale,
  selectedYear,
  snapshots,
}: FinanceDashboardProps) {
  /* HOOKS */
  const pathname = usePathname();
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState(
    snapshots[0]?.month ?? `${String(selectedYear)}-01`,
  );
  const [yearAnchor, setYearAnchor] = useState<HTMLElement | null>(null);
  const snapshot = snapshots.find((item) => item.month === selectedMonth);
  const years = Array.from({ length: currentYear - 2018 + 1 }, (_, index) => currentYear - index);
  const months = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    return {
      id: `${String(selectedYear)}-${String(month).padStart(2, "0")}`,
      label: new Intl.DateTimeFormat(locale, { month: "long" }).format(
        new Date(Date.UTC(selectedYear, index, 1)),
      ),
    };
  });

  const openYearMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setYearAnchor(event.currentTarget);
  };

  const selectYear = (year: number) => {
    setYearAnchor(null);
    router.push(`${pathname}?year=${String(year)}`);
  };

  const formatMetric = (metric: TeacherFinanceMetric) => {
    if (metric.valueType === "currency") return formatTeacherCurrency(metric.value);
    if (metric.valueType === "percentage") return `${metric.value}%`;
    return formatTeacherNumber(metric.value);
  };

  return (
    <main>
      <TeacherPageHeader eyebrow={copy.finance.eyebrow} title={copy.finance.pageTitle} />

      <div className="teacherFinance__filters">
        <div
          aria-label={copy.finance.pageTitle}
          className="teacherFinance__monthTabs"
          role="tablist"
        >
          {months.map((month) => (
            <button
              aria-selected={selectedMonth === month.id}
              data-active={selectedMonth === month.id}
              key={month.id}
              onClick={() => setSelectedMonth(month.id)}
              role="tab"
              type="button"
            >
              {month.label}
            </button>
          ))}
        </div>
        <div className="teacherFinance__yearSelect">
          <span id="teacher-finance-year-label">{copy.finance.year}</span>
          <button
            aria-controls={yearAnchor ? "teacher-finance-year-menu" : undefined}
            aria-expanded={Boolean(yearAnchor)}
            aria-haspopup="menu"
            aria-labelledby="teacher-finance-year-label teacher-finance-year-button"
            id="teacher-finance-year-button"
            onClick={openYearMenu}
            type="button"
          >
            {selectedYear}
            <ExpandMoreRounded aria-hidden="true" />
          </button>
          <Menu
            anchorEl={yearAnchor}
            id="teacher-finance-year-menu"
            onClose={() => setYearAnchor(null)}
            open={Boolean(yearAnchor)}
            slotProps={{
              list: { "aria-labelledby": "teacher-finance-year-label" },
              paper: { className: "teacherFinance__yearMenu" },
            }}
          >
            {years.map((year) => (
              <MenuItem
                key={year}
                onClick={() => selectYear(year)}
                selected={year === selectedYear}
              >
                {year}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>

      {snapshot ? (
        <>
          <section className="teacherFinance__summary">
            <article className="teacherFinance__heroCard">
              <div className="teacherFinance__heroHeader">
                <span className="teacherFinance__heroIcon">
                  <PaidRounded aria-hidden="true" />
                </span>
                <span>{copy.finance.income}</span>
                <b>
                  {snapshot.paymentRate}% {copy.finance.collected}
                </b>
              </div>
              <strong>{formatTeacherCurrency(snapshot.income)}</strong>
              <div className="teacherFinance__bar">
                <span style={{ width: `${snapshot.paymentRate}%` }} />
              </div>
              <div className="teacherFinance__heroDetails">
                <span>
                  {copy.finance.expectedAmount}
                  <b>{formatTeacherCurrency(snapshot.expectedAmount)}</b>
                </span>
                <span>
                  {copy.finance.remaining}
                  <b>
                    {formatTeacherCurrency(Math.max(0, snapshot.expectedAmount - snapshot.income))}
                  </b>
                </span>
              </div>
            </article>
            <article className="teacherFinance__rateCard">
              <span>{copy.finance.attendanceRate}</span>
              <strong>{snapshot.attendanceRate}%</strong>
              <span
                className="teacherFinance__ring"
                style={
                  {
                    "--finance-progress": `${snapshot.attendanceRate * 3.6}deg`,
                  } as React.CSSProperties
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
        </>
      ) : (
        <section className="teacherFinance__empty">{copy.finance.noData}</section>
      )}
    </main>
  );
}
