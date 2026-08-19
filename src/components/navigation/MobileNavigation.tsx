"use client";

import CloseRounded from "@mui/icons-material/CloseRounded";
import MenuRounded from "@mui/icons-material/MenuRounded";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import { navbarNavigationItems } from "@/config/Navigation";
import { locales, type Locale } from "@/config/Locales";
import styles from "@/css/layout/navbar.module.css";
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
    <div className={styles.navbar__mobile}>
      <Tooltip title={labels.menu} arrow>
        <IconButton
          aria-label={labels.menu}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={handleOpenNavigation}
          size="small"
          className={styles.navbar__iconButton}
        >
          <MenuRounded />
        </IconButton>
      </Tooltip>
      <Drawer
        id="mobile-navigation"
        anchor="right"
        open={isOpen}
        onClose={handleCloseNavigation}
        slotProps={{ paper: { className: styles.navbar__mobileDrawer } }}
      >
        <div className={styles.navbar__mobileHeader}>
          <span className={styles.navbar__mobileBrand}>BEST LC</span>
          <IconButton
            aria-label={labels.closeMenu}
            onClick={handleCloseNavigation}
            size="small"
            className={styles.navbar__iconButton}
          >
            <CloseRounded />
          </IconButton>
        </div>
        <nav aria-label={labels.menu} className={styles.navbar__mobileNav}>
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
                className={`${styles.navbar__mobileLink} ${isActive ? styles.navbar__mobileLinkActive : ""}`}
              >
                {labels[item.key]}
              </ScrollToTopLink>
            );
          })}
        </nav>
        <div className={styles.navbar__mobileLocale}>
          <p className={styles.navbar__mobileLocaleLabel}>{labels.language}</p>
          <div className={styles.navbar__mobileLocaleList}>
            {locales.map((item) => {
              return (
                <ScrollToTopLink
                  key={item}
                  href={getLocaleHref(item)}
                  onClick={handleCloseNavigation}
                  aria-current={item === locale ? "page" : undefined}
                  className={`${styles.navbar__mobileLocaleLink} ${item === locale ? styles.navbar__mobileLocaleLinkActive : ""}`}
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
