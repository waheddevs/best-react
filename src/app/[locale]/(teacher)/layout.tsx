import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";

import { DashboardServiceUnavailable } from "@/components/ui/DashboardServiceUnavailable";
import { isLocale } from "@/config/Locales";
import { teacherPreviewData } from "@/data/teacher/TeacherPreviewData";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";
import { TeacherWorkspaceShell } from "@/features/teacher/layout/TeacherWorkspaceShell";
import { getDashboardAccessState, isDashboardPreviewEnabled } from "@/lib/DashboardAccess";
import { teacherShortName } from "@/lib/teacher/TeacherDisplayName";
import { loadTeacherHeader } from "@/lib/teacher/TeacherWorkspaceData";

export const metadata: Metadata = {
  robots: { follow: false, index: false },
};

type TeacherLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function TeacherLayout({ children, params }: TeacherLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const accessState = await getDashboardAccessState("TEACHER");
  if (accessState === "expired") {
    redirect(`/${locale}/login?role=teacher&reason=session-expired`);
  }
  if (accessState === "unauthenticated") redirect(`/${locale}/login?role=teacher`);
  if (accessState === "unavailable") return <DashboardServiceUnavailable locale={locale} />;

  const preview = isDashboardPreviewEnabled();
  const header = preview ? null : await loadTeacherHeader().catch(() => null);
  const previewProfile = teacherPreviewData.profile;
  const profile = header?.profile ?? {
    avatarUrl: null,
    displayName: preview ? previewProfile.displayName : getTeacherCopy(locale).common.teacherRole,
    shortName: preview
      ? teacherShortName(previewProfile.displayName)
      : getTeacherCopy(locale).common.teacherRole,
    initials: preview ? previewProfile.initials : "T",
  };
  const notices = header?.notices ?? {
    notifications: preview
      ? teacherPreviewData.notifications.map((item) => ({
          body: item.message[locale],
          createdAt: new Date(0).toISOString(),
          id: item.id,
          kind: item.tone,
          readAt: null,
          taskId: null,
          title: item.title[locale],
        }))
      : [],
    unreadCount: 0,
  };

  return (
    <TeacherWorkspaceShell
      copy={getTeacherCopy(locale)}
      locale={locale}
      connected={!preview}
      initialNotificationError={!preview && header === null}
      notices={notices}
      profile={profile}
    >
      {children}
    </TeacherWorkspaceShell>
  );
}
