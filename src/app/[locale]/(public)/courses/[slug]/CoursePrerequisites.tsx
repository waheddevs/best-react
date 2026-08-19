import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import type { Course } from "@/types/public-content";

type CoursePrerequisitesProps = {
  course: Course;
  locale: Locale;
  copy: PageCopy;
};

export function CoursePrerequisites({ course, locale, copy }: CoursePrerequisitesProps) {
  return (
    <section>
      <h2 className="text-2xl font-black tracking-[-0.04em] text-heading">
        {copy.courses.prerequisites}
      </h2>
      <p className="mt-4 leading-8 text-muted">{course.prerequisites[locale]}</p>
    </section>
  );
}
