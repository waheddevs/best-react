import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { Container } from "@/components/ui/Container";
import styles from "@/css/public/home.module.css";
import type { Dictionary } from "@/dictionaries/public/Types";

type TrustStripProps = {
  content: Dictionary["home"];
};

export function TrustStrip({ content }: TrustStripProps) {
  return (
    <section aria-label={content.eyebrow} className={styles.home__trustStrip}>
      <Container>
        <StaggerGroup className={styles.home__trustGrid}>
          {content.highlights.map((highlight, index) => {
            return (
              <StaggerItem key={highlight.label} className={styles.home__trustMotionItem}>
                <article className={styles.home__trustItem} data-accent={index + 1}>
                  <span
                    aria-hidden="true"
                    className={styles.home__trustMarker}
                    data-accent={index + 1}
                  />
                  <p className={styles.home__trustValue}>{highlight.value}</p>
                  <h2 className={styles.home__trustLabel}>{highlight.label}</h2>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
