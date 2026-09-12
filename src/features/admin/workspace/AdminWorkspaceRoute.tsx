import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getAdminWorkspaceCopy } from "@/dictionaries/admin/AdminWorkspace";
import { getAdminProvisionUserCopy } from "@/dictionaries/admin/AdminProvisionUser";
import type { AdminNavigationKey } from "@/types/admin/AdminWorkspace";

import { AdminSectionPage } from "./AdminSectionPage";

type AdminWorkspaceRouteProps = { locale: string; sectionKey: AdminNavigationKey };

export function AdminWorkspaceRoute({ locale, sectionKey }: AdminWorkspaceRouteProps) {
  if (!isLocale(locale)) notFound();
  const copy = getAdminWorkspaceCopy(locale);
  const provisionRole =
    sectionKey === "students" ? "STUDENT" : sectionKey === "teachers" ? "TEACHER" : undefined;
  return (
    <AdminSectionPage
      common={copy.common}
      locale={locale}
      provisionCopy={provisionRole ? getAdminProvisionUserCopy(locale, provisionRole) : undefined}
      provisionRole={provisionRole}
      section={copy.sections[sectionKey]}
    />
  );
}
