import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { getPublicCourses } from "@/lib/PublicContentApi";

import { CoursesDataSections } from "./CoursesDataSections";

type CoursesSectionsProps = { locale: Locale; copy: PageCopy };

export async function CoursesSections({ locale, copy }: CoursesSectionsProps) {
  /* APOLLO REQUESTS */
  const courses = await getPublicCourses(locale);
  return <CoursesDataSections locale={locale} copy={copy} initialCourses={courses} />;
}
