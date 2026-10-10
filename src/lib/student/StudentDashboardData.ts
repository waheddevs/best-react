import "server-only";

import { auth } from "@/Auth";
import { StudentCurrentGroupDocument, type StudentCurrentGroupQuery } from "@/gql/graphql";
import { executeApolloQuery } from "@/lib/apollo/ApolloServerClient";
import type { Locale } from "@/config/Locales";
import type { StudentTestPaper } from "@/types/student/StudentTests";
import { getStudentResults, getStudentTestAttempt } from "./StudentTestData";
import { selectLatestStudentProgressPaper } from "./StudentProgressView";
import {
  buildStudentDashboardProgress,
  type StudentDashboardActivity,
} from "./StudentDashboardProgress";

export async function loadStudentDashboardGroup() {
  const session = await auth();
  if (session?.bestApi?.role !== "STUDENT" || !session.bestApi.accessToken) {
    throw new Error("Student session required");
  }
  // Home needs only the group summary, not all lessons and downloadable materials.
  const data = await executeApolloQuery<StudentCurrentGroupQuery, Record<string, never>>(
    StudentCurrentGroupDocument,
    {},
    { accessToken: session.bestApi.accessToken, cache: "no-store" },
  );
  return data.studentCurrentGroup?.group ?? null;
}

export async function loadStudentDashboardProgress(
  locale: Locale,
  papers: readonly StudentTestPaper[],
) {
  const results = await getStudentResults(locale);
  if (selectLatestStudentProgressPaper(papers, results, [])) {
    return buildStudentDashboardProgress(papers, results, []);
  }
  const releasedIds = new Set(results.map((result) => result.attemptId));
  const ids = [
    ...new Set(
      papers.flatMap((paper) =>
        paper.skills.flatMap((skill) =>
          skill.attemptId &&
          !releasedIds.has(skill.attemptId) &&
          (skill.attemptStatus === "SUBMITTED" || skill.attemptStatus === "REVIEW_REQUIRED")
            ? [skill.attemptId]
            : [],
        ),
      ),
    ),
  ];
  const activity: StudentDashboardActivity[] = [];
  // Read metadata in bounded batches. Question/answer contents never enter Home props.
  for (let index = 0; index < ids.length; index += 4) {
    const attempts = await Promise.allSettled(
      ids.slice(index, index + 4).map((id) => getStudentTestAttempt(locale, id)),
    );
    for (const item of attempts) {
      if (item.status === "fulfilled" && item.value.submittedAt)
        activity.push({
          attemptId: item.value.id,
          timestamp: item.value.submittedAt,
        });
    }
  }
  return buildStudentDashboardProgress(papers, results, activity);
}
