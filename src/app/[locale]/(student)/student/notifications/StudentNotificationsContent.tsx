"use client";

import NotificationsNoneRounded from "@mui/icons-material/NotificationsNoneRounded";
import { useState } from "react";

import type { Locale } from "@/config/Locales";
import {
  getStudentNotificationDateGroup,
  getStudentNotificationText,
} from "@/dictionaries/student/StudentNotifications";
import { WorkspaceNotificationsList } from "@/features/notifications/WorkspaceNotificationsList";
import { StudentNotificationIcon } from "@/features/student/notifications/StudentNotificationIcon";
import { StudentSectionHero } from "@/features/student/workspace/StudentSectionHero";
import type { WorkspaceNoticePage } from "@/types/WorkspaceNotification";

type StudentNotificationsContentProps = {
  connected: boolean;
  description: string;
  eyebrow: string;
  initial: WorkspaceNoticePage | null;
  locale: Locale;
  title: string;
};

export function StudentNotificationsContent({
  connected,
  description,
  eyebrow,
  initial,
  locale,
  title,
}: StudentNotificationsContentProps) {
  const [unreadCount, setUnreadCount] = useState<number | null>(initial?.unreadCount ?? null);

  return (
    <article className="studentWorkspace studentWorkspace--notifications">
      <StudentSectionHero
        description={description}
        eyebrow={eyebrow}
        kind="notifications"
        locale={locale}
        preview={!connected}
        title={title}
        value={unreadCount ?? undefined}
      />
      <WorkspaceNotificationsList
        connected={connected}
        emptyIcon={<NotificationsNoneRounded />}
        getDateGroup={getStudentNotificationDateGroup}
        getNoticeText={getStudentNotificationText}
        initial={initial}
        locale={locale}
        onUnreadCountChange={setUnreadCount}
        renderNoticeIcon={(notice) => <StudentNotificationIcon kind={notice.kind} />}
        role="STUDENT"
      />
    </article>
  );
}
