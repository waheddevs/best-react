"use client";

import CloseRounded from "@mui/icons-material/CloseRounded";
import MenuOpenRounded from "@mui/icons-material/MenuOpenRounded";
import NotificationsNoneRounded from "@mui/icons-material/NotificationsNoneRounded";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { WorkspaceLocaleNavigation } from "@/components/navigation/WorkspaceLocaleNavigation";
import { adminDockNavigationKeys, adminNavigationItems } from "@/config/AdminNavigation";
import type { Locale } from "@/config/Locales";
import styles from "@/css/admin/shell.module.css";
import { useWorkspaceShellNavigation } from "@/hooks/navigation/useWorkspaceShellNavigation";
import { useBestApiConnection } from "@/hooks/useBestApiConnection";
import { getWorkspaceInitials } from "@/lib/WorkspaceIdentity";
import type { AdminWorkspaceCopy } from "@/types/admin/AdminWorkspace";

import { AdminWorkspaceNavigation } from "./AdminWorkspaceNavigation";

type AdminWorkspaceShellProps = { children: ReactNode; copy: AdminWorkspaceCopy; locale: Locale };

export function AdminWorkspaceShell({ children, copy, locale }: AdminWorkspaceShellProps) {
  /* HOOKS */
  const connectionState = useBestApiConnection("ADMIN");
  const { handleMenuToggle, handleNavigation, localeOptions, menuOpen, navigationItems } =
    useWorkspaceShellNavigation({
      dashboardKey: "dashboard",
      items: adminNavigationItems,
      locale,
    });
  const adminInitials = getWorkspaceInitials(copy.common.adminName, locale);
  const dockItems = navigationItems.filter((item) => adminDockNavigationKeys.includes(item.key));

  return (
    <div className={styles.adminShell}>
      <aside className={styles.adminShell__sidebar}>
        <Link className={styles.adminShell__brand} href={`/${locale}/admin`}>
          <span className={styles.adminShell__logoTile}>
            <Image alt="BEST LC" height={34} src="/icons/logo.svg" width={34} />
          </span>
          <span>
            <strong>BEST LC</strong>
            <small>{copy.common.workspaceLabel}</small>
          </span>
        </Link>
        <nav aria-label={copy.common.workspaceLabel} className={styles.adminShell__navigation}>
          <AdminWorkspaceNavigation
            copy={copy.navigation}
            items={navigationItems}
            onNavigate={handleNavigation}
          />
        </nav>
        <div className={styles.adminShell__environment}>
          <span />
          <div>
            <strong>
              {connectionState === "connected"
                ? copy.common.connectedNotice
                : copy.common.previewNotice}
            </strong>
            <small>{copy.common.stackLabel}</small>
          </div>
        </div>
      </aside>
      <div className={styles.adminShell__workspace}>
        <header className={styles.adminShell__topbar}>
          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? copy.common.menuClose : copy.common.menuOpen}
            className={styles.adminShell__menuButton}
            onClick={handleMenuToggle}
            type="button"
          >
            {menuOpen ? <CloseRounded /> : <MenuOpenRounded />}
          </button>
          <div className={styles.adminShell__breadcrumb}>
            <span>{copy.common.workspaceLabel}</span>
            <strong>{copy.common.adminName}</strong>
          </div>
          <div className={styles.adminShell__topActions}>
            <WorkspaceLocaleNavigation
              className={styles.adminShell__locales}
              label={copy.common.languageLabel}
              onNavigate={handleNavigation}
              options={localeOptions}
            />
            <Link
              aria-label={copy.navigation.notifications}
              href={`/${locale}/admin/notifications`}
            >
              <NotificationsNoneRounded />
            </Link>
            <span>{adminInitials}</span>
          </div>
        </header>
        {menuOpen ? (
          <div className={styles.adminShell__mobilePanel}>
            <WorkspaceLocaleNavigation
              className={styles.adminShell__mobileLocales}
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
        <main className={styles.adminShell__main}>{children}</main>
      </div>
      <nav aria-label={copy.common.workspaceLabel} className={styles.adminShell__dock}>
        <AdminWorkspaceNavigation copy={copy.navigation} items={dockItems} mode="dock" />
      </nav>
    </div>
  );
}
