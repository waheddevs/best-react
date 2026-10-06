import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getStudentWorkspaceCopy } from "@/dictionaries/student/StudentWorkspace";
import { getWorkspaceNotificationsCopy } from "@/dictionaries/WorkspaceNotifications";
import { loadWorkspaceNotifications } from "@/features/notifications/WorkspaceNotificationActions";
import { isDashboardPreviewEnabled } from "@/lib/DashboardAccess";

import { StudentNotificationsContent } from "./StudentNotificationsContent";

type PageProps = { params: Promise<{ locale: string }> };
export default async function StudentNotificationsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const connected = !isDashboardPreviewEnabled();
  const initial = connected
    ? await loadWorkspaceNotifications("STUDENT", 20).catch(() => null)
    : null;
  const section = getStudentWorkspaceCopy(locale).sections.notifications;
  return (
    <StudentNotificationsContent
      connected={connected}
      description={section.description}
      eyebrow={section.eyebrow}
      initial={initial}
      locale={locale}
      title={getWorkspaceNotificationsCopy(locale).title}
    />
  );
}
