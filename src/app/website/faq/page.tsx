import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button-link";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { defaultLocale } from "@/config/locales";
import { faqItems } from "@/data/public-content";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { FaqList } from "@/features/faq/faq-list";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  const locale = defaultLocale;
  const copy = getPageCopy(locale);
  return createPageMetadata(copy.faq.title, copy.faq.description, "/faq");
}

export default function FaqPage() {
  const locale = defaultLocale;
  const copy = getPageCopy(locale);
  const dictionary = getDictionary(locale);
  return (
    <main>
      <PageHero
        eyebrow={dictionary.navigation.faq}
        title={copy.faq.title}
        description={copy.faq.description}
      />
      <Section>
        <FaqList items={faqItems} locale={locale} copy={copy} />
        <div className="faq-page">
          <h2 className="faq-page__2">{copy.faq.ctaTitle}</h2>
          <div className="faq-page__3">
            <ButtonLink href={`/website/contact`}>{copy.common.contactCta}</ButtonLink>
          </div>
        </div>
      </Section>
    </main>
  );
}
