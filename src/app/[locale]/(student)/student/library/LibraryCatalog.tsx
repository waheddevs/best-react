import { Section } from "@/components/ui/Section";
import type { Locale } from "@/config/Locales";
import { libraryResources } from "@/data/student/LibraryResources";
import type { StudentLibraryCopy } from "@/dictionaries/student/Library";
import { ResourceCatalog } from "@/features/student/library/ResourceCatalog";
import type { StudentLibraryBooksQuery } from "@/gql/graphql";

import { StudentPdfBooks } from "./StudentPdfBooks";

type LibraryCatalogProps = {
  locale: Locale;
  copy: StudentLibraryCopy;
  bookPage: StudentLibraryBooksQuery["studentLibraryItems"] | null;
  preview: boolean;
};

export function LibraryCatalog({ locale, copy, bookPage, preview }: LibraryCatalogProps) {
  return (
    <Section>
      {!preview ? <StudentPdfBooks copy={copy} initialPage={bookPage} locale={locale} /> : null}
      <ResourceCatalog resources={libraryResources} locale={locale} copy={copy} />
    </Section>
  );
}
