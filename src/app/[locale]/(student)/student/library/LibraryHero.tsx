import type { Locale } from "@/config/Locales";
import type { StudentLibraryCopy } from "@/dictionaries/student/Library";
import { StudentSectionHero } from "@/features/student/workspace/StudentSectionHero";

type LibraryHeroProps = {
  copy: StudentLibraryCopy;
  locale: Locale;
  resourceCount?: number;
  preview: boolean;
};

export function LibraryHero({ copy, locale, resourceCount, preview }: LibraryHeroProps) {
  return (
    <StudentSectionHero
      description={copy.description}
      eyebrow={copy.eyebrow}
      kind="library"
      locale={locale}
      preview={preview}
      title={copy.title}
      value={resourceCount}
    />
  );
}
