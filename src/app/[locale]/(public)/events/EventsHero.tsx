import { PageHero } from "@/components/ui/PageHero";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type EventsHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function EventsHero({ eyebrow, copy }: EventsHeroProps) {
  return (
    <PageHero eyebrow={eyebrow} title={copy.events.title} description={copy.events.description} />
  );
}
