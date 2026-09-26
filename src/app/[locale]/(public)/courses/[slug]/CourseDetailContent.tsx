"use client";

import { useQuery } from "@apollo/client/react";

import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { PublicCourseDocument } from "@/gql/graphql";
import { getApiLanguage } from "@/lib/ApiLanguage";
import { mapPublicCourse } from "@/lib/PublicContentMapper";
import type { PublicCourse } from "@/types/PublicCourse";

import { CourseAudience } from "./CourseAudience";
import { CourseBackAction } from "./CourseBackAction";
import { CourseCurriculum } from "./CourseCurriculum";
import { CourseHero } from "./CourseHero";
import { CourseOutcomes } from "./CourseOutcomes";
import { CourseOverview } from "./CourseOverview";
import { CoursePrerequisites } from "./CoursePrerequisites";
import { CourseSidebar } from "./CourseSidebar";
import { CourseTracks } from "./CourseTracks";

type CourseDetailContentProps = {
  copy: PageCopy;
  initialCourse: PublicCourse;
  locale: Locale;
};

export function CourseDetailContent({ copy, initialCourse, locale }: CourseDetailContentProps) {
  /* APOLLO REQUESTS */
  const { data: courseData } = useQuery(PublicCourseDocument, {
    variables: { language: getApiLanguage(locale), slug: initialCourse.slug },
    fetchPolicy: "cache-and-network",
    ssr: false,
  });
  const course = courseData ? mapPublicCourse(courseData.publicCourse) : initialCourse;

  return (
    <main className="courses">
      <CourseHero course={course} locale={locale} copy={copy} />
      <Section tone="surface">
        <div className="courses__detailLayout">
          <div className="courses__detailContent">
            <Reveal>
              <CourseOverview course={course} locale={locale} copy={copy} />
            </Reveal>
            <Reveal>
              <CourseAudience course={course} locale={locale} copy={copy} />
            </Reveal>
            {course.tracks ? (
              <Reveal>
                <CourseTracks course={course} locale={locale} copy={copy} />
              </Reveal>
            ) : null}
            <Reveal>
              <CourseOutcomes course={course} locale={locale} copy={copy} />
            </Reveal>
            <Reveal>
              <CourseCurriculum course={course} locale={locale} copy={copy} />
            </Reveal>
            <Reveal>
              <CoursePrerequisites course={course} locale={locale} copy={copy} />
            </Reveal>
            <Reveal>
              <CourseBackAction locale={locale} copy={copy} />
            </Reveal>
          </div>
          <Reveal className="courses__sidebarReveal">
            <CourseSidebar course={course} locale={locale} copy={copy} />
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
