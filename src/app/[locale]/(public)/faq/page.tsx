import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { isLocale } from "@/config/locales";
import { faqItems } from "@/data/public-content";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { FaqList } from "@/features/faq/faq-list";
import { createPageMetadata } from "@/lib/metadata";

type FaqPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: FaqPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getPageCopy(locale);
  return createPageMetadata(locale, copy.faq.title, copy.faq.description, "/faq");
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
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
        <div className="mt-12 rounded-[1.75rem] border border-border bg-surface p-7 text-center">
          <h2 className="text-2xl font-black text-heading">{copy.faq.ctaTitle}</h2>
          <div className="mt-5 flex justify-center">
            <ButtonLink href={`/${locale}/contact`}>{copy.common.contactCta}</ButtonLink>
          </div>
        </div>
      </Section>
    </main>
  );
}
