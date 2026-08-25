import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { ResultVideoGallery } from "@/features/results/ResultVideoGallery";

type ResultStoriesProps = {
  copy: PageCopy;
  locale: Locale;
};

export function ResultStories({ copy, locale }: ResultStoriesProps) {
  return (
    <Section tone="surface">
      <Reveal>
        <SectionHeading
          align="center"
          description={copy.results.storiesDescription}
          eyebrow={copy.results.storiesEyebrow}
          title={copy.results.storiesTitle}
        />
      </Reveal>
      <Reveal delay={0.08}>
        <ResultVideoGallery copy={copy.results} locale={locale} />
      </Reveal>
    </Section>
  );
}
