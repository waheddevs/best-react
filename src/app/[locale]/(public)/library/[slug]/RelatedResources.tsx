import { ResourceCard } from "@/components/cards/ResourceCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/library.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { LibraryResource } from "@/types/PublicContent";

type RelatedResourcesProps = {
  resources: LibraryResource[];
  locale: Locale;
  copy: PageCopy;
};

export function RelatedResources({ resources, locale, copy }: RelatedResourcesProps) {
  return (
    <Section className={styles.library__related}>
      <SectionHeading title={copy.library.related} />
      <div className={styles.library__relatedGrid}>
        {resources.map((resource) => (
          <ResourceCard key={resource.slug} resource={resource} locale={locale} copy={copy} />
        ))}
      </div>
    </Section>
  );
}
