import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { isLocale } from "@/config/Locales";
import { createStudentMetadata } from "@/features/student/layout/StudentMetadata";
import { StudentDashboard } from "@/features/student/workspace/StudentDashboard";

type PageProps = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? createStudentMetadata(locale, "dashboard") : {};
}
export default async function StudentPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <StudentDashboard locale={locale} />;
}
