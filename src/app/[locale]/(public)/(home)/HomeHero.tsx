import { Container } from "@/components/ui/Container";
import type { Locale } from "@/config/Locales";
import type { Dictionary } from "@/dictionaries/public/Types";
import styles from "@/css/public/home.module.css";

import { HeroCopy } from "./HeroCopy";
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
        <HeroCopy locale={locale} content={content} />
        <HeroVisual
          label={content.visualLabel}
          title={content.visualTitle}
          progress={content.visualProgress}
        />
      </Container>
    </section>
  );
}
