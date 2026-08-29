"use client";

import ChatBubbleOutlineRounded from "@mui/icons-material/ChatBubbleOutlineRounded";
import MenuRounded from "@mui/icons-material/MenuRounded";
import NotificationsNoneRounded from "@mui/icons-material/NotificationsNoneRounded";
import WarningAmberRounded from "@mui/icons-material/WarningAmberRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState, type MouseEvent } from "react";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import { IconButton } from "@/components/ui/IconButton";
import type { Locale } from "@/config/Locales";
import styles from "@/css/teacher/shell.module.css";
import type {
  TeacherCopy,
  TeacherNotificationPreview,
  TeacherProfileData,
} from "@/types/teacher/Teacher";

type TeacherTopbarProps = {
  copy: TeacherCopy;
  locale: Locale;
  notifications: TeacherNotificationPreview[];
  onMenuOpen: () => void;
  pageTitle: string;
  profile: TeacherProfileData;
};

export function TeacherTopbar({
  copy,
  locale,
  notifications,
  onMenuOpen,
  pageTitle,
  profile,
}: TeacherTopbarProps) {
  /* HOOKS */
  const [notificationAnchor, setNotificationAnchor] = useState<HTMLElement | null>(null);

  /* HANDLERS */
  const handleNotificationsOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationAnchor(null);
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
        <ScrollToTopLink
          aria-label={copy.navigation.generalGroup}
          className={styles.teacherShell__topbarLink}
          href={`/${locale}/teacher/general-group`}
        >
          <ChatBubbleOutlineRounded aria-hidden="true" />
        </ScrollToTopLink>
        <IconButton
          className={styles.teacherShell__topbarIconButton}
          label={copy.common.notifications}
          onClick={handleNotificationsOpen}
          variant="soft"
        >
          <NotificationsNoneRounded />
        </IconButton>
        <span className={styles.teacherShell__topbarAvatar} title={profile.displayName}>
          {profile.initials}
        </span>
      </div>

      <Menu
        anchorEl={notificationAnchor}
        onClose={handleNotificationsClose}
        open={Boolean(notificationAnchor)}
        slotProps={{ paper: { className: styles.teacherShell__notificationMenu } }}
      >
        <li className={styles.teacherShell__notificationHeading}>{copy.common.notifications}</li>
        {notifications.map((notification) => (
          <MenuItem
            className={styles.teacherShell__notificationItem}
            key={notification.id}
            onClick={handleNotificationsClose}
          >
            <span className={styles.teacherShell__notificationIcon} data-tone={notification.tone}>
              {notification.tone === "warning" ? <WarningAmberRounded /> : <InfoOutlined />}
            </span>
            <span>
              <strong>{notification.title[locale]}</strong>
              <small>{notification.message[locale]}</small>
              <time>{notification.time[locale]}</time>
            </span>
          </MenuItem>
        ))}
      </Menu>
    </header>
  );
}
