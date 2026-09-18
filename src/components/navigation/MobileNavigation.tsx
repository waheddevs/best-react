"use client";

import CloseRounded from "@mui/icons-material/CloseRounded";
import MenuRounded from "@mui/icons-material/MenuRounded";
import Drawer from "@mui/material/Drawer";
import Tooltip from "@mui/material/Tooltip";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import { IconButton } from "@/components/ui/IconButton";
import { navbarNavigationItems } from "@/config/Navigation";
import { locales, type Locale } from "@/config/Locales";
import type { Dictionary } from "@/dictionaries/public/Types";
import { useMobileNavigation } from "@/hooks/navigation/useMobileNavigation";

type MobileNavigationProps = {
  locale: Locale;
  labels: Dictionary["navigation"];
};

export function MobileNavigation({ locale, labels }: MobileNavigationProps) {
  /* HOOKS */
  const navigation = useMobileNavigation();
  const { isOpen, pathname, getLocaleHref } = navigation;

  /* HANDLERS */
  const { handleOpenNavigation, handleCloseNavigation } = navigation;

  return (
    <div className="navbar__mobile">
      <Tooltip title={labels.menu} arrow>
        <IconButton
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          label={labels.menu}
          onClick={handleOpenNavigation}
        >
          <MenuRounded />
        </IconButton>
      </Tooltip>
      <Drawer
        id="mobile-navigation"
        anchor="right"
        open={isOpen}
        onClose={handleCloseNavigation}
        slotProps={{ paper: { className: "navbar__mobileDrawer" } }}
      >
        <div className="navbar__mobileHeader">
          <span className="navbar__mobileBrand">BEST LC</span>
          <IconButton label={labels.closeMenu} onClick={handleCloseNavigation}>
            <CloseRounded />
          </IconButton>
        </div>
        <nav aria-label={labels.menu} className="navbar__mobileNav">
          {navbarNavigationItems.map((item) => {
            const href = `/${locale}${item.href}`;
            const isActive =
              item.href === ""
                ? pathname === href
                : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <ScrollToTopLink
                key={item.key}
                href={href}
                onClick={handleCloseNavigation}
                aria-current={isActive ? "page" : undefined}
                className={`navbar__mobileLink ${isActive ? "navbar__mobileLinkActive" : ""}`}
              >
                {labels[item.key]}
              </ScrollToTopLink>
            );
          })}
        </nav>
        <div className="navbar__mobileLocale">
          <p className="navbar__mobileLocaleLabel">{labels.language}</p>
          <div className="navbar__mobileLocaleList">
            {locales.map((item) => {
              return (
                <ScrollToTopLink
                  key={item}
                  href={getLocaleHref(item)}
                  onClick={handleCloseNavigation}
                  aria-current={item === locale ? "page" : undefined}
                  className={`navbar__mobileLocaleLink ${item === locale ? "navbar__mobileLocaleLinkActive" : ""}`}
                >
                  {item.toUpperCase()}
                </ScrollToTopLink>
              );
            })}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
