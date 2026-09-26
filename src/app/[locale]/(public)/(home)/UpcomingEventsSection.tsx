import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { getPublicEvents } from "@/lib/PublicContentApi";

import { UpcomingEvents } from "./UpcomingEvents";

type UpcomingEventsSectionProps = { locale: Locale; copy: PageCopy };

export async function UpcomingEventsSection({ locale, copy }: UpcomingEventsSectionProps) {
  /* APOLLO REQUESTS */
  const events = await getPublicEvents(locale);
  return <UpcomingEvents locale={locale} copy={copy} events={events} />;
}
