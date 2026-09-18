import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type FinalCtaProps = {
  locale: Locale;
  copy: PageCopy;
};

export function FinalCta({ locale, copy }: FinalCtaProps) {
  return (
    <Section tone="background">
      <Reveal direction="scale">
        <StaggerGroup className="home__finalCta" delay={0.08}>
          <div aria-hidden="true" className="home__finalCtaDecoration" />
          <StaggerItem initialScale={0.99}>
            <h2 className="home__finalCtaTitle">{copy.home.finalTitle}</h2>
          </StaggerItem>
          <StaggerItem initialScale={0.99}>
            <p className="home__finalCtaDescription">{copy.home.finalDescription}</p>
          </StaggerItem>
          <StaggerItem className="home__finalCtaActions" initialScale={0.99}>
            <ButtonLink
              hoverEffect="jump"
              href={`/${locale}/courses`}
              shape="soft"
              size="large"
              variant="surface"
            >
              {copy.common.coursesCta}
            </ButtonLink>
            <ButtonLink
              href={`/${locale}/contact`}
              shape="soft"
              size="large"
              variant="inverseOutline"
            >
              {copy.common.contactCta}
            </ButtonLink>
          </StaggerItem>
        </StaggerGroup>
      </Reveal>
    </Section>
  );
}
