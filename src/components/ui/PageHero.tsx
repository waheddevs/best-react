import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { PageHeroCopy } from "@/components/ui/PageHeroCopy";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  visual?: ReactNode;
  className?: string;
  animateCopy?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  visual,
  className,
  animateCopy = false,
}: PageHeroProps) {
  return (
    <section
      className={`publicShared__pageHero ${visual ? "publicShared__pageHeroWithVisual" : ""} ${className ?? ""}`}
    >
      <div className="publicShared__pageHeroGlow" />
      <Container
        className={`publicShared__pageHeroContainer ${visual ? "publicShared__pageHeroContainerWithVisual" : ""}`}
      >
        <PageHeroCopy
          animate={animateCopy}
          description={description}
          eyebrow={eyebrow}
          title={title}
        />
        {visual ? <div className="publicShared__pageHeroVisual">{visual}</div> : null}
      </Container>
    </section>
  );
}
