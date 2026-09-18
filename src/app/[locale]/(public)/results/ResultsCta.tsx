import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type ResultsCtaProps = {
  locale: Locale;
  copy: PageCopy;
};

export function ResultsCta({ locale, copy }: ResultsCtaProps) {
  return (
    <Section className="results__ctaSection" tone="background">
      <Reveal>
        <div className="results__cta">
          <h2 className="results__ctaTitle">{copy.results.ctaTitle}</h2>
          <p className="results__ctaDescription">{copy.results.ctaDescription}</p>
          <div className="results__ctaActions">
            <ButtonLink href={`/${locale}/courses`} variant="secondary">
              {copy.common.coursesCta}
            </ButtonLink>
            <ButtonLink href={`/${locale}/contact`} variant="inverseOutline">
              {copy.results.ctaSecondary}
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
