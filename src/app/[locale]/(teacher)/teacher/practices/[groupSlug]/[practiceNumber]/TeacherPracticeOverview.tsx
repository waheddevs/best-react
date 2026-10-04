import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import EditNoteRounded from "@mui/icons-material/EditNoteRounded";
import HeadphonesRounded from "@mui/icons-material/HeadphonesRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";
import MicRounded from "@mui/icons-material/MicRounded";
import QueryStatsRounded from "@mui/icons-material/QueryStatsRounded";
import Link from "next/link";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import type { Locale } from "@/config/Locales";
import { getTeacherPracticesCopy } from "@/dictionaries/teacher/TeacherPractices";
import { getTeacherResultsCopy } from "@/dictionaries/teacher/TeacherResults";
import type {
  TeacherPracticeSkillKind,
  TeacherPracticeSkillSummary,
} from "@/types/teacher/TeacherPractice";

type TeacherPracticeOverviewProps = {
  locale: Locale;
  practiceNumber: number;
  practicesHref: string;
  resultsHref: string | null;
  skillHrefs: Record<TeacherPracticeSkillKind, string>;
  skills: TeacherPracticeSkillSummary[];
};

const skillIcons: Record<TeacherPracticeSkillKind, typeof HeadphonesRounded> = {
  listening: HeadphonesRounded,
  reading: MenuBookRounded,
  writing: EditNoteRounded,
  speaking: MicRounded,
};

export function TeacherPracticeOverview({
  locale,
  practiceNumber,
  practicesHref,
  resultsHref,
  skillHrefs,
  skills,
}: TeacherPracticeOverviewProps) {
  const copy = getTeacherPracticesCopy(locale);

  return (
    <main className="teacherPractices__detail teacherPractices__detail--overview">
      <header className="teacherPractices__header">
        <ScrollToTopLink
          aria-label={copy.backToPractices}
          className="teacherGroups__backLink"
          href={practicesHref}
        >
          <ArrowBackRounded aria-hidden="true" />
        </ScrollToTopLink>

        <div className="teacherPractices__heading">
          <span>{copy.eyebrow}</span>
          <h1>
            {copy.practiceTitle} {practiceNumber}
          </h1>
        </div>
        {resultsHref ? (
          <Link className="teacherPractices__resultsLink" href={resultsHref}>
            <QueryStatsRounded aria-hidden="true" />
            {getTeacherResultsCopy(locale).title}
          </Link>
        ) : null}
      </header>

      <section className="teacherPractices__skillGrid" aria-label={copy.practiceTitle}>
        {skills.map((skill, index) => {
          const SkillIcon = skillIcons[skill.kind];
          const details = copy.skillDetails[skill.kind];
          const skillHref = skillHrefs[skill.kind];
          return (
            <article
              className="teacherPractices__skillCard"
              data-interactive="true"
              data-skill={skill.kind}
              data-status={skill.status}
              key={skill.kind}
            >
              <Link
                aria-label={copy.skillNames[skill.kind]}
                className="teacherPractices__skillCardLink"
                href={skillHref}
              />
              <span aria-hidden="true" className="teacherPractices__skillWatermark">
                <SkillIcon />
              </span>

              <div className="teacherPractices__skillTopline">
                <span className="teacherPractices__skillIcon">
                  <SkillIcon aria-hidden="true" />
                </span>
                <span className="teacherPractices__skillIndex">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="teacherPractices__skillCopy">
                <h2>{copy.skillNames[skill.kind]}</h2>
              </div>

              <dl className="teacherPractices__skillDetails">
                {details.map((detail) => (
                  <div key={detail.label}>
                    <dt>{detail.label}</dt>
                    <dd>{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          );
        })}
      </section>
    </main>
  );
}
