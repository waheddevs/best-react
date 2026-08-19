import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";
import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";

type ResultsCtaProps = {
  locale: Locale;
  copy: PageCopy;
};

export function ResultsCta({ locale, copy }: ResultsCtaProps) {
  return (
    <Section className="pt-0">
      <div className="rounded-4xl bg-(image:--gradient-cta) p-8 text-center sm:p-12">
        <h2 className="text-3xl font-black tracking-[-0.04em] text-white">
          {copy.results.ctaTitle}
        </h2>
        <div className="mt-6 flex justify-center">
          <ButtonLink href={`/${locale}/courses`} variant="secondary">
            {copy.common.coursesCta}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
