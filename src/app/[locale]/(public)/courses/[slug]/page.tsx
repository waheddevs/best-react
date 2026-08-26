import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { isLocale, locales } from "@/config/Locales";
import { courses } from "@/data/PublicCourses";
import styles from "@/css/public/courses.module.css";
import { getPageCopy } from "@/dictionaries/public/PageCopy";
import { createPageMetadata } from "@/lib/Metadata";

import { CourseAudience } from "./CourseAudience";
import { CourseCurriculum } from "./CourseCurriculum";
import { CourseHero } from "./CourseHero";
import { CourseOutcomes } from "./CourseOutcomes";
import { CourseOverview } from "./CourseOverview";
import { CoursePrerequisites } from "./CoursePrerequisites";
import { CourseSidebar } from "./CourseSidebar";
import { CourseTracks } from "./CourseTracks";

type CourseDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) => courses.map((course) => ({ locale, slug: course.slug })));
}

export async function generateMetadata({ params }: CourseDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const course = courses.find((item) => item.slug === slug);
  if (!course) return {};
  return createPageMetadata(
    locale,
    course.title[locale],
    course.summary[locale],
    `/courses/${slug}`,
    course.image,
  );
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const course = courses.find((item) => item.slug === slug);
  if (!course) notFound();

  const copy = getPageCopy(locale);

  return (
    <main className={styles.courses}>
      <CourseHero course={course} locale={locale} copy={copy} />
      <Section tone="surface">
        <div className={styles.courses__detailLayout}>
          <div className={styles.courses__detailContent}>
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
          </div>
          <Reveal className={styles.courses__sidebarReveal}>
            <CourseSidebar course={course} locale={locale} copy={copy} />
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
