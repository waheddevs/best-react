import { DraftNotice } from "@/components/ui/DraftNotice";
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
    <section>
      <DraftNotice badge={copy.common.draftBadge} note={copy.common.draftNote} />
      <h2 className={styles.events__topicsTitle}>
        {copy.events.topics}
      </h2>
      <ol className={styles.events__topicsList}>
        {event.topics[locale].map((topic, index) => (
          <li
            key={topic}
            className={styles.events__topic}
          >
            <span className={styles.events__topicNumber}>
              {index + 1}
            </span>
            <span className={styles.events__topicText}>{topic}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
