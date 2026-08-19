import { ResourceCard } from "@/components/cards/resource-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/config/locales";
import { libraryResources } from "@/data/public-content";
import type { PageCopy } from "@/dictionaries/page-copy";

type LibraryPreviewProps = {
  locale: Locale;
  copy: PageCopy;
};

export function LibraryPreview({ locale, copy }: LibraryPreviewProps) {
  return (
    <Section className="bg-surface">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading eyebrow={copy.home.libraryEyebrow} title={copy.home.libraryTitle} />
        <ButtonLink href={`/${locale}/library`} variant="secondary">
          {copy.common.learnMore}
        </ButtonLink>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {libraryResources.map((resource) => (
          <ResourceCard key={resource.slug} resource={resource} locale={locale} copy={copy} />
        ))}
      </div>
    </Section>
  );
}
