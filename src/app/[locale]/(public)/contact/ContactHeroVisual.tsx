import ChatBubbleRounded from "@mui/icons-material/ChatBubbleRounded";
import LocationOnRounded from "@mui/icons-material/LocationOnRounded";

import { HeroVisualFrame } from "@/components/motion/HeroVisualFrame";
import { LiveIllustration } from "@/components/motion/LiveIllustration";
import styles from "@/css/public/contact.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { ContactMessageMotion } from "./ContactMessageMotion";

type ContactHeroVisualProps = {
  copy: PageCopy["contact"];
};

export function ContactHeroVisual({ copy }: ContactHeroVisualProps) {
  return (
    <HeroVisualFrame className={styles.contact__heroVisual}>
      <span className={styles.contact__heroOrbit} />
      <LiveIllustration className={styles.contact__heroMessage} variant="tilt">
        <ContactMessageMotion copy={copy} />
      </LiveIllustration>
      <LiveIllustration
        className={`${styles.contact__heroChannel} ${styles.contact__heroChannelChat}`}
        delay={0.4}
        variant="drift"
      >
        <ChatBubbleRounded />
      </LiveIllustration>
      <LiveIllustration
        className={`${styles.contact__heroChannel} ${styles.contact__heroChannelLocation}`}
        delay={0.9}
        variant="pulse"
      >
        <LocationOnRounded />
      </LiveIllustration>
      <span className={styles.contact__heroAccent} />
    </HeroVisualFrame>
  );
}
