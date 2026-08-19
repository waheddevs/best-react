import Link from "next/link";

import { Section } from "@/components/ui/section";
import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";

type FinalCtaProps = {
  locale: Locale;
  copy: PageCopy;
};

export function FinalCta({ locale, copy }: FinalCtaProps) {
  return (
    <Section className="pt-0">
      <div className="relative overflow-hidden rounded-4xl bg-(image:--gradient-cta) px-6 py-12 text-center text-white sm:px-10 sm:py-16">
        <div className="absolute -top-20 -left-16 size-56 rounded-full border-30 border-white/10" />
        <h2 className="relative mx-auto max-w-3xl text-[clamp(2.2rem,5vw,4.5rem)] leading-none font-black tracking-[-0.06em] text-white">
          {copy.home.finalTitle}
        </h2>
        <p className="relative mx-auto mt-5 max-w-2xl text-base leading-7 text-white/80">
          {copy.home.finalDescription}
        </p>
        <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={`/${locale}/courses`}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-white px-6 font-bold text-[#102A43]"
          >
            {copy.common.coursesCta}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/30 px-6 font-bold text-white hover:bg-white/10"
          >
            {copy.common.contactCta}
          </Link>
        </div>
      </div>
    </Section>
  );
}
