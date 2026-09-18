import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import RecordVoiceOverRounded from "@mui/icons-material/RecordVoiceOverRounded";
import SchoolRounded from "@mui/icons-material/SchoolRounded";
import TranslateRounded from "@mui/icons-material/TranslateRounded";

import { HeroVisualFrame } from "@/components/motion/HeroVisualFrame";
import { LiveIllustration } from "@/components/motion/LiveIllustration";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { CourseProgress } from "./CourseProgress";

type CoursesHeroVisualProps = {
  copy: PageCopy["courses"];
};

export function CoursesHeroVisual({ copy }: CoursesHeroVisualProps) {
  return (
    <HeroVisualFrame className="courses__heroVisual">
      <span className="courses__heroOrbit" />
      <LiveIllustration className="courses__heroLesson" variant="tilt">
        <span className="courses__heroLessonIcon">
          <AutoStoriesRounded />
        </span>
        <strong className="courses__heroLessonTitle">{copy.curriculum}</strong>
        <span className="courses__heroLessonMeta">
          {copy.categories.language} · {copy.level}
        </span>
        <CourseProgress />
      </LiveIllustration>
      <LiveIllustration
        className="courses__heroSubject courses__heroSubjectLanguage"
        delay={0.3}
        variant="drift"
      >
        <TranslateRounded />
      </LiveIllustration>
      <LiveIllustration
        className="courses__heroSubject courses__heroSubjectSpeaking"
        delay={0.7}
        variant="pulse"
      >
        <RecordVoiceOverRounded />
      </LiveIllustration>
      <LiveIllustration
        className="courses__heroSubject courses__heroSubjectAchievement"
        delay={1.1}
      >
        <SchoolRounded />
      </LiveIllustration>
      <span className="courses__heroAccent" />
    </HeroVisualFrame>
  );
}
