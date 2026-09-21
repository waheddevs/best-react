import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import ArticleRounded from "@mui/icons-material/ArticleRounded";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import type { Locale } from "@/config/Locales";
import type { StudentLibraryCopy } from "@/dictionaries/student/Library";
import type { LibraryResource } from "@/types/student/Library";

type ResourceCardProps = {
  resource: LibraryResource;
  locale: Locale;
  copy: StudentLibraryCopy;
};

export function ResourceCard({ resource, locale, copy }: ResourceCardProps) {
  return (
    <article className="library__card">
      <div className="library__cardHeader">
        <span className="library__cardIcon">
          <ArticleRounded aria-hidden="true" />
        </span>
        <span className="library__cardReadingTime">{resource.readingTime[locale]}</span>
      </div>
      <p className="library__cardType">{resource.typeLabel[locale]}</p>
      <h2 className="library__cardTitle">{resource.title[locale]}</h2>
      <p className="library__cardSummary">{resource.summary[locale]}</p>
      <ScrollToTopLink
        href={`/${locale}/student/library/${resource.slug}`}
        className="library__cardLink"
      >
        {copy.readResource}
        <ArrowOutwardRounded aria-hidden="true" />
      </ScrollToTopLink>
    </article>
  );
}
