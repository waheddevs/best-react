import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";

import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";

type ResultsPreviewProps = {
  locale: Locale;
  copy: PageCopy;
};

export function ResultsPreview({ locale, copy }: ResultsPreviewProps) {
  const journeyPreview = copy.results.journeySteps.slice(0, 2);

  return (
    <Section className="bg-surface">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow={copy.home.resultsEyebrow}
            title={copy.home.resultsTitle}
            description={copy.home.resultsDescription}
          />
          <div className="mt-7">
            <ButtonLink href={`/${locale}/results`} variant="secondary">
              {copy.common.learnMore}
            </ButtonLink>
          </div>
        </div>
        <div className="rounded-4xl border border-border bg-background p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {journeyPreview.map((item, index) => (
              <div
                key={item.title}
                className={`rounded-2xl p-5 ${index === 0 ? "bg-(image:--gradient-cta) text-white" : "bg-surface"}`}
              >
                <CheckCircleRounded
                  aria-hidden="true"
                  className={index === 0 ? "text-white" : "text-brand"}
                />
                <h3
                  className={`mt-7 font-extrabold ${index === 0 ? "text-white" : "text-heading"}`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-2 text-sm leading-6 ${index === 0 ? "text-white/75" : "text-muted"}`}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
