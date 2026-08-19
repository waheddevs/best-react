import { PageHero } from "@/components/ui/PageHero";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type ContactHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function ContactHero({ eyebrow, copy }: ContactHeroProps) {
  return (
    <PageHero eyebrow={eyebrow} title={copy.contact.title} description={copy.contact.description} />
  );
}
