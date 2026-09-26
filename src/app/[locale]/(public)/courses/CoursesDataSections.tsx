"use client";

import { useQuery } from "@apollo/client/react";

import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { PublicCoursesDocument } from "@/gql/graphql";
import { getApiLanguage } from "@/lib/ApiLanguage";
import { mapPublicCourse } from "@/lib/PublicContentMapper";
import type { PublicCourse } from "@/types/PublicCourse";

import { CourseComparison } from "./CourseComparison";
import { CoursesCatalog } from "./CoursesCatalog";
import { LanguageCourses } from "./LanguageCourses";

type CoursesDataSectionsProps = {
  locale: Locale;
  copy: PageCopy;
  initialCourses: PublicCourse[];
};

export function CoursesDataSections({ locale, copy, initialCourses }: CoursesDataSectionsProps) {
  /* APOLLO REQUESTS */
  const { data: coursesData } = useQuery(PublicCoursesDocument, {
    variables: { first: 50, language: getApiLanguage(locale) },
    fetchPolicy: "cache-and-network",
    ssr: false,
  });
  const courses = coursesData
    ? coursesData.publicCourses.edges.map(({ node }) => mapPublicCourse(node))
    : initialCourses;

  return (
    <>
      <CoursesCatalog locale={locale} copy={copy} courses={courses} />
      <LanguageCourses locale={locale} copy={copy} courses={courses} />
      <CourseComparison locale={locale} copy={copy} courses={courses} />
    </>
  );
}
