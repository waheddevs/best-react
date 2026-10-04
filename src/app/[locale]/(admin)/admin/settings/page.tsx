import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { loadAdminProfile } from "@/lib/admin/AdminWorkspaceData";

import { AdminSettings } from "./AdminSettings";

type PageProps = { params: Promise<{ locale: string }> };

export default async function AdminSettingsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const profile = await loadAdminProfile();
  return <AdminSettings locale={locale} profile={profile} />;
}
