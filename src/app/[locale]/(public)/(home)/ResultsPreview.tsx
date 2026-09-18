import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { ResultsJourney } from "./ResultsJourney";

type ResultsPreviewProps = {
  locale: Locale;
  copy: PageCopy;
};

export function ResultsPreview({ locale, copy }: ResultsPreviewProps) {
  const journeyPreview = copy.results.journeySteps.slice(0, 3);

  return (
    <Section tone="background">
      <div className="home__resultsLayout">
        <Reveal direction="left">
          <SectionHeading
            eyebrow={copy.home.resultsEyebrow}
            title={copy.home.resultsTitle}
            description={copy.home.resultsDescription}
          />
          <div className="home__resultsAction">
            <ButtonLink href={`/${locale}/results`} variant="secondary">
              {copy.common.learnMore}
            </ButtonLink>
          </div>
        </Reveal>
        <ResultsJourney items={journeyPreview} />
      </div>
    </Section>
  );
}
