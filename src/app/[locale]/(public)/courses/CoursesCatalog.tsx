import { DraftNotice } from "@/components/ui/DraftNotice";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/courses.module.css";
import { courses } from "@/data/PublicContent";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { CourseCatalog } from "@/features/courses/CourseCatalog";

type CoursesCatalogProps = {
  locale: Locale;
  copy: PageCopy;
};

export function CoursesCatalog({ locale, copy }: CoursesCatalogProps) {
  return (
    <Section>
      <DraftNotice badge={copy.common.draftBadge} note={copy.common.draftNote} />
      <div className={styles.courses__catalog}>
        <CourseCatalog courses={courses} locale={locale} copy={copy} />
      </div>
    </Section>
  );
}
