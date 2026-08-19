import { useCallback } from "react";

export function useScrollToTop() {
  /* HANDLERS */
  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return { handleScrollToTop };
}
