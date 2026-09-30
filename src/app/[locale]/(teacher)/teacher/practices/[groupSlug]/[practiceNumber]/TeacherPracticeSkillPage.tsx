import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import type { Locale } from "@/config/Locales";
import { getTeacherPracticesCopy } from "@/dictionaries/teacher/TeacherPractices";
import type { TeacherPracticeSkillKind } from "@/types/teacher/TeacherPractice";

type TeacherPracticeSkillPageProps = {
  locale: Locale;
  practiceHref: string;
  practiceNumber: number;
  skill: TeacherPracticeSkillKind;
};

export function TeacherPracticeSkillPage({
  locale,
  practiceHref,
  practiceNumber,
  skill,
}: TeacherPracticeSkillPageProps) {
  const copy = getTeacherPracticesCopy(locale);
  const skillName = copy.skillNames[skill];
  const actions = (
    <div aria-label={copy.skillActions} className="teacherPractices__actions" role="group">
      <button aria-label={copy.previewSkill} data-action="preview" type="button">
        <VisibilityOutlined aria-hidden="true" />
      </button>
      <button aria-label={copy.deleteSkill} data-action="delete" type="button">
        <DeleteOutlineRounded aria-hidden="true" />
      </button>
      <button aria-label={copy.saveSkill} data-action="save" type="button">
        <SaveOutlined aria-hidden="true" />
      </button>
    </div>
  );

  return (
    <main className="teacherPractices__detail">
      <header className="teacherPractices__header">
        <ScrollToTopLink
          aria-label={copy.backToPractice}
          className="teacherGroups__backLink"
          href={practiceHref}
        >
          <ArrowBackRounded aria-hidden="true" />
        </ScrollToTopLink>

        <div className="teacherPractices__heading">
          <span>{skillName}</span>
          <h1>
            {copy.practiceTitle} {practiceNumber}
          </h1>
        </div>

        {skill === "listening" ? null : actions}
      </header>

      {skill === "listening" ? (
        <div className="teacherPractices__detailToolbar">
          <Tabs
            aria-label={`${skillName} parts`}
            className="teacherGroups__categoryTabs teacherGroups__workspaceNav teacherPractices__partTabs"
            component="nav"
            scrollButtons={false}
            value="part-1"
            variant="scrollable"
          >
            {[1, 2, 3, 4].map((part) => (
              <Tab
                className="teacherGroups__categoryTab"
                key={part}
                label={<span className="teacherGroups__categoryName">Part {part}</span>}
                value={`part-${String(part)}`}
              />
            ))}
          </Tabs>
          {actions}
        </div>
      ) : null}
    </main>
  );
}
