import { PageHero } from "@/components/ui/page-hero";
import type { Locale } from "@/config/locales";
import type { LibraryResource } from "@/types/public-content";

type ResourceHeroProps = {
  resource: LibraryResource;
  locale: Locale;
};

export function ResourceHero({ resource, locale }: ResourceHeroProps) {
  return (
    <PageHero
      eyebrow={`${resource.typeLabel[locale]} · ${resource.readingTime[locale]}`}
      title={resource.title[locale]}
      description={resource.summary[locale]}
    />
  );
}
