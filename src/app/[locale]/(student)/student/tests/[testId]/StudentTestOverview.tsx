import EditNoteRounded from "@mui/icons-material/EditNoteRounded";
import HeadphonesRounded from "@mui/icons-material/HeadphonesRounded";
import InfoRounded from "@mui/icons-material/InfoRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";
import MicRounded from "@mui/icons-material/MicRounded";

import type { Locale } from "@/config/Locales";
import { getStudentSkillCardDetails } from "@/dictionaries/student/StudentTests";
import { StudentTestSkillAction } from "@/features/student/tests/StudentTestSkillAction";
import { StudentSectionHero } from "@/features/student/workspace/StudentSectionHero";
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
  const skillDetails = getStudentSkillCardDetails(locale);
  const numberMatch =
    /(?:test|practice)-(\d+)(?:-|$)/i.exec(paper.slug) ??
    /\b(?:test|practice)\s*#?\s*(\d+)\b/i.exec(paper.title);
  const practiceTitle = locale === "en" ? "Practice Test" : copy.practiceTestLabel;
  const skills = [...paper.skills].sort(
    (left, right) => skillOrder.indexOf(left.skill) - skillOrder.indexOf(right.skill),
  );

  return (
    <article className="studentTests studentTests_overview">
      <StudentSectionHero
        description={copy.subtitle}
        eyebrow={copy.title}
        eyebrowHref={`/${locale}/student/tests`}
        kind="tests"
        label={copy.yearLabel}
        locale={locale}
        title={numberMatch ? `${practiceTitle} ${numberMatch[1]}` : practiceTitle}
        value={paper.academicYear}
      />

      <section aria-label={copy.allSkillsLabel} className="studentTests__skills">
        {skills.map((skill, index) => {
          const Icon = skillIcons[skill.skill];
          return (
            <article
              className="studentTests__skill"
              data-skill={skill.skill.toLowerCase()}
              key={skill.testId}
            >
              <span aria-hidden="true" className="studentTests__skillWatermark">
                <Icon />
              </span>
              <div className="studentTests__skillTop">
                <span className="studentTests__skillIcon">
                  <Icon aria-hidden="true" />
                </span>
                <span className="studentTests__skillNumber">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="studentTests__skillCopy">
                <h2>{skill.skill[0] + skill.skill.slice(1).toLowerCase()}</h2>
              </div>
              <dl className="studentTests__skillDetails">
                {skillDetails[skill.skill].map((detail) => (
                  <div key={detail.label}>
                    <dt>{detail.label}</dt>
                    <dd>{detail.value}</dd>
                  </div>
                ))}
              </dl>
              <StudentTestSkillAction
                copy={copy}
                locale={locale}
                paperId={paper.id}
                skill={skill}
              />
            </article>
          );
        })}
      </section>

      <section aria-labelledby="test-instructions-title" className="studentTests__instructions">
        <span aria-hidden="true" className="studentTests__instructionsIcon">
          <InfoRounded />
        </span>
        <div className="studentTests__instructionsCopy">
          <h2 id="test-instructions-title">{copy.instructionsTitle}</h2>
          <p>{copy.instructionsText}</p>
        </div>
      </section>
    </article>
  );
}
