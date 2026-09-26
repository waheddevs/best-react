import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { getPublicCourses } from "@/lib/PublicContentApi";

import { FeaturedCourses } from "./FeaturedCourses";

type FeaturedCoursesSectionProps = { locale: Locale; copy: PageCopy };

export async function FeaturedCoursesSection({ locale, copy }: FeaturedCoursesSectionProps) {
  /* APOLLO REQUESTS */
  const courses = await getPublicCourses(locale);
  return <FeaturedCourses locale={locale} copy={copy} courses={courses} />;
}
