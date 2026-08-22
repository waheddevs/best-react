import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/home.module.css";
import { contactFaqItems } from "@/data/PublicContent";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type FaqPreviewProps = {
  locale: Locale;
  copy: PageCopy;
};

export function FaqPreview({ locale, copy }: FaqPreviewProps) {
  return (
    <Section>
      <SectionHeading eyebrow={copy.home.faqEyebrow} title={copy.home.faqTitle} />
      <div className={styles.home__faqGrid}>
        {contactFaqItems.slice(0, 3).map((item) => (
          <article key={item.id} className={styles.home__faqCard}>
            <h3 className={styles.home__faqQuestion}>{item.question[locale]}</h3>
            <p className={styles.home__faqAnswer}>{item.answer[locale]}</p>
          </article>
        ))}
      </div>
      <Link href={`/${locale}/contact#faq`} className={styles.home__faqLink}>
        {copy.common.learnMore}
        <ArrowForwardRounded aria-hidden="true" />
      </Link>
    </Section>
  );
}
