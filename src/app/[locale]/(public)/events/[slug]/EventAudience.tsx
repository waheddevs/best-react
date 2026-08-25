import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";

import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { Section } from "@/components/ui/Section";
import styles from "@/css/public/events.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { EventTakeaways } from "./EventTakeaways";

type EventAudienceProps = {
  audience: string[];
  copy: PageCopy;
  takeaways: string[];
};

export function EventAudience({ audience, copy, takeaways }: EventAudienceProps) {
  return (
    <Section tone="surface">
      <div className={styles.events__audienceGrid}>
        <Reveal>
          <article className={styles.events__audienceCard}>
            <span className={styles.events__audienceIcon}>
              <GroupsRounded aria-hidden="true" />
            </span>
            <h2 className={styles.events__audienceTitle}>{copy.events.audienceTitle}</h2>
            <p className={styles.events__audienceDescription}>{copy.events.audienceDescription}</p>
            <StaggerGroup className={styles.events__audienceList} delay={0.08}>
              {audience.map((item) => (
                <StaggerItem key={item}>
                  <div className={styles.events__audienceListItem}>
                    <CheckCircleRounded aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </article>
        </Reveal>
        <Reveal delay={0.08}>
          <EventTakeaways copy={copy} items={takeaways} />
        </Reveal>
      </div>
    </Section>
  );
}
