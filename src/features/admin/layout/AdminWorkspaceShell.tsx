"use client";

import CloseRounded from "@mui/icons-material/CloseRounded";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import MenuOpenRounded from "@mui/icons-material/MenuOpenRounded";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { WorkspaceLocaleNavigation } from "@/components/navigation/WorkspaceLocaleNavigation";
import { WorkspaceNotificationBell } from "@/features/notifications/WorkspaceNotificationBell";
import { adminDockNavigationKeys, adminNavigationItems } from "@/config/AdminNavigation";
import type { Locale } from "@/config/Locales";
import { useWorkspaceShellNavigation } from "@/hooks/navigation/useWorkspaceShellNavigation";
import { useBestApiConnection } from "@/hooks/useBestApiConnection";
import { getWorkspaceInitials } from "@/lib/WorkspaceIdentity";
import type { AdminWorkspaceCopy } from "@/types/admin/AdminWorkspace";

import { AdminWorkspaceNavigation } from "./AdminWorkspaceNavigation";

type AdminWorkspaceShellProps = {
  adminName: string;
  children: ReactNode;
  copy: AdminWorkspaceCopy;
  locale: Locale;
};

export function AdminWorkspaceShell({
  adminName,
  children,
  copy,
  locale,
}: AdminWorkspaceShellProps) {
  /* HOOKS */
  const connectionState = useBestApiConnection("ADMIN");
  const { handleMenuToggle, handleNavigation, localeOptions, menuOpen, navigationItems } =
    useWorkspaceShellNavigation({
      dashboardKey: "dashboard",
      items: adminNavigationItems,
      locale,
    });
  const adminInitials = getWorkspaceInitials(adminName, locale);
  const dockItems = navigationItems.filter((item) => adminDockNavigationKeys.includes(item.key));

  return (
    <div className="adminShell">
      <aside className="adminShell__sidebar">
        <Link className="adminShell__brand" href={`/${locale}/admin`}>
          <span className="adminShell__logoTile">
            <Image alt="BEST LC" height={34} src="/icons/logo.svg" width={34} />
          </span>
          <span>
            <strong>BEST LC</strong>
            <small>{copy.common.workspaceLabel}</small>
          </span>
        </Link>
        <nav aria-label={copy.common.workspaceLabel} className="adminShell__navigation">
          <AdminWorkspaceNavigation
            copy={copy.navigation}
            items={navigationItems}
            onNavigate={handleNavigation}
          />
        </nav>
        <div className="adminShell__environment">
          <span />
          <div>
            <strong>
              {connectionState === "connected"
                ? copy.common.connectedNotice
                : copy.common.unavailableNotice}
            </strong>
            <small>{copy.common.stackLabel}</small>
          </div>
        </div>
      </aside>
      <div className="adminShell__workspace">
        <header className="adminShell__topbar">
          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? copy.common.menuClose : copy.common.menuOpen}
            className="adminShell__menuButton"
            onClick={handleMenuToggle}
            type="button"
          >
            {menuOpen ? <CloseRounded /> : <MenuOpenRounded />}
          </button>
          <div className="adminShell__breadcrumb">
            <span>{copy.common.workspaceLabel}</span>
            <strong>{adminName}</strong>
          </div>
          <div className="adminShell__topActions">
            <WorkspaceLocaleNavigation
              className="adminShell__locales"
              label={copy.common.languageLabel}
              onNavigate={handleNavigation}
              options={localeOptions}
            />
            <WorkspaceNotificationBell
              connected={connectionState === "connected"}
              locale={locale}
              role="ADMIN"
            />
            <button
              aria-label={copy.common.logoutLabel}
              className="adminShell__signOut"
              onClick={() => void signOut({ redirectTo: `/${locale}/login` })}
              title={copy.common.logoutLabel}
              type="button"
            >
              <LogoutRounded />
            </button>
            <span>{adminInitials}</span>
          </div>
        </header>
        {menuOpen ? (
          <div className="adminShell__mobilePanel">
            <WorkspaceLocaleNavigation
              className="adminShell__mobileLocales"
              label={copy.common.languageLabel}
              onNavigate={handleNavigation}
              options={localeOptions}
            />
            <nav aria-label={copy.common.workspaceLabel}>
              <AdminWorkspaceNavigation
                copy={copy.navigation}
                items={navigationItems}
                onNavigate={handleNavigation}
              />
            </nav>
          </div>
        ) : null}
        <main className="adminShell__main">{children}</main>
      </div>
      <nav aria-label={copy.common.workspaceLabel} className="adminShell__dock">
        <AdminWorkspaceNavigation copy={copy.navigation} items={dockItems} mode="dock" />
      </nav>
    </div>
  );
}
