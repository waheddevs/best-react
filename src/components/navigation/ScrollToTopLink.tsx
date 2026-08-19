"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { useScrollToTop } from "@/hooks/navigation/useScrollToTop";

type ScrollToTopLinkProps = ComponentProps<typeof Link>;

export function ScrollToTopLink({ onNavigate, ...props }: ScrollToTopLinkProps) {
  /* HOOKS */
  const scroll = useScrollToTop();

  /* HANDLERS */
  const handleNavigate: NonNullable<ScrollToTopLinkProps["onNavigate"]> = (event) => {
    scroll.handleScrollToTop();
    onNavigate?.(event);
  };

  return <Link {...props} onNavigate={handleNavigate} />;
}
