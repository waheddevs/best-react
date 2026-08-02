import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DraftNotice } from "@/components/ui/draft-notice";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { isLocale } from "@/config/locales";
import { courses } from "@/data/public-content";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { CourseCatalog } from "@/features/courses/course-catalog";
import { createPageMetadata } from "@/lib/metadata";

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
      <PageHero
        eyebrow={dictionary.navigation.courses}
        title={copy.courses.title}
        description={copy.courses.description}
      />
      <Section>
        <DraftNotice badge={copy.common.draftBadge} note={copy.common.draftNote} />
        <div className="mt-8">
          <CourseCatalog courses={courses} locale={locale} copy={copy} />
        </div>
      </Section>
    </main>
  );
}
