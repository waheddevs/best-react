import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";

import { isLocale } from "@/config/Locales";
import { teacherPreviewData } from "@/data/teacher/TeacherPreviewData";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";
import { TeacherWorkspaceShell } from "@/features/teacher/layout/TeacherWorkspaceShell";
import { canAccessDashboard } from "@/lib/DashboardAccess";

export const metadata: Metadata = {
  robots: { follow: false, index: false },
};

type TeacherLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function TeacherLayout({ children, params }: TeacherLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (!(await canAccessDashboard("TEACHER"))) redirect(`/${locale}/login?role=teacher`);

  return (
    <TeacherWorkspaceShell
      copy={getTeacherCopy(locale)}
      locale={locale}
      notifications={teacherPreviewData.notifications}
      profile={teacherPreviewData.profile}
    >
      {children}
    </TeacherWorkspaceShell>
  );
}
