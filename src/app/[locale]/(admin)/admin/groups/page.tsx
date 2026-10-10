import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getAdminGroupsCopy } from "@/dictionaries/admin/AdminGroups";
import { getAdminWorkspaceCopy } from "@/dictionaries/admin/AdminWorkspace";
import { AdminGroups } from "@/features/admin/groups/AdminGroups";
import { loadAdminWorkspaceData } from "@/lib/admin/AdminWorkspaceData";

type PageProps = { params: Promise<{ locale: string }> };
export default async function AdminGroupsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const workspaceCopy = getAdminWorkspaceCopy(locale);
  const data = await loadAdminWorkspaceData("groups", locale);
  return (
    <AdminGroups
      common={workspaceCopy.common}
      copy={getAdminGroupsCopy(locale)}
      locale={locale}
      section={{ ...workspaceCopy.sections.groups, ...data, metrics: data.metrics ?? [] }}
    />
  );
}
