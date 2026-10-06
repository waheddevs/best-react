import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import type { Locale } from "@/config/Locales";
import { getTeacherResultsCopy } from "@/dictionaries/teacher/TeacherResults";

type ResultSkill = "LISTENING" | "READING" | "WRITING" | "SPEAKING";

type TeacherResultDetailHeaderProps = {
  description?: string;
  locale: Locale;
  skill: ResultSkill;
  studentName: string;
  summary: string;
  title: string;
};

export function TeacherResultDetailHeader({
  description,
  locale,
  skill,
  studentName,
  summary,
  title,
}: TeacherResultDetailHeaderProps) {
  const copy = getTeacherResultsCopy(locale);

  return (
    <header className="teacherResultDetail__header">
      <ScrollToTopLink
        aria-label={copy.back}
        className="teacherGroups__backLink"
        href={`/${locale}/teacher/results`}
      >
        <ArrowBackRounded aria-hidden="true" />
      </ScrollToTopLink>
      <div className="teacherResultDetail__heading">
        <div>
          <p className="teacherResultDetail__eyebrow">{copy.skills[skill]}</p>
          <h1>{title}</h1>
          <p className="teacherResultDetail__student">{studentName}</p>
          {description ? <p className="teacherResultDetail__description">{description}</p> : null}
        </div>
        <strong className="teacherResultDetail__summary">{summary}</strong>
      </div>
    </header>
  );
}
