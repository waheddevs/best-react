import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getAdminWorkspaceCopy } from "@/dictionaries/admin/AdminWorkspace";
import { AdminDashboard } from "@/features/admin/dashboard/AdminDashboard";
import { createAdminMetadata } from "@/features/admin/layout/AdminMetadata";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? createAdminMetadata(locale, "dashboard") : {};
}

export default async function AdminPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getAdminWorkspaceCopy(locale);
  return <AdminDashboard common={copy.common} locale={locale} section={copy.sections.dashboard} />;
}
