import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";

import { isLocale } from "@/config/Locales";
import { getAdminWorkspaceCopy } from "@/dictionaries/admin/AdminWorkspace";
import { AdminWorkspaceShell } from "@/features/admin/layout/AdminWorkspaceShell";
import { canAccessDashboard } from "@/lib/DashboardAccess";
import { AdminThemeProvider } from "@/theme/AdminThemeProvider";

export const metadata: Metadata = { robots: { follow: false, index: false } };

type AdminLayoutProps = { children: ReactNode; params: Promise<{ locale: string }> };

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (!(await canAccessDashboard("ADMIN"))) redirect(`/${locale}/login?role=admin`);
  return (
    <AdminThemeProvider>
      <AdminWorkspaceShell copy={getAdminWorkspaceCopy(locale)} locale={locale}>
        {children}
      </AdminWorkspaceShell>
    </AdminThemeProvider>
  );
}
