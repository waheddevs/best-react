import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import InfoRounded from "@mui/icons-material/InfoRounded";
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

type ExamsPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: ExamsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getPageCopy(locale);
  return createPageMetadata(locale, copy.exams.title, copy.exams.description, "/exams");
}

export default async function ExamsPage({ params }: ExamsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getPageCopy(locale);
  const dictionary = getDictionary(locale);
  return (
    <main>
      <PageHero
        eyebrow={dictionary.navigation.exams}
        title={copy.exams.title}
        description={copy.exams.description}
      />
      <Section>
        <div className="flex gap-3 rounded-3xl border border-coral/30 bg-[color-mix(in_srgb,var(--coral)_8%,var(--surface))] p-5">
          <InfoRounded aria-hidden="true" className="shrink-0 text-coral" />
          <p className="leading-7 text-text">{copy.exams.notice}</p>
        </div>
        <div className="mt-12">
          <SectionHeading title={copy.exams.directionsTitle} />
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {copy.exams.directions.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-border bg-surface p-6"
            >
              <h2 className="text-xl font-black text-heading">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section className="bg-surface">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title={copy.exams.rulesTitle} />
            <ul className="mt-8 space-y-4">
              {copy.exams.rules.map((rule) => (
                <li key={rule} className="flex gap-3 leading-7 text-muted">
                  <CheckCircleOutlineRounded
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-brand"
                  />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.75rem] border border-border bg-background p-7">
            <h2 className="text-2xl font-black text-heading">{copy.exams.scheduleTitle}</h2>
            <p className="mt-4 leading-7 text-muted">{copy.exams.scheduleBody}</p>
            <div className="mt-7">
              <ButtonLink href={`/${locale}/contact`} variant="secondary">
                {copy.common.contactCta}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <SectionHeading title={copy.exams.preparationTitle} />
        <ol className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {copy.exams.preparation.map((item, index) => (
            <li key={item.title} className="rounded-[1.75rem] border border-border bg-surface p-6">
              <span className="grid size-11 place-items-center rounded-full bg-(image:--gradient-cta) text-sm font-black text-white">
                {index + 1}
              </span>
              <h2 className="mt-7 text-lg font-black text-heading">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
            </li>
          ))}
        </ol>
      </Section>
    </main>
  );
}
