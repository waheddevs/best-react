import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { teacherPreviewData } from "@/data/teacher/TeacherPreviewData";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";
import { createTeacherMetadata } from "@/features/teacher/layout/TeacherMetadata";
import { isDashboardPreviewEnabled } from "@/lib/DashboardAccess";
import { loadConnectedTeacherGroups } from "@/lib/teacher/TeacherGroupData";
import { loadTeacherDashboardMetrics } from "@/lib/teacher/TeacherWorkspaceData";

import { DashboardOverview } from "./DashboardOverview";

type TeacherDashboardPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: TeacherDashboardPageProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? createTeacherMetadata(locale, "dashboard") : {};
}

export default async function TeacherDashboardPage({ params }: TeacherDashboardPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  let data = teacherPreviewData;
  if (!isDashboardPreviewEnabled()) {
    const [groups, metrics] = await Promise.all([
      loadConnectedTeacherGroups(locale),
      loadTeacherDashboardMetrics(),
    ]);
    const values = {
      new: metrics.newLearnersThisMonth,
      active: metrics.totalActiveLearners,
      departed: metrics.departedThisMonth,
      together: metrics.monthsWithBest,
    };
    data = {
      ...teacherPreviewData,
      groups,
      dashboardMetrics: teacherPreviewData.dashboardMetrics.map((metric) => ({
        ...metric,
        value: values[metric.id],
      })),
    };
  }

  return <DashboardOverview copy={getTeacherCopy(locale)} data={data} locale={locale} />;
}
