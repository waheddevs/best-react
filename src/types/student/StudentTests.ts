import type { AttemptStatus, TestSkill } from "@/gql/graphql";

export type StudentTestSkill = {
  attemptId: string | null;
  attemptStatus: AttemptStatus | null;
  description: string | null;
  durationMinutes: number | null;
  questionCount: number;
  skill: TestSkill;
  testId: string;
  testVersionId: string;
  title: string;
};

export type StudentTestPaper = {
  academicYear: number;
  id: string;
  skills: StudentTestSkill[];
  slug: string;
  sourceLabel: string;
  title: string;
};

export type StudentTestsCopy = {
  academicModuleLabel: string;
  allSkillsLabel: string;
  availableLabel: string;
  continueLabel: string;
  emptyLabel: string;
  eyebrow: string;
  minutesLabel: string;
  moduleLabel: string;
  questionsLabel: string;
  reviewLabel: string;
  resultLabel: string;
  sourceLabel: string;
  startLabel: string;
  startingLabel: string;
  subtitle: string;
  submittedLabel: string;
  title: string;
  yearLabel: string;
};
