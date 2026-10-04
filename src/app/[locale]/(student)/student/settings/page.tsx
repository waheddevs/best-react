import { notFound } from "next/navigation";
import Link from "next/link";

import { isLocale } from "@/config/Locales";
import { studentSettingsPreview } from "@/data/student/StudentSettingsPreview";
import { getStudentSettingsCopy } from "@/dictionaries/student/StudentSettings";
import { isDashboardPreviewEnabled } from "@/lib/DashboardAccess";
import { loadStudentSettingsIdentity } from "@/lib/student/StudentSettingsData";

import { StudentAccountSettings } from "./StudentAccountSettings";

type PageProps = { params: Promise<{ locale: string }> };
export default async function StudentSettingsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getStudentSettingsCopy(locale);
  if (isDashboardPreviewEnabled()) {
    return (
      <StudentAccountSettings
        connected={false}
        copy={copy}
        locale={locale}
        profile={studentSettingsPreview}
      />
    );
  }
  const profile = await loadStudentSettingsIdentity().catch(() => null);
  if (!profile) {
    return (
      <div className="studentSettings__unavailable" role="alert">
        <p>{copy.unavailable}</p>
        <Link href={`/${locale}/student/settings`}>{copy.retry}</Link>
      </div>
    );
  }
  return <StudentAccountSettings connected copy={copy} locale={locale} profile={profile} />;
}
