"use client";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import styles from "@/css/layout/navbar.module.css";
import { useActivePath } from "@/hooks/navigation/useActivePath";

type NavbarLinkProps = {
  locale: string;
  href: string;
  label: string;
};

export function NavbarLink({ locale, href, label }: NavbarLinkProps) {
  /* HOOKS */
  const isActive = useActivePath(locale, href);

  return (
    <ScrollToTopLink
      href={`/${locale}${href}`}
      aria-current={isActive ? "page" : undefined}
      className={`${styles.navbar__link} ${isActive ? styles.navbar__linkActive : ""}`}
    >
      {label}
    </ScrollToTopLink>
  );
}
