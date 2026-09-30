import "server-only";

import { redirect } from "next/navigation";

import { auth } from "@/Auth";
import {
  StudentTestPaperDocument,
  type StudentTestPaperQuery,
  StudentTestPapersDocument,
  type StudentTestPapersQuery,
  StudentTestAttemptDocument,
  StudentReleasedAttemptResultDocument,
  type StudentReleasedAttemptResultQuery,
  StudentResultsDocument,
  StudentSpeakingResultDocument,
  type StudentSpeakingResultQuery,
  type StudentResultsQuery,
  StudentAttemptFieldsFragmentDoc,
  type StudentAttemptFieldsFragment,
  type StudentTestAttemptQuery,
} from "@/gql/graphql";
import { useFragment as readFragment } from "@/gql/fragment-masking";
import { executeApolloQuery } from "@/lib/apollo/ApolloServerClient";
import type { StudentTestPaper } from "@/types/student/StudentTests";

async function studentToken(locale: string): Promise<string> {
  const session = await auth();
  if (session?.bestApi?.role !== "STUDENT" || !session.bestApi.accessToken) {
    redirect(`/${locale}/login?role=student`);
  }
  return session.bestApi.accessToken;
}

export async function getStudentTestPapers(locale: string): Promise<StudentTestPaper[]> {
  const accessToken = await studentToken(locale);
  const papers: StudentTestPaper[] = [];
  let after: string | null = null;

  do {
    const data: StudentTestPapersQuery = await executeApolloQuery<
      StudentTestPapersQuery,
      { after?: string | null; first: number }
    >(StudentTestPapersDocument, { after, first: 20 }, { accessToken, cache: "no-store" });
    papers.push(...data.studentTestPapers.edges.map(({ node }) => mapPaper(node)));
    after = data.studentTestPapers.pageInfo.hasNextPage
      ? data.studentTestPapers.pageInfo.endCursor
      : null;
  } while (after !== null);

  return papers;
}

export async function getStudentTestPaper(
  locale: string,
  paperId: string,
): Promise<StudentTestPaper> {
  const accessToken = await studentToken(locale);
  const data = await executeApolloQuery<StudentTestPaperQuery, { paperId: string }>(
    StudentTestPaperDocument,
    { paperId },
    { accessToken, cache: "no-store" },
  );
  return mapPaper(data.studentTestPaper);
}

export async function getStudentTestAttempt(
  locale: string,
  attemptId: string,
): Promise<StudentAttemptFieldsFragment> {
  const accessToken = await studentToken(locale);
  const data = await executeApolloQuery<StudentTestAttemptQuery, { attemptId: string }>(
    StudentTestAttemptDocument,
    { attemptId },
    { accessToken, cache: "no-store" },
  );
  return readFragment(StudentAttemptFieldsFragmentDoc, data.studentAttempt);
}

export async function getStudentReleasedAttemptResult(
  locale: string,
  attemptId: string,
): Promise<StudentReleasedAttemptResultQuery["studentReleasedAttemptResult"]> {
  const accessToken = await studentToken(locale);
  const data = await executeApolloQuery<StudentReleasedAttemptResultQuery, { attemptId: string }>(
    StudentReleasedAttemptResultDocument,
    { attemptId },
    { accessToken, cache: "no-store" },
  );
  return data.studentReleasedAttemptResult;
}

export async function getStudentSpeakingResult(locale: string, attemptId: string) {
  const accessToken = await studentToken(locale);
  const data = await executeApolloQuery<StudentSpeakingResultQuery, { attemptId: string }>(
    StudentSpeakingResultDocument,
    { attemptId },
    { accessToken, cache: "no-store" },
  );
  return data.studentSpeakingResult;
}

export async function getStudentResults(
  locale: string,
): Promise<StudentResultsQuery["studentResults"]["edges"][number]["node"][]> {
  const accessToken = await studentToken(locale);
  const results: StudentResultsQuery["studentResults"]["edges"][number]["node"][] = [];
  let after: string | null = null;
  do {
    const data: StudentResultsQuery = await executeApolloQuery<
      StudentResultsQuery,
      { after?: string | null; first: number }
    >(StudentResultsDocument, { after, first: 20 }, { accessToken, cache: "no-store" });
    results.push(...data.studentResults.edges.map(({ node }) => node));
    after = data.studentResults.pageInfo.hasNextPage
      ? data.studentResults.pageInfo.endCursor
      : null;
  } while (after !== null);
  return results;
}

type PaperNode = StudentTestPapersQuery["studentTestPapers"]["edges"][number]["node"];

function mapPaper(paper: PaperNode): StudentTestPaper {
  return {
    academicYear: paper.academicYear,
    id: paper.id,
    skills: paper.skills.map((skill) => ({ ...skill })),
    slug: paper.slug,
    sourceLabel: paper.sourceLabel,
    title: paper.title,
  };
}
