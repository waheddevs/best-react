"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

export function useMobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return {
    closeNavigation: () => setIsOpen(false),
    isOpen,
    openNavigation: () => setIsOpen(true),
    pathname,
  };
}
