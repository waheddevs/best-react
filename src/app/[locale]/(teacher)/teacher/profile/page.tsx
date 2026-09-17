import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/config/Locales";
import { teacherPreviewData } from "@/data/teacher/TeacherPreviewData";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";
import { createTeacherMetadata } from "@/features/teacher/layout/TeacherMetadata";
import { isDashboardPreviewEnabled } from "@/lib/DashboardAccess";
import { loadTeacherProfile } from "@/lib/teacher/TeacherWorkspaceData";
import type { TeacherProfileRecord } from "@/types/teacher/TeacherProfile";
import { TeacherProfile } from "./TeacherProfile";
import { TeacherProfileUnavailable } from "./TeacherProfileUnavailable";
type ProfilePageProps = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? createTeacherMetadata(locale, "profile") : {};
}
export default async function ProfilePage({ params }: ProfilePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (!isDashboardPreviewEnabled()) {
    const profile = await loadTeacherProfile().catch(() => null);
    return profile ? (
      <TeacherProfile connected copy={getTeacherCopy(locale)} locale={locale} profile={profile} />
    ) : (
      <TeacherProfileUnavailable locale={locale} />
    );
  }
  const preview = teacherPreviewData.profile;
  const profile: TeacherProfileRecord = {
    avatarMediaObjectId: null,
    avatarUrl: null,
    branchName: preview.branch[locale],
    displayName: preview.displayName,
    email: preview.handle,
    initials: preview.initials,
    phone: preview.phone,
    preferredLanguage: locale.toUpperCase() as TeacherProfileRecord["preferredLanguage"],
    teacherSubject: preview.subject[locale],
  };
  return (
    <TeacherProfile
      copy={getTeacherCopy(locale)}
      locale={locale}
      profile={profile}
      connected={false}
    />
  );
}
