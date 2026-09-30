import type {
  IeltsAuthoringContentBlock,
  IeltsAuthoringDraft,
  IeltsAuthoringLanguage,
  IeltsAuthoringQuestion,
  IeltsAuthoringSourceRegion,
  IeltsAuthoringTranslation,
  IeltsAuthoringValidationCode,
  IeltsAuthoringValidationIssue,
} from "@/types/tests/IeltsAuthoring";

type ValidationMode = "DRAFT" | "PUBLISH";

type ValidationOptions = {
  mode?: ValidationMode;
};

const OPTION_KINDS = new Set<IeltsAuthoringQuestion["kind"]>([
  "MATCHING",
  "MULTIPLE_CHOICE",
  "SINGLE_CHOICE",
  "TRUE_FALSE_NOT_GIVEN",
  "YES_NO_NOT_GIVEN",
]);

export function validateIeltsAuthoringDraft(
  draft: IeltsAuthoringDraft,
  options: ValidationOptions = {},
): IeltsAuthoringValidationIssue[] {
  const issues: IeltsAuthoringValidationIssue[] = [];
  const mode = options.mode ?? "DRAFT";
  const sectionIds = new Set(draft.sections.map(({ id }) => id));
  const questionById = new Map(draft.questions.map((question) => [question.id, question]));

  validateUniqueIds(
    [
      ...draft.sections.map(({ id }, index) => ({ id, path: `sections.${index}.id` })),
      ...draft.questions.map(({ id }, index) => ({ id, path: `questions.${index}.id` })),
      ...draft.sections.flatMap((section, sectionIndex) =>
        section.blocks.map(({ id }, blockIndex) => ({
          id,
          path: `sections.${sectionIndex}.blocks.${blockIndex}.id`,
        })),
      ),
      ...draft.questions.flatMap((question, questionIndex) =>
        question.options.map(({ id }, optionIndex) => ({
          id,
          path: `questions.${questionIndex}.options.${optionIndex}.id`,
        })),
      ),
    ],
    issues,
  );
  validatePositions(draft.sections, "sections", issues);
  validatePositions(draft.questions, "questions", issues);
  validatePrimaryText(
    draft.translations.map(({ language, title }) => ({ language, text: title })),
    draft.primaryLanguage,
    "translations",
    issues,
  );

  draft.sections.forEach((section, sectionIndex) => {
    const sectionPath = `sections.${sectionIndex}`;
    validatePositions(section.blocks, `${sectionPath}.blocks`, issues);
    validatePrimaryText(
      section.translations.map(({ language, title }) => ({ language, text: title })),
      draft.primaryLanguage,
      `${sectionPath}.translations.title`,
      issues,
    );
    validatePrimaryText(
      section.translations.map(({ language, instructions }) => ({
        language,
        text: instructions,
      })),
      draft.primaryLanguage,
      `${sectionPath}.translations.instructions`,
      issues,
    );

    section.blocks.forEach((block, blockIndex) => {
      validateContentBlock(
        block,
        draft.primaryLanguage,
        `${sectionPath}.blocks.${blockIndex}`,
        issues,
      );
      if (block.kind !== "QUESTION_GROUP") return;

      const invalidQuestionId = block.questionIds.find((questionId) => {
        const question = questionById.get(questionId);
        return !question || question.sectionId !== section.id;
      });
      if (invalidQuestionId) {
        addIssue(
          issues,
          "QUESTION_GROUP_MISMATCH",
          `${sectionPath}.blocks.${blockIndex}.questionIds`,
          "Question groups may reference only questions in the same section.",
        );
      }
    });
  });

  draft.questions.forEach((question, questionIndex) => {
    const questionPath = `questions.${questionIndex}`;
    if (!sectionIds.has(question.sectionId)) {
      addIssue(
        issues,
        "MISSING_SECTION",
        `${questionPath}.sectionId`,
        "The question must reference an existing section.",
      );
    }
    validatePrimaryText(
      question.translations.map(({ language, prompt }) => ({ language, text: prompt })),
      draft.primaryLanguage,
      `${questionPath}.translations.prompt`,
      issues,
    );
    if (question.sourceRegion) {
      validateSourceRegion(question.sourceRegion, `${questionPath}.sourceRegion`, issues);
    }
    validateQuestion(question, draft.primaryLanguage, questionPath, issues);
  });

  if (mode === "PUBLISH") {
    validatePublishRequirements(draft, issues);
  }

  return issues;
}

