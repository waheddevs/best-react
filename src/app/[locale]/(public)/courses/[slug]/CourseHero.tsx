import { PageHero } from "@/components/ui/page-hero";
import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import type { Course } from "@/types/public-content";

type CourseHeroProps = {
  course: Course;
  locale: Locale;
  copy: PageCopy;
};

export function CourseHero({ course, locale, copy }: CourseHeroProps) {
  return (
    <PageHero
      eyebrow={copy.courses.categories[course.category]}
      title={course.title[locale]}
      description={course.summary[locale]}
    />
  );
}
