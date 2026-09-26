import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { ConnectedStudentTestRunner } from "@/features/student/tests/ConnectedStudentTestRunner";
import { getStudentTestAttempt } from "@/lib/student/StudentTestData";

type PageProps = {
  params: Promise<{ attemptId: string; locale: string; skill: string; testId: string }>;
};

export default async function StudentSkillAttemptPage({ params }: PageProps) {
  const { attemptId, locale, skill, testId } = await params;
  if (!isLocale(locale)) notFound();
  const attempt = await getStudentTestAttempt(locale, attemptId);
  if (!attempt.skill || attempt.skill.toLowerCase() !== skill) notFound();

  return (
    <ConnectedStudentTestRunner
      attempt={attempt}
      locale={locale}
      paperId={testId}
    />
  );
}
