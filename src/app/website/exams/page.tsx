import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import InfoRounded from "@mui/icons-material/InfoRounded";
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
  return createPageMetadata(copy.exams.title, copy.exams.description, "/exams");
}

export default function ExamsPage() {
  const locale = defaultLocale;
  const copy = getPageCopy(locale);
  const dictionary = getDictionary(locale);
  return (
    <main>
      <PageHero
        eyebrow={dictionary.navigation.exams}
        title={copy.exams.title}
        description={copy.exams.description}
      />
      <Section>
        <div className="exams-page">
          <InfoRounded aria-hidden="true" className="exams-page__2" />
          <p className="exams-page__3">{copy.exams.notice}</p>
        </div>
        <div className="exams-page__4">
          <SectionHeading title={copy.exams.directionsTitle} />
        </div>
        <div className="exams-page__5">
          {copy.exams.directions.map((item) => (
            <article key={item.title} className="exams-page__6">
              <h2 className="exams-page__7">{item.title}</h2>
              <p className="exams-page__8">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section className="exams-page__9">
        <div className="exams-page__10">
          <div>
            <SectionHeading title={copy.exams.rulesTitle} />
            <ul className="exams-page__11">
              {copy.exams.rules.map((rule) => (
                <li key={rule} className="exams-page__12">
                  <CheckCircleOutlineRounded aria-hidden="true" className="exams-page__13" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
          <div className="exams-page__14">
            <h2 className="exams-page__15">{copy.exams.scheduleTitle}</h2>
            <p className="exams-page__16">{copy.exams.scheduleBody}</p>
            <div className="exams-page__17">
              <ButtonLink href={`/website/contact`} variant="secondary">
                {copy.common.contactCta}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <SectionHeading title={copy.exams.preparationTitle} />
        <ol className="exams-page__18">
          {copy.exams.preparation.map((item, index) => (
            <li key={item.title} className="exams-page__19">
              <span className="exams-page__20">{index + 1}</span>
              <h2 className="exams-page__21">{item.title}</h2>
              <p className="exams-page__22">{item.description}</p>
            </li>
          ))}
        </ol>
      </Section>
    </main>
  );
}
