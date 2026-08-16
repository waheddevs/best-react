import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import FactCheckRounded from "@mui/icons-material/FactCheckRounded";
import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button-link";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { defaultLocale } from "@/config/locales";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  const locale = defaultLocale;
  const copy = getPageCopy(locale);
  return createPageMetadata(copy.results.title, copy.results.description, "/results");
}

export default function ResultsPage() {
  const locale = defaultLocale;
  const copy = getPageCopy(locale);
  const dictionary = getDictionary(locale);

  return (
    <main>
      <PageHero
        eyebrow={dictionary.navigation.results}
        title={copy.results.title}
        description={copy.results.description}
      />
      <Section>
        <div className="results-page">
          <span className="results-page__2">
            <FactCheckRounded aria-hidden="true" sx={{ fontSize: 32 }} />
          </span>
          <div>
            <h2 className="results-page__3">{copy.results.noticeTitle}</h2>
            <p className="results-page__4">{copy.results.noticeBody}</p>
          </div>
        </div>
      </Section>
      <Section className="results-page__5">
        <SectionHeading title={copy.results.journeyTitle} />
        <ol className="results-page__6">
          {copy.results.journeySteps.map((step, index) => (
            <li key={step.title} className="results-page__7">
              <span className="results-page__8">{index + 1}</span>
              <h2 className="results-page__9">{step.title}</h2>
              <p className="results-page__10">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section>
        <SectionHeading title={copy.results.categoriesTitle} />
        <div className="results-page__11">
          {copy.results.categories.map((item) => (
            <article key={item.title} className="results-page__12">
              <CheckCircleRounded aria-hidden="true" className="results-page__13" />
              <h2 className="results-page__14">{item.title}</h2>
              <p className="results-page__15">{item.description}</p>
            </article>
          ))}
        </div>
        <div className="results-page__16">
          <h2 className="results-page__17">{copy.results.ctaTitle}</h2>
          <div className="results-page__18">
            <ButtonLink href={`/website/courses`} variant="secondary">
              {copy.common.coursesCta}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </main>
  );
}
