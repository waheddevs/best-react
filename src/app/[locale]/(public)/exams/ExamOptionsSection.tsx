import type { Locale } from "@/config/Locales";
import type { ExamPreviewCopy } from "@/types/ExamPreview";
import { getPublicExamData } from "@/lib/PublicContentApi";

import { ExamOptions } from "./ExamOptions";

type ExamOptionsSectionProps = { locale: Locale; copy: ExamPreviewCopy };

export async function ExamOptionsSection({ locale, copy }: ExamOptionsSectionProps) {
  /* APOLLO REQUESTS */
  const examData = await getPublicExamData(locale);
  return (
    <ExamOptions copy={copy} dates={examData.dates} locale={locale} options={examData.options} />
  );
}
