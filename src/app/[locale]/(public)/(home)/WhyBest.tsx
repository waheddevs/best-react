import ExploreRounded from "@mui/icons-material/ExploreRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import InsightsRounded from "@mui/icons-material/InsightsRounded";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "@/css/public/home.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

const whyIcons = [ExploreRounded, GroupsRounded, InsightsRounded];

type WhyBestProps = {
  copy: PageCopy;
};

export function WhyBest({ copy }: WhyBestProps) {
  return (
    <Section className={styles.home__whyBest}>
      <SectionHeading eyebrow={copy.home.whyEyebrow} title={copy.home.whyTitle} />
      <div className={styles.home__whyGrid}>
        {copy.home.whyItems.map((item, index) => {
          const Icon = whyIcons[index];

          return (
            <article
              key={item.title}
              className={`${styles.home__whyCard} ${index === 0 ? styles.home__whyCardPrimary : ""}`}
            >
              <span
                className={`${styles.home__whyIcon} ${index === 0 ? styles.home__whyIconPrimary : ""}`}
              >
                <Icon aria-hidden="true" />
              </span>
              <h3
                className={`${styles.home__whyTitle} ${index === 0 ? styles.home__whyTitlePrimary : ""}`}
              >
                {item.title}
              </h3>
              <p
                className={`${styles.home__whyDescription} ${index === 0 ? styles.home__whyDescriptionPrimary : ""}`}
              >
                {item.description}
              </p>
              {index === 0 ? (
                <div className={styles.home__whyDecoration} />
              ) : null}
            </article>
          );
        })}
      </div>
    </Section>
  );
}
