"use client";

import MenuRounded from "@mui/icons-material/MenuRounded";
import NotificationsNoneRounded from "@mui/icons-material/NotificationsNoneRounded";
import TaskAltRounded from "@mui/icons-material/TaskAltRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import Link from "next/link";
import { useState, type MouseEvent } from "react";

import { IconButton } from "@/components/ui/IconButton";
import type { Locale } from "@/config/Locales";
import styles from "@/css/teacher/shell.module.css";
import { getTeacherNotificationsCopy } from "@/dictionaries/teacher/TeacherNotifications";
import { TeacherLocaleMenu } from "@/features/teacher/layout/TeacherLocaleMenu";
import { useTeacherNotifications } from "@/hooks/teacher/notifications/useTeacherNotifications";
import type { TeacherCopy } from "@/types/teacher/Teacher";
import type {
  TeacherNoticeState,
  TeacherTopbarProfile,
} from "@/types/teacher/TeacherNotifications";

type TeacherTopbarProps = {
  connected: boolean;
  copy: TeacherCopy;
  initialNotificationError: boolean;
  locale: Locale;
  notices: TeacherNoticeState;
  onMenuOpen: () => void;
  pageTitle: string;
  profile: TeacherTopbarProfile;
};

export function TeacherTopbar({
  connected,
  copy,
  initialNotificationError,
  locale,
  notices,
  onMenuOpen,
  pageTitle,
  profile,
}: TeacherTopbarProps) {
  /* HOOKS */
  const [notificationAnchor, setNotificationAnchor] = useState<HTMLElement | null>(null);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const notificationState = useTeacherNotifications(
    notices,
    locale,
    connected,
    initialNotificationError,
  );
  const notificationCopy = getTeacherNotificationsCopy(locale);

  /* HANDLERS */
  const handleNotificationsOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setNotificationAnchor(event.currentTarget);
    void notificationState.refresh();
  };

  const handleNotificationsClose = () => {
    setNotificationAnchor(null);
  };

  const handleAvatarError = () => {
    setAvatarFailed(true);
  };

  return (
    <header className={styles.teacherShell__topbar}>
      <div className={styles.teacherShell__topbarLeading}>
        <IconButton
          className={styles.teacherShell__mobileMenuButton}
          label={copy.common.menu}
          onClick={onMenuOpen}
          variant="soft"
        >
          <MenuRounded />
        </IconButton>
        <div>
          <strong className={styles.teacherShell__topbarTitle}>{pageTitle}</strong>
        </div>
      </div>

      <div className={styles.teacherShell__topbarActions}>
        <TeacherLocaleMenu label={copy.profile.language} locale={locale} />
        <span className={styles.teacherShell__notificationTrigger}>
          <IconButton
            className={styles.teacherShell__topbarIconButton}
            label={
              notificationState.state.unreadCount > 0
                ? `${copy.common.notifications}: ${notificationState.state.unreadCount}`
                : copy.common.notifications
            }
            onClick={handleNotificationsOpen}
            variant="soft"
          >
            <NotificationsNoneRounded />
          </IconButton>
          {notificationState.state.unreadCount > 0 ? (
            <span className={styles.teacherShell__unreadDot} aria-hidden="true" />
          ) : null}
        </span>
        <Link
          aria-label={`${notificationCopy.settings}: ${profile.displayName}`}
          className={styles.teacherShell__topbarProfile}
          href={`/${locale}/teacher/profile`}
        >
          <span className={styles.teacherShell__topbarAvatar}>
            {profile.avatarUrl && !avatarFailed ? (
              <Image
                alt=""
                fill
                onError={handleAvatarError}
                sizes="44px"
                src={profile.avatarUrl}
                unoptimized
              />
            ) : (
              profile.initials
            )}
          </span>
          <span className={styles.teacherShell__topbarProfileCopy}>
            <strong>{profile.shortName}</strong>
            <small>{copy.common.teacherRole}</small>
          </span>
        </Link>
      </div>

      <Menu
        anchorEl={notificationAnchor}
        onClose={handleNotificationsClose}
        open={Boolean(notificationAnchor)}
        slotProps={{ paper: { className: styles.teacherShell__notificationMenu } }}
      >
        <li className={styles.teacherShell__notificationHeading}>{copy.common.notifications}</li>
        {notificationState.error ? (
          <li className={styles.teacherShell__notificationMessage}>
            {notificationCopy.loadError}{" "}
            <button onClick={() => void notificationState.refresh()} type="button">
              {notificationCopy.retry}
            </button>
          </li>
        ) : null}
        {!notificationState.error && notificationState.state.notifications.length === 0 ? (
          <li className={styles.teacherShell__notificationMessage}>{notificationCopy.empty}</li>
        ) : null}
        {notificationState.state.notifications.map((notification) => (
          <MenuItem
            className={styles.teacherShell__notificationItem}
            data-unread={notification.readAt === null}
            key={notification.id}
            onClick={() => {
              handleNotificationsClose();
              void notificationState.handleNotificationSelect(notification);
            }}
          >
            <span className={styles.teacherShell__notificationIcon}>
              <TaskAltRounded />
            </span>
            <span>
              <strong>{notification.title}</strong>
              {notification.body ? <small>{notification.body}</small> : null}
              <time dateTime={notification.createdAt}>
                {new Intl.DateTimeFormat(locale, {
                  dateStyle: "medium",
                  timeStyle: "short",
                  timeZone: "Asia/Tashkent",
                }).format(new Date(notification.createdAt))}
              </time>
            </span>
          </MenuItem>
        ))}
      </Menu>
    </header>
  );
}
