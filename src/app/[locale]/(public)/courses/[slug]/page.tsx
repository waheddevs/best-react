import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Section } from "@/components/ui/section";
import { isLocale, locales } from "@/config/locales";
import { courses } from "@/data/public-content";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

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
    <main>
      <CourseHero course={course} locale={locale} copy={copy} />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-10">
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
