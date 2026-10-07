export type StudentProgressSkillId = "listening" | "reading" | "writing" | "speaking";

export type StudentProgressSkill = {
  change: number | null;
  id: StudentProgressSkillId;
  label: string;
  percentage: number | null;
  status: "pending" | "scored" | "unavailable";
};

export type StudentProgressMonthPoint = {
  month: number;
  percentage: number;
};

export type StudentProgress = {
  chartChange: number | null;
  chartYear: number;
  latestPercentage: number | null;
  monthPoints: StudentProgressMonthPoint[];
  scoredSkillCount: number;
  skills: StudentProgressSkill[];
};
