"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import { useMutation } from "@apollo/client/react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect, useMemo, useState } from "react";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import type { Locale } from "@/config/Locales";
import { getTeacherPracticesCopy } from "@/dictionaries/teacher/TeacherPractices";
import { getTeacherReadingCopy } from "@/dictionaries/teacher/TeacherReading";
import { useFragment as readFragment } from "@/gql/fragment-masking";
import {
  TeacherCreateNextTestVersionDocument,
  TeacherPublishTestVersionDocument,
  TeacherTestAuthoringVersionFieldsFragmentDoc,
  TeacherUpdateTestQuestionDocument,
  TeacherUpdateTestSectionBlockDocument,
  TeacherUpdateTestSectionDocument,
  type QuestionKind,
  type TeacherTestAuthoringVersionFieldsFragment,
} from "@/gql/graphql";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";

import { TeacherAnswerDropdown } from "../TeacherAnswerDropdown";

type TeacherReadingEditorProps = {
  initialVersion: TeacherTestAuthoringVersionFieldsFragment;
  locale: Locale;
  practiceHref: string;
  practiceNumber: number;
};

type ReadingQuestion = {
  answer: string;
  answerLimit: number | null;
  correctOption: number | null;
  kind: QuestionKind;
  maxSelections: number | null;
  options: string[];
  position: number;
  prompt: string;
};

type ReadingSection = {
  content: string;
  instructions: string;
  position: 1 | 2 | 3;
  questions: ReadingQuestion[];
  title: string;
};

const passageTitlePrefix = /^passage\s*[123]\s*[\u2014\u2013-]\s*/iu;
const optionLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const correctAnswerOptions = ["A", "B", "C", "D", "E"] as const;

