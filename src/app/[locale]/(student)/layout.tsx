import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";

import { DashboardServiceUnavailable } from "@/components/ui/DashboardServiceUnavailable";
import { isLocale } from "@/config/Locales";
import { studentSettingsPreview } from "@/data/student/StudentSettingsPreview";
import { getStudentWorkspaceCopy } from "@/dictionaries/student/StudentWorkspace";
import { StudentWorkspaceShell } from "@/features/student/layout/StudentWorkspaceShell";
import { getDashboardAccessState, isDashboardPreviewEnabled } from "@/lib/DashboardAccess";
import { loadStudentSettingsIdentity } from "@/lib/student/StudentSettingsData";
import { StudentThemeProvider } from "@/theme/StudentThemeProvider";

import "@/scss/student/main.scss";

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

  const identity = isDashboardPreviewEnabled()
    ? studentSettingsPreview
    : await loadStudentSettingsIdentity().catch(() => null);
  const profile = identity
    ? { avatarUrl: identity.avatarUrl, displayName: identity.displayName }
    : null;

  return (
    <StudentThemeProvider>
      <StudentWorkspaceShell
        copy={getStudentWorkspaceCopy(locale)}
        locale={locale}
        profile={profile}
      >
        {children}
      </StudentWorkspaceShell>
    </StudentThemeProvider>
  );
}
