import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import LightbulbRounded from "@mui/icons-material/LightbulbRounded";
import VerifiedRounded from "@mui/icons-material/VerifiedRounded";
import VolunteerActivismRounded from "@mui/icons-material/VolunteerActivismRounded";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { isLocale } from "@/config/locales";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

const valueIcons = [
  LightbulbRounded,
  AutoStoriesRounded,
  VolunteerActivismRounded,
  VerifiedRounded,
];
type AboutPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getPageCopy(locale);
  return createPageMetadata(locale, copy.about.title, copy.about.description, "/about");
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
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
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow={copy.about.missionEyebrow}
              title={copy.about.missionTitle}
              description={copy.about.missionBody}
            />
            <div className="mt-7">
              <ButtonLink href={`/${locale}/courses`}>{copy.common.coursesCta}</ButtonLink>
            </div>
          </div>
          <figure className="relative overflow-hidden rounded-4xl border border-border bg-surface shadow-(--shadow-soft)">
            <Image
              src="/images/generated/best-learning-environment-concept.webp"
              alt={copy.about.environmentTitle}
              width={1586}
              height={992}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="aspect-16/10 h-full w-full object-cover"
            />
            <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/40 bg-[#071521]/80 px-5 py-4 text-sm leading-6 text-white backdrop-blur-md">
              {copy.about.environmentBody}
            </figcaption>
          </figure>
        </div>
      </Section>
      <Section className="bg-surface">
        <SectionHeading title={copy.about.approachTitle} />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {copy.about.values.map((value, index) => {
            const Icon = valueIcons[index];
            return (
              <article
                key={value.title}
                className="rounded-[1.75rem] border border-border bg-background p-6"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-brand/15 text-heading">
                  <Icon aria-hidden="true" />
                </span>
                <h2 className="mt-8 text-xl font-black text-heading">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{value.description}</p>
              </article>
            );
          })}
        </div>
      </Section>
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-4xl border border-border bg-surface p-7 sm:p-9">
            <h2 className="text-3xl font-black tracking-[-0.04em] text-heading">
              {copy.about.storyTitle}
            </h2>
            <p className="mt-5 leading-8 text-muted">{copy.about.storyBody}</p>
          </article>
          <article className="rounded-4xl bg-(image:--gradient-cta) p-7 text-white sm:p-9">
            <h2 className="text-3xl font-black tracking-[-0.04em] text-white">
              {copy.about.environmentTitle}
            </h2>
            <p className="mt-5 leading-8 text-white/80">{copy.about.environmentBody}</p>
          </article>
        </div>
      </Section>
    </main>
  );
}
