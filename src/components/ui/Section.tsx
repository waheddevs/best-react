import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import styles from "@/css/public/shared.module.css";

type SectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
};

export function Section({ children, className = "", containerClassName = "", id }: SectionProps) {
  return (
    <section id={id} className={`${styles.publicShared__section} ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
