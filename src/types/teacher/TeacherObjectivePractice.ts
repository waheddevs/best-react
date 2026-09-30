export type TeacherObjectivePracticeSkill = "listening" | "reading";

export type TeacherObjectivePracticeOption = {
  id: string;
  position: number;
  text: string;
};

export type TeacherObjectivePracticeQuestion = {
  id: string;
  options: TeacherObjectivePracticeOption[];
  position: number;
  prompt: string;
  sectionPosition: number;
};

export type TeacherObjectivePracticeSection = {
  content: string | null;
  id: string;
  instructions: string;
  mediaObjectId: string | null;
  position: number;
  questions: TeacherObjectivePracticeQuestion[];
  title: string;
};

export type TeacherObjectivePracticeContent = {
  durationMinutes: number | null;
  publishedAt: string | null;
  sections: TeacherObjectivePracticeSection[];
  title: string;
};
