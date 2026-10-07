import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { studentGroupPreview } from "@/data/student/StudentGroupPreview";
import { getStudentGroupCopy } from "@/dictionaries/student/StudentGroup";
import { createStudentMetadata } from "@/features/student/layout/StudentMetadata";
import { StudentSectionHero } from "@/features/student/workspace/StudentSectionHero";
import { isDashboardPreviewEnabled } from "@/lib/DashboardAccess";
import { loadStudentGroup } from "@/lib/student/StudentGroupData";

import { StudentGroupInformation } from "./StudentGroupInformation";
import { StudentGroupLessons } from "./StudentGroupLessons";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    ...createStudentMetadata(locale, "schedule"),
    title: getStudentGroupCopy(locale).heroTitle,
  };
}

export default async function StudentSchedulePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const preview = isDashboardPreviewEnabled();
  const group = preview ? studentGroupPreview : await loadStudentGroup(locale);
  const copy = getStudentGroupCopy(locale);

  return (
    <main className="studentWorkspace studentGroup">
      <StudentSectionHero
        description={copy.heroDescription}
        eyebrow={copy.eyebrow}
        kind="schedule"
        label={copy.heroLabel}
        locale={locale}
        preview={preview}
        title={copy.heroTitle}
        value={group?.memberCount}
      />
      <StudentGroupInformation copy={copy} group={group} locale={locale} />
      <StudentGroupLessons connected={!preview} copy={copy} group={group} />
    </main>
  );
}
