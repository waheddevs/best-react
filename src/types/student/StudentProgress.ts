export type StudentProgressSkillId = "listening" | "reading" | "writing" | "speaking";

export type StudentProgressSkill = {
  change: number | null;
  id: StudentProgressSkillId;
  label: string;
  percentage: number | null;
  status: "pending" | "scored" | "unavailable";
};

export type StudentProgressTestPoint = {
  month: number;
  paperId: string;
  practiceNumber: number | null;
  title: string;
  submittedAt: string;
  scoredSkillCount: number;
  percentage: number;
};

export type StudentProgress = {
  chartChange: number | null;
  chartYear: number;
  latestPercentage: number | null;
  testPoints: StudentProgressTestPoint[];
  scoredSkillCount: number;
  skills: StudentProgressSkill[];
};
