import Image from "next/image";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/about.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type MissionProps = {
  locale: Locale;
  copy: PageCopy;
};

export function Mission({ locale, copy }: MissionProps) {
  return (
    <Section>
      <div className={styles.about__missionLayout}>
        <div>
          <SectionHeading
            eyebrow={copy.about.missionEyebrow}
            title={copy.about.missionTitle}
            description={copy.about.missionBody}
          />
          <div className={styles.about__missionAction}>
            <ButtonLink href={`/${locale}/courses`}>{copy.common.coursesCta}</ButtonLink>
          </div>
        </div>
        <figure className={styles.about__missionVisual}>
          <Image
            src="/images/generated/best-learning-environment-concept.webp"
            alt={copy.about.environmentTitle}
            width={1586}
            height={992}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className={styles.about__missionImage}
          />
          <figcaption className={styles.about__missionCaption}>
            {copy.about.environmentBody}
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
