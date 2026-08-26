import type { Locale } from "@/config/Locales";
import styles from "@/css/public/courses.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicCourse } from "@/types/PublicCourse";

type CoursePrerequisitesProps = {
  course: PublicCourse;
  locale: Locale;
  copy: PageCopy;
};

export function CoursePrerequisites({ course, locale, copy }: CoursePrerequisitesProps) {
  return (
    <section>
      <h2 className={styles.courses__detailHeading}>{copy.courses.prerequisites}</h2>
      <p className={styles.courses__detailText}>{course.prerequisites[locale]}</p>
    </section>
  );
}
