export type TeacherSpeakingPhase =
  "setup" | "part1" | "part2Preparation" | "part2Speaking" | "part3" | "complete";

export type TeacherSpeakingEvaluationStatus =
  "notRequested" | "queued" | "processing" | "ready" | "failed";

export type TeacherSpeakingPromptSet = {
  part1: {
    questions: readonly string[];
    topic: string;
  };
  part2: {
    followUp: string;
    points: readonly string[];
    prompt: string;
  };
  part3: {
    questions: readonly string[];
    topic: string;
  };
};

export type TeacherSpeakingSessionContent = {
  partCount: number;
  prompts: TeacherSpeakingPromptSet;
  publishedAt: string | null;
  questionCount: number;
};
