import { usePathname, useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";

import type { Locale } from "@/config/Locales";
import { useScrollToTop } from "@/hooks/navigation/useScrollToTop";

export function useLocaleSwitcher() {
  /* HOOKS */
  const pathname = usePathname();
  const router = useRouter();
  const scroll = useScrollToTop();
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
    scroll.handleScrollToTop();
    router.push(segments.join("/") || `/${nextLocale}`, { scroll: false });
    setAnchorElement(null);
  };

  return {
    anchorElement,
    handleMenuOpen,
    handleMenuClose,
    handleLocaleSelect,
  };
}
