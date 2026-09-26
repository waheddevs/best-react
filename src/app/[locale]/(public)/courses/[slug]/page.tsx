import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, locales } from "@/config/Locales";
import { getPageCopy } from "@/dictionaries/public/PageCopy";
import { createPageMetadata } from "@/lib/Metadata";
import { getPublicCourse, getPublicCourses } from "@/lib/PublicContentApi";

import { CourseDetailContent } from "./CourseDetailContent";

type CourseDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const localizedCourses = await Promise.all(
    locales.map(async (locale) => ({ locale, courses: await getPublicCourses(locale) })),
  );
  return localizedCourses.flatMap(({ locale, courses }) =>
    courses.map((course) => ({ locale, slug: course.slug })),
  );
}

export async function generateMetadata({ params }: CourseDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const course = await getPublicCourse(locale, slug);
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

  const course = await getPublicCourse(locale, slug);
  if (!course) notFound();

  const copy = getPageCopy(locale);

  return <CourseDetailContent copy={copy} initialCourse={course} locale={locale} />;
}
