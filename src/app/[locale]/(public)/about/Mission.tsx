import Image from "next/image";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { MissionCopyMotion } from "./MissionCopyMotion";

type MissionProps = {
  locale: Locale;
  copy: PageCopy;
};

export function Mission({ locale, copy }: MissionProps) {
  return (
    <section className="about__mission">
      <Container>
        <div className="about__missionLayout">
          <MissionCopyMotion className="about__missionCopy">
            <SectionHeading
              eyebrow={copy.about.missionEyebrow}
              title={copy.about.missionTitle}
              titleClassName={"about__missionTitle"}
              description={copy.about.missionBody}
              descriptionClassName={"about__missionDescription"}
            />
            <div className="about__missionAction">
              <ButtonLink href={`/${locale}/courses`} hoverEffect="jump">
                {copy.about.missionCta}
              </ButtonLink>
            </div>
          </MissionCopyMotion>
          <div className="about__missionVisual">
            <Image
              src="/images/about-page/best-lc-learning-centre.png"
              alt={copy.about.missionImageAlt}
              fill
              sizes="(max-width: 1024px) calc(100vw - 40px), 55vw"
              className="about__missionImage"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
