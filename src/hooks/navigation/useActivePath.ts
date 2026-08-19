import { usePathname } from "next/navigation";

export function useActivePath(locale: string, href: string) {
  /* HOOKS */
  const pathname = usePathname();
  const localizedHref = `/${locale}${href}`;

  return href === ""
    ? pathname === localizedHref
    : pathname === localizedHref || pathname.startsWith(`${localizedHref}/`);
}
