"use client";

import CloseRounded from "@mui/icons-material/CloseRounded";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import MenuRounded from "@mui/icons-material/MenuRounded";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { WorkspaceLocaleNavigation } from "@/components/navigation/WorkspaceLocaleNavigation";
import { WorkspaceNotificationBell } from "@/features/notifications/WorkspaceNotificationBell";
import type { Locale } from "@/config/Locales";
import { studentNavigationItems } from "@/config/StudentNavigation";
import { useWorkspaceShellNavigation } from "@/hooks/navigation/useWorkspaceShellNavigation";
import { useBestApiConnection } from "@/hooks/useBestApiConnection";
import { getWorkspaceInitials } from "@/lib/WorkspaceIdentity";
import type { StudentWorkspaceCopy } from "@/types/student/StudentWorkspace";

import { StudentWorkspaceNavigation } from "./StudentWorkspaceNavigation";

type StudentWorkspaceShellProps = {
  children: ReactNode;
  copy: StudentWorkspaceCopy;
  locale: Locale;
};

export function StudentWorkspaceShell({ children, copy, locale }: StudentWorkspaceShellProps) {
  /* HOOKS */
  const pathname = usePathname();
  const connectionState = useBestApiConnection("STUDENT");
  const { handleMenuToggle, handleNavigation, localeOptions, menuOpen, navigationItems } =
    useWorkspaceShellNavigation({
      dashboardKey: "dashboard",
      items: studentNavigationItems,
      locale,
    });
  const studentInitials = getWorkspaceInitials(copy.common.studentName, locale);
  const examMode = /\/student\/tests\/[^/]+\/[^/]+\/[^/]+\/?$/.test(pathname);

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
          <Image
            alt="BEST LC"
            className="studentShell__logo"
            height={42}
            src="/icons/logo.svg"
            width={42}
          />
          <span>
            <strong>BEST LC</strong>
            <small>{copy.common.workspaceLabel}</small>
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
          <span aria-hidden="true">{studentInitials}</span>
          <div>
            <strong>{copy.common.studentName}</strong>
            <small>{copy.common.accountLabel}</small>
          </div>
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
            <span>{copy.common.workspaceLabel}</span>
          </div>
          <div className="studentShell__topActions">
            <WorkspaceLocaleNavigation
              className="studentShell__locales"
              label={copy.common.languageLabel}
              onNavigate={handleNavigation}
              options={localeOptions}
            />
            <span className="studentShell__secure">
              {connectionState === "connected"
                ? copy.common.connectedNotice
                : copy.common.previewNotice}
            </span>
            <WorkspaceNotificationBell
              connected={connectionState === "connected"}
              locale={locale}
              role="STUDENT"
            />
            <button
              aria-label={copy.common.logoutLabel}
              className="studentShell__signOut"
              onClick={() => void signOut({ redirectTo: `/${locale}/login` })}
              title={copy.common.logoutLabel}
              type="button"
            >
              <LogoutRounded />
            </button>
            <div aria-label={copy.common.accountLabel} className="studentShell__avatar">
              {studentInitials}
            </div>
          </div>
        </header>
        {menuOpen ? (
          <div className="studentShell__mobilePanel">
            <WorkspaceLocaleNavigation
              className="studentShell__mobileLocales"
              label={copy.common.languageLabel}
              onNavigate={handleNavigation}
              options={localeOptions}
            />
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
