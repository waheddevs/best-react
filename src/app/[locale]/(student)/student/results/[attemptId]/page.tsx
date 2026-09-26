import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { ConnectedStudentTestResult } from "@/features/student/tests/ConnectedStudentTestResult";
import { getStudentReleasedAttemptResult } from "@/lib/student/StudentTestData";

type PageProps = { params: Promise<{ attemptId: string; locale: string }> };

export default async function StudentResultDetailPage({ params }: PageProps) {
  const { attemptId, locale } = await params;
  if (!isLocale(locale)) notFound();
  const result = await getStudentReleasedAttemptResult(locale, attemptId);
  return <ConnectedStudentTestResult locale={locale} result={result} />;
}
