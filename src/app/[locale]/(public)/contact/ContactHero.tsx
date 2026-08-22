import { PageHero } from "@/components/ui/PageHero";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { ContactHeroVisual } from "./ContactHeroVisual";

type ContactHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function ContactHero({ eyebrow, copy }: ContactHeroProps) {
  return (
    <PageHero
      animateCopy
      eyebrow={eyebrow}
      title={copy.contact.title}
      description={copy.contact.description}
      visual={<ContactHeroVisual copy={copy.contact} />}
    />
  );
}
