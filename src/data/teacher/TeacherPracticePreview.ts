import type { TeacherPracticeSummary } from "@/types/teacher/TeacherPractice";

// Fictional client-preview inventory. Connected mode replaces this with paginated API records.
export const teacherPracticePreviewItems: TeacherPracticeSummary[] = Array.from(
  { length: 48 },
  (_, index) => ({
    completedStudentCount: 0,
    createdAt: "2026-09-28T00:00:00.000Z",
    id: `practice-preview-${index + 1}`,
    practiceNumber: index + 1,
    readySkillCount: index < 10 ? 4 : 3,
  }),
);
