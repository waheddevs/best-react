export type DynamicTestSkill = "LISTENING" | "READING" | "SPEAKING" | "WRITING";

export type DynamicTestLayoutPreset =
  "audioQuestions" | "passageQuestions" | "speakingWorkspace" | "writingWorkspace";

export type DynamicTestDensity = "compact" | "comfortable" | "spacious";

export type DynamicTestSectionReference = {
  id: string;
  position: number;
};

export type DynamicTestQuestionReference = {
  id: string;
  position: number;
  sectionId: string | null;
};

export type DynamicTestLayout = {
  density: DynamicTestDensity;
  preset: DynamicTestLayoutPreset;
  sectionQuestionIds: Record<string, string[]>;
  ungroupedQuestionIds: string[];
};
