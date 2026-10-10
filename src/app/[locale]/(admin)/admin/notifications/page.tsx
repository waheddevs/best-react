import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getAdminWorkspaceCopy } from "@/dictionaries/admin/AdminWorkspace";
import { getWorkspaceNotificationsCopy } from "@/dictionaries/WorkspaceNotifications";
import { loadWorkspaceNotifications } from "@/features/notifications/WorkspaceNotificationActions";
import { WorkspaceNotificationsList } from "@/features/notifications/WorkspaceNotificationsList";
import { isDashboardPreviewEnabled } from "@/lib/DashboardAccess";

type PageProps = { params: Promise<{ locale: string }> };
export default async function AdminNotificationsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const connected = !isDashboardPreviewEnabled();
  const adminCopy = getAdminWorkspaceCopy(locale);
  const section = adminCopy.sections.notifications;
  const initial = connected
    ? await loadWorkspaceNotifications("ADMIN", 20).catch(() => null)
    : null;
  return (
    <article className="adminWorkspace">
      <header className="adminWorkspace__header">
        <div>
          <span>{section.eyebrow}</span>
          <h1>{getWorkspaceNotificationsCopy(locale).title}</h1>
          <p>{section.description}</p>
        </div>
        <div className="adminWorkspace__health">
          <i />
          <span>{adminCopy.common.connectedNotice}</span>
        </div>
      </header>
      <WorkspaceNotificationsList
        connected={connected}
        initial={initial}
        locale={locale}
        role="ADMIN"
      />
    </article>
  );
}
