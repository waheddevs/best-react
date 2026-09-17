import type { CSSProperties } from "react";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import type { Locale } from "@/config/Locales";
import styles from "@/css/teacher/dashboard.module.css";
import {
  formatTeacherCompactCurrency,
  formatTeacherCurrency,
  formatTeacherOneDecimal,
} from "@/lib/teacher/TeacherNumberFormat";
import type { TeacherCopy, TeacherFinanceSnapshot } from "@/types/teacher/Teacher";

type DashboardFinanceProps = {
  copy: TeacherCopy;
  locale: Locale;
  previousSnapshot?: TeacherFinanceSnapshot;
  snapshot: TeacherFinanceSnapshot;
};

export function DashboardFinance({
  copy,
  locale,
  previousSnapshot,
  snapshot,
}: DashboardFinanceProps) {
  const paid = Math.max(0, snapshot.income);
  const remaining = Math.max(0, snapshot.expectedAmount - paid);
  const paidPercent =
    snapshot.expectedAmount > 0 ? Math.min(100, (paid / snapshot.expectedAmount) * 100) : 0;
  const change =
    previousSnapshot && previousSnapshot.income > 0
      ? ((snapshot.income - previousSnapshot.income) / previousSnapshot.income) * 100
      : null;
  const percent = formatTeacherOneDecimal(paidPercent);
  const changeLabel =
    change === null ? "—" : `${change >= 0 ? "+" : ""}${formatTeacherOneDecimal(change)}%`;

  return (
    <section aria-labelledby="dashboard-finance-title" className={styles.teacherDashboard__finance}>
      <div className={styles.teacherDashboard__financeCard}>
        <header className={styles.teacherDashboard__financeHeader}>
          <div>
            <h2 id="dashboard-finance-title">{copy.finance.pageTitle}</h2>
          </div>
          <ScrollToTopLink
            className={styles.teacherDashboard__sectionAction}
            href={`/${locale}/teacher/finance`}
          >
            {copy.dashboard.financeViewMore}
          </ScrollToTopLink>
        </header>

        <span aria-hidden="true" className={styles.teacherDashboard__financeDivider} />

        <div className={styles.teacherDashboard__financeSummary}>
          <div>
            <span>{snapshot.label[locale]}</span>
            <strong title={formatTeacherCurrency(snapshot.income)}>
              {formatTeacherCompactCurrency(snapshot.income)}
            </strong>
          </div>
          <div>
            <span>{previousSnapshot?.label[locale] ?? "—"}</span>
            <strong
              title={previousSnapshot ? formatTeacherCurrency(previousSnapshot.income) : undefined}
            >
              {previousSnapshot ? formatTeacherCompactCurrency(previousSnapshot.income) : "—"}
            </strong>
          </div>
          <div data-direction={change === null ? "none" : change >= 0 ? "up" : "down"}>
            <span>{copy.dashboard.financeChange}</span>
            <strong>{changeLabel}</strong>
          </div>
        </div>

        <span aria-hidden="true" className={styles.teacherDashboard__financeDivider} />

        <div className={styles.teacherDashboard__financeChartRow}>
          <div
            aria-label={`${copy.finance.labels.paid}: ${formatTeacherCurrency(paid)}; ${copy.finance.labels.debt}: ${formatTeacherCurrency(remaining)}`}
            className={styles.teacherDashboard__financeChart}
            role="img"
            style={{ "--teacher-finance-paid": `${paidPercent}%` } as CSSProperties}
          >
            <div className={styles.teacherDashboard__financeChartCenter}>
              <strong>{percent}%</strong>
              <span>{copy.finance.labels.rate}</span>
            </div>
          </div>
          <div className={styles.teacherDashboard__financeDetails}>
            <span>{copy.finance.labels.expected}</span>
            <strong title={formatTeacherCurrency(snapshot.expectedAmount)}>
              {formatTeacherCompactCurrency(snapshot.expectedAmount)}
            </strong>
            <ul className={styles.teacherDashboard__financeLegend}>
              <li data-tone="paid">
                <span>{copy.finance.labels.paid}</span>
                <b title={formatTeacherCurrency(paid)}>{formatTeacherCompactCurrency(paid)}</b>
              </li>
              <li data-tone="remaining">
                <span>{copy.finance.labels.debt}</span>
                <b title={formatTeacherCurrency(remaining)}>
                  {formatTeacherCompactCurrency(remaining)}
                </b>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
