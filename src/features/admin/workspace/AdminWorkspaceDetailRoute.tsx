import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getAdminWorkspaceCopy } from "@/dictionaries/admin/AdminWorkspace";
import type { AdminNavigationKey } from "@/types/admin/AdminWorkspace";

import { AdminDetailPage } from "./AdminDetailPage";

type AdminWorkspaceDetailRouteProps = {
  backHref: string;
  id: string;
  locale: string;
  sectionKey: AdminNavigationKey;
};

export function AdminWorkspaceDetailRoute({
  backHref,
  id,
  locale,
  sectionKey,
}: AdminWorkspaceDetailRouteProps) {
  if (!isLocale(locale)) notFound();
  const copy = getAdminWorkspaceCopy(locale);
  const record = copy.sections[sectionKey].records.find((item) => item.id === id);
  if (!record) notFound();
  return (
    <AdminDetailPage backHref={backHref} common={copy.common} locale={locale} record={record} />
  );
}
