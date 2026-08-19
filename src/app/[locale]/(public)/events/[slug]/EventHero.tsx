import { PageHero } from "@/components/ui/page-hero";
import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import type { PublicEvent } from "@/types/public-content";

type EventHeroProps = {
  event: PublicEvent;
  locale: Locale;
  copy: PageCopy;
};

export function EventHero({ event, locale, copy }: EventHeroProps) {
  return (
    <PageHero
      eyebrow={copy.events.upcoming}
      title={event.title[locale]}
      description={event.summary[locale]}
    />
  );
}
