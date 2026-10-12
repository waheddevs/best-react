"use client";

import CloseRounded from "@mui/icons-material/CloseRounded";
import KeyboardDoubleArrowLeftRounded from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import KeyboardDoubleArrowRightRounded from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import MenuOpenRounded from "@mui/icons-material/MenuOpenRounded";
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

import { AdminProfileCard } from "./AdminProfileCard";
import { AdminThemeToggle } from "./AdminThemeToggle";
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
        <div className="adminShell__brandRow">
          <Link className="adminShell__brand" href={`/${locale}/admin`}>
            <span aria-hidden="true" className="adminShell__logoMark" />
            <span className="adminShell__brandCopy">
              <strong>BEST LC</strong>
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
        </div>
        <nav aria-label={copy.common.workspaceLabel} className="adminShell__navigation">
          <AdminWorkspaceNavigation
            copy={copy.navigation}
            groupCopy={copy.navigationGroups}
            items={navigationItems}
            onNavigate={handleNavigation}
          />
        </nav>
        <div className="adminShell__profileSlot">
          <AdminProfileCard
            adminName={adminName}
            initials={adminInitials}
            locale={locale}
            logoutCopy={copy.common}
          />
        </div>
      </aside>
      <div className="adminShell__workspace">
        <div className="adminShell__topbarLayer">
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
              <span>{copy.common.welcomeLabel}</span>
              <strong>{adminName}</strong>
            </div>
            <div className="adminShell__topActions">
              <WorkspaceLocaleNavigation
                className="adminShell__locales"
                label={copy.common.languageLabel}
                onNavigate={handleNavigation}
                options={localeOptions}
              />
              <AdminThemeToggle
                darkModeLabel={copy.common.darkModeLabel}
                lightModeLabel={copy.common.lightModeLabel}
              />
              <WorkspaceNotificationBell
                connected={connectionState === "connected"}
                locale={locale}
                role="ADMIN"
              />
              <span>{adminInitials}</span>
            </div>
          </header>
        </div>
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
              <AdminProfileCard
                adminName={adminName}
                initials={adminInitials}
                locale={locale}
                logoutCopy={copy.common}
                onNavigate={handleNavigation}
              />
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
