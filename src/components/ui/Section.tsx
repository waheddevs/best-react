import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";

type SectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  tone?: "surface" | "background";
};

export function Section({
  children,
  className = "",
  containerClassName = "",
  id,
  tone,
}: SectionProps) {
  const toneClassName =
    tone === "surface"
      ? "publicShared__sectionSurface"
      : tone === "background"
        ? "publicShared__sectionBackground"
        : "";

  return (
    <section id={id} className={`publicShared__section ${toneClassName} ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
