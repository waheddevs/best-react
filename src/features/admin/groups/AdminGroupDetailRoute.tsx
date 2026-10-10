import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getAdminGroupsCopy } from "@/dictionaries/admin/AdminGroups";
import { getAdminWorkspaceCopy } from "@/dictionaries/admin/AdminWorkspace";
import { loadAdminWorkspaceData } from "@/lib/admin/AdminWorkspaceData";

import { AdminGroupDetailPage } from "./AdminGroupDetailPage";

type AdminGroupDetailRouteProps = {
  locale: string;
  slug: string;
};

export async function AdminGroupDetailRoute({ locale, slug }: AdminGroupDetailRouteProps) {
  if (!isLocale(locale)) notFound();
  const workspaceCopy = getAdminWorkspaceCopy(locale);
  const data = await loadAdminWorkspaceData("groups", locale);
  const record = data.records.find(
    (item) => item.id === slug || item.group?.slug === slug || item.href?.endsWith(`/${slug}`),
  );
  if (!record?.group) notFound();
  return (
    <AdminGroupDetailPage
      common={workspaceCopy.common}
      copy={getAdminGroupsCopy(locale)}
      locale={locale}
      record={record}
    />
  );
}
