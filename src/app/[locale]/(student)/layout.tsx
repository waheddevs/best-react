import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";

import { DashboardServiceUnavailable } from "@/components/ui/DashboardServiceUnavailable";
import { isLocale } from "@/config/Locales";
import { getStudentWorkspaceCopy } from "@/dictionaries/student/StudentWorkspace";
import { StudentWorkspaceShell } from "@/features/student/layout/StudentWorkspaceShell";
import { getDashboardAccessState } from "@/lib/DashboardAccess";
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

  const accessState = await getDashboardAccessState("STUDENT");
  if (accessState === "expired") {
    redirect(`/${locale}/login?role=student&reason=session-expired`);
  }
  if (accessState === "unauthenticated") {
    redirect(`/${locale}/login?role=student`);
  }
  if (accessState === "unavailable") {
    return <DashboardServiceUnavailable locale={locale} />;
  }

  return (
    <StudentThemeProvider>
      <StudentWorkspaceShell copy={getStudentWorkspaceCopy(locale)} locale={locale}>
        {children}
      </StudentWorkspaceShell>
    </StudentThemeProvider>
  );
}
