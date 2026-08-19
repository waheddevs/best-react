import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";

import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import type { Course } from "@/types/public-content";

type CourseOutcomesProps = {
  course: Course;
  locale: Locale;
  copy: PageCopy;
};

export function CourseOutcomes({ course, locale, copy }: CourseOutcomesProps) {
  return (
    <section>
      <h2 className="text-2xl font-black tracking-[-0.04em] text-heading">
        {copy.courses.outcomes}
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {course.outcomes[locale].map((outcome) => (
          <li
            key={outcome}
            className="flex gap-3 rounded-2xl border border-border bg-surface p-4 leading-6 text-text"
          >
            <CheckCircleRounded aria-hidden="true" className="shrink-0 text-brand" />
            {outcome}
          </li>
        ))}
      </ul>
    </section>
  );
}
