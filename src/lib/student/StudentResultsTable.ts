import type { StudentResultsQuery, TestSkill } from "@/gql/graphql";
import type { StudentTestPaper, StudentTestSkill } from "@/types/student/StudentTests";

type Result = StudentResultsQuery["studentResults"]["edges"][number]["node"];

export const studentResultSkills = ["LISTENING", "READING", "WRITING", "SPEAKING"] as const;

export type StudentResultCell = {
  status: "empty" | "inProgress" | "pending" | "ready";
  result: Result | null;
};

export type StudentResultRow = {
  id: string;
  paperId: string | null;
  title: string;
  practiceNumber: number | null;
  cells: Record<TestSkill, StudentResultCell>;
};

export function buildStudentResultRows(
  papers: readonly StudentTestPaper[],
  results: readonly Result[],
): StudentResultRow[] {
  const latestByTest = new Map<string, Result>();
  const byAttempt = new Map(results.map((result) => [result.attemptId, result]));
  for (const result of [...results].sort(
    (a, b) =>
      Date.parse(b.submittedAt) - Date.parse(a.submittedAt) ||
      b.attemptNumber - a.attemptNumber ||
      b.attemptId.localeCompare(a.attemptId),
  )) {
    if (!latestByTest.has(result.testId)) latestByTest.set(result.testId, result);
  }

  const mappedTests = new Set<string>();
  // Keep numbering consistent with the Tests catalog, including unnumbered papers.
  const paperNumbers = new Map(
    papers
      .map((paper, index) => ({ paper, index, number: practiceNumber(paper.title, paper.slug) }))
      .sort((a, b) => (a.number ?? Infinity) - (b.number ?? Infinity) || a.index - b.index)
      .map(({ paper, number }, index) => [paper.id, number ?? index + 1]),
  );
  const rows: StudentResultRow[] = [];
  for (const paper of papers) {
    const cells = emptyCells();
    for (const skill of paper.skills) {
      mappedTests.add(skill.testId);
      // Match the selected attempt, never display an older score for a new retake.
      const result = skill.attemptId
        ? byAttempt.get(skill.attemptId)
        : latestByTest.get(skill.testId);
      cells[skill.skill] = resultCell(
        skill,
        result?.testId === skill.testId && result.skill === skill.skill ? result : undefined,
      );
    }
    if (Object.values(cells).some((cell) => cell.status !== "empty")) {
      rows.push({
        id: paper.id,
        paperId: paper.id,
        title: paper.title,
        practiceNumber: paperNumbers.get(paper.id) ?? null,
        cells,
      });
    }
  }

  // Keep released history for tests no longer available in the catalog.
  // Without a paper ID, never guess grouping from a test title.
  for (const result of latestByTest.values()) {
    if (mappedTests.has(result.testId)) continue;
    const cells = emptyCells();
    if (result.skill) cells[result.skill] = { status: "ready", result };
    rows.push({
      id: `test:${result.testId}`,
      paperId: null,
      title: result.title,
      practiceNumber: practiceNumber(result.title),
      cells,
    });
  }
  return rows;
}

function practiceNumber(title: string, slug = ""): number | null {
  const match =
    /(?:test|practice)-(\d+)(?:-|$)/i.exec(slug) ??
    /\b(?:test|practice)\s*#?\s*(\d+)\b/i.exec(title);
  const number = match ? Number(match[1]) : null;
  return number !== null && Number.isSafeInteger(number) && number > 0 ? number : null;
}

function resultCell(skill: StudentTestSkill, result: Result | undefined): StudentResultCell {
  if (skill.attemptStatus === "IN_PROGRESS") return { status: "inProgress", result: null };
  if (result) return { status: "ready", result };
  if (skill.attemptId && skill.attemptStatus) return { status: "pending", result: null };
  return { status: "empty", result: null };
}

function emptyCells(): Record<TestSkill, StudentResultCell> {
  return {
    LISTENING: { status: "empty", result: null },
    READING: { status: "empty", result: null },
    WRITING: { status: "empty", result: null },
    SPEAKING: { status: "empty", result: null },
  };
}
