import type { StudentResultsQuery } from "@/gql/graphql";
import type { StudentProgress, StudentProgressSkill, StudentProgressSkillId } from "@/types/student/StudentProgress";
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
    if (Number.isFinite(timestamp)) {
      resultTimeByTest.set(result.testId, Math.max(resultTimeByTest.get(result.testId) ?? 0, timestamp));
    }
  }

  const submittedTimeByAttempt = new Map(
    submittedAttempts.map(({ attemptId, submittedAt }) => [attemptId, Date.parse(submittedAt)]),
  );
  let latestPaper: StudentTestPaper | null = null;
  let latestTimestamp = -Infinity;

  for (const paper of papers) {
    const timestamp = Math.max(
      ...paper.skills.flatMap((skill) => [
        resultTimeByTest.get(skill.testId) ?? -Infinity,
        skill.attemptId ? (submittedTimeByAttempt.get(skill.attemptId) ?? -Infinity) : -Infinity,
      ]),
    );
    if (timestamp > latestTimestamp) {
      latestPaper = paper;
      latestTimestamp = timestamp;
    }
  }

  return latestPaper;
}

export function buildStudentProgress(
  paper: StudentTestPaper | null,
  results: readonly ResultNode[],
  now = new Date(),
): StudentProgress {
  const paperTestIds = new Set(paper?.skills.map(({ testId }) => testId) ?? []);
  const releasedResults = results
    .filter((result) => result.skill !== null && Number.isFinite(result.percentage))
    .sort((left, right) =>
      Date.parse(right.submittedAt) - Date.parse(left.submittedAt) ||
      right.attemptNumber - left.attemptNumber ||
      right.attemptId.localeCompare(left.attemptId),
    );
  const relevantResults = releasedResults.filter((result) => paperTestIds.has(result.testId));
  const latestResult = relevantResults[0];
  const chartAnchor = latestResult ?? releasedResults[0];
  const chartYear = chartAnchor ? new Date(chartAnchor.submittedAt).getUTCFullYear() : now.getUTCFullYear();
  const latestByMonth = new Map<number, number>();

  for (const result of releasedResults) {
    const submitted = new Date(result.submittedAt);
    if (submitted.getUTCFullYear() !== chartYear || !Number.isFinite(result.percentage)) continue;
    const month = submitted.getUTCMonth();
    if (!latestByMonth.has(month)) latestByMonth.set(month, result.percentage);
  }

  const skills = skillIds.map((id: StudentProgressSkillId): StudentProgressSkill => {
    const paperSkill = paper?.skills.find((item) => item.skill === id.toUpperCase());
    const skillResults = relevantResults.filter((result) => result.skill === id.toUpperCase());
    const latest = skillResults[0];
    const previous = latest ? releasedResults.find((result) =>
      result.skill === id.toUpperCase() &&
      result.attemptId !== latest.attemptId &&
      Date.parse(result.submittedAt) <= Date.parse(latest.submittedAt),
    ) : undefined;
    const pending = paperSkill?.attemptStatus === "SUBMITTED" || paperSkill?.attemptStatus === "REVIEW_REQUIRED";

    return {
      change: !pending && latest && previous ? latest.percentage - previous.percentage : null,
      id,
      label: id[0].toUpperCase() + id.slice(1),
      percentage: pending ? null : (latest?.percentage ?? null),
      status: pending ? "pending" : latest ? "scored" : "unavailable",
    };
  });

  return {
    chartChange: latestResult && relevantResults[1]
      ? latestResult.percentage - relevantResults[1].percentage
      : null,
    chartYear,
    latestPercentage: latestResult?.percentage ?? null,
    monthPoints: [...latestByMonth]
      .sort(([left], [right]) => left - right)
      .map(([month, percentage]) => ({ month, percentage })),
    scoredSkillCount: skills.filter((skill) => skill.status === "scored").length,
    skills,
  };
}
