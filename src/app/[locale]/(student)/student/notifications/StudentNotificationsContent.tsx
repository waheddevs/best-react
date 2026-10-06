"use client";

import { useState } from "react";

import type { Locale } from "@/config/Locales";
import { WorkspaceNotificationsList } from "@/features/notifications/WorkspaceNotificationsList";
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
    <article className="studentWorkspace">
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
        initial={initial}
        locale={locale}
        onUnreadCountChange={setUnreadCount}
        role="STUDENT"
      />
    </article>
  );
}
