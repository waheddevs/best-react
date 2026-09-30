export type TeacherWritingTask = {
  content: string | null;
  instructions: string;
  minimumWords: number;
  position: number;
  prompt: string;
  suggestedMinutes: number;
  title: string;
};

export type TeacherWritingSessionContent = {
  durationMinutes: number;
  publishedAt: string | null;
  tasks: TeacherWritingTask[];
};
