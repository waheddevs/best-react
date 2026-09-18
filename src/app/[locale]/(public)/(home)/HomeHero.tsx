import { Container } from "@/components/ui/Container";
import type { Locale } from "@/config/Locales";
import type { Dictionary } from "@/dictionaries/public/Types";

import { HeroCopy } from "./HeroCopy";
import { HeroLandmark } from "./HeroLandmark";
import { HeroPlanes } from "./HeroPlanes";
import { HeroVisual } from "./HeroVisual";

type HomeHeroProps = {
  locale: Locale;
  content: Dictionary["home"];
};

export function HomeHero({ locale, content }: HomeHeroProps) {
  return (
    <section className="home__hero">
      <div aria-hidden="true" className="home__heroGlowStart" />
      <div aria-hidden="true" className="home__heroGlowEnd" />
      <HeroLandmark />
      <HeroPlanes />
      <Container className="home__heroContainer">
        <HeroCopy locale={locale} content={content} />
        <HeroVisual label={content.visualLabel} />
      </Container>
    </section>
  );
}
