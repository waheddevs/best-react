import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { teacherPreviewData } from "@/data/teacher/TeacherPreviewData";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";
import { createTeacherMetadata } from "@/features/teacher/layout/TeacherMetadata";
import { isDashboardPreviewEnabled } from "@/lib/DashboardAccess";
import { loadTeacherFinanceSnapshots } from "@/lib/teacher/TeacherWorkspaceData";

import { FinanceDashboard } from "./FinanceDashboard";

type FinancePageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ year?: string | string[] }>;
};

export async function generateMetadata({ params }: FinancePageProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? createTeacherMetadata(locale, "finance") : {};
}

export default async function FinancePage({ params, searchParams }: FinancePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const currentYear = new Date().getUTCFullYear();
  const requestedYear = Number((await searchParams).year);
  const selectedYear =
    Number.isInteger(requestedYear) && requestedYear >= 2018 && requestedYear <= currentYear
      ? requestedYear
      : currentYear;
  const snapshots = isDashboardPreviewEnabled()
    ? teacherPreviewData.financeSnapshots.filter((snapshot) =>
        snapshot.month.startsWith(`${String(selectedYear)}-`),
      )
    : await loadTeacherFinanceSnapshots(selectedYear);
  return (
    <FinanceDashboard
      copy={getTeacherCopy(locale)}
      currentYear={currentYear}
      key={selectedYear}
      locale={locale}
      selectedYear={selectedYear}
      snapshots={snapshots}
    />
  );
}
