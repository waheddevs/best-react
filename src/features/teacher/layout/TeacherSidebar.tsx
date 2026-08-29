"use client";

import LogoutRounded from "@mui/icons-material/LogoutRounded";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import { locales, type Locale } from "@/config/Locales";
import { teacherNavigationItems } from "@/config/TeacherNavigation";
import styles from "@/css/teacher/shell.module.css";
import { TeacherNavigationIcon } from "@/features/teacher/layout/TeacherNavigationIcon";
import { useLocaleSwitcher } from "@/hooks/navigation/useLocaleSwitcher";
import type { TeacherCopy, TeacherProfileData } from "@/types/teacher/Teacher";

type TeacherSidebarProps = {
  copy: TeacherCopy;
  locale: Locale;
  onNavigate?: () => void;
  onLogout: () => void;
  profile: TeacherProfileData;
};

export function TeacherSidebar({
  copy,
  locale,
  onNavigate,
  onLogout,
  profile,
}: TeacherSidebarProps) {
  /* HOOKS */
  const pathname = usePathname();
  const localeSwitcher = useLocaleSwitcher();

  const isActive = (href: string) => {
    const localizedHref = `/${locale}${href}`;
    return href === "/teacher"
      ? pathname === localizedHref
      : pathname === localizedHref || pathname.startsWith(`${localizedHref}/`);
  };

  return (
    <div className={styles.teacherShell__sidebarContent}>
      <div className={styles.teacherShell__brand}>
        <Image alt="" aria-hidden="true" height={40} src="/icons/logo.svg" width={40} />
        <div>
          <strong>BEST LC</strong>
          <span>{copy.navigation.panelLabel}</span>
        </div>
      </div>

      <div className={styles.teacherShell__profileCard}>
        <span className={styles.teacherShell__avatar}>{profile.initials}</span>
        <span className={styles.teacherShell__profileCopy}>
          <strong>{profile.displayName}</strong>
          <small>{copy.common.teacherRole}</small>
        </span>
      </div>

      <nav aria-label={copy.navigation.panelLabel} className={styles.teacherShell__navigation}>
        {teacherNavigationItems.map((item) => {
          const itemIsActive = isActive(item.href);
          return (
            <span
              className={styles.teacherShell__navigationItem}
              data-active={itemIsActive}
              key={item.key}
            >
              <ScrollToTopLink
                aria-current={itemIsActive ? "page" : undefined}
                className={styles.teacherShell__navigationLink}
                data-active={itemIsActive}
                href={`/${locale}${item.href}`}
                onClick={onNavigate}
              >
                <TeacherNavigationIcon navigationKey={item.key} />
                <span>{copy.navigation[item.key]}</span>
              </ScrollToTopLink>
            </span>
          );
        })}
      </nav>

      <div className={styles.teacherShell__sidebarFooter}>
        <button className={styles.teacherShell__logout} onClick={onLogout} type="button">
          <LogoutRounded aria-hidden="true" />
          <span>{copy.navigation.logout}</span>
        </button>

        <div aria-label={copy.profile.language} className={styles.teacherShell__localeGroup}>
          {locales.map((item) => (
            <button
              aria-pressed={item === locale}
              className={styles.teacherShell__localeButton}
              key={item}
              onClick={() => localeSwitcher.handleLocaleSelect(item)}
              type="button"
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
