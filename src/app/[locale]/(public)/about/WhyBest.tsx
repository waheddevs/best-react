import ExploreRounded from "@mui/icons-material/ExploreRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import InsightsRounded from "@mui/icons-material/InsightsRounded";

import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "@/css/public/about.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

const whyIcons = [ExploreRounded, GroupsRounded, InsightsRounded];

type WhyBestProps = {
  copy: PageCopy;
};

export function WhyBest({ copy }: WhyBestProps) {
  return (
    <Section tone="surface">
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow={copy.about.whyEyebrow}
          title={copy.about.whyTitle}
        />
      </Reveal>
      <StaggerGroup className={styles.about__whyGrid}>
        {copy.about.whyItems.map((item, index) => {
          const Icon = whyIcons[index];

          return (
            <StaggerItem key={item.title} className={styles.about__whyMotionItem}>
              <article className={styles.about__whyCard}>
                <span className={styles.about__whyIcon}>
                  <Icon aria-hidden="true" />
                </span>
                <h3 className={styles.about__whyTitle}>{item.title}</h3>
                <p className={styles.about__whyDescription}>{item.description}</p>
                <div className={styles.about__whyDecoration} />
              </article>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
