import type { Metadata } from "next";

import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { defaultLocale } from "@/config/locales";
import { libraryResources } from "@/data/public-content";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { ResourceCatalog } from "@/features/library/resource-catalog";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  const locale = defaultLocale;
  const copy = getPageCopy(locale);
  return createPageMetadata(copy.library.title, copy.library.description, "/library");
}

export default function LibraryPage() {
  const locale = defaultLocale;
  const copy = getPageCopy(locale);
  const dictionary = getDictionary(locale);
  return (
    <main>
      <PageHero
        eyebrow={dictionary.navigation.library}
        title={copy.library.title}
        description={copy.library.description}
      />
      <Section>
        <ResourceCatalog resources={libraryResources} locale={locale} copy={copy} />
      </Section>
    </main>
  );
}
