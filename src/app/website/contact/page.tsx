import ContactSupportRounded from "@mui/icons-material/ContactSupportRounded";
import type { Metadata } from "next";

import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { defaultLocale } from "@/config/locales";
import { contactDetails, courses } from "@/data/public-content";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { ContactForm } from "@/features/contact/contact-form";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  const locale = defaultLocale;
  const copy = getPageCopy(locale);
  return createPageMetadata(copy.contact.title, copy.contact.description, "/contact");
}

export default function ContactPage() {
  const locale = defaultLocale;
  const copy = getPageCopy(locale);
  const dictionary = getDictionary(locale);
  return (
    <main>
      <PageHero
        eyebrow={dictionary.navigation.contact}
        title={copy.contact.title}
        description={copy.contact.description}
      />
      <Section>
        <div className="contact-page">
          <aside className="contact-page__2">
            <span className="contact-page__3">
              <ContactSupportRounded aria-hidden="true" sx={{ fontSize: 30 }} />
            </span>
            <h2 className="contact-page__4">{copy.contact.detailsTitle}</h2>
            {contactDetails.requiresConfirmation ? (
              <p className="contact-page__5">{copy.contact.placeholder}</p>
            ) : null}
            <div className="contact-page__6">{copy.contact.privacyNotice}</div>
          </aside>
          <section className="contact-page__7">
            <h2 className="contact-page__8">{copy.contact.formTitle}</h2>
            <ContactForm locale={locale} copy={copy} courses={courses} />
          </section>
        </div>
      </Section>
    </main>
  );
}
