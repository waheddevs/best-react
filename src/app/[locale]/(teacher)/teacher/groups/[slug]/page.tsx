import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, locales } from "@/config/Locales";
import {
  getTeacherGroup,
  getTeacherGroupLearners,
  teacherPreviewData,
} from "@/data/teacher/TeacherPreviewData";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";

import { GroupHeader } from "./GroupHeader";
import { GroupStudentList } from "./GroupStudentList";

type GroupDetailPageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    teacherPreviewData.groups.map((group) => ({ locale, slug: group.slug })),
  );
}

export async function generateMetadata({ params }: GroupDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const group = getTeacherGroup(slug);
  if (!group) return {};
  return {
    title: group.name,
    description: getTeacherCopy(locale).metadata.groups.description,
    robots: { follow: false, index: false },
  };
}

export default async function GroupDetailPage({ params }: GroupDetailPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const group = getTeacherGroup(slug);
  if (!group) notFound();
  const copy = getTeacherCopy(locale);

  return (
    <main>
      <GroupHeader copy={copy} group={group} locale={locale} />
      <GroupStudentList
        copy={copy}
        initialLearners={getTeacherGroupLearners(slug)}
        locale={locale}
      />
    </main>
  );
}
