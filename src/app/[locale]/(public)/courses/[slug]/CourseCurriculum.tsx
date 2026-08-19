import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import type { Course } from "@/types/public-content";

type CourseCurriculumProps = {
  course: Course;
  locale: Locale;
  copy: PageCopy;
};

export function CourseCurriculum({ course, locale, copy }: CourseCurriculumProps) {
  return (
    <section>
      <h2 className="text-2xl font-black tracking-[-0.04em] text-heading">
        {copy.courses.curriculum}
      </h2>
      <ol className="mt-5 space-y-3">
        {course.curriculum[locale].map((item, index) => (
          <li
            key={item}
            className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sun text-sm font-black text-heading">
              {index + 1}
            </span>
            <span className="font-semibold text-heading">{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
