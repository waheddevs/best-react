import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Link from "next/link";

import { Section } from "@/components/ui/section";
import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import type { LibraryResource } from "@/types/public-content";

type ResourceContentProps = {
  resource: LibraryResource;
  locale: Locale;
  copy: PageCopy;
};

export function ResourceContent({ resource, locale, copy }: ResourceContentProps) {
  return (
    <Section containerClassName="max-w-[980px]">
      <Link
        href={`/${locale}/library`}
        className="inline-flex min-h-11 items-center gap-2 font-bold text-action hover:underline"
      >
        <ArrowBackRounded aria-hidden="true" />
        {copy.common.back}
      </Link>
      <article className="mt-8 space-y-10">
        {resource.sections[locale].map((section, index) => (
          <section
            key={section.heading}
            className="grid gap-5 border-b border-border pb-10 sm:grid-cols-[56px_1fr]"
          >
            <span className="grid size-12 place-items-center rounded-full bg-sun font-black text-heading">
              {index + 1}
            </span>
            <div>
              <h2 className="text-2xl font-black tracking-[-0.04em] text-heading">
                {section.heading}
              </h2>
              <p className="mt-4 text-base leading-8 text-muted">{section.body}</p>
            </div>
          </section>
        ))}
      </article>
    </Section>
  );
}
