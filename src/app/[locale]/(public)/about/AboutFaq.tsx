"use client";

import { useQuery } from "@apollo/client/react";

import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { PublicFaqDocument } from "@/gql/graphql";
import { getApiLanguage } from "@/lib/ApiLanguage";
import { mapPublicFaq } from "@/lib/PublicContentMapper";
import type { FaqItem } from "@/types/PublicContent";

import { AboutFaqList } from "./AboutFaqList";

type AboutFaqProps = {
  copy: PageCopy;
  locale: Locale;
  items: FaqItem[];
};

export function AboutFaq({ copy, locale, items }: AboutFaqProps) {
  /* APOLLO REQUESTS */
  const { data: faqData } = useQuery(PublicFaqDocument, {
    variables: { language: getApiLanguage(locale) },
    fetchPolicy: "cache-and-network",
    ssr: false,
  });
  const visibleItems = faqData ? mapPublicFaq(faqData.publicFaq) : items;

  return (
    <Section
      className="about__faqSection"
      containerClassName={"about__faqLayout"}
      id="faq"
      tone="surface"
    >
      <Reveal className="about__faqHeading">
        <SectionHeading
          align="center"
          description={copy.about.faq.description}
          eyebrow={copy.footer.contact}
          title={copy.about.faq.title}
        />
      </Reveal>
      <AboutFaqList items={visibleItems} locale={locale} />
    </Section>
  );
}
