import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import type { Course } from "@/types/public-content";

type CourseAudienceProps = {
  course: Course;
  locale: Locale;
  copy: PageCopy;
};

export function CourseAudience({ course, locale, copy }: CourseAudienceProps) {
  return (
    <section>
      <h2 className="text-2xl font-black tracking-[-0.04em] text-heading">
        {copy.courses.audience}
      </h2>
      <p className="mt-4 max-w-[72ch] leading-8 text-muted">{course.audience[locale]}</p>
    </section>
  );
}
