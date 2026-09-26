"use client";

import { useQuery } from "@apollo/client/react";

import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { PublicResultVideosDocument } from "@/gql/graphql";
import { ResultVideoGallery } from "@/features/results/ResultVideoGallery";
import { getApiLanguage } from "@/lib/ApiLanguage";
import { mapPublicResultVideos } from "@/lib/PublicContentMapper";
import type { PublicResultVideo } from "@/types/PublicResult";

type ResultStoriesProps = {
  copy: PageCopy;
  locale: Locale;
  videos: PublicResultVideo[];
};

export function ResultStories({ copy, locale, videos }: ResultStoriesProps) {
  /* APOLLO REQUESTS */
  const { data: resultVideosData } = useQuery(PublicResultVideosDocument, {
    variables: { language: getApiLanguage(locale) },
    fetchPolicy: "cache-and-network",
    ssr: false,
  });
  const visibleVideos = resultVideosData
    ? mapPublicResultVideos(resultVideosData.publicResultVideos)
    : videos;

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
        <ResultVideoGallery copy={copy.results} locale={locale} videos={visibleVideos} />
      </Reveal>
    </Section>
  );
}
