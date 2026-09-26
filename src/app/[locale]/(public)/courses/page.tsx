import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getDictionary } from "@/dictionaries/public/GetDictionary";
import { getPageCopy } from "@/dictionaries/public/PageCopy";
import { createPageMetadata } from "@/lib/Metadata";

import { CoursesSections } from "./CoursesSections";
import { CoursesCta } from "./CoursesCta";
import { CoursesHero } from "./CoursesHero";
import { LearningProcess } from "./LearningProcess";

type CoursesPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: CoursesPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getPageCopy(locale);
  return createPageMetadata(locale, copy.courses.title, copy.courses.description, "/courses");
}

export default async function CoursesPage({ params }: CoursesPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = getPageCopy(locale);
  const dictionary = getDictionary(locale);
  return (
    <main className={"courses"}>
      <CoursesHero eyebrow={dictionary.navigation.courses} copy={copy} />
      <CoursesSections locale={locale} copy={copy} />
      <LearningProcess copy={copy} />
      <CoursesCta locale={locale} copy={copy} />
    </main>
  );
}
