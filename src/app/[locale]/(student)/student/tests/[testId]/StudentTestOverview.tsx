import EditNoteRounded from "@mui/icons-material/EditNoteRounded";
import HeadphonesRounded from "@mui/icons-material/HeadphonesRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";
import MicRounded from "@mui/icons-material/MicRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import { StudentTestSkillAction } from "@/features/student/tests/StudentTestSkillAction";
import type { TestSkill } from "@/gql/graphql";
import type { StudentTestPaper, StudentTestsCopy } from "@/types/student/StudentTests";

type StudentTestOverviewProps = {
  copy: StudentTestsCopy;
  locale: Locale;
  paper: StudentTestPaper;
};

const skillOrder: TestSkill[] = ["LISTENING", "READING", "WRITING", "SPEAKING"];

const skillIcons = {
  LISTENING: HeadphonesRounded,
  READING: MenuBookRounded,
  WRITING: EditNoteRounded,
  SPEAKING: MicRounded,
} satisfies Record<TestSkill, typeof HeadphonesRounded>;

export function StudentTestOverview({ copy, locale, paper }: StudentTestOverviewProps) {
  const skills = [...paper.skills].sort(
    (left, right) => skillOrder.indexOf(left.skill) - skillOrder.indexOf(right.skill),
  );

  return (
    <article className="studentTests studentTests_overview">
      <header className="studentTests__overviewHeader">
        <div>
          <Link href={`/${locale}/student/tests`}>{copy.title}</Link>
          <span>{paper.academicYear}</span>
        </div>
        <h1>{paper.title}</h1>
        <p>
          <strong>{copy.sourceLabel}:</strong> {paper.sourceLabel}
        </p>
      </header>

      <section aria-label={copy.allSkillsLabel} className="studentTests__skills">
        {skills.map((skill, index) => {
          const Icon = skillIcons[skill.skill];
          return (
            <section className="studentTests__skill" key={skill.testId}>
              <div className="studentTests__skillIcon">
                <Icon aria-hidden="true" />
                <span>0{index + 1}</span>
              </div>
              <div className="studentTests__skillCopy">
                <span>{skill.skill}</span>
                <h2>{skill.title}</h2>
                {skill.description ? <p>{skill.description}</p> : null}
                <div>
                  <span>
                    {skill.questionCount} {copy.questionsLabel}
                  </span>
                  {skill.durationMinutes ? (
                    <span>
                      {skill.durationMinutes} {copy.minutesLabel}
                    </span>
                  ) : null}
                </div>
              </div>
              <StudentTestSkillAction copy={copy} locale={locale} paperId={paper.id} skill={skill} />
            </section>
          );
        })}
      </section>
    </article>
  );
}
