import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import LightbulbRounded from "@mui/icons-material/LightbulbRounded";
import VerifiedRounded from "@mui/icons-material/VerifiedRounded";
import VolunteerActivismRounded from "@mui/icons-material/VolunteerActivismRounded";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "@/css/public/about.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

const valueIcons = [
  LightbulbRounded,
  AutoStoriesRounded,
  VolunteerActivismRounded,
  VerifiedRounded,
];

type ValuesProps = {
  copy: PageCopy;
};

export function Values({ copy }: ValuesProps) {
  return (
    <Section className={styles.about__values}>
      <SectionHeading title={copy.about.approachTitle} />
      <div className={styles.about__valuesGrid}>
        {copy.about.values.map((value, index) => {
          const Icon = valueIcons[index];

          return (
            <article
              key={value.title}
              className={styles.about__valueCard}
            >
              <span className={styles.about__valueIcon}>
                <Icon aria-hidden="true" />
              </span>
              <h2 className={styles.about__valueTitle}>{value.title}</h2>
              <p className={styles.about__valueDescription}>{value.description}</p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
