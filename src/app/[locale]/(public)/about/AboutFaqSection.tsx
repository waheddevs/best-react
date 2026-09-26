import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { getPublicFaq } from "@/lib/PublicContentApi";

import { AboutFaq } from "./AboutFaq";

type AboutFaqSectionProps = { locale: Locale; copy: PageCopy };

export async function AboutFaqSection({ locale, copy }: AboutFaqSectionProps) {
  /* APOLLO REQUESTS */
  const items = await getPublicFaq(locale);
  return <AboutFaq copy={copy} items={items} locale={locale} />;
}
