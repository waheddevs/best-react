import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { teacherPreviewData } from "@/data/teacher/TeacherPreviewData";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";
import { createTeacherMetadata } from "@/features/teacher/layout/TeacherMetadata";

import { GeneralGroupChat } from "./GeneralGroupChat";

type GeneralGroupPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: GeneralGroupPageProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? createTeacherMetadata(locale, "generalGroup") : {};
}

export default async function GeneralGroupPage({ params }: GeneralGroupPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <GeneralGroupChat
      copy={getTeacherCopy(locale)}
      learners={teacherPreviewData.learners.filter(
        (learner) => learner.groupSlug === "beginner-nova",
      )}
      locale={locale}
      messages={teacherPreviewData.messages}
      profile={teacherPreviewData.profile}
    />
  );
}
