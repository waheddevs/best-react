import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { teacherPreviewData } from "@/data/teacher/TeacherPreviewData";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";
import { createTeacherMetadata } from "@/features/teacher/layout/TeacherMetadata";

import { FinanceDashboard } from "./FinanceDashboard";

type FinancePageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: FinancePageProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? createTeacherMetadata(locale, "finance") : {};
}

export default async function FinancePage({ params }: FinancePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <FinanceDashboard
      copy={getTeacherCopy(locale)}
      locale={locale}
      snapshots={teacherPreviewData.financeSnapshots}
    />
  );
}
