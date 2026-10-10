"use client";

import CloseRounded from "@mui/icons-material/CloseRounded";
import KeyboardDoubleArrowLeftRounded from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import KeyboardDoubleArrowRightRounded from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import MenuOpenRounded from "@mui/icons-material/MenuOpenRounded";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { WorkspaceLocaleNavigation } from "@/components/navigation/WorkspaceLocaleNavigation";
import { WorkspaceNotificationBell } from "@/features/notifications/WorkspaceNotificationBell";
import { adminDockNavigationKeys, adminNavigationItems } from "@/config/AdminNavigation";
import type { Locale } from "@/config/Locales";
import { useWorkspaceShellNavigation } from "@/hooks/navigation/useWorkspaceShellNavigation";
import { useBestApiConnection } from "@/hooks/useBestApiConnection";
import { getWorkspaceInitials } from "@/lib/WorkspaceIdentity";
import type { AdminWorkspaceCopy } from "@/types/admin/AdminWorkspace";

import { AdminCommandSearch } from "./AdminCommandSearch";
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const { handleMenuToggle, handleNavigation, localeOptions, menuOpen, navigationItems } =
    useWorkspaceShellNavigation({
      dashboardKey: "dashboard",
      items: adminNavigationItems,
      locale,
    });
  const adminInitials = getWorkspaceInitials(adminName, locale);
  const dockItems = navigationItems.filter((item) => adminDockNavigationKeys.includes(item.key));

  useEffect(() => {
    if (!menuOpen) return;
    const panel = mobilePanelRef.current;
    const menuButton = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    document.body.style.overflow = "hidden";
    focusable?.[0]?.focus();

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", trapFocus);
    return () => {
      document.removeEventListener("keydown", trapFocus);
      document.body.style.overflow = previousOverflow;
      menuButton?.focus();
    };
  }, [menuOpen]);

  /* HANDLERS */
  const handleSidebarToggle = () => setSidebarCollapsed((current) => !current);

  return (
    <div className={sidebarCollapsed ? "adminShell adminShell_sidebarCollapsed" : "adminShell"}>
      <a className="adminShell__skipLink" href="#admin-main-content">
        {copy.common.skipToContentLabel}
      </a>
      <aside className="adminShell__sidebar">
        <Link className="adminShell__brand" href={`/${locale}/admin`}>
          <span className="adminShell__logoTile">
            <Image alt="BEST LC" height={34} src="/icons/logo.svg" width={34} />
          </span>
          <span className="adminShell__brandCopy">
            <strong>BEST LC</strong>
            <small>{copy.common.workspaceLabel}</small>
          </span>
        </Link>
        <button
          aria-expanded={!sidebarCollapsed}
          aria-label={sidebarCollapsed ? copy.common.sidebarExpand : copy.common.sidebarCollapse}
          className="adminShell__collapseButton"
          onClick={handleSidebarToggle}
          title={sidebarCollapsed ? copy.common.sidebarExpand : copy.common.sidebarCollapse}
          type="button"
        >
          {sidebarCollapsed ? (
            <KeyboardDoubleArrowRightRounded />
          ) : (
            <KeyboardDoubleArrowLeftRounded />
          )}
        </button>
        <nav aria-label={copy.common.workspaceLabel} className="adminShell__navigation">
          <AdminWorkspaceNavigation
            copy={copy.navigation}
            groupCopy={copy.navigationGroups}
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
            aria-controls="admin-mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? copy.common.menuClose : copy.common.menuOpen}
            className="adminShell__menuButton"
            onClick={handleMenuToggle}
            ref={menuButtonRef}
            type="button"
          >
            {menuOpen ? <CloseRounded /> : <MenuOpenRounded />}
          </button>
          <div className="adminShell__breadcrumb">
            <span>{copy.common.workspaceLabel}</span>
            <strong>{adminName}</strong>
          </div>
          <AdminCommandSearch
            emptyLabel={copy.common.emptyLabel}
            items={navigationItems}
            label={copy.common.searchLabel}
            navigationCopy={copy.navigation}
            placeholder={copy.common.searchPlaceholder}
          />
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
          <>
            <button
              aria-label={copy.common.menuClose}
              className="adminShell__mobileBackdrop"
              onClick={handleNavigation}
              tabIndex={-1}
              type="button"
            />
            <div
              aria-label={copy.common.workspaceLabel}
              aria-modal="true"
              className="adminShell__mobilePanel"
              id="admin-mobile-navigation"
              ref={mobilePanelRef}
              role="dialog"
            >
              <WorkspaceLocaleNavigation
                className="adminShell__mobileLocales"
                label={copy.common.languageLabel}
                onNavigate={handleNavigation}
                options={localeOptions}
              />
              <nav aria-label={copy.common.workspaceLabel}>
                <AdminWorkspaceNavigation
                  copy={copy.navigation}
                  groupCopy={copy.navigationGroups}
                  items={navigationItems}
                  onNavigate={handleNavigation}
                />
              </nav>
            </div>
          </>
        ) : null}
        <main className="adminShell__main" id="admin-main-content" tabIndex={-1}>
          {children}
        </main>
      </div>
      <nav aria-label={copy.common.workspaceLabel} className="adminShell__dock">
        <AdminWorkspaceNavigation copy={copy.navigation} items={dockItems} mode="dock" />
      </nav>
    </div>
  );
}
