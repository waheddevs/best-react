import { DraftNotice } from "@/components/ui/draft-notice";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import type { Course } from "@/types/public-content";

type CourseOverviewProps = {
  course: Course;
  locale: Locale;
  copy: PageCopy;
};

export function CourseOverview({ course, locale, copy }: CourseOverviewProps) {
  return (
    <section>
      <DraftNotice badge={copy.common.draftBadge} note={copy.common.draftNote} />
      <div className="mt-10">
        <SectionHeading title={copy.courses.overview} />
        <p className="mt-5 max-w-[72ch] text-base leading-8 text-muted">{course.summary[locale]}</p>
      </div>
    </section>
  );
}
