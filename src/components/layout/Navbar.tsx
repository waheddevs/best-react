import Link from "next/link";

import { NavbarDropdown } from "@/components/navigation/NavbarDropdown";
import { Container } from "@/components/ui/Container";
import { LocaleSwitcher } from "@/components/navigation/LocaleSwitcher";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import {
  courseNavigationItems,
  examNavigationItems,
  navbarNavigationItems,
} from "@/config/Navigation";
import type { Locale } from "@/config/Locales";
import styles from "@/css/layout/navbar.module.css";
import type { Dictionary } from "@/dictionaries/public/Types";

type NavbarProps = {
  locale: Locale;
  labels: Dictionary["navigation"];
};

export function Navbar({ locale, labels }: NavbarProps) {
  return (
    <header className={styles.navbar}>
      <Container className={styles.navbar__container}>
        <Link
          href={`/${locale}`}
          aria-label={labels.home}
          className={styles.navbar__brand}
        >
          <span className={styles.navbar__brandMark}>
            B
          </span>
          <span className={styles.navbar__brandCopy}>
            <span className={styles.navbar__brandName}>BEST</span>
            <span className={styles.navbar__brandCaption}>
              LEARNING CENTER
            </span>
          </span>
        </Link>

        <nav aria-label={labels.menu} className={styles.navbar__desktopNav}>
          {navbarNavigationItems.map((item) => {
            if (item.key !== "courses" && item.key !== "exams") {
              return (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className={styles.navbar__link}
                >
                  {labels[item.key]}
                </Link>
              );
            }

            const dropdownItems =
              item.key === "courses"
                ? courseNavigationItems.map((dropdownItem) => ({
                    ...dropdownItem,
                    label: labels.courseMenu[dropdownItem.key],
                  }))
                : examNavigationItems.map((dropdownItem) => ({
                    ...dropdownItem,
                    label: labels.examMenu[dropdownItem.key],
                  }));

            return (
              <NavbarDropdown
                key={item.key}
                locale={locale}
                href={item.href}
                label={labels[item.key]}
                items={dropdownItems}
              />
            );
          })}
        </nav>

        <div className={styles.navbar__actions}>
          <div className={styles.navbar__localeDesktop}>
            <LocaleSwitcher locale={locale} label={labels.language} />
          </div>
          <div className={styles.navbar__auth}>
            <button
              type="button"
              className={styles.navbar__login}
            >
              {labels.login}
            </button>
            <button
              type="button"
              className={styles.navbar__signup}
            >
              {labels.signup}
            </button>
          </div>
          <MobileNavigation locale={locale} labels={labels} />
        </div>
      </Container>
    </header>
  );
}
