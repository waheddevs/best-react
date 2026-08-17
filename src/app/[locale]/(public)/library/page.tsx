import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { isLocale } from "@/config/locales";
import { libraryResources } from "@/data/public-content";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { ResourceCatalog } from "@/features/library/resource-catalog";
import { createPageMetadata } from "@/lib/metadata";

type LibraryPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LibraryPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getPageCopy(locale);
  return createPageMetadata(locale, copy.library.title, copy.library.description, "/library");
}

export default async function LibraryPage({ params }: LibraryPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
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
