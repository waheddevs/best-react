import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, locales, type Locale } from "@/config/Locales";
import { getTeacherGroup, teacherPreviewData } from "@/data/teacher/TeacherPreviewData";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";
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
  const group = getTeacherGroup(slug);
  if (!group) notFound();

  return { copy: getTeacherCopy(locale), group, locale, slug };
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

export function formatGroupWorkspaceDate(date: string, locale: Locale, months: string[]) {
  const [, monthValue, dayValue] = date.split("-");
  const monthIndex = Number.parseInt(monthValue ?? "", 10) - 1;
  const day = Number.parseInt(dayValue ?? "", 10);
  const month = months[monthIndex];

  if (!month || !Number.isInteger(day)) return date;
  if (locale === "uz") return `${day}-${month}`;
  if (locale === "ru") return `${day} ${month}`;
  return `${month} ${day}`;
}