function validateQuestion(
  question: IeltsAuthoringQuestion,
  primaryLanguage: IeltsAuthoringLanguage,
  path: string,
  issues: IeltsAuthoringValidationIssue[],
) {
  const usesOptions = OPTION_KINDS.has(question.kind);
  if (usesOptions && question.options.length === 0) {
    addIssue(
      issues,
      "EMPTY_OPTIONS",
      `${path}.options`,
      "This question kind requires answer options.",
    );
  }

  validatePositions(question.options, `${path}.options`, issues);
  question.options.forEach((option, optionIndex) => {
    validatePrimaryText(
      option.translations,
      primaryLanguage,
      `${path}.options.${optionIndex}.translations`,
      issues,
    );
  });

  const correctOptionCount = question.options.filter(({ isCorrect }) => isCorrect).length;
  if (
    ["SINGLE_CHOICE", "TRUE_FALSE_NOT_GIVEN", "YES_NO_NOT_GIVEN"].includes(question.kind) &&
    correctOptionCount !== 1
  ) {
    addIssue(
      issues,
      "INVALID_CORRECT_OPTION_COUNT",
      `${path}.options`,
      "This question kind requires exactly one correct option.",
    );
  }
  if (["MATCHING", "MULTIPLE_CHOICE"].includes(question.kind) && correctOptionCount < 1) {
    addIssue(
      issues,
      "INVALID_CORRECT_OPTION_COUNT",
      `${path}.options`,
      "This question kind requires at least one correct option.",
    );
  }

  if (
    question.maxSelections !== undefined &&
    (!Number.isInteger(question.maxSelections) ||
      question.maxSelections < 1 ||
      question.maxSelections > question.options.length)
  ) {
    addIssue(
      issues,
      "INVALID_SELECTION_LIMIT",
      `${path}.maxSelections`,
      "The selection limit must fit the available options.",
    );
  }
  if (
    question.answerLimit !== undefined &&
    (!Number.isInteger(question.answerLimit) || question.answerLimit < 1)
  ) {
    addIssue(
      issues,
      "INVALID_ANSWER_LIMIT",
      `${path}.answerLimit`,
      "The answer limit must be a positive whole number.",
    );
  }
  if (question.kind === "SHORT_TEXT" && question.answerProposal.length === 0) {
    addIssue(
      issues,
      "EMPTY_ANSWER_PROPOSAL",
      `${path}.answerProposal`,
      "A short-text objective question requires a Teacher-reviewed answer proposal.",
    );
  }
}

function validateContentBlock(
  block: IeltsAuthoringContentBlock,
  primaryLanguage: IeltsAuthoringLanguage,
  path: string,
  issues: IeltsAuthoringValidationIssue[],
) {
  if (block.sourceRegion) validateSourceRegion(block.sourceRegion, `${path}.sourceRegion`, issues);

  if (block.kind === "HEADING" || block.kind === "RICH_TEXT") {
    validatePrimaryText(block.translations, primaryLanguage, `${path}.translations`, issues);
  }
  if (block.kind === "IMAGE") {
    validatePrimaryText(block.altTranslations, primaryLanguage, `${path}.altTranslations`, issues);
    if (!block.mediaObjectId.trim() || block.width < 1 || block.height < 1) {
      addIssue(
        issues,
        "INVALID_MEDIA",
        path,
        "Images require a media object and positive intrinsic dimensions.",
      );
    }
  }
  if (block.kind === "AUDIO" && (!block.mediaObjectId.trim() || block.durationSeconds < 1)) {
    addIssue(
      issues,
      "INVALID_MEDIA",
      path,
      "Audio requires a media object and a positive duration.",
    );
  }
  if (block.kind === "TABLE") {
    validatePrimaryText(
      block.captionTranslations,
      primaryLanguage,
      `${path}.captionTranslations`,
      issues,
    );
    const columnCount = block.headerRows[0]?.length ?? block.rows[0]?.length ?? 0;
    const invalidRows = [...block.headerRows, ...block.rows].some(
      (row) => row.length === 0 || row.length !== columnCount,
    );
    if (columnCount === 0 || invalidRows) {
      addIssue(
        issues,
        "INVALID_MEDIA",
        path,
        "Tables require a consistent non-empty column structure.",
      );
    }
  }
}

