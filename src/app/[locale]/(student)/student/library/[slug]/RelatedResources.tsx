import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/student/library.module.css";
import type { StudentLibraryCopy } from "@/dictionaries/student/Library";
import { ResourceCard } from "@/features/student/library/ResourceCard";
import type { LibraryResource } from "@/types/student/Library";

type RelatedResourcesProps = {
  resources: LibraryResource[];
  locale: Locale;
  copy: StudentLibraryCopy;
};

export function RelatedResources({ resources, locale, copy }: RelatedResourcesProps) {
  return (
    <Section className={styles.library__related}>
      <SectionHeading title={copy.related} />
      <div className={styles.library__relatedGrid}>
        {resources.map((resource) => (
          <ResourceCard key={resource.slug} resource={resource} locale={locale} copy={copy} />
        ))}
      </div>
    </Section>
  );
}
