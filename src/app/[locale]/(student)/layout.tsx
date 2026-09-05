import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";

import { isLocale } from "@/config/Locales";
import { getStudentWorkspaceCopy } from "@/dictionaries/student/StudentWorkspace";
import { StudentWorkspaceShell } from "@/features/student/layout/StudentWorkspaceShell";
import { canAccessDashboard } from "@/lib/DashboardAccess";
import { StudentThemeProvider } from "@/theme/StudentThemeProvider";

export const metadata = { robots: { follow: false, index: false } };

type StudentLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function StudentLayout({ children, params }: StudentLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  if (!(await canAccessDashboard("STUDENT"))) {
    redirect(`/${locale}/login?role=student`);
  }

  return (
    <StudentThemeProvider>
      <StudentWorkspaceShell copy={getStudentWorkspaceCopy(locale)} locale={locale}>
        {children}
      </StudentWorkspaceShell>
    </StudentThemeProvider>
  );
}
