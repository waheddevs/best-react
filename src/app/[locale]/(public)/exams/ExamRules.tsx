import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";

import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";

type ExamRulesProps = {
  locale: Locale;
  copy: PageCopy;
};

export function ExamRules({ locale, copy }: ExamRulesProps) {
  return (
    <Section className="bg-surface">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading title={copy.exams.rulesTitle} />
          <ul className="mt-8 space-y-4">
            {copy.exams.rules.map((rule) => (
              <li key={rule} className="flex gap-3 leading-7 text-muted">
                <CheckCircleOutlineRounded
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-brand"
                />
                {rule}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[1.75rem] border border-border bg-background p-7">
          <h2 className="text-2xl font-black text-heading">{copy.exams.scheduleTitle}</h2>
          <p className="mt-4 leading-7 text-muted">{copy.exams.scheduleBody}</p>
          <div className="mt-7">
            <ButtonLink href={`/${locale}/contact`} variant="secondary">
              {copy.common.contactCta}
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
