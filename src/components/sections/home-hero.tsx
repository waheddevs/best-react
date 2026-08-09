import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import HandymanRounded from "@mui/icons-material/HandymanRounded";
import PsychologyRounded from "@mui/icons-material/PsychologyRounded";
import TrackChangesRounded from "@mui/icons-material/TrackChangesRounded";

import { Reveal } from "@/components/motion/reveal";
import { HeroVisual } from "@/components/sections/hero-visual";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/config/locales";
import type { Dictionary } from "@/dictionaries/types";

const benefitIcons = [HandymanRounded, PsychologyRounded, TrackChangesRounded];

type HomeHeroProps = {
  locale: Locale;
  content: Dictionary["home"];
};

export function HomeHero({ locale, content }: HomeHeroProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-(image:--gradient-hero) pt-14 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
        <div className="pointer-events-none absolute top-0 -left-40 size-80 rounded-full bg-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-action/10 blur-3xl" />
        <Container className="relative grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
          <Reveal className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-2 text-sm font-bold text-heading shadow-sm">
              <AutoAwesomeRounded aria-hidden="true" className="text-coral" sx={{ fontSize: 18 }} />
              {content.eyebrow}
            </p>
            <h1 className="mt-7 text-[clamp(3rem,7vw,6.5rem)] leading-[0.92] font-black tracking-[-0.07em] text-heading">
              {content.titleLead}
              <span className="mt-2 block text-action">{content.titleAccent}</span>
            </h1>
            <p className="mt-7 max-w-[62ch] text-base leading-7 text-muted sm:text-lg sm:leading-8">
              {content.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/${locale}/courses`}>{content.primaryCta}</ButtonLink>
              <ButtonLink href={`/${locale}/contact`} variant="secondary">
                {content.secondaryCta}
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <HeroVisual
              label={content.visualLabel}
              title={content.visualTitle}
              progress={content.visualProgress}
            />
          </Reveal>
        </Container>
      </section>

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
    </>
  );
}
