import type { StudentResultsQuery } from "@/gql/graphql";
import type {
  StudentProgress,
  StudentProgressSkill,
  StudentProgressSkillId,
  StudentProgressTestPoint,
} from "@/types/student/StudentProgress";
import type { StudentTestPaper } from "@/types/student/StudentTests";

type ResultNode = StudentResultsQuery["studentResults"]["edges"][number]["node"];

const skillIds = ["listening", "reading", "writing", "speaking"] as const;

export type SubmittedProgressAttempt = { attemptId: string; submittedAt: string };

export function selectLatestStudentProgressPaper(
  papers: readonly StudentTestPaper[],
  results: readonly ResultNode[],
  submittedAttempts: readonly SubmittedProgressAttempt[],
): StudentTestPaper | null {
  const resultTimeByTest = new Map<string, number>();
  for (const result of results) {
    const timestamp = Date.parse(result.submittedAt);
    if (result.skill !== null && Number.isFinite(result.percentage) && Number.isFinite(timestamp)) {
      resultTimeByTest.set(
        result.testId,
        Math.max(resultTimeByTest.get(result.testId) ?? 0, timestamp),
      );
    }
  }

  const submittedTimeByAttempt = new Map(
    submittedAttempts.map(({ attemptId, submittedAt }) => [attemptId, Date.parse(submittedAt)]),
  );
  let latestPaper: StudentTestPaper | null = null;
  let latestTimestamp = -Infinity;

  // A pending/auto-expired attempt must never displace an available result.
  for (const paper of papers) {
    const timestamp = Math.max(
      ...paper.skills.map((skill) => resultTimeByTest.get(skill.testId) ?? -Infinity),
    );
    if (timestamp > latestTimestamp) {
      latestPaper = paper;
      latestTimestamp = timestamp;
    }
  }

  if (latestPaper) return latestPaper;

  // Only show awaiting-review activity when no catalog paper has released results.
  for (const paper of papers) {
    const timestamp = Math.max(
      ...paper.skills.map((skill) =>
        skill.attemptId ? (submittedTimeByAttempt.get(skill.attemptId) ?? -Infinity) : -Infinity,
      ),
    );
    if (timestamp > latestTimestamp) {
      latestPaper = paper;
      latestTimestamp = timestamp;
    }
  }
  return latestPaper;
}

// Progress shows released history, not the current retake state used by Tests/Results.
// This is a display snapshot only; no attempt status is changed on the backend.
export function getStudentProgressResultPaper(
  paper: StudentTestPaper,
  results: readonly ResultNode[],
): StudentTestPaper {
  const released = [...results]
    .filter(
      (result) =>
        result.skill !== null &&
        Number.isFinite(result.percentage) &&
        Number.isFinite(Date.parse(result.submittedAt)),
    )
    .sort(
      (a, b) =>
        Date.parse(b.submittedAt) - Date.parse(a.submittedAt) ||
        b.attemptNumber - a.attemptNumber ||
        b.attemptId.localeCompare(a.attemptId),
    );
  return {
    ...paper,
    skills: paper.skills.map((skill) => {
      const result = released.find(
        (item) => item.testId === skill.testId && item.skill === skill.skill,
      );
      return result ? { ...skill, attemptId: result.attemptId, attemptStatus: "SCORED" } : skill;
    }),
  };
}

export function buildStudentProgress(
  paper: StudentTestPaper | null,
  results: readonly ResultNode[],
  papers: readonly StudentTestPaper[] = paper ? [paper] : [],
  now = new Date(),
): StudentProgress {
  const paperTestIds = new Set(paper?.skills.map(({ testId }) => testId) ?? []);
  const releasedResults = results
    .filter(
      (result) =>
        result.skill !== null &&
        Number.isFinite(result.percentage) &&
        Number.isFinite(Date.parse(result.submittedAt)),
    )
    .sort(
      (left, right) =>
        Date.parse(right.submittedAt) - Date.parse(left.submittedAt) ||
        right.attemptNumber - left.attemptNumber ||
        right.attemptId.localeCompare(left.attemptId),
    );
  const relevantResults = releasedResults.filter((result) => paperTestIds.has(result.testId));
  // One point per paper, using its latest released result for each skill.
  // This is a display-only average, not an authoritative test score or IELTS band.
  const history: StudentProgressTestPoint[] = papers
    .flatMap((item) => {
      const latestSkills = item.skills.flatMap((skill) => {
        const result = releasedResults.find(
          (entry) => entry.testId === skill.testId && entry.skill === skill.skill,
        );
        return result ? [result] : [];
      });
      if (!latestSkills.length) return [];
      const submittedAt = latestSkills.reduce(
        (latest, entry) =>
          Date.parse(entry.submittedAt) > Date.parse(latest) ? entry.submittedAt : latest,
        latestSkills[0].submittedAt,
      );
      const numberMatch =
        /(?:test|practice)-(\d+)(?:-|$)/i.exec(item.slug) ??
        /\b(?:test|practice)\s*#?\s*(\d+)\b/i.exec(item.title);
      const date = new Date(submittedAt);
      const month = date.getUTCMonth();
      const monthStart = Date.UTC(date.getUTCFullYear(), month, 1);
      const nextMonth = Date.UTC(date.getUTCFullYear(), month + 1, 1);
      return [
        {
          // Keep the existing Jan–Dec axis, but retain every test within its month.
          month: month + (date.getTime() - monthStart) / (nextMonth - monthStart),
          paperId: item.id,
          practiceNumber: numberMatch ? Number(numberMatch[1]) : null,
          title: item.title,
          submittedAt,
          scoredSkillCount: latestSkills.length,
          percentage:
            latestSkills.reduce((sum, entry) => sum + entry.percentage, 0) / latestSkills.length,
        },
      ];
    })
    .sort(
      (a, b) =>
        Date.parse(a.submittedAt) - Date.parse(b.submittedAt) || a.paperId.localeCompare(b.paperId),
    );
  const chartYear = history.length
    ? new Date(history.at(-1)!.submittedAt).getUTCFullYear()
    : now.getUTCFullYear();
  // Keep previous years available when browsing older test windows.
  const testPoints = history;
  const latestPoint = testPoints.at(-1);
  const previousPoint = testPoints.at(-2);

  const skills = skillIds.map((id: StudentProgressSkillId): StudentProgressSkill => {
    const paperSkill = paper?.skills.find((item) => item.skill === id.toUpperCase());
    const skillResults = relevantResults.filter((result) => result.skill === id.toUpperCase());
    const latest = skillResults[0];
    const previous = latest
      ? releasedResults.find(
          (result) =>
            result.skill === id.toUpperCase() &&
            result.attemptId !== latest.attemptId &&
            Date.parse(result.submittedAt) <= Date.parse(latest.submittedAt),
        )
      : undefined;
    const pending =
      !latest &&
      (paperSkill?.attemptStatus === "SUBMITTED" ||
        paperSkill?.attemptStatus === "REVIEW_REQUIRED");

    return {
      change: !pending && latest && previous ? latest.percentage - previous.percentage : null,
      id,
      label: id[0].toUpperCase() + id.slice(1),
      percentage: pending ? null : (latest?.percentage ?? null),
      status: pending ? "pending" : latest ? "scored" : "unavailable",
    };
  });

  return {
    chartChange:
      latestPoint && previousPoint ? latestPoint.percentage - previousPoint.percentage : null,
    latestPercentage: latestPoint?.percentage ?? null,
    chartYear,
    testPoints,
    scoredSkillCount: skills.filter((skill) => skill.status === "scored").length,
    skills,
  };
}
