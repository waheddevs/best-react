import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import styles from "@/css/public/shared.module.css";

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
      ? styles.publicShared__sectionSurface
      : tone === "background"
        ? styles.publicShared__sectionBackground
        : "";

  return (
    <section id={id} className={`${styles.publicShared__section} ${toneClassName} ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
