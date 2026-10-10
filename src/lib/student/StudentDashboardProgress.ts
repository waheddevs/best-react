import type { StudentResultsQuery, TestSkill } from "@/gql/graphql";
import type { StudentTestPaper } from "@/types/student/StudentTests";
import { buildStudentResultRows, studentResultSkills } from "./StudentResultsTable";
import {
  getStudentProgressResultPaper,
  selectLatestStudentProgressPaper,
} from "./StudentProgressView";

type Result = StudentResultsQuery["studentResults"]["edges"][number]["node"];
export type StudentDashboardActivity = { attemptId: string; timestamp: string };

export function buildStudentDashboardProgress(
  papers: readonly StudentTestPaper[],
  results: readonly Result[],
  activity: readonly StudentDashboardActivity[],
) {
  const selected = selectLatestStudentProgressPaper(
    papers,
    results,
    activity.map(({ attemptId, timestamp }) => ({ attemptId, submittedAt: timestamp })),
  );
  if (!selected) return [];
  const history = [...results].sort(
    (a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt),
  );
  return buildStudentResultRows(
    papers.map((paper) =>
      paper.id === selected.id ? getStudentProgressResultPaper(paper, results) : paper,
    ),
    results,
  )
    .filter((row) => row.paperId === selected.id)
    .map((row) => {
      const timestamps = [
        ...Object.values(row.cells).flatMap((cell) =>
          cell.result ? [Date.parse(cell.result.submittedAt)] : [],
        ),
      ];
      const changes: Partial<Record<TestSkill, { value: number; kind: "answers" | "band" }>> = {};
      for (const skill of studentResultSkills) {
        const current = row.cells[skill].result;
        if (!current) continue;
        const objective = skill === "LISTENING" || skill === "READING";
        const previous = history.find(
          (item) =>
            item.skill === skill &&
            item.testId !== current.testId &&
            Date.parse(item.submittedAt) < Date.parse(current.submittedAt) &&
            (objective
              ? item.totalQuestionCount === current.totalQuestionCount
              : item.practiceBand !== null),
        );
        if (!previous || (!objective && current.practiceBand === null)) continue;
        changes[skill] = {
          value: objective
            ? current.correctAnswerCount - previous.correctAnswerCount
            : Math.round((current.practiceBand! - previous.practiceBand!) * 10) / 10,
          kind: objective ? "answers" : "band",
        };
      }
      return { ...row, changes, activityAt: Math.max(0, ...timestamps.filter(Number.isFinite)) };
    });
}

export type StudentDashboardProgressRow = ReturnType<typeof buildStudentDashboardProgress>[number];
