import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import ExploreRounded from "@mui/icons-material/ExploreRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import InsightsRounded from "@mui/icons-material/InsightsRounded";
import Link from "next/link";

import { CourseCard } from "@/components/cards/course-card";
import { EventCard } from "@/components/cards/event-card";
import { ResourceCard } from "@/components/cards/resource-card";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/config/locales";
import { courses, events, faqItems, libraryResources } from "@/data/public-content";
import type { PageCopy } from "@/dictionaries/page-copy";

const whyIcons = [ExploreRounded, GroupsRounded, InsightsRounded];

type HomeSectionsProps = {
  locale: Locale;
  copy: PageCopy;
};

export function HomeSections({ locale, copy }: HomeSectionsProps) {
  return (
    <>
      <Section>
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={copy.home.coursesEyebrow}
            title={copy.home.coursesTitle}
            description={copy.home.coursesDescription}
          />
          <ButtonLink href={`/${locale}/courses`} variant="secondary">
            {copy.common.coursesCta}
          </ButtonLink>
        </Reveal>
        <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <StaggerItem key={course.slug} className="h-full">
              <CourseCard course={course} locale={locale} copy={copy} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section className="bg-surface">
        <SectionHeading eyebrow={copy.home.whyEyebrow} title={copy.home.whyTitle} />
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr_0.85fr]">
          {copy.home.whyItems.map((item, index) => {
            const Icon = whyIcons[index];
            return (
              <article
                key={item.title}
                className={`relative overflow-hidden rounded-[1.75rem] border border-border p-7 ${
                  index === 0
                    ? "bg-(image:--gradient-cta) text-white lg:min-h-80"
                    : "bg-background text-text"
                }`}
              >
                <span
                  className={`grid size-12 place-items-center rounded-2xl ${index === 0 ? "bg-white/15 text-white" : "bg-brand/15 text-heading"}`}
                >
                  <Icon aria-hidden="true" />
                </span>
                <h3
                  className={`mt-12 text-2xl font-black tracking-[-0.04em] ${index === 0 ? "text-white" : "text-heading"}`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-3 max-w-md text-sm leading-7 ${index === 0 ? "text-white/80" : "text-muted"}`}
                >
                  {item.description}
                </p>
                {index === 0 ? (
                  <div className="absolute -right-16 -bottom-20 size-56 rounded-full border-34 border-white/10" />
                ) : null}
              </article>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow={copy.home.processEyebrow} title={copy.home.processTitle} />
        <ol className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {copy.home.processItems.map((item, index) => (
            <li
              key={item.title}
              className="relative rounded-[1.75rem] border border-border bg-surface p-6"
            >
              <span className="grid size-11 place-items-center rounded-full bg-sun text-sm font-black text-heading">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 text-xl font-black tracking-[-0.03em] text-heading">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-surface">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={copy.home.resultsEyebrow}
              title={copy.home.resultsTitle}
              description={copy.home.resultsDescription}
            />
            <div className="mt-7">
              <ButtonLink href={`/${locale}/results`} variant="secondary">
                {copy.common.learnMore}
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-4xl border border-border bg-background p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {[copy.results.journeySteps[0], copy.results.journeySteps[1]].map((item, index) => (
                <div
                  key={item.title}
                  className={`rounded-2xl p-5 ${index === 0 ? "bg-(image:--gradient-cta) text-white" : "bg-surface"}`}
                >
                  <CheckCircleRounded
                    aria-hidden="true"
                    className={index === 0 ? "text-white" : "text-brand"}
                  />
                  <h3
                    className={`mt-7 font-extrabold ${index === 0 ? "text-white" : "text-heading"}`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-6 ${index === 0 ? "text-white/75" : "text-muted"}`}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={copy.home.eventsEyebrow} title={copy.home.eventsTitle} />
          <ButtonLink href={`/${locale}/events`} variant="secondary">
            {copy.common.learnMore}
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {events.map((event) => (
            <EventCard key={event.slug} event={event} locale={locale} copy={copy} />
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={copy.home.libraryEyebrow} title={copy.home.libraryTitle} />
          <ButtonLink href={`/${locale}/library`} variant="secondary">
            {copy.common.learnMore}
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {libraryResources.map((resource) => (
            <ResourceCard key={resource.slug} resource={resource} locale={locale} copy={copy} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow={copy.home.faqEyebrow} title={copy.home.faqTitle} />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {faqItems.slice(0, 3).map((item) => (
            <article
              key={item.id}
              className="rounded-[1.75rem] border border-border bg-surface p-6"
            >
              <h3 className="leading-6 font-extrabold text-heading">{item.question[locale]}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.answer[locale]}</p>
            </article>
          ))}
        </div>
        <Link
          href={`/${locale}/faq`}
          className="mt-7 inline-flex min-h-11 items-center gap-2 font-bold text-action hover:underline"
        >
          {copy.common.learnMore}
          <ArrowForwardRounded aria-hidden="true" />
        </Link>
      </Section>

      <Section className="pt-0">
        <div className="relative overflow-hidden rounded-4xl bg-(image:--gradient-cta) px-6 py-12 text-center text-white sm:px-10 sm:py-16">
          <div className="absolute -top-20 -left-16 size-56 rounded-full border-30 border-white/10" />
          <h2 className="relative mx-auto max-w-3xl text-[clamp(2.2rem,5vw,4.5rem)] leading-[1] font-black tracking-[-0.06em] text-white">
            {copy.home.finalTitle}
          </h2>
          <p className="relative mx-auto mt-5 max-w-2xl text-base leading-7 text-white/80">
            {copy.home.finalDescription}
          </p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={`/${locale}/courses`}
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-white px-6 font-bold text-[#102A43]"
            >
              {copy.common.coursesCta}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/30 px-6 font-bold text-white hover:bg-white/10"
            >
              {copy.common.contactCta}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
