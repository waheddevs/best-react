import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";
import type { Locale } from "@/config/locales";
import { faqItems } from "@/data/public-content";
import type { PageCopy } from "@/dictionaries/page-copy";
import { FaqList } from "@/features/faq/faq-list";

type FaqContentProps = {
  locale: Locale;
  copy: PageCopy;
};

export function FaqContent({ locale, copy }: FaqContentProps) {
  return (
    <Section>
      <FaqList items={faqItems} locale={locale} copy={copy} />
      <div className="mt-12 rounded-[1.75rem] border border-border bg-surface p-7 text-center">
        <h2 className="text-2xl font-black text-heading">{copy.faq.ctaTitle}</h2>
        <div className="mt-5 flex justify-center">
          <ButtonLink href={`/${locale}/contact`}>{copy.common.contactCta}</ButtonLink>
        </div>
      </div>
    </Section>
  );
}
