import { ResourceCard } from "@/components/cards/ResourceCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/home.module.css";
import { libraryResources } from "@/data/PublicContent";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type LibraryPreviewProps = {
  locale: Locale;
  copy: PageCopy;
};

export function LibraryPreview({ locale, copy }: LibraryPreviewProps) {
  return (
    <Section className={styles.home__library}>
      <div className={styles.home__libraryHeader}>
        <SectionHeading eyebrow={copy.home.libraryEyebrow} title={copy.home.libraryTitle} />
        <ButtonLink href={`/${locale}/library`} variant="secondary">
          {copy.common.learnMore}
        </ButtonLink>
      </div>
      <div className={styles.home__libraryGrid}>
        {libraryResources.map((resource) => (
          <ResourceCard key={resource.slug} resource={resource} locale={locale} copy={copy} />
        ))}
      </div>
    </Section>
  );
}
