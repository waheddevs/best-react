import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getStudentPreviewQuestions } from "@/data/student/StudentTestPreview";
import { getStudentTestRunnerCopy } from "@/dictionaries/student/StudentTestRunner";
import { getStudentWorkspaceCopy } from "@/dictionaries/student/StudentWorkspace";
import { StudentTestRunner } from "@/features/student/tests/StudentTestRunner";

type PageProps = { params: Promise<{ locale: string; testId: string }> };
export default async function StudentTestDetailPage({ params }: PageProps) {
  const { locale, testId } = await params;
  if (!isLocale(locale)) notFound();
  const workspaceCopy = getStudentWorkspaceCopy(locale);
  const test = workspaceCopy.sections.tests.records.find((record) => record.id === testId);
  if (!test) notFound();
  return (
    <StudentTestRunner
      copy={getStudentTestRunnerCopy(locale)}
      locale={locale}
      questions={getStudentPreviewQuestions(locale)}
      test={test}
    />
  );
}
