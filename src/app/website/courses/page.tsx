import type { Metadata } from "next";

import { DraftNotice } from "@/components/ui/draft-notice";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { defaultLocale } from "@/config/locales";
import { courses } from "@/data/public-content";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { CourseCatalog } from "@/features/courses/course-catalog";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  const locale = defaultLocale;
  const copy = getPageCopy(locale);
  return createPageMetadata(copy.courses.title, copy.courses.description, "/courses");
}

export default function CoursesPage() {
  const locale = defaultLocale;

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
        <div className="courses-page">
          <CourseCatalog courses={courses} locale={locale} copy={copy} />
        </div>
      </Section>
    </main>
  );
}
