import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicCourse } from "@/types/PublicCourse";

type CourseOverviewProps = {
  course: PublicCourse;
  locale: Locale;
  copy: PageCopy;
};

export function CourseOverview({ course, locale, copy }: CourseOverviewProps) {
  return (
    <section>
      <SectionHeading title={copy.courses.overview} />
      <div className="courses__overviewCopy">
        {course.overview[locale].map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
