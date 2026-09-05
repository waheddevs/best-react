"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { locales, type Locale } from "@/config/Locales";

export type WorkspaceNavigationSource<TKey extends string> = {
  href: string;
  key: TKey;
};

export type WorkspaceNavigationItem<TKey extends string> = WorkspaceNavigationSource<TKey> & {
  active: boolean;
  localizedHref: string;
};

type UseWorkspaceShellNavigationOptions<TKey extends string> = {
  dashboardKey: TKey;
  items: ReadonlyArray<WorkspaceNavigationSource<TKey>>;
  locale: Locale;
};

export function useWorkspaceShellNavigation<TKey extends string>({
  dashboardKey,
  items,
  locale,
}: UseWorkspaceShellNavigationOptions<TKey>) {
  /* HOOKS */
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  /* HANDLERS */
  const handleMenuToggle = () => setMenuOpen((current) => !current);
  const handleNavigation = () => setMenuOpen(false);

  const navigationItems: Array<WorkspaceNavigationItem<TKey>> = items.map((item) => {
    const localizedHref = `/${locale}${item.href}`;
    return {
      ...item,
      active:
        item.key === dashboardKey ? pathname === localizedHref : pathname.startsWith(localizedHref),
      localizedHref,
    };
  });
  const localePath = pathname.split("/").slice(2).join("/");
  const localeOptions = locales.map((targetLocale) => ({
    active: targetLocale === locale,
    href: `/${targetLocale}/${localePath}`,
    locale: targetLocale,
  }));

  return {
    handleMenuToggle,
    handleNavigation,
    localeOptions,
    menuOpen,
    navigationItems,
  };
}
