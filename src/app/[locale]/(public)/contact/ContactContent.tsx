import EmailRounded from "@mui/icons-material/EmailRounded";
import LocationOnRounded from "@mui/icons-material/LocationOnRounded";
import PhoneRounded from "@mui/icons-material/PhoneRounded";
import Image from "next/image";

import { Section } from "@/components/ui/Section";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/contact.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { ContactForm } from "@/features/contact/ContactForm";

type ContactContentProps = {
  copy: PageCopy;
  locale: Locale;
};

export function ContactContent({ copy, locale }: ContactContentProps) {
  const contactItems = [
    { label: copy.footer.address, Icon: LocationOnRounded },
    { label: copy.footer.phone, Icon: PhoneRounded },
    { label: copy.footer.email, Icon: EmailRounded },
  ];

  return (
    <Section tone="surface">
      <div className={styles.contact__contentLayout}>
        <aside className={styles.contact__details}>
          <div className={styles.contact__detailsBrand}>
            <span className={styles.contact__detailsLogo}>
              <Image alt="BEST LC" height={44} src="/icons/logo.svg" width={44} />
            </span>
            <strong className={styles.contact__detailsBrandName}>BEST LC</strong>
          </div>
          <h2 className={styles.contact__detailsTitle}>{copy.footer.contact}</h2>
          <ul className={styles.contact__detailsList}>
            {contactItems.map(({ label, Icon }) => (
              <li className={styles.contact__detailsItem} key={label}>
                <span className={styles.contact__detailsItemIcon}>
                  <Icon aria-hidden="true" />
                </span>
                <span>{label}</span>
              </li>
            ))}
          </ul>
          <div className={styles.contact__privacyCard}>{copy.contact.responseNotice}</div>
        </aside>
        <section className={styles.contact__formPanel}>
          <h2 className={styles.contact__formTitle}>{copy.contact.formTitle}</h2>
          <ContactForm copy={copy} locale={locale} />
        </section>
      </div>
    </Section>
  );
}
