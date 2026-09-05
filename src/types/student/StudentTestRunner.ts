export type StudentQuestionKind =
  | "longText"
  | "matching"
  | "mediaPrompt"
  | "multipleChoice"
  | "ordering"
  | "shortText"
  | "singleChoice"
  | "trueFalse";

export type StudentPreviewQuestion = {
  id: string;
  kind: StudentQuestionKind;
  options?: string[];
  pairs?: Array<{ id: string; left: string }>;
  prompt: string;
};

export type StudentTestRunnerCopy = {
  answeredLabel: string;
  backLabel: string;
  completionBody: string;
  completionTitle: string;
  exitBody: string;
  exitLabel: string;
  exitTitle: string;
  falseLabel: string;
  matchingLabel: string;
  mediaUnavailableLabel: string;
  moveDownLabel: string;
  moveUpLabel: string;
  nextLabel: string;
  previousLabel: string;
  previewNotice: string;
  questionLabel: string;
  reviewLabel: string;
  submitBody: string;
  submitLabel: string;
  submitTitle: string;
  textPlaceholder: string;
  timerLabel: string;
  trueLabel: string;
  unansweredLabel: string;
};
