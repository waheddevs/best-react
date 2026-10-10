import type { StudentTestPaper } from "@/types/student/StudentTests";

export function buildStudentDashboardTests(papers: readonly StudentTestPaper[]) {
  return papers
    .map((paper, index) => {
      const match =
        /(?:test|practice)-(\d+)(?:-|$)/i.exec(paper.slug) ??
        /\b(?:test|practice)\s*#?\s*(\d+)\b/i.exec(paper.title);
      const parsed = match ? Number(match[1]) : null;
      const number = parsed !== null && Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
      return { paper, index, number };
    })
    .sort((a, b) => (a.number ?? Infinity) - (b.number ?? Infinity) || a.index - b.index)
    .map(({ paper, number }, index) => ({ paper, number: number ?? index + 1 }))
    .filter(({ paper }) =>
      paper.skills.some(
        (skill) => skill.attemptStatus === null || skill.attemptStatus === "IN_PROGRESS",
      ),
    );
}
