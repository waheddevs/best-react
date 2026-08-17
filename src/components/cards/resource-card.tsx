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
    <article className="group flex h-full flex-col rounded-[1.75rem] border border-border bg-surface p-6 transition duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-(--shadow-soft)">
      <div className="flex items-center justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--sunny-yellow)_28%,transparent)] text-heading">
          <ArticleRounded aria-hidden="true" />
        </span>
        <span className="text-xs font-bold text-muted">{resource.readingTime[locale]}</span>
      </div>
      <p className="mt-6 text-xs font-black tracking-[0.16em] text-action uppercase">
        {resource.typeLabel[locale]}
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-heading">
        {resource.title[locale]}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted">{resource.summary[locale]}</p>
      <Link
        href={`/${locale}/library/${resource.slug}`}
        className="mt-6 inline-flex min-h-11 items-center justify-between rounded-xl border border-border px-4 font-bold text-heading transition-colors group-hover:border-action group-hover:text-action"
      >
        {copy.library.readResource}
        <ArrowOutwardRounded aria-hidden="true" />
      </Link>
    </article>
  );
}
