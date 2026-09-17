import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";

import { auth } from "@/Auth";
import { DashboardServiceUnavailable } from "@/components/ui/DashboardServiceUnavailable";
import { isLocale } from "@/config/Locales";
import { getAdminWorkspaceCopy } from "@/dictionaries/admin/AdminWorkspace";
import { AdminWorkspaceShell } from "@/features/admin/layout/AdminWorkspaceShell";
import { getDashboardAccessState } from "@/lib/DashboardAccess";
import { AdminThemeProvider } from "@/theme/AdminThemeProvider";

export const metadata: Metadata = { robots: { follow: false, index: false } };

type AdminLayoutProps = { children: ReactNode; params: Promise<{ locale: string }> };

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const accessState = await getDashboardAccessState("ADMIN");
  if (accessState === "expired") {
    redirect(`/${locale}/login?role=admin&reason=session-expired`);
  }
  if (accessState === "unauthenticated") redirect(`/${locale}/login?role=admin`);
  if (accessState === "unavailable") return <DashboardServiceUnavailable locale={locale} />;
  const session = await auth();
  const copy = getAdminWorkspaceCopy(locale);
  return (
    <AdminThemeProvider>
      <AdminWorkspaceShell
        adminName={session?.user?.name ?? copy.common.workspaceLabel}
        copy={copy}
        locale={locale}
      >
        {children}
      </AdminWorkspaceShell>
    </AdminThemeProvider>
  );
}
