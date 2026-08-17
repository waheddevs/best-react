import ContactSupportRounded from "@mui/icons-material/ContactSupportRounded";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { isLocale } from "@/config/locales";
import { contactDetails, courses } from "@/data/public-content";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { ContactForm } from "@/features/contact/contact-form";
import { createPageMetadata } from "@/lib/metadata";

type ContactPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getPageCopy(locale);
  return createPageMetadata(locale, copy.contact.title, copy.contact.description, "/contact");
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
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
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="h-fit rounded-4xl border border-border bg-surface p-7 sm:p-9">
            <span className="grid size-14 place-items-center rounded-2xl bg-brand/15 text-heading">
              <ContactSupportRounded aria-hidden="true" sx={{ fontSize: 30 }} />
            </span>
            <h2 className="mt-8 text-2xl font-black tracking-[-0.04em] text-heading">
              {copy.contact.detailsTitle}
            </h2>
            {contactDetails.requiresConfirmation ? (
              <p className="mt-4 leading-7 text-muted">{copy.contact.placeholder}</p>
            ) : null}
            <div className="mt-8 rounded-2xl bg-background p-5 text-sm leading-6 text-muted">
              {copy.contact.privacyNotice}
            </div>
          </aside>
          <section className="rounded-4xl border border-border bg-surface p-6 sm:p-9">
            <h2 className="mb-7 text-2xl font-black tracking-[-0.04em] text-heading">
              {copy.contact.formTitle}
            </h2>
            <ContactForm locale={locale} copy={copy} courses={courses} />
          </section>
        </div>
      </Section>
    </main>
  );
}
