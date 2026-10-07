import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import EditNoteRounded from "@mui/icons-material/EditNoteRounded";
import HeadphonesRounded from "@mui/icons-material/HeadphonesRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";
import MicRounded from "@mui/icons-material/MicRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import type { TestSkill } from "@/gql/graphql";
import type { StudentTestPaper, StudentTestsCopy } from "@/types/student/StudentTests";

type StudentTestCardProps = {
  copy: StudentTestsCopy;
  locale: Locale;
  number: number;
  paper: StudentTestPaper;
};

const skillIcons = {
  LISTENING: HeadphonesRounded,
  READING: MenuBookRounded,
  WRITING: EditNoteRounded,
  SPEAKING: MicRounded,
} satisfies Record<TestSkill, typeof HeadphonesRounded>;

export function StudentTestCard({ copy, locale, number, paper }: StudentTestCardProps) {
  return (
    <Link className="studentTests__paper" href={`/${locale}/student/tests/${paper.id}`}>
      <div className="studentTests__paperHeader">
        <span
          aria-label={`${copy.practiceTestLabel} ${number}`}
          className="studentTests__paperNumber"
        >
          {number}
        </span>
        <div>
          <h2>{copy.practiceTestLabel}</h2>
        </div>
      </div>

      <div className="studentTests__paperDivider" />

      <div className="studentTests__paperDetails">
        <div className="studentTests__paperFacts">
          <span>{copy.allSkillsLabel}</span>
          <span className="studentTests__paperYear">
            {copy.yearLabel} {paper.academicYear}
          </span>
        </div>
        <ul className="studentTests__paperSkills">
          {paper.skills.map(({ skill }) => {
            const Icon = skillIcons[skill];
            return (
              <li key={skill}>
                <Icon aria-hidden="true" />
                <div>
                  <span className="studentTests__paperSkillTitle">
                    {skill.charAt(0) + skill.slice(1).toLowerCase()}
                  </span>
                  <span className="studentTests__paperSkillSubtitle">
                    {copy.skillSubtitles[skill][0]}
                    <br />
                    {copy.skillSubtitles[skill][1]}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <span className="studentTests__paperApply">
        {copy.applyLabel}
        <ArrowForwardRounded aria-hidden="true" />
      </span>
    </Link>
  );
}
