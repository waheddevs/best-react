"use client";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
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
      className={`navbar__link ${isActive ? "navbar__linkActive" : ""}`}
    >
      {label}
    </ScrollToTopLink>
  );
}
