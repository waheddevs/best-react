import type {
  DynamicTestDensity,
  DynamicTestLayout,
  DynamicTestLayoutPreset,
  DynamicTestQuestionReference,
  DynamicTestSectionReference,
  DynamicTestSkill,
} from "@/types/tests/DynamicTestLayout";

export function resolveDynamicTestLayout(
  skill: DynamicTestSkill,
  sections: readonly DynamicTestSectionReference[],
  questions: readonly DynamicTestQuestionReference[],
): DynamicTestLayout {
  const orderedSections = [...sections].sort((left, right) => left.position - right.position);
  const orderedQuestions = [...questions].sort((left, right) => left.position - right.position);
  const knownSectionIds = new Set(orderedSections.map(({ id }) => id));
  const sectionQuestionIds = Object.fromEntries(
    orderedSections.map(({ id }) => [
      id,
      orderedQuestions
        .filter((question) => question.sectionId === id)
        .map(({ id: questionId }) => questionId),
    ]),
  );
  const ungroupedQuestionIds = orderedQuestions
    .filter(({ sectionId }) => sectionId === null || !knownSectionIds.has(sectionId))
    .map(({ id }) => id);

  return {
    density: resolveDensity(orderedQuestions.length),
    preset: resolvePreset(skill),
    sectionQuestionIds,
    ungroupedQuestionIds,
  };
}

function resolveDensity(questionCount: number): DynamicTestDensity {
  if (questionCount >= 30) return "compact";
  if (questionCount >= 10) return "comfortable";
  return "spacious";
}

function resolvePreset(skill: DynamicTestSkill): DynamicTestLayoutPreset {
  if (skill === "LISTENING") return "audioQuestions";
  if (skill === "READING") return "passageQuestions";
  if (skill === "WRITING") return "writingWorkspace";
  return "speakingWorkspace";
}
