import { PageHero } from "@/components/ui/PageHero";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicEvent } from "@/types/PublicContent";

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
