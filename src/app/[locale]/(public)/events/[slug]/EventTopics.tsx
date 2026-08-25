import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/events.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicEvent } from "@/types/PublicContent";

type EventTopicsProps = {
  event: PublicEvent;
  locale: Locale;
  copy: PageCopy;
};

export function EventTopics({ event, locale, copy }: EventTopicsProps) {
  return (
    <section aria-labelledby="event-topics-title" className={styles.events__topics}>
      <h2 className={styles.events__topicsTitle} id="event-topics-title">
        {copy.events.topics}
      </h2>
      <StaggerGroup className={styles.events__topicsList} delay={0.08}>
        {event.topics[locale].map((topic, index) => (
          <StaggerItem key={topic} initialScale={0.985}>
            <div className={styles.events__topic}>
              <span className={styles.events__topicNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.events__topicText}>{topic}</span>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
