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
        <Reveal className="home-sections">
          <SectionHeading
            eyebrow={copy.home.coursesEyebrow}
            title={copy.home.coursesTitle}
            description={copy.home.coursesDescription}
          />
          <ButtonLink href={`/website/courses`} variant="secondary">
            {copy.common.coursesCta}
          </ButtonLink>
        </Reveal>
        <StaggerGroup className="home-sections__2">
          {courses.map((course) => (
            <StaggerItem key={course.slug} className="home-sections__3">
              <CourseCard course={course} locale={locale} copy={copy} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section className="home-sections__4">
        <SectionHeading eyebrow={copy.home.whyEyebrow} title={copy.home.whyTitle} />
        <div className="home-sections__5">
          {copy.home.whyItems.map((item, index) => {
            const Icon = whyIcons[index];
            return (
              <article
                key={item.title}
                className={`why-card ${index === 0 ? "why-card--featured" : ""}`}
              >
                <span className={`why-card__icon ${index === 0 ? "why-card__icon--featured" : ""}`}>
                  <Icon aria-hidden="true" />
                </span>
                <h3 className={`why-card__title ${index === 0 ? "why-card__title--featured" : ""}`}>
                  {item.title}
                </h3>
                <p
                  className={`why-card__description ${index === 0 ? "why-card__description--featured" : ""}`}
                >
                  {item.description}
                </p>
                {index === 0 ? <div className="home-sections__6" /> : null}
              </article>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow={copy.home.processEyebrow} title={copy.home.processTitle} />
        <ol className="home-sections__7">
          {copy.home.processItems.map((item, index) => (
            <li key={item.title} className="home-sections__8">
              <span className="home-sections__9">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="home-sections__10">{item.title}</h3>
              <p className="home-sections__11">{item.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="home-sections__12">
        <div className="home-sections__13">
          <div>
            <SectionHeading
              eyebrow={copy.home.resultsEyebrow}
              title={copy.home.resultsTitle}
              description={copy.home.resultsDescription}
            />
            <div className="home-sections__14">
              <ButtonLink href={`/website/results`} variant="secondary">
                {copy.common.learnMore}
              </ButtonLink>
            </div>
          </div>
          <div className="home-sections__15">
            <div className="home-sections__16">
              {[copy.results.journeySteps[0], copy.results.journeySteps[1]].map((item, index) => (
                <div
                  key={item.title}
                  className={`result-preview-card ${index === 0 ? "result-preview-card--featured" : ""}`}
                >
                  <CheckCircleRounded
                    aria-hidden="true"
                    className={`result-preview-card__icon ${index === 0 ? "result-preview-card__icon--featured" : ""}`}
                  />
                  <h3
                    className={`result-preview-card__title ${index === 0 ? "result-preview-card__title--featured" : ""}`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`result-preview-card__description ${index === 0 ? "result-preview-card__description--featured" : ""}`}
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
        <div className="home-sections__17">
          <SectionHeading eyebrow={copy.home.eventsEyebrow} title={copy.home.eventsTitle} />
          <ButtonLink href={`/website/events`} variant="secondary">
            {copy.common.learnMore}
          </ButtonLink>
        </div>
        <div className="home-sections__18">
          {events.map((event) => (
            <EventCard key={event.slug} event={event} locale={locale} copy={copy} />
          ))}
        </div>
      </Section>

      <Section className="home-sections__19">
        <div className="home-sections__20">
          <SectionHeading eyebrow={copy.home.libraryEyebrow} title={copy.home.libraryTitle} />
          <ButtonLink href={`/website/library`} variant="secondary">
            {copy.common.learnMore}
          </ButtonLink>
        </div>
        <div className="home-sections__21">
          {libraryResources.map((resource) => (
            <ResourceCard key={resource.slug} resource={resource} locale={locale} copy={copy} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow={copy.home.faqEyebrow} title={copy.home.faqTitle} />
        <div className="home-sections__22">
          {faqItems.slice(0, 3).map((item) => (
            <article key={item.id} className="home-sections__23">
              <h3 className="home-sections__24">{item.question[locale]}</h3>
              <p className="home-sections__25">{item.answer[locale]}</p>
            </article>
          ))}
        </div>
        <Link href={`/website/faq`} className="home-sections__26">
          {copy.common.learnMore}
          <ArrowForwardRounded aria-hidden="true" />
        </Link>
      </Section>

      <Section className="home-sections__27">
        <div className="home-sections__28">
          <div className="home-sections__29" />
          <h2 className="home-sections__30">{copy.home.finalTitle}</h2>
          <p className="home-sections__31">{copy.home.finalDescription}</p>
          <div className="home-sections__32">
            <Link href={`/website/courses`} className="home-sections__33">
              {copy.common.coursesCta}
            </Link>
            <Link href={`/website/contact`} className="home-sections__34">
              {copy.common.contactCta}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
