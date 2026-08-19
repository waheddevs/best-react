import { PageHero } from "@/components/ui/page-hero";
import type { PageCopy } from "@/dictionaries/page-copy";

type ContactHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function ContactHero({ eyebrow, copy }: ContactHeroProps) {
  return (
    <PageHero eyebrow={eyebrow} title={copy.contact.title} description={copy.contact.description} />
  );
}
