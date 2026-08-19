import { PageHero } from "@/components/ui/PageHero";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { Course } from "@/types/PublicContent";

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
