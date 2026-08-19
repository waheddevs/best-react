import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";

import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/config/Locales";
import type { Dictionary } from "@/dictionaries/public/Types";
import styles from "@/css/public/home.module.css";

import { HeroVisual } from "./HeroVisual";

type HomeHeroProps = {
  locale: Locale;
  content: Dictionary["home"];
};

export function HomeHero({ locale, content }: HomeHeroProps) {
  return (
    <section className={styles.home__hero}>
      <div className={styles.home__heroGlowStart} />
      <div className={styles.home__heroGlowEnd} />
      <Container className={styles.home__heroContainer}>
        <Reveal className={styles.home__heroCopy}>
          <p className={styles.home__heroEyebrow}>
            <AutoAwesomeRounded
              aria-hidden="true"
              className={styles.home__heroEyebrowIcon}
            />
            {content.eyebrow}
          </p>
          <h1 className={styles.home__heroTitle}>
            {content.titleLead}
            <span className={styles.home__heroTitleAccent}>{content.titleAccent}</span>
          </h1>
          <p className={styles.home__heroDescription}>{content.description}</p>
          <div className={styles.home__heroActions}>
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
  );
}
