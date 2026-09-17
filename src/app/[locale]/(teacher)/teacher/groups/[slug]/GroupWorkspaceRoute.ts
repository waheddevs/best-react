import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, locales } from "@/config/Locales";
import { getTeacherGroup, teacherPreviewData } from "@/data/teacher/TeacherPreviewData";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";
import { isDashboardPreviewEnabled } from "@/lib/DashboardAccess";
import { PublicApiError } from "@/lib/ApiError";
import { loadConnectedTeacherGroup } from "@/lib/teacher/TeacherGroupData";
import type { TeacherGroupWorkspaceTab } from "@/types/teacher/Teacher";

export type GroupWorkspaceParams = Promise<{ locale: string; slug: string }>;

export function generateGroupStaticParams() {
  return locales.flatMap((locale) =>
    teacherPreviewData.groups.map((group) => ({ locale, slug: group.slug })),
  );
}

export async function getGroupWorkspaceContext(params: GroupWorkspaceParams) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const preview = isDashboardPreviewEnabled();
  let group;
  if (preview) {
    group = getTeacherGroup(slug);
  } else {
    try {
      group = await loadConnectedTeacherGroup(locale, slug);
    } catch (error) {
      if (!(error instanceof PublicApiError && error.code === "NOT_FOUND")) throw error;
    }
  }
  if (!group) notFound();

  return { connected: !preview, copy: getTeacherCopy(locale), group, locale, slug };
}

export async function createGroupWorkspaceMetadata(
  params: GroupWorkspaceParams,
  tab: TeacherGroupWorkspaceTab,
): Promise<Metadata> {
  const { copy, group } = await getGroupWorkspaceContext(params);

  return {
    title: `${group.name} — ${copy.groupWorkspace.tabs[tab]}`,
    description: copy.metadata.groups.description,
    robots: { follow: false, index: false },
  };
}
