import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { loadConnectedTeacherStudentAttempts } from "@/lib/teacher/TeacherGroupData";

import { TeacherStudentAttempts } from "./TeacherStudentAttempts";

export default async function TeacherStudentAttemptsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; studentId: string }>;
}) {
  const { locale, slug, studentId } = await params;
  if (!isLocale(locale)) notFound();
  const attempts = await loadConnectedTeacherStudentAttempts(locale, slug, studentId);
  return <TeacherStudentAttempts attempts={attempts} groupId={slug} locale={locale} />;
}
