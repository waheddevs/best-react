import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { ResourceCard } from "@/components/cards/resource-card";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { defaultLocale } from "@/config/locales";
import { libraryResources } from "@/data/public-content";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

type ResourceDetailPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return libraryResources.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: ResourceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = defaultLocale;
  const resource = libraryResources.find((item) => item.slug === slug);
  if (!resource) return {};
  return createPageMetadata(
    resource.title[locale],
    resource.summary[locale],
    `/library/${slug}`,
    null,
  );
}

export default async function ResourceDetailPage({ params }: ResourceDetailPageProps) {
  const { slug } = await params;
  const locale = defaultLocale;
  const resource = libraryResources.find((item) => item.slug === slug);
  if (!resource) notFound();
  const copy = getPageCopy(locale);
  const related = libraryResources.filter((item) => item.slug !== slug).slice(0, 2);
  return (
    <main>
      <PageHero
        eyebrow={`${resource.typeLabel[locale]} · ${resource.readingTime[locale]}`}
        title={resource.title[locale]}
        description={resource.summary[locale]}
      />
      <Section containerClassName="max-w-[980px]">
        <Link href={`/website/library`} className="library-page">
          <ArrowBackRounded aria-hidden="true" />
          {copy.common.back}
        </Link>
        <article className="library-page__2">
          {resource.sections[locale].map((section, index) => (
            <section key={section.heading} className="library-page__3">
              <span className="library-page__4">{index + 1}</span>
              <div>
                <h2 className="library-page__5">{section.heading}</h2>
                <p className="library-page__6">{section.body}</p>
              </div>
            </section>
          ))}
        </article>
      </Section>
      <Section className="library-page__7">
        <SectionHeading title={copy.library.related} />
        <div className="library-page__8">
          {related.map((item) => (
            <ResourceCard key={item.slug} resource={item} locale={locale} copy={copy} />
          ))}
        </div>
      </Section>
    </main>
  );
}
