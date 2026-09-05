import type { Metadata } from "next";

import type { Locale } from "@/config/Locales";
import { getAdminWorkspaceCopy } from "@/dictionaries/admin/AdminWorkspace";
import type { AdminNavigationKey } from "@/types/admin/AdminWorkspace";

export function createAdminMetadata(locale: Locale, key: AdminNavigationKey): Metadata {
  const section = getAdminWorkspaceCopy(locale).sections[key];
  return {
    description: section.description,
    robots: { follow: false, index: false },
    title: section.title,
  };
}
