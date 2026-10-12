import { CourseImage } from "@/features/courses/CourseImage";

import { HeroVisualFrame } from "@/components/motion/HeroVisualFrame";
import { LiveIllustration } from "@/components/motion/LiveIllustration";
import type { Locale } from "@/config/Locales";
import type { PublicCourse } from "@/types/PublicCourse";

type CourseHeroVisualProps = {
  course: PublicCourse;
  locale: Locale;
};

export function CourseHeroVisual({ course, locale }: CourseHeroVisualProps) {
  return (
    <HeroVisualFrame className="courses__detailHeroVisual">
      {course.image || course.coverMediaId ? (
        <CourseImage
          courseId={course.id}
          uploaded={Boolean(course.coverMediaId)}
          alt={course.imageAlt?.[locale] || course.title[locale]}
          className="courses__detailHeroImage"
          priority
          sizes="(min-width: 1024px) 42vw, 100vw"
          src={course.image}
        />
      ) : (
        <LiveIllustration className="courses__detailHeroLanguage" variant="tilt">
          <span>{course.symbol}</span>
          <strong>{course.title[locale]}</strong>
          <small>{course.level[locale]}</small>
        </LiveIllustration>
      )}
      <span className="courses__detailHeroBadge">{course.symbol}</span>
      <span className="courses__detailHeroGlow" />
    </HeroVisualFrame>
  );
}
