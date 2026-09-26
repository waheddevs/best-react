import EditNoteRounded from "@mui/icons-material/EditNoteRounded";
import HeadphonesRounded from "@mui/icons-material/HeadphonesRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";
import MicRounded from "@mui/icons-material/MicRounded";

import type { Locale } from "@/config/Locales";
import { getTeacherAcademicTestsCopy } from "@/dictionaries/teacher/TeacherAcademicTests";
import type { TeacherGroupTestPapersQuery, TestSkill } from "@/gql/graphql";
import type { TeacherCopy } from "@/types/teacher/Teacher";

import { GroupWorkspaceCreateAction } from "../GroupWorkspaceCreateAction";
import { GroupWorkspaceSectionHeader } from "../GroupWorkspaceSectionHeader";

type ConnectedGroupTestsProps = {
  copy: TeacherCopy;
  locale: Locale;
  papers: TeacherGroupTestPapersQuery["teacherTestPapers"];
};

const skillOrder: TestSkill[] = ["LISTENING", "READING", "WRITING", "SPEAKING"];
const skillIcons = {
  LISTENING: HeadphonesRounded,
  READING: MenuBookRounded,
  WRITING: EditNoteRounded,
  SPEAKING: MicRounded,
} satisfies Record<TestSkill, typeof HeadphonesRounded>;

export function ConnectedGroupTests({ copy, locale, papers }: ConnectedGroupTestsProps) {
  const labels = getTeacherAcademicTestsCopy(locale);

  return (
    <section aria-labelledby="group-tests-title" className="teacherGroups__workspaceSection">
      <GroupWorkspaceSectionHeader
        action={<GroupWorkspaceCreateAction copy={copy} kind="test" />}
        description={copy.groupWorkspace.testsDescription}
        id="group-tests-title"
        title={copy.groupWorkspace.testsTitle}
      />

      <div className="teacherGroups__academicPapers">
        {papers.map((paper) => (
          <article className="teacherGroups__academicPaper" key={paper.id}>
            <header className="teacherGroups__academicPaperHeader">
              <div>
                <span>
                  {labels.year}: {paper.academicYear}
                </span>
                <h2>{paper.title}</h2>
                <p>
                  <strong>{labels.source}:</strong> {paper.sourceLabel}
                </p>
              </div>
              <span className="teacherGroups__statusPill" data-status="completed">
                {labels.published}
              </span>
            </header>

            <div className="teacherGroups__academicSkills">
              {[...paper.skills]
                .sort(
                  (left, right) =>
                    skillOrder.indexOf(left.skill) - skillOrder.indexOf(right.skill),
                )
                .map((skill) => {
                  const Icon = skillIcons[skill.skill];
                  return (
                    <section className="teacherGroups__academicSkill" key={skill.testId}>
                      <span className="teacherGroups__academicSkillIcon">
                        <Icon aria-hidden="true" />
                      </span>
                      <div>
                        <span>{skill.skill}</span>
                        <h3>{skill.title}</h3>
                        {skill.description ? <p>{skill.description}</p> : null}
                        <small>
                          {skill.questionCount} {labels.questions}
                          {skill.durationMinutes
                            ? ` · ${skill.durationMinutes} ${labels.minutes}`
                            : ""}
                        </small>
                      </div>
                      <span
                        className="teacherGroups__statusPill"
                        data-status={skill.status === "PUBLISHED" ? "completed" : "draft"}
                      >
                        {skill.status === "PUBLISHED" ? labels.published : labels.draft}
                      </span>
                    </section>
                  );
                })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
