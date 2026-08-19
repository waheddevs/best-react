import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, locales } from "@/config/locales";
import { libraryResources } from "@/data/public-content";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

import { RelatedResources } from "./RelatedResources";
import { ResourceContent } from "./ResourceContent";
import { ResourceHero } from "./ResourceHero";

type ResourceDetailPageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    libraryResources.map((resource) => ({ locale, slug: resource.slug })),
  );
}

export async function generateMetadata({ params }: ResourceDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const resource = libraryResources.find((item) => item.slug === slug);
  if (!resource) return {};
  return createPageMetadata(
    locale,
    resource.title[locale],
    resource.summary[locale],
    `/library/${slug}`,
    null,
  );
}

export default async function ResourceDetailPage({ params }: ResourceDetailPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const resource = libraryResources.find((item) => item.slug === slug);
  if (!resource) notFound();

  const copy = getPageCopy(locale);
  const relatedResources = libraryResources.filter((item) => item.slug !== slug).slice(0, 2);

  return (
    <main>
      <ResourceHero resource={resource} locale={locale} />
      <ResourceContent resource={resource} locale={locale} copy={copy} />
      <RelatedResources resources={relatedResources} locale={locale} copy={copy} />
    </main>
  );
}
