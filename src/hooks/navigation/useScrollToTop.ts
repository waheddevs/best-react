import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export function useScrollToTop() {
  /* HOOKS */
  const pathname = usePathname();
  const shouldScrollAfterNavigation = useRef(false);

  useEffect(() => {
    if (!shouldScrollAfterNavigation.current) return;

    shouldScrollAfterNavigation.current = false;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  /* HANDLERS */
  const handleScrollToTop = useCallback(() => {
    shouldScrollAfterNavigation.current = true;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return { handleScrollToTop };
}
