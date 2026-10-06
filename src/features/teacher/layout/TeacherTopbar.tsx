"use client";

import DarkModeRounded from "@mui/icons-material/DarkModeRounded";
import LightModeRounded from "@mui/icons-material/LightModeRounded";
import MenuRounded from "@mui/icons-material/MenuRounded";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { IconButton } from "@/components/ui/IconButton";
import type { Locale } from "@/config/Locales";
import { getTeacherNotificationsCopy } from "@/dictionaries/teacher/TeacherNotifications";
import { WorkspaceNotificationBell } from "@/features/notifications/WorkspaceNotificationBell";
import { TeacherLocaleMenu } from "@/features/teacher/layout/TeacherLocaleMenu";
import { useTeacherTheme } from "@/hooks/teacher/useTeacherTheme";
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
  const [failedAvatarUrl, setFailedAvatarUrl] = useState<string | null>(null);
  const notificationCopy = getTeacherNotificationsCopy(locale);
  const teacherTheme = useTeacherTheme();

  /* HANDLERS */
  const handleAvatarError = () => {
    setFailedAvatarUrl(profile.avatarUrl);
  };

  return (
    <header className="teacherShell__topbar">
      <div className="teacherShell__topbarLeading">
        <IconButton
          className="teacherShell__mobileMenuButton"
          label={copy.common.menu}
          onClick={onMenuOpen}
          variant="soft"
        >
          <MenuRounded />
        </IconButton>
        <div>
          <strong className="teacherShell__topbarTitle">{pageTitle}</strong>
        </div>
      </div>

      <div className="teacherShell__topbarActions">
        <TeacherLocaleMenu label={copy.profile.language} locale={locale} />
        <button
          aria-label={copy.profile.nightMode}
          aria-pressed={teacherTheme.mode === "dark"}
          className="teacherShell__themeToggle"
          onClick={teacherTheme.toggleMode}
          title={copy.profile.nightMode}
          type="button"
        >
          {teacherTheme.mode === "dark" ? <LightModeRounded /> : <DarkModeRounded />}
        </button>
        <WorkspaceNotificationBell
          connected={connected}
          initial={notices}
          initialError={initialNotificationError}
          locale={locale}
          role="TEACHER"
        />
        <Link
          aria-label={`${notificationCopy.settings}: ${profile.displayName}`}
          className="teacherShell__topbarProfile"
          href={`/${locale}/teacher/profile`}
        >
          <span className="teacherShell__topbarAvatar">
            {profile.avatarUrl && failedAvatarUrl !== profile.avatarUrl ? (
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
          <span className="teacherShell__topbarProfileCopy">
            <strong>{profile.shortName}</strong>
            <small>{copy.common.teacherRole}</small>
          </span>
        </Link>
      </div>
    </header>
  );
}
