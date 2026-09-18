import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/dictionaries/public/Types";

import { AnimatedTrustValue } from "./AnimatedTrustValue";

type TrustStripProps = {
  content: Dictionary["home"];
};

export function TrustStrip({ content }: TrustStripProps) {
  return (
    <section aria-label={content.eyebrow} className="home__trustStrip">
      <Container>
        <StaggerGroup className="home__trustGrid">
          {content.highlights.map((highlight, index) => {
            return (
              <StaggerItem key={highlight.label} className="home__trustMotionItem">
                <article className="home__trustItem" data-accent={index + 1}>
                  <span aria-hidden="true" className="home__trustMarker" data-accent={index + 1} />
                  <p className="home__trustValue">
                    <AnimatedTrustValue delay={index * 0.08} value={highlight.value} />
                  </p>
                  <h2 className="home__trustLabel">{highlight.label}</h2>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
