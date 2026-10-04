import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getWorkspaceNotificationsCopy } from "@/dictionaries/WorkspaceNotifications";
import { loadWorkspaceNotifications } from "@/features/notifications/WorkspaceNotificationActions";
import { WorkspaceNotificationsList } from "@/features/notifications/WorkspaceNotificationsList";
import { TeacherPageHeader } from "@/features/teacher/layout/TeacherPageHeader";
import { isDashboardPreviewEnabled } from "@/lib/DashboardAccess";

type PageProps = { params: Promise<{ locale: string }> };

export default async function TeacherNotificationsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const connected = !isDashboardPreviewEnabled();
  const initial = connected
    ? await loadWorkspaceNotifications("TEACHER", 20).catch(() => null)
    : null;
  const copy = getWorkspaceNotificationsCopy(locale);

  return (
    <article className="teacherNotificationsPage">
      <TeacherPageHeader eyebrow={copy.eyebrow} title={copy.title} />
      <WorkspaceNotificationsList
        connected={connected}
        initial={initial}
        locale={locale}
        role="TEACHER"
      />
    </article>
  );
}
