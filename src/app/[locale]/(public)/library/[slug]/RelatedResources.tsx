import { ResourceCard } from "@/components/cards/resource-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import type { LibraryResource } from "@/types/public-content";

type RelatedResourcesProps = {
  resources: LibraryResource[];
  locale: Locale;
  copy: PageCopy;
};

export function RelatedResources({ resources, locale, copy }: RelatedResourcesProps) {
  return (
    <Section className="bg-surface">
      <SectionHeading title={copy.library.related} />
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {resources.map((resource) => (
          <ResourceCard key={resource.slug} resource={resource} locale={locale} copy={copy} />
        ))}
      </div>
    </Section>
  );
}