function validatePublishRequirements(
  draft: IeltsAuthoringDraft,
  issues: IeltsAuthoringValidationIssue[],
) {
  if (!draft.sourceRightsConfirmed) {
    addIssue(
      issues,
      "SOURCE_RIGHTS_REQUIRED",
      "sourceRightsConfirmed",
      "Source rights must be confirmed before publication.",
    );
  }

  if (
    draft.skill === "LISTENING" &&
    !draft.sections.some((section) => section.blocks.some(({ kind }) => kind === "AUDIO"))
  ) {
    addIssue(
      issues,
      "AUDIO_REQUIRED",
      "sections",
      "A Listening test requires an authorized audio block before publication.",
    );
  }

  if (draft.skill === "WRITING") {
    const writingSections = [...draft.sections].sort(
      (left, right) => left.position - right.position,
    );
    const valid =
      writingSections.length === 2 &&
      writingSections.every(
        (section) =>
          draft.questions.filter(({ sectionId }) => sectionId === section.id).length === 1 &&
          draft.questions.find(({ sectionId }) => sectionId === section.id)?.kind === "LONG_TEXT",
      );
    if (!valid) {
      addIssue(
        issues,
        "WRITING_STRUCTURE_INVALID",
        "sections",
        "A full IELTS Writing test requires Task 1 and Task 2 with one long-text response each.",
      );
    }
  }

  if (draft.skill === "SPEAKING") {
    const speakingSections = [...draft.sections].sort(
      (left, right) => left.position - right.position,
    );
    const questionsByPart = speakingSections.map((section) =>
      draft.questions.filter(({ sectionId }) => sectionId === section.id),
    );
    const valid =
      speakingSections.length === 3 &&
      questionsByPart[0]?.length >= 1 &&
      questionsByPart[1]?.length === 1 &&
      questionsByPart[2]?.length >= 1 &&
      questionsByPart.flat().every(({ kind }) => kind === "AUDIO_RESPONSE");
    if (!valid) {
      addIssue(
        issues,
        "SPEAKING_STRUCTURE_INVALID",
        "sections",
        "IELTS Speaking requires three parts, one Part 2 cue card, and audio-response prompts.",
      );
    }
  }
}

function validatePrimaryText(
  translations: readonly IeltsAuthoringTranslation[],
  primaryLanguage: IeltsAuthoringLanguage,
  path: string,
  issues: IeltsAuthoringValidationIssue[],
) {
  if (
    !translations.some(({ language, text }) => language === primaryLanguage && Boolean(text.trim()))
  ) {
    addIssue(issues, "MISSING_PRIMARY_TRANSLATION", path, "The primary-language text is required.");
  }
}

function validatePositions(
  items: readonly { position: number }[],
  path: string,
  issues: IeltsAuthoringValidationIssue[],
) {
  const positions = new Set<number>();
  items.forEach(({ position }, index) => {
    if (!Number.isInteger(position) || position < 1 || positions.has(position)) {
      addIssue(
        issues,
        "DUPLICATE_POSITION",
        `${path}.${index}.position`,
        "Positions must be unique positive whole numbers within their list.",
      );
    }
    positions.add(position);
  });
}

function validateUniqueIds(
  entries: readonly { id: string; path: string }[],
  issues: IeltsAuthoringValidationIssue[],
) {
  const ids = new Set<string>();
  entries.forEach(({ id, path }) => {
    if (!id.trim() || ids.has(id)) {
      addIssue(issues, "DUPLICATE_ID", path, "Ids must be non-empty and unique in the draft.");
    }
    ids.add(id);
  });
}

function validateSourceRegion(
  region: IeltsAuthoringSourceRegion,
  path: string,
  issues: IeltsAuthoringValidationIssue[],
) {
  const coordinates = [region.x, region.y, region.width, region.height];
  const invalid =
    !Number.isInteger(region.page) ||
    region.page < 1 ||
    coordinates.some((value) => !Number.isFinite(value)) ||
    region.x < 0 ||
    region.y < 0 ||
    region.width <= 0 ||
    region.height <= 0 ||
    region.x + region.width > 1 ||
    region.y + region.height > 1;
  if (invalid) {
    addIssue(
      issues,
      "INVALID_SOURCE_REGION",
      path,
      "Source regions use page numbers from 1 and normalized bounds from 0 to 1.",
    );
  }
}

function addIssue(
  issues: IeltsAuthoringValidationIssue[],
  code: IeltsAuthoringValidationCode,
  path: string,
  message: string,
) {
  issues.push({ code, message, path, severity: "ERROR" });
}
