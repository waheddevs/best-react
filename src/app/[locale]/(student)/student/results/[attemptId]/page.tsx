import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { StudentSpeakingResult } from "@/features/student/tests/StudentSpeakingResult";
import { StudentWritingResult } from "@/features/student/tests/StudentWritingResult";
import { StudentTestResult } from "@/features/student/tests/StudentTestResult";
import {
  getStudentReleasedAttemptResult,
  getStudentSpeakingResult,
  getStudentWritingResult,
} from "@/lib/student/StudentTestData";

type PageProps = { params: Promise<{ attemptId: string; locale: string }> };

export default async function StudentResultDetailPage({ params }: PageProps) {
  const { attemptId, locale } = await params;
  if (!isLocale(locale)) notFound();
  const speakingResult = await getStudentSpeakingResult(locale, attemptId);
  if (speakingResult) {
    return <StudentSpeakingResult locale={locale} result={speakingResult} />;
  }
  const writingResult = await getStudentWritingResult(locale, attemptId);
  if (writingResult) {
    return <StudentWritingResult locale={locale} result={writingResult} />;
  }
  const result = await getStudentReleasedAttemptResult(locale, attemptId);
  return <StudentTestResult locale={locale} result={result} />;
}
