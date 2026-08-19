import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import Link from "next/link";

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/config/locales";
import { faqItems } from "@/data/public-content";
import type { PageCopy } from "@/dictionaries/page-copy";

type FaqPreviewProps = {
  locale: Locale;
  copy: PageCopy;
};

export function FaqPreview({ locale, copy }: FaqPreviewProps) {
  return (
    <Section>
      <SectionHeading eyebrow={copy.home.faqEyebrow} title={copy.home.faqTitle} />
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {faqItems.slice(0, 3).map((item) => (
          <article key={item.id} className="rounded-[1.75rem] border border-border bg-surface p-6">
            <h3 className="leading-6 font-extrabold text-heading">{item.question[locale]}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{item.answer[locale]}</p>
          </article>
        ))}
      </div>
      <Link
        href={`/${locale}/faq`}
        className="mt-7 inline-flex min-h-11 items-center gap-2 font-bold text-action hover:underline"
      >
        {copy.common.learnMore}
        <ArrowForwardRounded aria-hidden="true" />
      </Link>
    </Section>
  );
}
