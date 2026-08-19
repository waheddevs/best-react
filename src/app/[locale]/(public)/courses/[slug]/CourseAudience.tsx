import type { Locale } from "@/config/Locales";
import styles from "@/css/public/courses.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { Course } from "@/types/PublicContent";

type CourseAudienceProps = {
  course: Course;
  locale: Locale;
  copy: PageCopy;
};

export function CourseAudience({ course, locale, copy }: CourseAudienceProps) {
  return (
    <section>
      <h2 className={styles.courses__detailHeading}>
        {copy.courses.audience}
      </h2>
      <p className={styles.courses__detailText}>{course.audience[locale]}</p>
    </section>
  );
}
