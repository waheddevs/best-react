import { usePathname } from "next/navigation";
import { useState } from "react";

import type { Locale } from "@/config/Locales";

export function useMobileNavigation() {
  /* HOOKS */
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  /* HANDLERS */
  const handleOpenNavigation = () => {
    setIsOpen(true);
  };

  const handleCloseNavigation = () => {
    setIsOpen(false);
  };

  const getLocaleHref = (locale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  };

  return {
    isOpen,
    pathname,
    getLocaleHref,
    handleOpenNavigation,
    handleCloseNavigation,
  };
}
