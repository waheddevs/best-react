import type { Locale } from "@/config/Locales";
import { getStudentTestsCopy } from "@/dictionaries/student/StudentTests";
import { StudentSectionHero } from "@/features/student/workspace/StudentSectionHero";

type StudentResultHeaderProps = {
  locale: Locale;
  backHref: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  score: string;
  scoreLabel: string;
  note?: string;
};

export function StudentResultHeader({
  locale,
  backHref,
  backLabel,
  eyebrow,
  title,
  score,
  scoreLabel,
  note,
}: StudentResultHeaderProps) {
  const { practiceTestLabel } = getStudentTestsCopy(locale);
  const displayTitle = title.replace(
    /^(?:BEST\s+LC\s+)?(?:Academic\s+Test|Practice\s+test)\s*#?\s*(\d+)(?=\s|$)/i,
    (_, number: string) => `${practiceTestLabel} ${number}`,
  );

  return (
    <StudentSectionHero
      description={note ?? scoreLabel}
      eyebrow={eyebrow}
      eyebrowHref={backHref}
      eyebrowLinkLabel={`${eyebrow}: ${backLabel}`}
      kind="tests"
      label={scoreLabel}
      locale={locale}
      title={displayTitle}
      value={score}
    />
  );
}
