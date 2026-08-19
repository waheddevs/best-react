import type { Locale } from "@/config/Locales";
import styles from "@/css/public/courses.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { Course } from "@/types/PublicContent";

type CourseCurriculumProps = {
  course: Course;
  locale: Locale;
  copy: PageCopy;
};

export function CourseCurriculum({ course, locale, copy }: CourseCurriculumProps) {
  return (
    <section>
      <h2 className={styles.courses__detailHeading}>
        {copy.courses.curriculum}
      </h2>
      <ol className={styles.courses__curriculumList}>
        {course.curriculum[locale].map((item, index) => (
          <li
            key={item}
            className={styles.courses__curriculumItem}
          >
            <span className={styles.courses__curriculumNumber}>
              {index + 1}
            </span>
            <span className={styles.courses__curriculumText}>{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
