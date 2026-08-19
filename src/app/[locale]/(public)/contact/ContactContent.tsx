import ContactSupportRounded from "@mui/icons-material/ContactSupportRounded";

import { Section } from "@/components/ui/Section";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/contact.module.css";
import { contactDetails, courses } from "@/data/PublicContent";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { ContactForm } from "@/features/contact/ContactForm";

type ContactContentProps = {
  locale: Locale;
  copy: PageCopy;
};

export function ContactContent({ locale, copy }: ContactContentProps) {
  return (
    <Section>
      <div className={styles.contact__contentLayout}>
        <aside className={styles.contact__details}>
          <span className={styles.contact__detailsIcon}>
            <ContactSupportRounded aria-hidden="true" className={styles.contact__detailsIconSvg} />
          </span>
          <h2 className={styles.contact__detailsTitle}>
            {copy.contact.detailsTitle}
          </h2>
          {contactDetails.requiresConfirmation ? (
            <p className={styles.contact__placeholder}>{copy.contact.placeholder}</p>
          ) : null}
          <div className={styles.contact__privacyCard}>
            {copy.contact.privacyNotice}
          </div>
        </aside>
        <section className={styles.contact__formPanel}>
          <h2 className={styles.contact__formTitle}>
            {copy.contact.formTitle}
          </h2>
          <ContactForm locale={locale} copy={copy} courses={courses} />
        </section>
      </div>
    </Section>
  );
}
