"use client";

import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

export function StudentResultsRefresh({ active }: { active: boolean }) {
  const router = useRouter();
  const [refreshing, startTransition] = useTransition();

  useEffect(() => {
    if (!active || refreshing) return;
    const refresh = () => {
      if (document.visibilityState === "visible") startTransition(() => router.refresh());
    };
    const timer = window.setTimeout(refresh, 30_000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [active, refreshing, router]);

  return null;
}
