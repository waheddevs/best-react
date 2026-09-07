import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/exams.module.css";
import { ExamRegistrationCatalog } from "@/features/exams/ExamRegistrationCatalog";
import type { ExamPreviewCopy, MockExamDate, PublicExamOption } from "@/types/ExamPreview";

type ExamOptionsProps = {
  copy: ExamPreviewCopy;
  locale: Locale;
  dates: MockExamDate[];
  options: PublicExamOption[];
};

export function ExamOptions({ copy, locale, dates, options }: ExamOptionsProps) {
  return (
    <Section className={styles.exams__options} id="exam-options" tone="background">
      <Reveal>
        <SectionHeading
          align="center"
          description={copy.catalogDescription}
          eyebrow={copy.catalogEyebrow}
          title={copy.catalogTitle}
        />
      </Reveal>
      <Reveal delay={0.08}>
        <ExamRegistrationCatalog copy={copy} dates={dates} locale={locale} options={options} />
      </Reveal>
    </Section>
  );
}
