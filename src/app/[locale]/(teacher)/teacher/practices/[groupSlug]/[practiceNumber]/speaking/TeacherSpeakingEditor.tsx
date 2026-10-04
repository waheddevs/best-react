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
import { getTeacherSpeakingAuthoringCopy } from "@/dictionaries/teacher/TeacherSpeakingAuthoring";
import { useFragment as readFragment } from "@/gql/fragment-masking";
import {
  TeacherCreateNextTestVersionDocument,
  TeacherPublishTestVersionDocument,
  TeacherTestAuthoringVersionFieldsFragmentDoc,
  TeacherUpdateTestQuestionDocument,
  TeacherUpdateTestSectionDocument,
  type TeacherTestAuthoringVersionFieldsFragment,
} from "@/gql/graphql";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";

type TeacherSpeakingEditorProps = {
  initialVersion: TeacherTestAuthoringVersionFieldsFragment;
  locale: Locale;
  practiceHref: string;
  practiceNumber: number;
};

type SpeakingQuestion = { position: number; prompt: string };
type SpeakingSection = {
  content: string;
  instructions: string;
  position: 1 | 2 | 3;
  questions: SpeakingQuestion[];
  title: string;
};

export function TeacherSpeakingEditor({
  initialVersion,
  locale,
  practiceHref,
  practiceNumber,
}: TeacherSpeakingEditorProps) {
  const labels = getTeacherSpeakingAuthoringCopy(locale);
  const practiceCopy = getTeacherPracticesCopy(locale);
  const confirm = useConfirmDialog();
  const initialSections = useMemo(() => sectionsFromVersion(initialVersion), [initialVersion]);
  const [version, setVersion] = useState(initialVersion);
  const [sections, setSections] = useState(initialSections);
  const [baseline, setBaseline] = useState(() => JSON.stringify(initialSections));
  const [activePart, setActivePart] = useState<1 | 2 | 3>(1);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error" | "validation">(
    "idle",
  );
  const [createNextVersion] = useMutation(TeacherCreateNextTestVersionDocument, {
    context: { authenticated: true },
  });
  const [updateSection] = useMutation(TeacherUpdateTestSectionDocument, {
    context: { authenticated: true },
  });
  const [updateQuestion] = useMutation(TeacherUpdateTestQuestionDocument, {
    context: { authenticated: true },
  });
  const [publishVersion] = useMutation(TeacherPublishTestVersionDocument, {
    context: { authenticated: true },
  });
  const activeSection = sections.find(({ position }) => position === activePart) ?? null;
  const dirty = JSON.stringify(sections) !== baseline;

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const updateActiveSection = (
    values: Partial<Pick<SpeakingSection, "title" | "instructions" | "content">>,
  ) => {
    setSections((current) =>
      current.map((section) =>
        section.position === activePart ? { ...section, ...values } : section,
      ),
    );
    setSaveState("idle");
  };

  const updatePrompt = (position: number, prompt: string) => {
    setSections((current) =>
      current.map((section) => ({
        ...section,
        questions: section.questions.map((question) =>
          question.position === position ? { ...question, prompt } : question,
        ),
      })),
    );
    setSaveState("idle");
  };

  const clearActivePart = () => {
    setSections((current) =>
      current.map((section) =>
        section.position === activePart
          ? {
              ...section,
              title: "",
              instructions: "",
              content: "",
              questions: section.questions.map((question) => ({ ...question, prompt: "" })),
            }
          : section,
      ),
    );
    setSaveState("idle");
  };

  const save = async () => {
    if (saveState === "saving") return;
    if (!isComplete(sections)) {
      setSaveState("validation");
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
        if (!masked) throw new Error("The Speaking draft was not created");
        workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, masked);
        setVersion(workingVersion);
      }

      for (const editorSection of sections) {
        const section = workingVersion.sections.find(
          ({ position }) => position === editorSection.position,
        );
        if (!section) throw new Error("A Speaking part is missing");
        const sectionResult = await updateSection({
          variables: {
            input: {
              mediaObjectId: section.mediaObjectId,
              minimumWords: section.minimumWords,
              preparationSeconds:
                editorSection.position === 2
                  ? (section.preparationSeconds ?? 60)
                  : section.preparationSeconds,
              responseSeconds:
                editorSection.position === 2
                  ? (section.responseSeconds ?? 120)
                  : section.responseSeconds,
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
        if (!sectionMasked) throw new Error("A Speaking part was not saved");
        workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, sectionMasked);

        for (const editorQuestion of editorSection.questions) {
          const question = workingVersion.questions.find(
            ({ position }) => position === editorQuestion.position,
          );
          if (!question) throw new Error("A Speaking question is missing");
          const questionResult = await updateQuestion({
            variables: {
              input: {
                acceptedAnswers: [],
                answerLimit: null,
                kind: "AUDIO_RESPONSE",
                maxSelections: null,
                options: [],
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
          if (!questionMasked) throw new Error("A Speaking question was not saved");
          workingVersion = readFragment(
            TeacherTestAuthoringVersionFieldsFragmentDoc,
            questionMasked,
          );
        }
      }

      const result = await publishVersion({
        variables: { input: { testVersionId: workingVersion.id } },
      });
      const masked = result.data?.publishTestVersion.testVersion;
      if (!masked) throw new Error("The Speaking test was not published");
      workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, masked);
      setVersion(workingVersion);
      setBaseline(JSON.stringify(sections));
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  };

  if (!activeSection || sections.length !== 3) {
    return <p className="teacherSpeakingAuthoring__empty">{labels.empty}</p>;
  }

  return (
    <main className="teacherPractices__detail teacherSpeakingAuthoring">
      <header className="teacherPractices__header">
        <ScrollToTopLink
          aria-label={practiceCopy.backToPractice}
          className="teacherGroups__backLink"
          href={practiceHref}
        >
          <ArrowBackRounded aria-hidden="true" />
        </ScrollToTopLink>
        <div className="teacherPractices__heading">
          <span>SPEAKING</span>
          <h1>
            {practiceCopy.practiceTitle} {practiceNumber}
          </h1>
        </div>
      </header>

      <div className="teacherPractices__detailToolbar">
        <Tabs
          aria-label="Speaking parts"
          className="teacherGroups__categoryTabs teacherGroups__workspaceNav teacherPractices__partTabs"
          component="nav"
          onChange={(_, value: string) => setActivePart(Number(value.slice(-1)) as 1 | 2 | 3)}
          scrollButtons={false}
          value={`part-${String(activePart)}`}
          variant="scrollable"
        >
          {([1, 2, 3] as const).map((part) => (
            <Tab
              className="teacherGroups__categoryTab"
              key={part}
              label={
                <span className="teacherGroups__categoryName">
                  {labels.part.replace("{number}", String(part))}
                </span>
              }
              value={`part-${String(part)}`}
            />
          ))}
        </Tabs>
        <div
          aria-label={practiceCopy.skillActions}
          className="teacherPractices__actions"
          role="group"
        >
          <button
            aria-label={labels.clear}
            data-action="delete"
            onClick={clearActivePart}
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

      <section className="teacherListening__intro teacherSpeakingAuthoring__intro">
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

      <section className="teacherSpeakingAuthoring__panel">
        <div className="teacherReading__panelHeading">
          <div>
            <span>{activePart === 2 ? labels.cueCard : labels.questions}</span>
            <h2>{activeSection.title}</h2>
          </div>
          {dirty ? <small>{labels.unsaved}</small> : null}
        </div>
        {activePart === 2 ? (
          <label className="teacherSpeakingAuthoring__content">
            <span>{labels.content}</span>
            <textarea
              onChange={(event) => updateActiveSection({ content: event.target.value })}
              rows={3}
              value={activeSection.content}
            />
          </label>
        ) : null}
        <div className="teacherSpeakingAuthoring__questions">
          {activeSection.questions.map((question) => (
            <label className="teacherSpeakingAuthoring__question" key={question.position}>
              <span>
                {activePart === 2
                  ? labels.cueCard
                  : labels.question.replace("{number}", String(question.position))}
              </span>
              <textarea
                onChange={(event) => updatePrompt(question.position, event.target.value)}
                rows={activePart === 2 ? 5 : 2}
                value={question.prompt}
              />
            </label>
          ))}
        </div>
      </section>

      <p aria-live="polite" className={`teacherListening__saveStatus is-${saveState}`}>
        {saveState === "saving"
          ? labels.saving
          : saveState === "saved"
            ? labels.saved
            : saveState === "error"
              ? labels.error
              : saveState === "validation"
                ? labels.validation
                : ""}
      </p>
    </main>
  );
}

function sectionsFromVersion(
  version: TeacherTestAuthoringVersionFieldsFragment,
): SpeakingSection[] {
  return version.sections.flatMap((section): SpeakingSection[] => {
    if (section.position < 1 || section.position > 3) return [];
    const translation = section.translations.find(
      ({ language }) => language === version.primaryLanguage,
    );
    return [
      {
        content: translation?.content ?? "",
        instructions: translation?.instructions ?? "",
        position: section.position as 1 | 2 | 3,
        questions: version.questions
          .filter(({ sectionPosition }) => sectionPosition === section.position)
          .sort((left, right) => left.position - right.position)
          .map((question) => ({
            position: question.position,
            prompt:
              question.translations.find(({ language }) => language === version.primaryLanguage)
                ?.prompt ?? "",
          })),
        title: translation?.title ?? "",
      },
    ];
  });
}

function isComplete(sections: SpeakingSection[]): boolean {
  return (
    sections.length === 3 &&
    sections.every(
      (section, index) =>
        section.position === index + 1 &&
        section.title.trim().length > 0 &&
        section.instructions.trim().length > 0 &&
        (section.position === 2 ? section.questions.length === 1 : section.questions.length > 0) &&
        section.questions.every(({ prompt }) => prompt.trim().length > 0),
    )
  );
}
