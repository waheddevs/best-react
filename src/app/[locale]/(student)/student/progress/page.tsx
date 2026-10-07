import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getStudentResults, getStudentTestAttempt, getStudentTestPapers } from "@/lib/student/StudentTestData";
import { buildStudentProgress, selectLatestStudentProgressPaper } from "@/lib/student/StudentProgressView";

import { StudentProgressOverview } from "./StudentProgressOverview";

type PageProps = { params: Promise<{ locale: string }> };
export default async function StudentProgressPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [papers, results] = await Promise.all([
    getStudentTestPapers(locale),
    getStudentResults(locale),
  ]);
  const pendingAttemptIds = new Set(
    papers.flatMap((paper) => paper.skills.flatMap((skill) =>
      skill.attemptId && (skill.attemptStatus === "SUBMITTED" || skill.attemptStatus === "REVIEW_REQUIRED")
        ? [skill.attemptId]
        : [],
    )),
  );
  const submittedAttempts = (await Promise.all(
    [...pendingAttemptIds].map((attemptId) => getStudentTestAttempt(locale, attemptId)),
  )).flatMap((attempt) => attempt.submittedAt
    ? [{ attemptId: attempt.id, submittedAt: attempt.submittedAt }]
    : []);
  const paper = selectLatestStudentProgressPaper(papers, results, submittedAttempts);
  const progress = buildStudentProgress(paper, results);

  return <StudentProgressOverview locale={locale} progress={progress} />;
}
