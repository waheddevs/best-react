import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { teacherPreviewData } from "@/data/teacher/TeacherPreviewData";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";
import { createTeacherMetadata } from "@/features/teacher/layout/TeacherMetadata";

import { GroupsCatalog } from "./GroupsCatalog";

type GroupsPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: GroupsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? createTeacherMetadata(locale, "groups") : {};
}

export default async function GroupsPage({ params }: GroupsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <GroupsCatalog
      copy={getTeacherCopy(locale)}
      groups={teacherPreviewData.groups}
      locale={locale}
    />
  );
}
