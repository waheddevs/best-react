import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";

import type { Locale } from "@/config/Locales";
import styles from "@/css/public/courses.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { Course } from "@/types/PublicContent";

type CourseOutcomesProps = {
  course: Course;
  locale: Locale;
  copy: PageCopy;
};

export function CourseOutcomes({ course, locale, copy }: CourseOutcomesProps) {
  return (
    <section>
      <h2 className={styles.courses__detailHeading}>
        {copy.courses.outcomes}
      </h2>
      <ul className={styles.courses__outcomesList}>
        {course.outcomes[locale].map((outcome) => (
          <li
            key={outcome}
            className={styles.courses__outcome}
          >
            <CheckCircleRounded aria-hidden="true" className={styles.courses__outcomeIcon} />
            {outcome}
          </li>
        ))}
      </ul>
    </section>
  );
}
