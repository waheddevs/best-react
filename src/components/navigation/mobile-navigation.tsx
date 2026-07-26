"use client";

import CloseRounded from "@mui/icons-material/CloseRounded";
import MenuRounded from "@mui/icons-material/MenuRounded";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { navigationItems } from "@/config/navigation";
import { locales, type Locale } from "@/config/locales";
import type { Dictionary } from "@/dictionaries/types";

type MobileNavigationProps = {
  locale: Locale;
  labels: Dictionary["navigation"];
};

export function MobileNavigation({ locale, labels }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <Tooltip title={labels.menu} arrow>
        <IconButton
          aria-label={labels.menu}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen(true)}
          size="small"
          sx={{ width: 44, height: 44 }}
        >
          <MenuRounded />
        </IconButton>
      </Tooltip>
      <Drawer
        id="mobile-navigation"
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        slotProps={{ paper: { sx: { width: "min(88vw, 360px)", p: 2.5 } } }}
      >
        <div className="flex items-center justify-between border-b border-border pb-4">
          <span className="text-xl font-black tracking-[-0.04em] text-heading">BEST LC</span>
          <IconButton
            aria-label={labels.closeMenu}
            onClick={() => setIsOpen(false)}
            size="small"
            sx={{ width: 44, height: 44 }}
          >
            <CloseRounded />
          </IconButton>
        </div>
        <nav aria-label={labels.menu} className="mt-6 flex flex-col gap-1">
          {navigationItems.map((item) => {
            const href = `/${locale}${item.href}`;
            const isActive = pathname === href;
            return (
              <Link
                key={item.key}
                href={href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-h-12 items-center rounded-xl px-4 font-semibold transition-colors ${
                  isActive
                    ? "bg-[color-mix(in_srgb,var(--brand-turquoise)_16%,transparent)] text-heading"
                    : "text-text hover:bg-[color-mix(in_srgb,var(--brand-turquoise)_8%,transparent)]"
                }`}
              >
                {labels[item.key]}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-border pt-5">
          <p className="mb-3 text-xs font-black tracking-[0.16em] text-muted uppercase">
            {labels.language}
          </p>
          <div className="flex gap-2">
            {locales.map((item) => {
              const segments = pathname.split("/");
              segments[1] = item;
              return (
                <Link
                  key={item}
                  href={segments.join("/") || `/${item}`}
                  onClick={() => setIsOpen(false)}
                  aria-current={item === locale ? "page" : undefined}
                  className={`grid min-h-11 min-w-14 place-items-center rounded-xl border px-3 text-sm font-bold ${
                    item === locale
                      ? "border-transparent bg-(image:--gradient-cta) text-white"
                      : "border-border text-heading"
                  }`}
                >
                  {item.toUpperCase()}
                </Link>
              );
            })}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
