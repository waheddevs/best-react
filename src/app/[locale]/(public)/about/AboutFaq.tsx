import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/about.module.css";
import { aboutFaqItems } from "@/data/PublicContent";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { AboutFaqList } from "./AboutFaqList";

type AboutFaqProps = {
  copy: PageCopy;
  locale: Locale;
};

export function AboutFaq({ copy, locale }: AboutFaqProps) {
  return (
    <Section
      className={styles.about__faqSection}
      containerClassName={styles.about__faqLayout}
      id="faq"
      tone="surface"
    >
      <Reveal className={styles.about__faqHeading}>
        <SectionHeading
          align="center"
          description={copy.about.faq.description}
          eyebrow={copy.footer.contact}
          title={copy.about.faq.title}
        />
      </Reveal>
      <AboutFaqList items={aboutFaqItems} locale={locale} />
    </Section>
  );
}
