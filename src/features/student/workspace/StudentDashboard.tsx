import type { Locale } from "@/config/Locales";
import { getStudentWorkspaceCopy } from "@/dictionaries/student/StudentWorkspace";
import { getStudentTestPapers } from "@/lib/student/StudentTestData";
import type { StudentWorkspaceRecord } from "@/types/student/StudentWorkspace";

import { StudentSectionPage } from "./StudentSectionPage";

type StudentDashboardProps = { locale: Locale };

const writingCopy = {
  uz: {
    available: "Writing test",
    inProgress: "Davom etish",
    submitted: "Tekshirilmoqda",
    tasks: "ta task",
  },
  ru: {
    available: "Writing тест",
    inProgress: "Продолжить",
    submitted: "На проверке",
    tasks: "задания",
  },
  en: {
    available: "Writing test",
    inProgress: "Continue",
    submitted: "Awaiting review",
    tasks: "tasks",
  },
} as const;

export async function StudentDashboard({ locale }: StudentDashboardProps) {
  const copy = getStudentWorkspaceCopy(locale);
  const papers = await getStudentTestPapers(locale);
  const labels = writingCopy[locale];
  const writingRecords: StudentWorkspaceRecord[] = papers.flatMap((paper) =>
    paper.skills
      .filter((skill) => skill.skill === "WRITING")
      .map((skill) => ({
        detail:
          skill.attemptStatus === "IN_PROGRESS"
            ? labels.inProgress
            : skill.attemptStatus === "SUBMITTED" ||
                skill.attemptStatus === "REVIEW_REQUIRED" ||
                skill.attemptStatus === "SCORED"
              ? labels.submitted
              : labels.available,
        href: `/student/tests/${paper.id}`,
        id: `writing-${skill.testId}`,
        meta: `${paper.title} · ${skill.questionCount} ${labels.tasks}`,
        status:
          skill.attemptStatus === "SUBMITTED" ||
          skill.attemptStatus === "REVIEW_REQUIRED" ||
          skill.attemptStatus === "SCORED"
            ? "neutral"
            : "info",
        title: skill.title,
      })),
  );

  return (
    <StudentSectionPage
      common={copy.common}
      locale={locale}
      section={{
        ...copy.sections.dashboard,
        records: [...writingRecords, ...copy.sections.dashboard.records],
      }}
    />
  );
}
