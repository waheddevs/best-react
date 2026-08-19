"use client";

import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import Link from "next/link";

import styles from "@/css/layout/navbar.module.css";
import { useActivePath } from "@/hooks/navigation/useActivePath";
import { useNavbarDropdown } from "@/hooks/navigation/useNavbarDropdown";

type NavbarDropdownItem = {
  key: string;
  href: string;
  label: string;
};

type NavbarDropdownProps = {
  locale: string;
  href: string;
  label: string;
  items: ReadonlyArray<NavbarDropdownItem>;
};

export function NavbarDropdown({ locale, href, label, items }: NavbarDropdownProps) {
  /* HOOKS */
  const dropdown = useNavbarDropdown();
  const isActive = useActivePath(locale, href);
  const { isOpen, triggerRef } = dropdown;

  /* HANDLERS */
  const {
    handleMouseEnter,
    handleMouseLeave,
    handleNavigation,
    handleFocus,
    handleBlur,
    handleKeyDown,
  } = dropdown;

  return (
    <div
      className={`${styles.navbar__dropdown} ${isOpen ? styles.navbar__dropdownOpen : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <Link
        ref={triggerRef}
        href={`/${locale}${href}`}
        className={`${styles.navbar__link} ${styles.navbar__dropdownTrigger} ${isActive ? styles.navbar__linkActive : ""}`}
        aria-current={isActive ? "page" : undefined}
        aria-expanded={isOpen}
        onClick={handleNavigation}
      >
        {label}
        <ExpandMoreRounded aria-hidden="true" className={styles.navbar__dropdownArrow} />
      </Link>
      <div className={styles.navbar__dropdownPanel}>
        <div className={styles.navbar__dropdownMenu}>
          <ul aria-label={label} className={styles.navbar__dropdownList}>
            {items.map((item) => (
              <li key={item.key}>
                <Link
                  href={`/${locale}${item.href}`}
                  className={styles.navbar__dropdownItem}
                  onClick={handleNavigation}
                >
                  <span aria-hidden="true" className={styles.navbar__dropdownBullet} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
