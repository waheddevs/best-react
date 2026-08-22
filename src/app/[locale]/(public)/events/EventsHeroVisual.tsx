import CelebrationRounded from "@mui/icons-material/CelebrationRounded";
import ConfirmationNumberRounded from "@mui/icons-material/ConfirmationNumberRounded";
import LocationOnRounded from "@mui/icons-material/LocationOnRounded";

import { HeroVisualFrame } from "@/components/motion/HeroVisualFrame";
import { LiveIllustration } from "@/components/motion/LiveIllustration";
import styles from "@/css/public/events.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { EventCalendar } from "./EventCalendar";

type EventsHeroVisualProps = {
  copy: PageCopy["events"];
};

export function EventsHeroVisual({ copy }: EventsHeroVisualProps) {
  return (
    <HeroVisualFrame className={styles.events__heroVisual}>
      <span className={styles.events__heroOrbit} />
      <div className={styles.events__heroCalendar}>
        <span className={styles.events__heroCalendarTop}>
          <i />
          <i />
        </span>
        <div className={styles.events__heroCalendarContent}>
          <span className={styles.events__heroCalendarCopy}>
            <strong className={styles.events__heroCalendarTitle}>{copy.upcoming}</strong>
            <span className={styles.events__heroCalendarMeta}>
              {copy.format} · {copy.location}
            </span>
          </span>
          <EventCalendar />
        </div>
      </div>
      <LiveIllustration
        className={`${styles.events__heroDetail} ${styles.events__heroDetailTicket}`}
        delay={0.4}
        variant="drift"
      >
        <ConfirmationNumberRounded />
      </LiveIllustration>
      <LiveIllustration
        className={`${styles.events__heroDetail} ${styles.events__heroDetailLocation}`}
        delay={0.8}
        variant="pulse"
      >
        <LocationOnRounded />
      </LiveIllustration>
      <LiveIllustration className={styles.events__heroCelebration} delay={1.2}>
        <CelebrationRounded />
      </LiveIllustration>
      <span className={styles.events__heroAccent} />
    </HeroVisualFrame>
  );
}
