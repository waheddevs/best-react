import AssignmentTurnedInRounded from "@mui/icons-material/AssignmentTurnedInRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import SchoolRounded from "@mui/icons-material/SchoolRounded";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import type { AdminSectionCopy } from "@/types/admin/AdminWorkspace";

type AdminDashboardMetricsProps = {
  locale: Locale;
  metrics: AdminSectionCopy["metrics"];
  title: string;
};

const metricIcons = [GroupsRounded, SchoolRounded, TrendingUpRounded, AssignmentTurnedInRounded];

export function AdminDashboardMetrics({ locale, metrics, title }: AdminDashboardMetricsProps) {
  return (
    <section aria-label={title} className="adminDashboard__metrics">
      {metrics.map((metric, index) => {
        const Icon = metricIcons[index] ?? TrendingUpRounded;
        const content = (
          <>
            <span
              className={`adminDashboard__metricIcon adminDashboard__metricIcon_${metric.tone}`}
            >
              <Icon aria-hidden="true" />
            </span>
            <span className="adminDashboard__metricCopy">
              <small>{metric.label}</small>
              <strong>{metric.value}</strong>
            </span>
            <TrendingUpRounded aria-hidden="true" className="adminDashboard__metricTrend" />
          </>
        );
        return metric.href ? (
          <Link href={`/${locale}${metric.href}`} key={metric.label}>
            {content}
          </Link>
        ) : (
          <div key={metric.label}>{content}</div>
        );
      })}
    </section>
  );
}
