import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getWorkspaceNotificationsCopy } from "@/dictionaries/WorkspaceNotifications";
import { loadWorkspaceNotifications } from "@/features/notifications/WorkspaceNotificationActions";
import { WorkspaceNotificationsList } from "@/features/notifications/WorkspaceNotificationsList";
import { isDashboardPreviewEnabled } from "@/lib/DashboardAccess";

type PageProps = { params: Promise<{ locale: string }> };
export default async function StudentNotificationsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const connected = !isDashboardPreviewEnabled();
  const initial = connected
    ? await loadWorkspaceNotifications("STUDENT", 20).catch(() => null)
    : null;
  return (
    <article className="studentWorkspace">
      <h1>{getWorkspaceNotificationsCopy(locale).title}</h1>
      <WorkspaceNotificationsList
        connected={connected}
        initial={initial}
        locale={locale}
        role="STUDENT"
      />
    </article>
  );
}
