import type { Locale } from "@/config/Locales";

export type ExamKind = "ielts" | "cefr" | "mock";

export type LocalizedExamText = Record<Locale, string>;

export type PublicExamOption = {
  description: LocalizedExamText;
  duration: LocalizedExamText;
  format: LocalizedExamText;
  highlights: LocalizedExamText[];
  id?: string;
  key: ExamKind;
  level: LocalizedExamText;
  title: LocalizedExamText;
};

export type MockExamDate = {
  dateLabel: LocalizedExamText;
  timeLabel: LocalizedExamText;
  value: string;
};

export type ExamRegistrationValues = {
  consent: boolean;
  currentLevel: string;
  email: string;
  fullName: string;
  mockDate: string;
  phone: string;
};

export type ExamResultsValues = {
  birthDate: string;
  candidateId: string;
};

export type ExamPreviewCopy = {
  title: string;
  description: string;
  heroVisualTitle: string;
  heroVisualMeta: string;
  instructionsEyebrow: string;
  instructionsTitle: string;
  instructionsDescription: string;
  instructionSteps: Array<{ title: string; description: string }>;
  catalogEyebrow: string;
  catalogTitle: string;
  catalogDescription: string;
  formatLabel: string;
  durationLabel: string;
  levelLabel: string;
  register: string;
  formEyebrow: string;
  formTitle: string;
  formDescription: string;
  consentLabel: string;
  selectedExam: string;
  fullName: string;
  fullNamePlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  currentLevel: string;
  levelOptions: string[];
  preferredDate: string;
  preferredDateDescription: string;
  required: string;
  invalidEmail: string;
  invalidPhone: string;
  cancel: string;
  done: string;
  submit: string;
  successTitle: string;
  successMessage: string;
  resultsEyebrow: string;
  resultsTitle: string;
  resultsDescription: string;
  candidateId: string;
  candidateIdPlaceholder: string;
  birthDate: string;
  viewResults: string;
  calendar: {
    dialogLabel: string;
    monthLabel: string;
    months: string[];
    nextMonth: string;
    openLabel: string;
    placeholder: string;
    previousMonth: string;
    weekdays: string[];
    yearLabel: string;
  };
  loginTitle: string;
  loginMessage: string;
  loginConfirm: string;
  loginCancel: string;
};
