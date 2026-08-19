import { Section } from "@/components/ui/Section";
import styles from "@/css/public/about.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type StoryProps = {
  copy: PageCopy;
};

export function Story({ copy }: StoryProps) {
  return (
    <Section>
      <div className={styles.about__storyGrid}>
        <article className={styles.about__storyCard}>
          <h2 className={styles.about__storyTitle}>
            {copy.about.storyTitle}
          </h2>
          <p className={styles.about__storyDescription}>{copy.about.storyBody}</p>
        </article>
        <article className={`${styles.about__storyCard} ${styles.about__storyCardAccent}`}>
          <h2 className={`${styles.about__storyTitle} ${styles.about__storyTitleAccent}`}>
            {copy.about.environmentTitle}
          </h2>
          <p
            className={`${styles.about__storyDescription} ${styles.about__storyDescriptionAccent}`}
          >
            {copy.about.environmentBody}
          </p>
        </article>
      </div>
    </Section>
  );
}
