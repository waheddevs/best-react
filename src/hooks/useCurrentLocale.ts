import { usePathname } from "next/navigation";

import { defaultLocale, isLocale } from "@/config/Locales";

export function useCurrentLocale() {
  /* HOOKS */
  const pathname = usePathname();
  const pathLocale = pathname.split("/")[1];

  return isLocale(pathLocale) ? pathLocale : defaultLocale;
}
