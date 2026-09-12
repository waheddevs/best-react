import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getAdminWorkspaceCopy } from "@/dictionaries/admin/AdminWorkspace";
import { loadAdminWorkspaceData } from "@/lib/admin/AdminWorkspaceData";
import type { AdminNavigationKey } from "@/types/admin/AdminWorkspace";

import { AdminDetailPage } from "./AdminDetailPage";

type AdminWorkspaceDetailRouteProps = {
  backHref: string;
  id: string;
  locale: string;
  sectionKey: AdminNavigationKey;
};

export async function AdminWorkspaceDetailRoute({
  backHref,
  id,
  locale,
  sectionKey,
}: AdminWorkspaceDetailRouteProps) {
  if (!isLocale(locale)) notFound();
  const copy = getAdminWorkspaceCopy(locale);
  const data = await loadAdminWorkspaceData(sectionKey, locale);
  const record = data.records.find(
    (item) => item.id === id || item.href?.endsWith(`/${encodeURIComponent(id)}`),
  );
  if (!record) notFound();
  return (
    <AdminDetailPage backHref={backHref} common={copy.common} locale={locale} record={record} />
  );
}