export function TeacherReadingEditor({
  initialVersion,
  locale,
  practiceHref,
  practiceNumber,
}: TeacherReadingEditorProps) {
  const labels = getTeacherReadingCopy(locale);
  const practiceCopy = getTeacherPracticesCopy(locale);
  const confirm = useConfirmDialog();
  const initialSections = useMemo(() => sectionsFromVersion(initialVersion), [initialVersion]);
  const [version, setVersion] = useState(initialVersion);
  const [sections, setSections] = useState(initialSections);
  const [baseline, setBaseline] = useState(() => JSON.stringify(initialSections));
  const [activePassage, setActivePassage] = useState<1 | 2 | 3>(1);
  const [saveState, setSaveState] = useState<"error" | "idle" | "saved" | "saving" | "validation">(
    "idle",
  );
  const [createNextVersion] = useMutation(TeacherCreateNextTestVersionDocument, {
    context: { authenticated: true },
  });
  const [updateSection] = useMutation(TeacherUpdateTestSectionDocument, {
    context: { authenticated: true },
  });
  const [updateBlock] = useMutation(TeacherUpdateTestSectionBlockDocument, {
    context: { authenticated: true },
  });
  const [updateQuestion] = useMutation(TeacherUpdateTestQuestionDocument, {
    context: { authenticated: true },
  });
  const [publishVersion] = useMutation(TeacherPublishTestVersionDocument, {
    context: { authenticated: true },
  });
  const activeSection = sections.find(({ position }) => position === activePassage) ?? null;
  const dirty = JSON.stringify(sections) !== baseline;

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const updateActiveSection = (values: Partial<Omit<ReadingSection, "position" | "questions">>) => {
    setSections((current) =>
      current.map((section) =>
        section.position === activePassage ? { ...section, ...values } : section,
      ),
    );
    setSaveState("idle");
  };

  const updateQuestionEditor = (position: number, values: Partial<ReadingQuestion>) => {
    setSections((current) =>
      current.map((section) => ({
        ...section,
        questions: section.questions.map((question) =>
          question.position === position ? { ...question, ...values } : question,
        ),
      })),
    );
    setSaveState("idle");
  };

  const updateOption = (questionPosition: number, optionIndex: number, value: string) => {
    const question = sections
      .flatMap(({ questions }) => questions)
      .find(({ position }) => position === questionPosition);
    if (!question) return;
    const options = [...question.options];
    options[optionIndex] = value;
    updateQuestionEditor(questionPosition, { options });
  };

  const clearActivePassage = () => {
    setSections((current) =>
      current.map((section) =>
        section.position === activePassage
          ? {
              ...section,
              content: "",
              instructions: "",
              questions: section.questions.map((question) => ({
                ...question,
                answer: "",
                correctOption: null,
                options:
                  question.kind === "TRUE_FALSE_NOT_GIVEN" || question.kind === "YES_NO_NOT_GIVEN"
                    ? question.options
                    : question.options.map(() => ""),
                prompt: "",
              })),
              title: "",
            }
          : section,
      ),
    );
    setSaveState("idle");
  };

  const save = async () => {
    if (saveState === "saving" || !isComplete(sections)) {
      if (saveState !== "saving") setSaveState("validation");
      return;
    }
    const accepted = await confirm({
      cancelLabel: practiceCopy.cancel,
      confirmLabel: labels.publishConfirm,
      message: labels.publishMessage,
      title: labels.publishTitle,
    });
    if (!accepted) return;

    setSaveState("saving");
    try {
      let workingVersion = version;
      if (workingVersion.status === "PUBLISHED") {
        const result = await createNextVersion({
          variables: { input: { testId: workingVersion.testId } },
        });
        const masked = result.data?.createNextTestVersion.testVersion;
        if (!masked) throw new Error("The editable Reading draft was not created");
        workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, masked);
      }

      for (const editorSection of sections) {
        let section = workingVersion.sections.find(
          ({ position }) => position === editorSection.position,
        );
        if (!section)
          throw new Error(`Reading Passage ${String(editorSection.position)} is missing`);
        const sectionResult = await updateSection({
          variables: {
            input: {
              mediaObjectId: section.mediaObjectId,
              minimumWords: section.minimumWords,
              preparationSeconds: section.preparationSeconds,
              responseSeconds: section.responseSeconds,
              suggestedMinutes: section.suggestedMinutes,
              testSectionId: section.id,
              translations: section.translations.map((translation) => ({
                content:
                  translation.language === workingVersion.primaryLanguage
                    ? editorSection.content.trim()
                    : translation.content,
                instructions:
                  translation.language === workingVersion.primaryLanguage
                    ? editorSection.instructions.trim()
                    : translation.instructions,
                language: translation.language,
                title:
                  translation.language === workingVersion.primaryLanguage
                    ? editorSection.title.trim()
                    : translation.title,
              })),
            },
          },
        });
        const sectionMasked = sectionResult.data?.updateTestSection.testVersion;
        if (!sectionMasked) throw new Error("A Reading passage was not saved");
        workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, sectionMasked);
        section = workingVersion.sections.find(
          ({ position }) => position === editorSection.position,
        );
        if (!section) throw new Error("The saved Reading passage is missing");
        const contentBlock = section.blocks.find(({ kind }) => kind === "RICH_TEXT");
        if (contentBlock) {
          const blockResult = await updateBlock({
            variables: {
              input: {
                headingLevel: contentBlock.headingLevel,
                kind: contentBlock.kind,
                mediaObjectId: contentBlock.mediaObjectId,
                questionIds: contentBlock.questionIds,
                tableHeaderRows: contentBlock.tableHeaderRows,
                tableRows: contentBlock.tableRows,
                testSectionBlockId: contentBlock.id,
                translations: contentBlock.translations.map((translation) => ({
                  altText: translation.altText,
                  caption: translation.caption,
                  language: translation.language,
                  text:
                    translation.language === workingVersion.primaryLanguage
                      ? editorSection.content.trim()
                      : translation.text,
                })),
              },
            },
          });
          const blockMasked = blockResult.data?.updateTestSectionBlock.testVersion;
          if (!blockMasked) throw new Error("The Reading passage content block was not saved");
          workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, blockMasked);
          section = workingVersion.sections.find(
            ({ position }) => position === editorSection.position,
          );
          if (!section) throw new Error("The Reading content block lost its passage");
        }

        for (const editorQuestion of editorSection.questions) {
          const question = workingVersion.questions.find(
            ({ position }) => position === editorQuestion.position,
          );
          if (!question) throw new Error(`Question ${String(editorQuestion.position)} is missing`);
          const questionResult = await updateQuestion({
            variables: {
              input: {
                acceptedAnswers:
                  editorQuestion.options.length === 0 ? [editorQuestion.answer.trim()] : [],
                answerLimit: editorQuestion.answerLimit,
                kind: editorQuestion.kind,
                maxSelections: editorQuestion.maxSelections,
                options: question.options.map((option, index) => ({
                  isCorrect: editorQuestion.correctOption === index,
                  translations: option.translations.map((translation) => ({
                    language: translation.language,
                    text:
                      translation.language === workingVersion.primaryLanguage
                        ? (editorQuestion.options[index]?.trim() ?? translation.text)
                        : translation.text,
                  })),
                })),
                questionId: question.id,
                sectionId: section.id,
                translations: question.translations.map((translation) => ({
                  language: translation.language,
                  prompt:
                    translation.language === workingVersion.primaryLanguage
                      ? editorQuestion.prompt.trim()
                      : translation.prompt,
                  rationale: translation.rationale,
                })),
              },
            },
          });
          const questionMasked = questionResult.data?.updateTestQuestion.testVersion;
          if (!questionMasked) throw new Error("A Reading question was not saved");
          workingVersion = readFragment(
            TeacherTestAuthoringVersionFieldsFragmentDoc,
            questionMasked,
          );
          section = workingVersion.sections.find(
            ({ position }) => position === editorSection.position,
          );
          if (!section) throw new Error("The Reading passage link was lost");
        }
      }

      const published = await publishVersion({
        variables: { input: { testVersionId: workingVersion.id } },
      });
      const masked = published.data?.publishTestVersion.testVersion;
      if (!masked) throw new Error("The Reading test was not published");
      workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, masked);
      setVersion(workingVersion);
      setBaseline(JSON.stringify(sections));
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  };

  if (!activeSection || sections.length !== 3) {
    return <p className="teacherReading__empty">{labels.empty}</p>;
  }
  const questionGroups = groupsForSection(activeSection);

  return (
    <main className="teacherPractices__detail teacherReading">
      <header className="teacherPractices__header">
        <ScrollToTopLink
          aria-label={practiceCopy.backToPractice}
          className="teacherGroups__backLink"
          href={practiceHref}
        >
          <ArrowBackRounded aria-hidden="true" />
        </ScrollToTopLink>
        <div className="teacherPractices__heading">
          <span>READING</span>
          <h1>
            {practiceCopy.practiceTitle} {practiceNumber}
          </h1>
        </div>
      </header>

      <div className="teacherPractices__detailToolbar">
        <Tabs
          aria-label="Reading passages"
          className="teacherGroups__categoryTabs teacherGroups__workspaceNav teacherPractices__partTabs"
          component="nav"
          onChange={(_, value: string) => setActivePassage(Number(value.slice(-1)) as 1 | 2 | 3)}
          scrollButtons={false}
          value={`passage-${String(activePassage)}`}
          variant="scrollable"
        >
          {([1, 2, 3] as const).map((passage) => (
            <Tab
              className="teacherGroups__categoryTab"
              key={passage}
              label={
                <span className="teacherGroups__categoryName">
                  {labels.passage.replace("{number}", String(passage))}
                </span>
              }
              value={`passage-${String(passage)}`}
            />
          ))}
        </Tabs>
        <div
          aria-label={practiceCopy.skillActions}
          className="teacherPractices__actions"
          role="group"
        >
          <button
            aria-label={labels.deleteLabel}
            data-action="delete"
            onClick={clearActivePassage}
            type="button"
          >
            <DeleteOutlineRounded aria-hidden="true" />
          </button>
          <button
            aria-label={practiceCopy.saveSkill}
            data-action="save"
            disabled={!dirty || saveState === "saving"}
            onClick={() => void save()}
            type="button"
          >
            <SaveOutlined aria-hidden="true" />
          </button>
        </div>
      </div>

      <section className="teacherListening__intro teacherReading__intro">
        <input
          aria-label={labels.title}
          onChange={(event) => updateActiveSection({ title: event.target.value })}
          value={activeSection.title}
        />
        <textarea
          aria-label={labels.instructions}
          onChange={(event) => updateActiveSection({ instructions: event.target.value })}
          rows={2}
          value={activeSection.instructions}
        />
      </section>

      <section className="teacherReading__passagePanel">
        <div className="teacherReading__panelHeading">
          <div>
            <span>{labels.passageContent}</span>
            <h2>{activeSection.title}</h2>
          </div>
          {dirty ? <small>{labels.unsaved}</small> : null}
        </div>
        <textarea
          aria-label={labels.passageContent}
          onChange={(event) => updateActiveSection({ content: event.target.value })}
          value={activeSection.content}
        />
      </section>

      <section className="teacherReading__questionsPanel">
        <div className="teacherReading__panelHeading">
          <div>
            <span>{labels.studentQuestions}</span>
            <h2>{activeSection.title}</h2>
          </div>
        </div>
        <div className="teacherReading__questionGroups">
          {questionGroups.map((questions, index) => (
            <ReadingQuestionGroup
              heading={labels.questionGroups[activePassage][index] ?? ""}
              key={`${activePassage}-${String(index)}`}
              labels={labels}
              onOptionChange={updateOption}
              onQuestionChange={updateQuestionEditor}
              questions={questions}
              wideAnswer={
                (activePassage === 1 && index === 1) ||
                (activePassage === 2 && index === 2) ||
                (activePassage === 3 && index === 2)
              }
            />
          ))}
        </div>
      </section>

      <p aria-live="polite" className={`teacherListening__saveStatus is-${saveState}`}>
        {saveState === "saving"
          ? labels.saving
          : saveState === "saved"
            ? labels.saved
            : saveState === "error"
              ? labels.saveError
              : saveState === "validation"
                ? labels.validationError
                : ""}
      </p>
    </main>
  );
}

