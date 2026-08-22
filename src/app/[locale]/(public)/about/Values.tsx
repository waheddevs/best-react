import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import LightbulbRounded from "@mui/icons-material/LightbulbRounded";
import RateReviewRounded from "@mui/icons-material/RateReviewRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import TaskAltRounded from "@mui/icons-material/TaskAltRounded";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import VerifiedRounded from "@mui/icons-material/VerifiedRounded";
import VolunteerActivismRounded from "@mui/icons-material/VolunteerActivismRounded";

import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "@/css/public/about.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

const valueIcons = [
  LightbulbRounded,
  AutoStoriesRounded,
  VolunteerActivismRounded,
  VerifiedRounded,
  ScheduleRounded,
  RateReviewRounded,
  TaskAltRounded,
  TrendingUpRounded,
];

type ValuesProps = {
  copy: PageCopy;
};

export function Values({ copy }: ValuesProps) {
  return (
    <Section className={styles.about__values}>
      <Reveal>
        <SectionHeading title={copy.about.approachTitle} align="center" />
      </Reveal>

      <div className={styles.about__valuesViewport}>
        <div className={styles.about__valuesTrack}>
          {[false, true].map((isDuplicate) => (
            <div
              key={isDuplicate ? "duplicate" : "primary"}
              className={styles.about__valuesGroup}
              aria-hidden={isDuplicate}
            >
              {copy.about.values.map((value, index) => {
                const Icon = valueIcons[index];

                return (
                  <article
                    key={`${isDuplicate ? "duplicate" : "primary"}-${value.title}`}
                    className={styles.about__valueCard}
                  >
                    <span className={styles.about__valueIcon}>
                      <Icon aria-hidden="true" />
                    </span>
                    <h2 className={styles.about__valueTitle}>{value.title}</h2>
                    <p className={styles.about__valueDescription}>{value.description}</p>
                    <span className={styles.about__valueDecoration} aria-hidden="true" />
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
