import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";

import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicCourse } from "@/types/PublicCourse";

type CourseOutcomesProps = {
  course: PublicCourse;
  locale: Locale;
  copy: PageCopy;
};

export function CourseOutcomes({ course, locale, copy }: CourseOutcomesProps) {
  return (
    <section>
      <h2 className="courses__detailHeading">{copy.courses.outcomes}</h2>
      <ul className="courses__outcomesList">
        {course.outcomes[locale].map((outcome) => (
          <li key={outcome} className="courses__outcome">
            <CheckCircleRounded aria-hidden="true" className="courses__outcomeIcon" />
            {outcome}
          </li>
        ))}
      </ul>
    </section>
  );
}
