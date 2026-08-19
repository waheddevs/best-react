import HandymanRounded from "@mui/icons-material/HandymanRounded";
import PsychologyRounded from "@mui/icons-material/PsychologyRounded";
import TrackChangesRounded from "@mui/icons-material/TrackChangesRounded";

import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/dictionaries/types";

const benefitIcons = [HandymanRounded, PsychologyRounded, TrackChangesRounded];

type TrustStripProps = {
  content: Dictionary["home"];
};

export function TrustStrip({ content }: TrustStripProps) {
  return (
    <section aria-label={content.eyebrow} className="relative -mt-1 pb-14 sm:pb-20">
      <Container>
        <div className="grid overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-(--shadow-soft) md:grid-cols-3">
          {content.benefits.map((benefit, index) => {
            const BenefitIcon = benefitIcons[index];

            return (
              <article
                key={benefit.title}
                className="group flex gap-4 border-b border-border p-6 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0 lg:p-7"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--brand-turquoise)_14%,transparent)] text-heading transition-transform group-hover:-rotate-3">
                  <BenefitIcon aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-extrabold tracking-[-0.02em] text-heading">
                    {benefit.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-6 text-muted">{benefit.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
