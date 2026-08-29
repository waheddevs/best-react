import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/config/Locales";
import { teacherPreviewData } from "@/data/teacher/TeacherPreviewData";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";
import { createTeacherMetadata } from "@/features/teacher/layout/TeacherMetadata";
import { TeacherProfile } from "./TeacherProfile";
type ProfilePageProps = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? createTeacherMetadata(locale, "profile") : {};
}
export default async function ProfilePage({ params }: ProfilePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <TeacherProfile
      copy={getTeacherCopy(locale)}
      locale={locale}
      profile={teacherPreviewData.profile}
    />
  );
}
