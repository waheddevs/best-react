import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";

type MissionProps = {
  locale: Locale;
  copy: PageCopy;
};

export function Mission({ locale, copy }: MissionProps) {
  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow={copy.about.missionEyebrow}
            title={copy.about.missionTitle}
            description={copy.about.missionBody}
          />
          <div className="mt-7">
            <ButtonLink href={`/${locale}/courses`}>{copy.common.coursesCta}</ButtonLink>
          </div>
        </div>
        <figure className="relative overflow-hidden rounded-4xl border border-border bg-surface shadow-(--shadow-soft)">
          <Image
            src="/images/generated/best-learning-environment-concept.webp"
            alt={copy.about.environmentTitle}
            width={1586}
            height={992}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="aspect-16/10 h-full w-full object-cover"
          />
          <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/40 bg-[#071521]/80 px-5 py-4 text-sm leading-6 text-white backdrop-blur-md">
            {copy.about.environmentBody}
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
