import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { getPublicResultVideos } from "@/lib/PublicContentApi";

import { ResultStories } from "./ResultStories";

type ResultStoriesSectionProps = { locale: Locale; copy: PageCopy };

export async function ResultStoriesSection({ locale, copy }: ResultStoriesSectionProps) {
  /* APOLLO REQUESTS */
  const videos = await getPublicResultVideos(locale);
  return <ResultStories copy={copy} locale={locale} videos={videos} />;
}
