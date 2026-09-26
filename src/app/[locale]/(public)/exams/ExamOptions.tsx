"use client";

import { useQuery } from "@apollo/client/react";

import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import { PublicExamOfferingsDocument } from "@/gql/graphql";
import { getApiLanguage } from "@/lib/ApiLanguage";
import { mapPublicExamData } from "@/lib/PublicContentMapper";
import { ExamRegistrationCatalog } from "@/features/exams/ExamRegistrationCatalog";
import type { ExamPreviewCopy, MockExamDate, PublicExamOption } from "@/types/ExamPreview";

type ExamOptionsProps = {
  copy: ExamPreviewCopy;
  locale: Locale;
  dates: MockExamDate[];
  options: PublicExamOption[];
};

export function ExamOptions({ copy, locale, dates, options }: ExamOptionsProps) {
  /* APOLLO REQUESTS */
  const { data: examOfferingsData } = useQuery(PublicExamOfferingsDocument, {
    variables: { language: getApiLanguage(locale) },
    fetchPolicy: "cache-and-network",
    ssr: false,
  });
  const examData = examOfferingsData
    ? mapPublicExamData(examOfferingsData.publicExamOfferings, locale)
    : { dates, options };

  return (
    <Section className="exams__options" id="exam-options" tone="background">
      <Reveal>
        <SectionHeading
          align="center"
          description={copy.catalogDescription}
          eyebrow={copy.catalogEyebrow}
          title={copy.catalogTitle}
        />
      </Reveal>
      <Reveal delay={0.08}>
        <ExamRegistrationCatalog
          copy={copy}
          dates={examData.dates}
          locale={locale}
          options={examData.options}
        />
      </Reveal>
    </Section>
  );
}
