import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ResourceCard } from "@/components/cards/resource-card";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { isLocale, locales } from "@/config/locales";
import { libraryResources } from "@/data/public-content";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

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
  const related = libraryResources.filter((item) => item.slug !== slug).slice(0, 2);
  return (
    <main>
      <PageHero
        eyebrow={`${resource.typeLabel[locale]} · ${resource.readingTime[locale]}`}
        title={resource.title[locale]}
        description={resource.summary[locale]}
      />
      <Section containerClassName="max-w-[980px]">
        <Link
          href={`/${locale}/library`}
          className="inline-flex min-h-11 items-center gap-2 font-bold text-action hover:underline"
        >
          <ArrowBackRounded aria-hidden="true" />
          {copy.common.back}
        </Link>
        <article className="mt-8 space-y-10">
          {resource.sections[locale].map((section, index) => (
            <section
              key={section.heading}
              className="grid gap-5 border-b border-border pb-10 sm:grid-cols-[56px_1fr]"
            >
              <span className="grid size-12 place-items-center rounded-full bg-sun font-black text-heading">
                {index + 1}
              </span>
              <div>
                <h2 className="text-2xl font-black tracking-[-0.04em] text-heading">
                  {section.heading}
                </h2>
                <p className="mt-4 text-base leading-8 text-muted">{section.body}</p>
              </div>
            </section>
          ))}
        </article>
      </Section>
      <Section className="bg-surface">
        <SectionHeading title={copy.library.related} />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {related.map((item) => (
            <ResourceCard key={item.slug} resource={item} locale={locale} copy={copy} />
          ))}
        </div>
      </Section>
    </main>
  );
}
