import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import RecordVoiceOverRounded from "@mui/icons-material/RecordVoiceOverRounded";
import SchoolRounded from "@mui/icons-material/SchoolRounded";
import TranslateRounded from "@mui/icons-material/TranslateRounded";

import { HeroVisualFrame } from "@/components/motion/HeroVisualFrame";
import { LiveIllustration } from "@/components/motion/LiveIllustration";
import styles from "@/css/public/courses.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { CourseProgress } from "./CourseProgress";

type CoursesHeroVisualProps = {
  copy: PageCopy["courses"];
};

export function CoursesHeroVisual({ copy }: CoursesHeroVisualProps) {
  return (
    <HeroVisualFrame className={styles.courses__heroVisual}>
      <span className={styles.courses__heroOrbit} />
      <LiveIllustration className={styles.courses__heroLesson} variant="tilt">
        <span className={styles.courses__heroLessonIcon}>
          <AutoStoriesRounded />
        </span>
        <strong className={styles.courses__heroLessonTitle}>{copy.curriculum}</strong>
        <span className={styles.courses__heroLessonMeta}>
          {copy.categories.language} · {copy.level}
        </span>
        <CourseProgress />
      </LiveIllustration>
      <LiveIllustration
        className={`${styles.courses__heroSubject} ${styles.courses__heroSubjectLanguage}`}
        delay={0.3}
        variant="drift"
      >
        <TranslateRounded />
      </LiveIllustration>
      <LiveIllustration
        className={`${styles.courses__heroSubject} ${styles.courses__heroSubjectSpeaking}`}
        delay={0.7}
        variant="pulse"
      >
        <RecordVoiceOverRounded />
      </LiveIllustration>
      <LiveIllustration
        className={`${styles.courses__heroSubject} ${styles.courses__heroSubjectAchievement}`}
        delay={1.1}
      >
        <SchoolRounded />
      </LiveIllustration>
      <span className={styles.courses__heroAccent} />
    </HeroVisualFrame>
  );
}
