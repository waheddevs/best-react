import { DraftNotice } from "@/components/ui/DraftNotice";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/courses.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { Course } from "@/types/PublicContent";

type CourseOverviewProps = {
  course: Course;
  locale: Locale;
  copy: PageCopy;
};

export function CourseOverview({ course, locale, copy }: CourseOverviewProps) {
  return (
    <section>
      <DraftNotice badge={copy.common.draftBadge} note={copy.common.draftNote} />
      <div className={styles.courses__overviewContent}>
        <SectionHeading title={copy.courses.overview} />
        <p className={styles.courses__overviewText}>{course.summary[locale]}</p>
      </div>
    </section>
  );
}
