import { PageHero } from "@/components/ui/page-hero";
import type { PageCopy } from "@/dictionaries/page-copy";

type EventsHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function EventsHero({ eyebrow, copy }: EventsHeroProps) {
  return (
    <PageHero eyebrow={eyebrow} title={copy.events.title} description={copy.events.description} />
  );
}
