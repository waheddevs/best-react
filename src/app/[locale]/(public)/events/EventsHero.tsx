import { PageHero } from "@/components/ui/PageHero";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { EventsHeroVisual } from "./EventsHeroVisual";

type EventsHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function EventsHero({ eyebrow, copy }: EventsHeroProps) {
  return (
    <PageHero
      animateCopy
      eyebrow={eyebrow}
      title={copy.events.title}
      description={copy.events.description}
      visual={<EventsHeroVisual copy={copy.events} />}
    />
  );
}
