import type {
  TeacherObjectivePracticeContent,
  TeacherObjectivePracticeQuestion,
  TeacherObjectivePracticeSkill,
} from "@/types/teacher/TeacherObjectivePractice";

// Fictional client-preview content. Connected mode replaces it with the authorized API version.
export function getTeacherObjectivePracticePreview(
  skill: TeacherObjectivePracticeSkill,
): TeacherObjectivePracticeContent {
  const isListening = skill === "listening";
  const sectionCounts = isListening ? [10, 10, 10, 10] : [13, 13, 14];
  let questionPosition = 0;

  return {
    durationMinutes: isListening ? 30 : 60,
    publishedAt: null,
    sections: sectionCounts.map((questionCount, sectionIndex) => {
      const position = sectionIndex + 1;
      const questions: TeacherObjectivePracticeQuestion[] = Array.from(
        { length: questionCount },
        (_, questionIndex) => {
          questionPosition += 1;
          const multipleChoice = questionIndex % 4 === 0;
          return {
            id: `${skill}-preview-question-${String(questionPosition)}`,
            options: multipleChoice
              ? ["Option A", "Option B", "Option C"].map((text, optionIndex) => ({
                  id: `${skill}-preview-question-${String(questionPosition)}-option-${String(optionIndex + 1)}`,
                  position: optionIndex + 1,
                  text,
                }))
              : [],
            position: questionPosition,
            prompt: multipleChoice
              ? `Choose the best answer for ${skill} question ${String(questionPosition)}.`
              : `Complete ${skill} question ${String(questionPosition)} with the correct information.`,
            sectionPosition: position,
          };
        },
      );
      return {
        content: isListening
          ? `You will hear the recording for Part ${String(position)} once. Read the questions before the audio begins.`
          : `This fictional passage demonstrates a responsive IELTS reading section. Its length varies between sections so the material and question panels can be reviewed without relying on a fixed page height.\n\nParagraph ${String(position)} contains additional preview text for testing long-form content, independent scrolling and keyboard navigation.`,
        id: `${skill}-preview-section-${String(position)}`,
        instructions: isListening
          ? `Answer questions ${String(questionPosition - questionCount + 1)}–${String(questionPosition)}.`
          : `Read the passage and answer questions ${String(questionPosition - questionCount + 1)}–${String(questionPosition)}.`,
        mediaObjectId: isListening ? `${skill}-preview-media-${String(position)}` : null,
        position,
        questions,
        title: isListening
          ? `Listening Part ${String(position)}`
          : `Reading Passage ${String(position)}`,
      };
    }),
    title: isListening ? "Dynamic Listening preview" : "Dynamic Reading preview",
  };
}
