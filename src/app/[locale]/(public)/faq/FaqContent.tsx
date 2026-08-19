import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/faq.module.css";
import { faqItems } from "@/data/PublicContent";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { FaqList } from "@/features/faq/FaqList";

type FaqContentProps = {
  locale: Locale;
  copy: PageCopy;
};

export function FaqContent({ locale, copy }: FaqContentProps) {
  return (
    <Section>
      <FaqList items={faqItems} locale={locale} copy={copy} />
      <div className={styles.faq__cta}>
        <h2 className={styles.faq__ctaTitle}>{copy.faq.ctaTitle}</h2>
        <div className={styles.faq__ctaAction}>
          <ButtonLink href={`/${locale}/contact`}>{copy.common.contactCta}</ButtonLink>
        </div>
      </div>
    </Section>
  );
}
