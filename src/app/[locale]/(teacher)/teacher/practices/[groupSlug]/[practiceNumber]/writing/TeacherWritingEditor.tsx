"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import { useMutation } from "@apollo/client/react";
import { useEffect, useMemo, useState } from "react";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import type { Locale } from "@/config/Locales";
import { getTeacherPracticesCopy } from "@/dictionaries/teacher/TeacherPractices";
import { getTeacherWritingAuthoringCopy } from "@/dictionaries/teacher/TeacherWritingAuthoring";
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

type TeacherWritingEditorProps = {
  initialVersion: TeacherTestAuthoringVersionFieldsFragment;
  locale: Locale;
  practiceHref: string;
  practiceNumber: number;
};

type WritingTask = {
  position: 1 | 2;
  prompt: string;
};

export function TeacherWritingEditor({
  initialVersion,
  locale,
  practiceHref,
  practiceNumber,
}: TeacherWritingEditorProps) {
  const labels = getTeacherWritingAuthoringCopy(locale);
  const practiceCopy = getTeacherPracticesCopy(locale);
  const confirm = useConfirmDialog();
  const initialTasks = useMemo(() => tasksFromVersion(initialVersion), [initialVersion]);
  const [version, setVersion] = useState(initialVersion);
  const [tasks, setTasks] = useState(initialTasks);
  const [baseline, setBaseline] = useState(() => JSON.stringify(initialTasks));
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
  const dirty = JSON.stringify(tasks) !== baseline;

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const updatePrompt = (position: 1 | 2, prompt: string) => {
    setTasks((current) =>
      current.map((item) => (item.position === position ? { ...item, prompt } : item)),
    );
    setSaveState("idle");
  };

  const clearTasks = () => {
    setTasks((current) => current.map((item) => ({ ...item, prompt: "" })));
    setSaveState("idle");
  };

  const save = async () => {
    if (saveState === "saving") return;
    if (!isComplete(tasks)) {
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
        if (!masked) throw new Error("The Writing draft was not created");
        workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, masked);
        setVersion(workingVersion);
      }

      for (const editorTask of tasks) {
        const section = workingVersion.sections.find(
          ({ position }) => position === editorTask.position,
        );
        const question = workingVersion.questions.find(
          ({ sectionPosition }) => sectionPosition === editorTask.position,
        );
        if (!section || !question) throw new Error("A Writing task is missing");
        const sectionResult = await updateSection({
          variables: {
            input: {
              mediaObjectId: section.mediaObjectId,
              minimumWords: editorTask.position === 1 ? 150 : 250,
              preparationSeconds: section.preparationSeconds,
              responseSeconds: section.responseSeconds,
              suggestedMinutes: editorTask.position === 1 ? 20 : 40,
              testSectionId: section.id,
              translations: section.translations.map((translation) => ({
                content: translation.content,
                instructions: translation.instructions,
                language: translation.language,
                title: translation.title,
              })),
            },
          },
        });
        const sectionMasked = sectionResult.data?.updateTestSection.testVersion;
        if (!sectionMasked) throw new Error("A Writing task was not saved");
        workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, sectionMasked);

        const questionResult = await updateQuestion({
          variables: {
            input: {
              acceptedAnswers: [],
              answerLimit: null,
              kind: "LONG_TEXT",
              maxSelections: null,
              options: [],
              questionId: question.id,
              sectionId: section.id,
              translations: question.translations.map((translation) => ({
                language: translation.language,
                prompt:
                  translation.language === workingVersion.primaryLanguage
                    ? editorTask.prompt.trim()
                    : translation.prompt,
                rationale: translation.rationale,
              })),
            },
          },
        });
        const questionMasked = questionResult.data?.updateTestQuestion.testVersion;
        if (!questionMasked) throw new Error("A Writing prompt was not saved");
        workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, questionMasked);
      }

      const result = await publishVersion({
        variables: { input: { testVersionId: workingVersion.id } },
      });
      const masked = result.data?.publishTestVersion.testVersion;
      if (!masked) throw new Error("The Writing test was not published");
      workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, masked);
      setVersion(workingVersion);
      setBaseline(JSON.stringify(tasks));
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  };

  if (tasks.length !== 2) {
    return <p className="teacherWritingAuthoring__empty">{labels.empty}</p>;
  }

  return (
    <main className="teacherPractices__detail teacherWritingAuthoring">
      <header className="teacherPractices__header">
        <ScrollToTopLink
          aria-label={practiceCopy.backToPractice}
          className="teacherGroups__backLink"
          href={practiceHref}
        >
          <ArrowBackRounded aria-hidden="true" />
        </ScrollToTopLink>
        <div className="teacherPractices__heading">
          <span>WRITING</span>
          <h1>
            {practiceCopy.practiceTitle} {practiceNumber}
          </h1>
        </div>
      </header>

      <div className="teacherPractices__detailToolbar">
        <span className="teacherWritingAuthoring__subtitle">{labels.questions}</span>
        <div
          aria-label={practiceCopy.skillActions}
          className="teacherPractices__actions"
          role="group"
        >
          <button aria-label={labels.clear} data-action="delete" onClick={clearTasks} type="button">
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

      <div className="teacherWritingAuthoring__tasks">
        {tasks.map((item) => (
          <section className="teacherWritingAuthoring__panel" key={item.position}>
            <div className="teacherReading__panelHeading teacherWritingAuthoring__panelHeading">
              <div>
                <span>{labels.task.replace("{number}", String(item.position))}</span>
              </div>
              {dirty ? <small>{labels.unsaved}</small> : null}
            </div>
            <div className="teacherWritingAuthoring__question">
              <textarea
                aria-label={labels.task.replace("{number}", String(item.position))}
                onChange={(event) => updatePrompt(item.position, event.target.value)}
                rows={6}
                value={item.prompt}
              />
            </div>
          </section>
        ))}
      </div>

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

function tasksFromVersion(version: TeacherTestAuthoringVersionFieldsFragment): WritingTask[] {
  return version.sections.flatMap((section): WritingTask[] => {
    if (section.position < 1 || section.position > 2) return [];
    const question = version.questions.find(
      ({ sectionPosition }) => sectionPosition === section.position,
    );
    return [
      {
        position: section.position as 1 | 2,
        prompt:
          question?.translations.find(({ language }) => language === version.primaryLanguage)
            ?.prompt ?? "",
      },
    ];
  });
}

function isComplete(tasks: WritingTask[]): boolean {
  return (
    tasks.length === 2 &&
    tasks.every((task, index) => task.position === index + 1 && task.prompt.trim().length > 0)
  );
}
