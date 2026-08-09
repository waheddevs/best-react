import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import FactCheckRounded from "@mui/icons-material/FactCheckRounded";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { isLocale } from "@/config/locales";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

type ResultsPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: ResultsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getPageCopy(locale);
  return createPageMetadata(locale, copy.results.title, copy.results.description, "/results");
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getPageCopy(locale);
  const dictionary = getDictionary(locale);

  return (
    <main>
      <PageHero
        eyebrow={dictionary.navigation.results}
        title={copy.results.title}
        description={copy.results.description}
      />
      <Section>
        <div className="grid items-center gap-8 rounded-4xl border border-border bg-surface p-7 sm:p-10 lg:grid-cols-[auto_1fr]">
          <span className="grid size-16 place-items-center rounded-2xl bg-sun text-heading">
            <FactCheckRounded aria-hidden="true" sx={{ fontSize: 32 }} />
          </span>
          <div>
            <h2 className="text-2xl font-black tracking-[-0.04em] text-heading">
              {copy.results.noticeTitle}
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-muted">{copy.results.noticeBody}</p>
          </div>
        </div>
      </Section>
      <Section className="bg-surface">
        <SectionHeading title={copy.results.journeyTitle} />
        <ol className="mt-10 grid gap-5 lg:grid-cols-3">
          {copy.results.journeySteps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-[1.75rem] border border-border bg-background p-6"
            >
              <span className="grid size-11 place-items-center rounded-full bg-(image:--gradient-cta) text-sm font-black text-white">
                {index + 1}
              </span>
              <h2 className="mt-8 text-xl font-black text-heading">{step.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section>
        <SectionHeading title={copy.results.categoriesTitle} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {copy.results.categories.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-border bg-surface p-6"
            >
              <CheckCircleRounded aria-hidden="true" className="text-brand" />
              <h2 className="mt-7 text-xl font-black text-heading">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-4xl bg-(image:--gradient-cta) p-8 text-center sm:p-12">
          <h2 className="text-3xl font-black tracking-[-0.04em] text-white">
            {copy.results.ctaTitle}
          </h2>
          <div className="mt-6 flex justify-center">
            <ButtonLink href={`/${locale}/courses`} variant="secondary">
              {copy.common.coursesCta}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </main>
  );
}
