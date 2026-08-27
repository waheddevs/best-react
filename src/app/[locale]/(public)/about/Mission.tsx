import Image from "next/image";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/about.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { MissionCopyMotion } from "./MissionCopyMotion";

type MissionProps = {
  locale: Locale;
  copy: PageCopy;
};

export function Mission({ locale, copy }: MissionProps) {
  return (
    <section className={styles.about__mission}>
      <Container>
        <div className={styles.about__missionLayout}>
          <MissionCopyMotion className={styles.about__missionCopy}>
            <SectionHeading
              eyebrow={copy.about.missionEyebrow}
              title={copy.about.missionTitle}
              titleClassName={styles.about__missionTitle}
              description={copy.about.missionBody}
              descriptionClassName={styles.about__missionDescription}
            />
            <div className={styles.about__missionAction}>
              <ButtonLink href={`/${locale}/courses`} hoverEffect="jump">
                {copy.about.missionCta}
              </ButtonLink>
            </div>
          </MissionCopyMotion>
          <div className={styles.about__missionVisual}>
            <Image
              src="/images/about-page/best-lc-learning-centre.png"
              alt={copy.about.missionImageAlt}
              fill
              sizes="(max-width: 1024px) calc(100vw - 40px), 55vw"
              className={styles.about__missionImage}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
