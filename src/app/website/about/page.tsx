import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import LightbulbRounded from "@mui/icons-material/LightbulbRounded";
import VerifiedRounded from "@mui/icons-material/VerifiedRounded";
import VolunteerActivismRounded from "@mui/icons-material/VolunteerActivismRounded";
import type { Metadata } from "next";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { defaultLocale } from "@/config/locales";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

const valueIcons = [
  LightbulbRounded,
  AutoStoriesRounded,
  VolunteerActivismRounded,
  VerifiedRounded,
];
export function generateMetadata(): Metadata {
  const locale = defaultLocale;
  const copy = getPageCopy(locale);
  return createPageMetadata(copy.about.title, copy.about.description, "/about");
}

export default function AboutPage() {
  const locale = defaultLocale;
  const copy = getPageCopy(locale);
  const dictionary = getDictionary(locale);
  return (
    <main>
      <PageHero
        eyebrow={dictionary.navigation.about}
        title={copy.about.title}
        description={copy.about.description}
      />
      <Section>
        <div className="about-page">
          <div>
            <SectionHeading
              eyebrow={copy.about.missionEyebrow}
              title={copy.about.missionTitle}
              description={copy.about.missionBody}
            />
            <div className="about-page__2">
              <ButtonLink href={`/website/courses`}>{copy.common.coursesCta}</ButtonLink>
            </div>
          </div>
          <figure className="about-page__3">
            <Image
              src="/images/generated/best-learning-environment-concept.webp"
              alt={copy.about.environmentTitle}
              width={1586}
              height={992}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="about-page__4"
            />
            <figcaption className="about-page__5">{copy.about.environmentBody}</figcaption>
          </figure>
        </div>
      </Section>
      <Section className="about-page__6">
        <SectionHeading title={copy.about.approachTitle} />
        <div className="about-page__7">
          {copy.about.values.map((value, index) => {
            const Icon = valueIcons[index];
            return (
              <article key={value.title} className="about-page__8">
                <span className="about-page__9">
                  <Icon aria-hidden="true" />
                </span>
                <h2 className="about-page__10">{value.title}</h2>
                <p className="about-page__11">{value.description}</p>
              </article>
            );
          })}
        </div>
      </Section>
      <Section>
        <div className="about-page__12">
          <article className="about-page__13">
            <h2 className="about-page__14">{copy.about.storyTitle}</h2>
            <p className="about-page__15">{copy.about.storyBody}</p>
          </article>
          <article className="about-page__16">
            <h2 className="about-page__17">{copy.about.environmentTitle}</h2>
            <p className="about-page__18">{copy.about.environmentBody}</p>
          </article>
        </div>
      </Section>
    </main>
  );
}
