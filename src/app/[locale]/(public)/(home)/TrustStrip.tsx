import HandymanRounded from "@mui/icons-material/HandymanRounded";
import PsychologyRounded from "@mui/icons-material/PsychologyRounded";
import TrackChangesRounded from "@mui/icons-material/TrackChangesRounded";

import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { Container } from "@/components/ui/Container";
import styles from "@/css/public/home.module.css";
import type { Dictionary } from "@/dictionaries/public/Types";

const benefitIcons = [HandymanRounded, PsychologyRounded, TrackChangesRounded];

type TrustStripProps = {
  content: Dictionary["home"];
};

export function TrustStrip({ content }: TrustStripProps) {
  return (
    <section aria-label={content.eyebrow} className={styles.home__trustStrip}>
      <Container>
        <StaggerGroup className={styles.home__trustGrid}>
          {content.benefits.map((benefit, index) => {
            const BenefitIcon = benefitIcons[index];

            return (
              <StaggerItem key={benefit.title} className={styles.home__trustMotionItem}>
                <article className={styles.home__trustItem}>
                  <span className={styles.home__trustIcon}>
                    <BenefitIcon aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className={styles.home__trustTitle}>{benefit.title}</h2>
                    <p className={styles.home__trustDescription}>{benefit.description}</p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
