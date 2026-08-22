"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { useScrollToTop } from "@/hooks/navigation/useScrollToTop";

type ScrollToTopLinkProps = ComponentProps<typeof Link>;

export function ScrollToTopLink({ onNavigate, ...props }: ScrollToTopLinkProps) {
  /* HOOKS */
  const scroll = useScrollToTop();
  const hasHash =
    typeof props.href === "string" ? props.href.includes("#") : Boolean(props.href.hash);

  /* HANDLERS */
  const handleNavigate: NonNullable<ScrollToTopLinkProps["onNavigate"]> = (event) => {
    if (!hasHash) scroll.handleScrollToTop();
    onNavigate?.(event);
  };

  return <Link {...props} scroll={hasHash} onNavigate={handleNavigate} />;
}
