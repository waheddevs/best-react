"use client";

import CloseRounded from "@mui/icons-material/CloseRounded";
import DarkModeRounded from "@mui/icons-material/DarkModeRounded";
import LightModeRounded from "@mui/icons-material/LightModeRounded";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import MenuRounded from "@mui/icons-material/MenuRounded";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { WorkspaceNotificationBell } from "@/features/notifications/WorkspaceNotificationBell";
import { StudentBackButton } from "@/features/student/workspace/StudentBackButton";
import type { Locale } from "@/config/Locales";
import { studentNavigationItems } from "@/config/StudentNavigation";
import { getStudentNotificationText } from "@/dictionaries/student/StudentNotifications";
import { useWorkspaceShellNavigation } from "@/hooks/navigation/useWorkspaceShellNavigation";
import { useWorkspaceLogout } from "@/hooks/navigation/useWorkspaceLogout";
import { useStudentTheme } from "@/hooks/student/useStudentTheme";
import { useBestApiConnection } from "@/hooks/useBestApiConnection";
import { studentShortName } from "@/lib/student/StudentDisplayName";
import type { StudentAccountIdentity } from "@/types/student/StudentSettings";
import type { StudentWorkspaceCopy } from "@/types/student/StudentWorkspace";

import { StudentProfileAvatar } from "./StudentProfileAvatar";
import { StudentLocaleMenu } from "./StudentLocaleMenu";
import { StudentWorkspaceNavigation } from "./StudentWorkspaceNavigation";

type StudentWorkspaceShellProps = {
  children: ReactNode;
  copy: StudentWorkspaceCopy;
  locale: Locale;
  profile: Pick<StudentAccountIdentity, "avatarUrl" | "displayName"> | null;
};

export function StudentWorkspaceShell({
  children,
  copy,
  locale,
  profile,
}: StudentWorkspaceShellProps) {
  /* HOOKS */
  const pathname = usePathname();
  const connectionState = useBestApiConnection("STUDENT");
  const studentTheme = useStudentTheme();
  const { handleMenuToggle, handleNavigation, menuOpen, navigationItems } =
    useWorkspaceShellNavigation({
      dashboardKey: "dashboard",
      items: studentNavigationItems,
      locale,
    });
  const displayName = profile?.displayName || copy.common.accountLabel;
  const shortName = studentShortName(displayName, locale);
  const examMode = /\/student\/tests\/[^/]+\/[^/]+\/[^/]+\/?$/.test(pathname);
  const testOverviewMode = /\/student\/tests\/[^/]+\/?$/.test(pathname);
  const handleLogout = useWorkspaceLogout({
    confirmation: {
      brand: "student",
      cancelLabel: copy.common.logoutCancel,
      confirmLabel: copy.common.logoutConfirm,
      icon: "logout",
      message: copy.common.logoutVerificationMessage,
      title: copy.common.logoutVerificationTitle,
      tone: "danger",
    },
    locale,
    role: "student",
  });

  if (examMode) {
    return (
      <div className="studentShell studentShell_exam">
        <main className="studentShell__examMain">{children}</main>
      </div>
    );
  }

  return (
    <div className="studentShell">
      <aside className="studentShell__sidebar">
        <Link className="studentShell__brand" href={`/${locale}/student`}>
          <span aria-hidden="true" className="studentShell__logo" />
          <span>
            <strong>BEST LC</strong>
          </span>
        </Link>
        <nav aria-label={copy.common.workspaceLabel} className="studentShell__navigation">
          <StudentWorkspaceNavigation
            copy={copy.navigation}
            items={navigationItems}
            onNavigate={handleNavigation}
          />
        </nav>
        <div className="studentShell__profile">
          <StudentProfileAvatar
            avatarUrl={profile?.avatarUrl ?? null}
            className="studentShell__profileAvatar"
            displayName={displayName}
            locale={locale}
            size={38}
          />
          <div>
            <strong>{shortName}</strong>
            <small>{copy.common.accountLabel}</small>
          </div>
          <button
            aria-label={copy.common.logoutLabel}
            className="studentShell__profileLogout"
            onClick={() => void handleLogout()}
            title={copy.common.logoutLabel}
            type="button"
          >
            <LogoutRounded aria-hidden="true" />
          </button>
        </div>
      </aside>

      <div className="studentShell__workspace">
        <header className="studentShell__topbar">
          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? copy.common.menuClose : copy.common.menuOpen}
            className="studentShell__menuButton"
            onClick={handleMenuToggle}
            type="button"
          >
            {menuOpen ? <CloseRounded /> : <MenuRounded />}
          </button>
          <div className="studentShell__mobileBrand">
            <strong>BEST LC</strong>
          </div>
          {testOverviewMode ? (
            <div className="studentShell__back">
              <StudentBackButton href={`/${locale}/student/tests`} label={copy.navigation.tests} />
            </div>
          ) : null}
          <div className="studentShell__topActions">
            <StudentLocaleMenu label={copy.common.languageLabel} locale={locale} />
            <button
              aria-label={
                studentTheme.mode === "dark"
                  ? copy.common.themeLightLabel
                  : copy.common.themeDarkLabel
              }
              aria-pressed={studentTheme.mode === "dark"}
              className="studentShell__themeToggle"
              onClick={studentTheme.toggleMode}
              title={
                studentTheme.mode === "dark"
                  ? copy.common.themeLightLabel
                  : copy.common.themeDarkLabel
              }
              type="button"
            >
              {studentTheme.mode === "dark" ? <LightModeRounded /> : <DarkModeRounded />}
            </button>
            <WorkspaceNotificationBell
              connected={connectionState === "connected"}
              getNoticeText={getStudentNotificationText}
              locale={locale}
              role="STUDENT"
            />
            <button
              aria-label={copy.common.logoutLabel}
              className="studentShell__signOut"
              onClick={() => void handleLogout()}
              title={copy.common.logoutLabel}
              type="button"
            >
              <LogoutRounded />
            </button>
            <Link
              aria-label={`${copy.navigation.settings}: ${displayName}`}
              className="studentShell__topbarProfile"
              href={`/${locale}/student/settings`}
            >
              <StudentProfileAvatar
                avatarUrl={profile?.avatarUrl ?? null}
                className="studentShell__avatar"
                displayName={displayName}
                locale={locale}
                size={44}
              />
              <span className="studentShell__topbarProfileCopy">
                <strong>{shortName}</strong>
                <small>{copy.common.accountLabel}</small>
              </span>
            </Link>
          </div>
        </header>
        {menuOpen ? (
          <div className="studentShell__mobilePanel">
            <nav aria-label={copy.common.workspaceLabel}>
              <StudentWorkspaceNavigation
                copy={copy.navigation}
                items={navigationItems}
                onNavigate={handleNavigation}
              />
            </nav>
          </div>
        ) : null}
        <main className="studentShell__main">{children}</main>
      </div>

      <nav aria-label={copy.common.workspaceLabel} className="studentShell__dock">
        <StudentWorkspaceNavigation
          copy={copy.navigation}
          items={navigationItems.slice(0, 5)}
          mode="dock"
        />
      </nav>
    </div>
  );
}
