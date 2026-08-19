import { Section } from "@/components/ui/Section";
import type { Locale } from "@/config/Locales";
import { libraryResources } from "@/data/student/LibraryResources";
import type { StudentLibraryCopy } from "@/dictionaries/student/Library";
import { ResourceCatalog } from "@/features/student/library/ResourceCatalog";

type LibraryCatalogProps = {
  locale: Locale;
  copy: StudentLibraryCopy;
};

export function LibraryCatalog({ locale, copy }: LibraryCatalogProps) {
  return (
    <Section>
      <ResourceCatalog resources={libraryResources} locale={locale} copy={copy} />
    </Section>
  );
}
