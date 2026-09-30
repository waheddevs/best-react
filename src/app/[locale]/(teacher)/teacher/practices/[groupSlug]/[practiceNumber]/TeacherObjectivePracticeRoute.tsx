import { notFound } from "next/navigation";

import { teacherPracticePreviewItems } from "@/data/teacher/TeacherPracticePreview";
import { getTeacherObjectivePracticePreview } from "@/data/teacher/TeacherObjectivePracticePreview";
import {
  loadConnectedTeacherObjectivePractice,
  loadConnectedTeacherPractice,
} from "@/lib/teacher/TeacherGroupData";
import type { TeacherObjectivePracticeSkill } from "@/types/teacher/TeacherObjectivePractice";

import { getGroupWorkspaceContext } from "../../../groups/[slug]/GroupWorkspaceRoute";
import { TeacherObjectivePreview } from "./TeacherObjectivePreview";

type TeacherObjectivePracticeRouteProps = {
  groupSlug: string;
  localeParam: string;
  practiceNumber: number;
  skill: TeacherObjectivePracticeSkill;
};

export async function TeacherObjectivePracticeRoute({
  groupSlug,
  localeParam,
  practiceNumber,
  skill,
}: TeacherObjectivePracticeRouteProps) {
  const { connected, group, locale } = await getGroupWorkspaceContext(
    Promise.resolve({ locale: localeParam, slug: groupSlug }),
  );
  const connectedPractice = connected
    ? await loadConnectedTeacherPractice(locale, group.id, practiceNumber)
    : null;
  const previewPractice = connected
    ? null
    : teacherPracticePreviewItems.find((item) => item.practiceNumber === practiceNumber);
  if (connected ? connectedPractice === null : previewPractice === undefined) notFound();

  const skillName = skill.toUpperCase() as "LISTENING" | "READING";
  const objectiveSkill = connectedPractice?.skills.find(
    (item) => item.skill === skillName && item.status === "PUBLISHED",
  );
  const connectedContent =
    connected && objectiveSkill
      ? await loadConnectedTeacherObjectivePractice(locale, objectiveSkill.testVersionId)
      : null;
  if (connected && connectedContent === null) notFound();

  return (
    <TeacherObjectivePreview
      content={connectedContent ?? getTeacherObjectivePracticePreview(skill)}
      locale={locale}
      practiceNumber={practiceNumber}
      returnHref={`/${locale}/teacher/practices/${groupSlug}/${String(practiceNumber)}`}
      skill={skill}
    />
  );
}
