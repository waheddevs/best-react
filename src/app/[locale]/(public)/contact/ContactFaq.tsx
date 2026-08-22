import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/contact.module.css";
import { contactFaqItems } from "@/data/PublicContent";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { ContactFaqList } from "@/features/contact/ContactFaqList";

type ContactFaqProps = {
  copy: PageCopy;
  locale: Locale;
};

export function ContactFaq({ copy, locale }: ContactFaqProps) {
  return (
    <Section
      className={styles.contact__faqSection}
      containerClassName={styles.contact__faqLayout}
      id="faq"
    >
      <div className={styles.contact__faqHeading}>
        <SectionHeading
          align="center"
          description={copy.faq.description}
          eyebrow={copy.footer.contact}
          title={copy.faq.title}
        />
      </div>
      <ContactFaqList items={contactFaqItems} locale={locale} />
    </Section>
  );
}
