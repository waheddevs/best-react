import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { teacherPreviewData } from "@/data/teacher/TeacherPreviewData";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";
import { createTeacherMetadata } from "@/features/teacher/layout/TeacherMetadata";
import { isDashboardPreviewEnabled } from "@/lib/DashboardAccess";
import { loadConnectedTeacherGroups } from "@/lib/teacher/TeacherGroupData";

import { DashboardOverview } from "./DashboardOverview";

type TeacherDashboardPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: TeacherDashboardPageProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? createTeacherMetadata(locale, "dashboard") : {};
}

export default async function TeacherDashboardPage({ params }: TeacherDashboardPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const preview = isDashboardPreviewEnabled();
  const groups = preview ? teacherPreviewData.groups : await loadConnectedTeacherGroups(locale);
  const data = preview ? teacherPreviewData : { ...teacherPreviewData, groups };

  return <DashboardOverview copy={getTeacherCopy(locale)} data={data} locale={locale} />;
}
