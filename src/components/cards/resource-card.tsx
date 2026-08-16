import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import ArticleRounded from "@mui/icons-material/ArticleRounded";
import Link from "next/link";

import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import type { LibraryResource } from "@/types/public-content";

type ResourceCardProps = {
  resource: LibraryResource;
  locale: Locale;
  copy: PageCopy;
};

export function ResourceCard({ resource, locale, copy }: ResourceCardProps) {
  return (
    <article className="resource-card">
      <div className="resource-card__2">
        <span className="resource-card__3">
          <ArticleRounded aria-hidden="true" />
        </span>
        <span className="resource-card__4">{resource.readingTime[locale]}</span>
      </div>
      <p className="resource-card__5">{resource.typeLabel[locale]}</p>
      <h2 className="resource-card__6">{resource.title[locale]}</h2>
      <p className="resource-card__7">{resource.summary[locale]}</p>
      <Link href={`/website/library/${resource.slug}`} className="resource-card__8">
        {copy.library.readResource}
        <ArrowOutwardRounded aria-hidden="true" />
      </Link>
    </article>
  );
}
