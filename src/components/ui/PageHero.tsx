import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { PageHeroCopy } from "@/components/ui/PageHeroCopy";
import styles from "@/css/public/shared.module.css";

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
      className={`${styles.publicShared__pageHero} ${visual ? styles.publicShared__pageHeroWithVisual : ""} ${className ?? ""}`}
    >
      <div className={styles.publicShared__pageHeroGlow} />
      <Container
        className={`${styles.publicShared__pageHeroContainer} ${visual ? styles.publicShared__pageHeroContainerWithVisual : ""}`}
      >
        <PageHeroCopy
          animate={animateCopy}
          description={description}
          eyebrow={eyebrow}
          title={title}
        />
        {visual ? <div className={styles.publicShared__pageHeroVisual}>{visual}</div> : null}
      </Container>
    </section>
  );
}
