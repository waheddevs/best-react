import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getDictionary } from "@/dictionaries/public/GetDictionary";
import { getPageCopy } from "@/dictionaries/public/PageCopy";
import styles from "@/css/public/contact.module.css";
import { createPageMetadata } from "@/lib/Metadata";

import { ContactContent } from "./ContactContent";
import { ContactHero } from "./ContactHero";

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
    <main className={styles.contact}>
      <ContactHero eyebrow={dictionary.navigation.contact} copy={copy} />
      <ContactContent locale={locale} copy={copy} />
    </main>
  );
}
