import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicCourse } from "@/types/PublicCourse";

type CourseAudienceProps = {
  course: PublicCourse;
  locale: Locale;
  copy: PageCopy;
};

export function CourseAudience({ course, locale, copy }: CourseAudienceProps) {
  return (
    <section>
      <h2 className="courses__detailHeading">{copy.courses.audience}</h2>
      <p className="courses__detailText">{course.audience[locale]}</p>
    </section>
  );
}
