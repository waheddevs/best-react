import { Section } from "@/components/ui/section";
import type { Locale } from "@/config/locales";
import { libraryResources } from "@/data/public-content";
import type { PageCopy } from "@/dictionaries/page-copy";
import { ResourceCatalog } from "@/features/library/resource-catalog";

type LibraryCatalogProps = {
  locale: Locale;
  copy: PageCopy;
};

export function LibraryCatalog({ locale, copy }: LibraryCatalogProps) {
  return (
    <Section>
      <ResourceCatalog resources={libraryResources} locale={locale} copy={copy} />
    </Section>
  );
}
