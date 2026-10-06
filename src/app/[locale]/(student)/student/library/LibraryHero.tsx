import type { Locale } from "@/config/Locales";
import type { StudentLibraryCopy } from "@/dictionaries/student/Library";
import { StudentSectionHero } from "@/features/student/workspace/StudentSectionHero";

type LibraryHeroProps = {
  copy: StudentLibraryCopy;
  locale: Locale;
  resourceCount: number;
};

export function LibraryHero({ copy, locale, resourceCount }: LibraryHeroProps) {
  return (
    <StudentSectionHero
      description={copy.description}
      eyebrow={copy.eyebrow}
      kind="library"
      locale={locale}
      preview
      title={copy.title}
      value={resourceCount}
    />
  );
}
