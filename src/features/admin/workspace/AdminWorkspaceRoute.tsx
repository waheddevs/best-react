import { notFound, redirect } from "next/navigation";

import { auth } from "@/Auth";
import { isLocale } from "@/config/Locales";
import { getAdminWorkspaceCopy } from "@/dictionaries/admin/AdminWorkspace";
import { getAdminProvisionUserCopy } from "@/dictionaries/admin/AdminProvisionUser";
import { loadAdminMessages, loadAdminWorkspaceData } from "@/lib/admin/AdminWorkspaceData";
import type { AdminNavigationKey } from "@/types/admin/AdminWorkspace";

import { AdminMessages } from "./AdminMessages";
import { AdminSectionPage } from "./AdminSectionPage";

type AdminWorkspaceRouteProps = {
  locale: string;
  sectionKey: AdminNavigationKey;
  initialDetailId?: string;
};

export async function AdminWorkspaceRoute({
  locale,
  sectionKey,
  initialDetailId,
}: AdminWorkspaceRouteProps) {
  if (!isLocale(locale)) notFound();
  const session = await auth();
  if (session?.bestApi?.role !== "ADMIN" || !session.bestApi.accessToken) {
    redirect(`/${locale}/login?role=admin`);
  }
  if (sectionKey === "messages")
    return <AdminMessages locale={locale} initialMessages={await loadAdminMessages()} />;
  const copy = getAdminWorkspaceCopy(locale);
  const data = await loadAdminWorkspaceData(sectionKey, locale);
  if (initialDetailId && !data.records.some((record) => record.id === initialDetailId)) notFound();
  const provisionRole =
    sectionKey === "students" ? "STUDENT" : sectionKey === "teachers" ? "TEACHER" : undefined;
  return (
    <AdminSectionPage
      common={copy.common}
      locale={locale}
      provisionCopy={provisionRole ? getAdminProvisionUserCopy(locale, provisionRole) : undefined}
      provisionGroups={data.provisionGroups}
      provisionRole={provisionRole}
      section={{ ...copy.sections[sectionKey], ...data, metrics: data.metrics ?? [] }}
      sectionKey={sectionKey}
      initialDetailId={initialDetailId}
    />
  );
}
