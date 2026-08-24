import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Section } from "@/components/ui/Section";
import { isLocale, locales } from "@/config/Locales";
import { courses } from "@/data/PublicContent";
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
            <CourseOverview course={course} locale={locale} copy={copy} />
            <CourseAudience course={course} locale={locale} copy={copy} />
            <CourseOutcomes course={course} locale={locale} copy={copy} />
            <CourseCurriculum course={course} locale={locale} copy={copy} />
            <CoursePrerequisites course={course} locale={locale} copy={copy} />
          </div>
          <CourseSidebar course={course} locale={locale} copy={copy} />
        </div>
      </Section>
    </main>
  );
}
