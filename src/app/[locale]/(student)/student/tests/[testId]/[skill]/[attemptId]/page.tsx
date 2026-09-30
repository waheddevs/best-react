import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { StudentSpeakingSimulator } from "@/features/student/tests/StudentSpeakingSimulator";
import { StudentTestRunner } from "@/features/student/tests/StudentTestRunner";
import { StudentWritingSimulator } from "@/features/student/tests/StudentWritingSimulator";
import { getStudentTestAttempt } from "@/lib/student/StudentTestData";

type PageProps = {
  params: Promise<{ attemptId: string; locale: string; skill: string; testId: string }>;
};

export default async function StudentSkillAttemptPage({ params }: PageProps) {
  const { attemptId, locale, skill, testId } = await params;
  if (!isLocale(locale)) notFound();
  const attempt = await getStudentTestAttempt(locale, attemptId);
  if (!attempt.skill || attempt.skill.toLowerCase() !== skill) notFound();

  if (attempt.skill === "SPEAKING") {
    return <StudentSpeakingSimulator attempt={attempt} locale={locale} paperId={testId} />;
  }

  if (attempt.skill === "WRITING") {
    return <StudentWritingSimulator attempt={attempt} locale={locale} paperId={testId} />;
  }

  return <StudentTestRunner attempt={attempt} locale={locale} paperId={testId} />;
}
