"use client";

import Link from "next/link";

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
    <Link
      href={`/${locale}${href}`}
      aria-current={isActive ? "page" : undefined}
      className={`${styles.navbar__link} ${isActive ? styles.navbar__linkActive : ""}`}
    >
      {label}
    </Link>
  );
}
