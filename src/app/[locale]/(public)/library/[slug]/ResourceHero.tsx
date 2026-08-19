import { PageHero } from "@/components/ui/PageHero";
import type { Locale } from "@/config/Locales";
import type { LibraryResource } from "@/types/PublicContent";

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
