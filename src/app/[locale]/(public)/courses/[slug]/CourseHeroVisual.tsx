import Image from "next/image";

import { HeroVisualFrame } from "@/components/motion/HeroVisualFrame";
import { LiveIllustration } from "@/components/motion/LiveIllustration";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/courses.module.css";
import type { PublicCourse } from "@/types/PublicCourse";

type CourseHeroVisualProps = {
  course: PublicCourse;
  locale: Locale;
};

export function CourseHeroVisual({ course, locale }: CourseHeroVisualProps) {
  return (
    <HeroVisualFrame className={styles.courses__detailHeroVisual}>
      {course.image && course.imageAlt ? (
        <Image
          alt={course.imageAlt[locale]}
          className={styles.courses__detailHeroImage}
          fill
          priority
          sizes="(min-width: 1024px) 42vw, 100vw"
          src={course.image}
        />
      ) : (
        <LiveIllustration className={styles.courses__detailHeroLanguage} variant="tilt">
          <span>{course.symbol}</span>
          <strong>{course.title[locale]}</strong>
          <small>{course.level[locale]}</small>
        </LiveIllustration>
      )}
      <span className={styles.courses__detailHeroBadge}>{course.symbol}</span>
      <span className={styles.courses__detailHeroGlow} />
    </HeroVisualFrame>
  );
}
