import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

type SectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
};

export function Section({ children, className = "", containerClassName = "", id }: SectionProps) {
  return (
    <section id={id} className={`section ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
