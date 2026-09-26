import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { getPublicEvents } from "@/lib/PublicContentApi";

import { EventsCatalog } from "./EventsCatalog";

type EventsCatalogSectionProps = { locale: Locale; copy: PageCopy };

export async function EventsCatalogSection({ locale, copy }: EventsCatalogSectionProps) {
  /* APOLLO REQUESTS */
  const events = await getPublicEvents(locale);
  return <EventsCatalog locale={locale} copy={copy} events={events} />;
}
