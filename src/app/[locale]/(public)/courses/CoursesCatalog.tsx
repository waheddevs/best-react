import { DraftNotice } from "@/components/ui/draft-notice";
import { Section } from "@/components/ui/section";
import type { Locale } from "@/config/locales";
import { courses } from "@/data/public-content";
import type { PageCopy } from "@/dictionaries/page-copy";
import { CourseCatalog } from "@/features/courses/course-catalog";

type CoursesCatalogProps = {
  locale: Locale;
  copy: PageCopy;
};

export function CoursesCatalog({ locale, copy }: CoursesCatalogProps) {
  return (
    <Section>
      <DraftNotice badge={copy.common.draftBadge} note={copy.common.draftNote} />
      <div className="mt-8">
        <CourseCatalog courses={courses} locale={locale} copy={copy} />
      </div>
    </Section>
  );
}
