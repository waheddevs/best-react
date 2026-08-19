import { usePathname, useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";

import type { Locale } from "@/config/Locales";

export function useLocaleSwitcher() {
  /* HOOKS */
  const pathname = usePathname();
  const router = useRouter();
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  /* HANDLERS */
  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElement(null);
  };

  const handleLocaleSelect = (nextLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/") || `/${nextLocale}`);
    setAnchorElement(null);
  };

  return {
    anchorElement,
    handleMenuOpen,
    handleMenuClose,
    handleLocaleSelect,
  };
}
