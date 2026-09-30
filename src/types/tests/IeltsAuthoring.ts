import type { DynamicTestSkill } from "./DynamicTestLayout";

export type IeltsAuthoringLanguage = "EN" | "RU" | "UZ";

export type IeltsAuthoringQuestionKind =
  | "AUDIO_RESPONSE"
  | "LONG_TEXT"
  | "MATCHING"
  | "MULTIPLE_CHOICE"
  | "SHORT_TEXT"
  | "SINGLE_CHOICE"
  | "TRUE_FALSE_NOT_GIVEN"
  | "YES_NO_NOT_GIVEN";

export type IeltsAuthoringTranslation = {
  language: IeltsAuthoringLanguage;
  text: string;
};

export type IeltsAuthoringSourceRegion = {
  height: number;
  page: number;
  width: number;
  x: number;
  y: number;
};

type IeltsAuthoringBlockBase = {
  id: string;
  position: number;
  sourceRegion?: IeltsAuthoringSourceRegion;
};

export type IeltsAuthoringContentBlock =
  | (IeltsAuthoringBlockBase & {
      kind: "HEADING";
      level: 2 | 3 | 4;
      translations: IeltsAuthoringTranslation[];
    })
  | (IeltsAuthoringBlockBase & {
      kind: "RICH_TEXT";
      translations: IeltsAuthoringTranslation[];
    })
  | (IeltsAuthoringBlockBase & {
      altTranslations: IeltsAuthoringTranslation[];
      height: number;
      kind: "IMAGE";
      mediaObjectId: string;
      width: number;
    })
  | (IeltsAuthoringBlockBase & {
      captionTranslations: IeltsAuthoringTranslation[];
      headerRows: string[][];
      kind: "TABLE";
      rows: string[][];
    })
  | (IeltsAuthoringBlockBase & {
      durationSeconds: number;
      kind: "AUDIO";
      mediaObjectId: string;
    })
  | (IeltsAuthoringBlockBase & {
      kind: "QUESTION_GROUP";
      questionIds: string[];
    });

export type IeltsAuthoringSectionTranslation = {
  content?: string;
  instructions: string;
  language: IeltsAuthoringLanguage;
  title: string;
};

export type IeltsAuthoringSection = {
  blocks: IeltsAuthoringContentBlock[];
  id: string;
  position: number;
  translations: IeltsAuthoringSectionTranslation[];
};

export type IeltsAuthoringOption = {
  id: string;
  isCorrect: boolean;
  position: number;
  translations: IeltsAuthoringTranslation[];
};

export type IeltsAuthoringQuestionTranslation = {
  language: IeltsAuthoringLanguage;
  prompt: string;
  rationale?: string;
};

export type IeltsAuthoringQuestion = {
  answerLimit?: number;
  answerProposal: string[];
  id: string;
  kind: IeltsAuthoringQuestionKind;
  maxSelections?: number;
  options: IeltsAuthoringOption[];
  position: number;
  sectionId: string;
  sourceRegion?: IeltsAuthoringSourceRegion;
  translations: IeltsAuthoringQuestionTranslation[];
};

export type IeltsAuthoringTestTranslation = {
  description?: string;
  language: IeltsAuthoringLanguage;
  title: string;
};

export type IeltsAuthoringDraft = {
  durationMinutes?: number;
  id: string;
  primaryLanguage: IeltsAuthoringLanguage;
  questions: IeltsAuthoringQuestion[];
  sections: IeltsAuthoringSection[];
  skill: DynamicTestSkill;
  sourceRightsConfirmed: boolean;
  translations: IeltsAuthoringTestTranslation[];
};

export type IeltsAuthoringValidationSeverity = "ERROR" | "WARNING";

export type IeltsAuthoringValidationCode =
  | "AUDIO_REQUIRED"
  | "DUPLICATE_ID"
  | "DUPLICATE_POSITION"
  | "EMPTY_ANSWER_PROPOSAL"
  | "EMPTY_OPTIONS"
  | "INVALID_ANSWER_LIMIT"
  | "INVALID_CORRECT_OPTION_COUNT"
  | "INVALID_MEDIA"
  | "INVALID_SELECTION_LIMIT"
  | "INVALID_SOURCE_REGION"
  | "MISSING_PRIMARY_TRANSLATION"
  | "MISSING_SECTION"
  | "QUESTION_GROUP_MISMATCH"
  | "SOURCE_RIGHTS_REQUIRED"
  | "SPEAKING_STRUCTURE_INVALID"
  | "WRITING_STRUCTURE_INVALID";

export type IeltsAuthoringValidationIssue = {
  code: IeltsAuthoringValidationCode;
  message: string;
  path: string;
  severity: IeltsAuthoringValidationSeverity;
};
