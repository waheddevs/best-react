import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import { ExamRegistrationCatalog } from "@/features/exams/ExamRegistrationCatalog";
import type { ExamPreviewCopy } from "@/types/ExamPreview";

type ExamOptionsProps = {
  copy: ExamPreviewCopy;
  locale: Locale;
};

export function ExamOptions({ copy, locale }: ExamOptionsProps) {
  return (
    <Section tone="background">
      <Reveal>
        <SectionHeading
          align="center"
          description={copy.catalogDescription}
          eyebrow={copy.catalogEyebrow}
          title={copy.catalogTitle}
        />
      </Reveal>
      <Reveal delay={0.08}>
        <ExamRegistrationCatalog copy={copy} locale={locale} />
      </Reveal>
    </Section>
  );
}
