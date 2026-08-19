import { Section } from "@/components/ui/Section";
import type { Locale } from "@/config/Locales";
import { libraryResources } from "@/data/PublicContent";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { ResourceCatalog } from "@/features/library/ResourceCatalog";

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
