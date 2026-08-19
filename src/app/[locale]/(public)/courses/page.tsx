import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/locales";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

import { CoursesCatalog } from "./CoursesCatalog";
import { CoursesHero } from "./CoursesHero";

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
    <main>
      <CoursesHero eyebrow={dictionary.navigation.courses} copy={copy} />
      <CoursesCatalog locale={locale} copy={copy} />
    </main>
  );
}
