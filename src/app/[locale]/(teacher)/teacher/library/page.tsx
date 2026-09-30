import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";
import { createTeacherMetadata } from "@/features/teacher/layout/TeacherMetadata";

type TeacherLibraryPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: TeacherLibraryPageProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? createTeacherMetadata(locale, "library") : {};
}

export default async function TeacherLibraryPage({ params }: TeacherLibraryPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main aria-labelledby="teacher-library-title">
      <h1 className="teacherShared__pageTitle" id="teacher-library-title">
        {getTeacherCopy(locale).navigation.library}
      </h1>
    </main>
  );
}
