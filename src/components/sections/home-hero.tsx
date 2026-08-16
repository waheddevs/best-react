import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import HandymanRounded from "@mui/icons-material/HandymanRounded";
import PsychologyRounded from "@mui/icons-material/PsychologyRounded";
import TrackChangesRounded from "@mui/icons-material/TrackChangesRounded";

import { Reveal } from "@/components/motion/reveal";
import { HeroVisual } from "@/components/sections/hero-visual";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/dictionaries/types";

const benefitIcons = [HandymanRounded, PsychologyRounded, TrackChangesRounded];

type HomeHeroProps = {
  content: Dictionary["home"];
};

export function HomeHero({ content }: HomeHeroProps) {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero__2" />
        <div className="home-hero__3" />
        <Container className="home-hero__4">
          <Reveal className="home-hero__5">
            <p className="home-hero__6">
              <AutoAwesomeRounded
                aria-hidden="true"
                className="home-hero__7"
                sx={{ fontSize: 18 }}
              />
              {content.eyebrow}
            </p>
            <h1 className="home-hero__8">
              {content.titleLead}
              <span className="home-hero__9">{content.titleAccent}</span>
            </h1>
            <p className="home-hero__10">{content.description}</p>
            <div className="home-hero__11">
              <ButtonLink href="/website/courses">{content.primaryCta}</ButtonLink>
              <ButtonLink href="/website/contact" variant="secondary">
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

      <section aria-label={content.eyebrow} className="home-hero__12">
        <Container>
          <div className="home-hero__13">
            {content.benefits.map((benefit, index) => {
              const BenefitIcon = benefitIcons[index];
              return (
                <article key={benefit.title} className="home-hero__14">
                  <span className="home-hero__15">
                    <BenefitIcon aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="home-hero__16">{benefit.title}</h2>
                    <p className="home-hero__17">{benefit.description}</p>
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