type ReadingQuestionGroupProps = {
  heading: string;
  labels: ReturnType<typeof getTeacherReadingCopy>;
  onOptionChange: (questionPosition: number, optionIndex: number, value: string) => void;
  onQuestionChange: (position: number, values: Partial<ReadingQuestion>) => void;
  questions: ReadingQuestion[];
  wideAnswer: boolean;
};

function ReadingQuestionGroup({
  heading,
  labels,
  onOptionChange,
  onQuestionChange,
  questions,
  wideAnswer,
}: ReadingQuestionGroupProps) {
  const optionCount = Math.max(0, ...questions.map(({ options }) => options.length));
  const fixedChoices = questions.every(
    ({ kind }) => kind === "TRUE_FALSE_NOT_GIVEN" || kind === "YES_NO_NOT_GIVEN",
  );
  return (
    <section>
      <h3>{heading}</h3>
      <div className="teacherListening__tableWrap">
        <table
          className="teacherListening__editorTable teacherReading__questionTable"
          data-fixed-choices={fixedChoices || undefined}
          data-wide-answer={wideAnswer || undefined}
          style={
            { "--reading-option-count": fixedChoices ? 0 : optionCount } as React.CSSProperties
          }
        >
          <thead>
            <tr>
              <th>No.</th>
              <th>{labels.question}</th>
              {fixedChoices
                ? null
                : Array.from({ length: optionCount }, (_, index) => (
                    <th key={index}>{optionLetters[index]}</th>
                  ))}
              <th>{optionCount > 0 ? labels.correctAnswer : labels.answer}</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question.position}>
                <td>{question.position}</td>
                <td>
                  <textarea
                    aria-label={`${labels.question} ${String(question.position)}`}
                    onChange={(event) =>
                      onQuestionChange(question.position, { prompt: event.target.value })
                    }
                    rows={2}
                    value={question.prompt}
                  />
                </td>
                {fixedChoices
                  ? null
                  : Array.from({ length: optionCount }, (_, optionIndex) => (
                      <td key={optionIndex}>
                        <input
                          aria-label={`${labels.option} ${optionLetters[optionIndex]} ${String(question.position)}`}
                          onChange={(event) =>
                            onOptionChange(question.position, optionIndex, event.target.value)
                          }
                          value={question.options[optionIndex] ?? ""}
                        />
                      </td>
                    ))}
                <td>
                  {optionCount > 0 ? (
                    <TeacherAnswerDropdown
                      ariaLabel={`${labels.correctAnswer} ${String(question.position)}`}
                      onChange={(answer) => {
                        const correctOption = fixedChoices
                          ? question.options.indexOf(answer)
                          : correctAnswerOptions.indexOf(
                              answer as (typeof correctAnswerOptions)[number],
                            );
                        if (correctOption >= 0) {
                          onQuestionChange(question.position, { correctOption });
                        }
                      }}
                      options={
                        fixedChoices ? question.options : correctAnswerOptions.slice(0, optionCount)
                      }
                      value={
                        question.correctOption === null
                          ? ""
                          : fixedChoices
                            ? (question.options[question.correctOption] ?? "")
                            : (optionLetters[question.correctOption] ?? "")
                      }
                    />
                  ) : (
                    <input
                      aria-label={`${labels.answer} ${String(question.position)}`}
                      onChange={(event) =>
                        onQuestionChange(question.position, { answer: event.target.value })
                      }
                      value={question.answer}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function sectionsFromVersion(version: TeacherTestAuthoringVersionFieldsFragment): ReadingSection[] {
  return version.sections.flatMap((section): ReadingSection[] => {
    if (section.position < 1 || section.position > 3) return [];
    const translation = section.translations.find(
      ({ language }) => language === version.primaryLanguage,
    );
    const questions = version.questions
      .filter(({ sectionPosition }) => sectionPosition === section.position)
      .map((question): ReadingQuestion => {
        const correctOption = question.options.findIndex(({ isCorrect }) => isCorrect);

        return {
          answer: question.acceptedAnswers[0] ?? "",
          answerLimit: question.answerLimit,
          correctOption: correctOption >= 0 ? correctOption : null,
          kind: question.kind,
          maxSelections: question.maxSelections,
          options: question.options.map(
            (option) =>
              option.translations.find(({ language }) => language === version.primaryLanguage)
                ?.text ?? "",
          ),
          position: question.position,
          prompt:
            question.translations.find(({ language }) => language === version.primaryLanguage)
              ?.prompt ?? "",
        };
      });
    return [
      {
        content: translation?.content ?? "",
        instructions: translation?.instructions ?? "",
        position: section.position as 1 | 2 | 3,
        questions,
        title: (translation?.title ?? "").replace(passageTitlePrefix, ""),
      },
    ];
  });
}

function groupsForSection(section: ReadingSection): ReadingQuestion[][] {
  if (section.position === 1) {
    return [
      section.questions.filter(({ position }) => position <= 6),
      section.questions.filter(({ position }) => position >= 7),
    ];
  }
  if (section.position === 2) {
    return [
      section.questions.filter(({ position }) => position <= 18),
      section.questions.filter(({ position }) => position >= 19 && position <= 22),
      section.questions.filter(({ position }) => position >= 23),
    ];
  }
  return [
    section.questions.filter(({ position }) => position <= 31),
    section.questions.filter(({ position }) => position >= 32 && position <= 36),
    section.questions.filter(({ position }) => position >= 37),
  ];
}

function isComplete(sections: ReadingSection[]): boolean {
  return (
    sections.length === 3 &&
    sections.reduce((total, section) => total + section.questions.length, 0) === 40 &&
    sections.every(
      (section) =>
        section.title.trim().length > 0 &&
        section.instructions.trim().length > 0 &&
        section.content.trim().length > 0 &&
        section.questions.every(
          (question) =>
            question.prompt.trim().length > 0 &&
            (question.options.length > 0
              ? question.correctOption !== null &&
                question.correctOption >= 0 &&
                question.options.every((option) => option.trim().length > 0)
              : question.answer.trim().length > 0),
        ),
    )
  );
}
