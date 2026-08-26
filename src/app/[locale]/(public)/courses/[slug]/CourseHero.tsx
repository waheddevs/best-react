import { PageHero } from "@/components/ui/PageHero";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicCourse } from "@/types/PublicCourse";

import { CourseHeroVisual } from "./CourseHeroVisual";

type CourseHeroProps = {
  course: PublicCourse;
  locale: Locale;
  copy: PageCopy;
};

export function CourseHero({ course, locale, copy }: CourseHeroProps) {
  return (
    <PageHero
      animateCopy
      eyebrow={copy.courses.categories[course.category]}
      title={course.title[locale]}
      description={course.summary[locale]}
      visual={<CourseHeroVisual course={course} locale={locale} />}
    />
  );
}
