export type TeacherPracticeSummary = {
  completedStudentCount: number;
  createdAt: string;
  id: string;
  practiceNumber: number;
  readySkillCount: number;
};

export type TeacherPracticePage = {
  currentPage: number;
  items: TeacherPracticeSummary[];
  totalItems: number;
  totalPages: number;
};

export type TeacherPracticeSkillKind = "listening" | "reading" | "writing" | "speaking";

export type TeacherPracticeSkillStatus = "empty" | "draft" | "ready";

export type TeacherPracticeSkillSummary = {
  durationMinutes: number | null;
  kind: TeacherPracticeSkillKind;
  questionCount: number | null;
  status: TeacherPracticeSkillStatus;
};
