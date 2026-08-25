import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import LightbulbRounded from "@mui/icons-material/LightbulbRounded";

import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import styles from "@/css/public/events.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type EventTakeawaysProps = {
  copy: PageCopy;
  items: string[];
};

export function EventTakeaways({ copy, items }: EventTakeawaysProps) {
  return (
    <article className={`${styles.events__audienceCard} ${styles.events__takeawaysCard}`}>
      <span className={styles.events__audienceIcon}>
        <LightbulbRounded aria-hidden="true" />
      </span>
      <h2 className={styles.events__audienceTitle}>{copy.events.takeawaysTitle}</h2>
      <p className={styles.events__audienceDescription}>{copy.events.takeawaysDescription}</p>
      <StaggerGroup className={styles.events__audienceList} delay={0.08}>
        {items.map((item) => (
          <StaggerItem key={item}>
            <div className={styles.events__audienceListItem}>
              <CheckCircleRounded aria-hidden="true" />
              <span>{item}</span>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </article>
  );
}
