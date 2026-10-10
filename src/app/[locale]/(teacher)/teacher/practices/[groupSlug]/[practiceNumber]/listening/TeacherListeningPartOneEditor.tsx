"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import GraphicEqRounded from "@mui/icons-material/GraphicEqRounded";
import HeadphonesRounded from "@mui/icons-material/HeadphonesRounded";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import { useMutation } from "@apollo/client/react";
import { useEffect, useMemo, useState } from "react";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import type { Locale } from "@/config/Locales";
import { getTeacherListeningCopy } from "@/dictionaries/teacher/TeacherListening";
import { getTeacherPracticesCopy } from "@/dictionaries/teacher/TeacherPractices";
import { useFragment as readFragment } from "@/gql/fragment-masking";
import {
  TeacherCreateNextTestVersionDocument,
  TeacherGenerateListeningAudioDocument,
  TeacherListeningAudioDownloadDocument,
  TeacherPublishTestVersionDocument,
  TeacherTestAuthoringVersionFieldsFragmentDoc,
  TeacherUpdateTestQuestionDocument,
  TeacherUpdateTestSectionBlockDocument,
  TeacherUpdateTestSectionDocument,
  type TeacherTestAuthoringVersionFieldsFragment,
} from "@/gql/graphql";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { getTeacherTestAuthoringError } from "@/lib/teacher/TeacherTestAuthoringError";

import { TeacherListeningPartTabs } from "./TeacherListeningPartTabs";

type TeacherListeningPartOneEditorProps = {
  initialVersion: TeacherTestAuthoringVersionFieldsFragment;
  locale: Locale;
  practiceHref: string;
  practiceNumber: number;
};

type EditorRow = {
  answer: string;
  key: string;
  position: number | null;
  question: string;
};

type EditorState = {
  instructions: string;
  limits: Record<number, number>;
  rows: EditorRow[];
  title: string;
  transcript: string;
};

type AudioPreview = {
  durationSeconds: number;
  expiresAt: string;
  mediaObjectId: string;
  transcript: string;
  url: string;
};

const questionToken = /\{\{(\d+)\}\}/;
const publishConfirmation = {
  confirmLabel: "Save and publish",
  message: "If you save, the test will be published also, are you sure to publish?",
  title: "Save and publish",
} as const;

export function TeacherListeningPartOneEditor({
  initialVersion,
  locale,
  practiceHref,
  practiceNumber,
}: TeacherListeningPartOneEditorProps) {
  const labels = getTeacherListeningCopy(locale);
  const practiceCopy = getTeacherPracticesCopy(locale);
  const confirm = useConfirmDialog();
  const [version, setVersion] = useState(initialVersion);
  const [saveError, setSaveError] = useState<string | null>(null);
  const initialState = useMemo(() => editorStateFromVersion(initialVersion), [initialVersion]);
  const [editor, setEditor] = useState(initialState);
  const [baseline, setBaseline] = useState(() => JSON.stringify(initialState));
  const [savedTranscript, setSavedTranscript] = useState(initialState.transcript.trim());
  const [audioPreview, setAudioPreview] = useState<AudioPreview | null>(null);
  const [audioConfirmed, setAudioConfirmed] = useState(false);
  const [attachedAudioUrl, setAttachedAudioUrl] = useState<string | null>(null);
  const [audioState, setAudioState] = useState<"error" | "generating" | "idle" | "ready">("idle");
  const [saveState, setSaveState] = useState<"error" | "idle" | "saved" | "saving" | "validation">(
    "idle",
  );
  const [createNextVersion] = useMutation(TeacherCreateNextTestVersionDocument, {
    context: { authenticated: true },
  });
  const [generateAudio] = useMutation(TeacherGenerateListeningAudioDocument, {
    context: { authenticated: true },
  });
  const [createAudioDownload] = useMutation(TeacherListeningAudioDownloadDocument, {
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
  const serializedEditor = JSON.stringify(editor);
  const partOne = version.sections.find(({ position }) => position === 1) ?? null;
  const tableBlock = partOne?.blocks.find(({ kind }) => kind === "TABLE") ?? null;
  const dirty = serializedEditor !== baseline || audioPreview !== null;
  const audioSource = audioPreview?.url ?? (partOne?.mediaObjectId ? attachedAudioUrl : null);

  useEffect(() => {
    const mediaObjectId = partOne?.mediaObjectId;
    if (!mediaObjectId) return;

    let active = true;
    void createAudioDownload({ variables: { input: { mediaObjectId } } })
      .then((result) => {
        const url = result.data?.createMediaDownloadIntent.downloadIntent.url;
        if (active && url) setAttachedAudioUrl(url);
      })
      .catch(() => {
        if (active) setAttachedAudioUrl(null);
      });

    return () => {
      active = false;
    };
  }, [createAudioDownload, partOne?.mediaObjectId]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const setRow = (key: string, values: Partial<EditorRow>) =>
    setEditor((current) => ({
      ...current,
      rows: current.rows.map((row) => (row.key === key ? { ...row, ...values } : row)),
    }));

  const clearEditor = () => {
    setEditor((current) => ({
      ...current,
      instructions: "",
      rows: current.rows.map((row) => ({ ...row, answer: "", question: "" })),
      title: "",
      transcript: "",
    }));
    setAudioPreview(null);
    setAudioConfirmed(false);
    setAudioState("idle");
    setSaveState("idle");
  };

  const save = async () => {
    if (!partOne || !tableBlock || saveState === "saving") return;
    const isComplete =
      editor.title.trim().length > 0 &&
      editor.instructions.trim().length > 0 &&
      editor.transcript.trim().length > 0 &&
      editor.rows.every((row) => row.question.trim().length > 0 && row.answer.trim().length > 0);
    if (!isComplete) {
      setSaveState("validation");
      return;
    }
    const transcriptChanged = editor.transcript.trim() !== savedTranscript;
    const needsConfirmedAudio =
      (!partOne.mediaObjectId || transcriptChanged || audioPreview !== null) &&
      (!audioPreview || !audioConfirmed || audioPreview.transcript !== editor.transcript.trim());
    if (needsConfirmedAudio) {
      setSaveState("validation");
      return;
    }
    const accepted = await confirm({
      cancelLabel: practiceCopy.cancel,
      confirmLabel: publishConfirmation.confirmLabel,
      message: publishConfirmation.message,
      title: publishConfirmation.title,
    });
    if (!accepted) return;

    setSaveError(null);
    setSaveState("saving");
    try {
      let workingVersion = version;
      if (workingVersion.status === "PUBLISHED") {
        const created = await createNextVersion({
          variables: { input: { testId: workingVersion.testId } },
        });
        const masked = created.data?.createNextTestVersion.testVersion;
        if (!masked) throw new Error("The editable Listening draft was not created");
        workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, masked);
        setVersion(workingVersion);
      }

      let workingSection = workingVersion.sections.find(({ position }) => position === 1);
      let workingBlock = workingSection?.blocks.find(({ kind }) => kind === "TABLE");
      if (!workingSection || !workingBlock) {
        throw new Error("The Phone interview table is unavailable");
      }

      const sectionResult = await updateSection({
        variables: {
          input: {
            mediaObjectId:
              audioPreview && audioConfirmed
                ? audioPreview.mediaObjectId
                : workingSection.mediaObjectId,
            minimumWords: workingSection.minimumWords,
            preparationSeconds: workingSection.preparationSeconds,
            responseSeconds: workingSection.responseSeconds,
            suggestedMinutes: workingSection.suggestedMinutes,
            testSectionId: workingSection.id,
            translations: workingSection.translations.map((translation) => ({
              content:
                translation.language === workingVersion.primaryLanguage
                  ? editor.transcript.trim() || null
                  : translation.content,
              instructions:
                translation.language === workingVersion.primaryLanguage
                  ? editor.instructions
                  : translation.instructions,
              language: translation.language,
              title:
                translation.language === workingVersion.primaryLanguage
                  ? editor.title
                  : translation.title,
            })),
          },
        },
      });
      const sectionMasked = sectionResult.data?.updateTestSection.testVersion;
      if (!sectionMasked) throw new Error("The Listening section was not saved");
      workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, sectionMasked);
      workingSection = workingVersion.sections.find(({ position }) => position === 1);
      workingBlock = workingSection?.blocks.find(({ kind }) => kind === "TABLE");
      if (!workingSection || !workingBlock) {
        throw new Error("The saved Phone interview table is unavailable");
      }

      const blockResult = await updateBlock({
        variables: {
          input: {
            kind: "TABLE",
            questionIds: [],
            tableHeaderRows: workingBlock.tableHeaderRows,
            tableRows: editor.rows.map((row) => ({
              cells: [row.question.trim(), serializeRowValue(row)],
            })),
            testSectionBlockId: workingBlock.id,
            translations: workingBlock.translations.map((translation) => ({
              altText: translation.altText,
              caption:
                translation.language === workingVersion.primaryLanguage
                  ? editor.title
                  : translation.caption,
              language: translation.language,
              text: translation.text,
            })),
          },
        },
      });
      const blockMasked = blockResult.data?.updateTestSectionBlock.testVersion;
      if (!blockMasked) throw new Error("The Phone interview table was not saved");
      workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, blockMasked);

      for (const row of editor.rows) {
        if (row.position === null) continue;
        const question = workingVersion.questions.find(({ position }) => position === row.position);
        if (!question) throw new Error(`Question ${String(row.position)} was not found`);
        const result = await updateQuestion({
          variables: {
            input: {
              acceptedAnswers: [row.answer.trim()],
              answerLimit: editor.limits[row.position] ?? question.answerLimit,
              kind: question.kind,
              maxSelections: question.maxSelections,
              options: question.options.map((option) => ({
                isCorrect: option.isCorrect,
                translations: option.translations.map(({ language, text }) => ({ language, text })),
              })),
              questionId: question.id,
              sectionId: question.sectionId,
              translations: question.translations.map((translation) => ({
                language: translation.language,
                prompt:
                  translation.language === workingVersion.primaryLanguage
                    ? `${row.question.trim()}: ___`
                    : translation.prompt,
                rationale: translation.rationale,
              })),
            },
          },
        });
        const questionMasked = result.data?.updateTestQuestion.testVersion;
        if (!questionMasked) throw new Error("The answer was not saved");
        workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, questionMasked);
      }

      const published = await publishVersion({
        variables: { input: { testVersionId: workingVersion.id } },
      });
      const publishedMasked = published.data?.publishTestVersion.testVersion;
      if (!publishedMasked) throw new Error("The Listening test was not published");
      workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, publishedMasked);

      setVersion(workingVersion);
      setBaseline(JSON.stringify(editor));
      setSavedTranscript(editor.transcript.trim());
      if (audioPreview && audioConfirmed) {
        setAttachedAudioUrl(audioPreview.url);
        setAudioPreview(null);
        setAudioConfirmed(false);
        setAudioState("idle");
      }
      setSaveState("saved");
    } catch (error: unknown) {
      setSaveError(getTeacherTestAuthoringError(error, labels.saveError));
      setSaveState("error");
    }
  };

  if (!partOne || !tableBlock || editor.rows.length === 0) {
    return <p className="teacherListening__empty">{labels.empty}</p>;
  }

  const requestAudioGeneration = async () => {
    if (audioState === "generating" || editor.transcript.trim().length === 0) return;
    const transcript = editor.transcript.trim();
    setAudioState("generating");
    setAudioConfirmed(false);
    setSaveState("idle");

    try {
      let workingVersion = version;
      if (workingVersion.status === "PUBLISHED") {
        const created = await createNextVersion({
          variables: { input: { testId: workingVersion.testId } },
        });
        const masked = created.data?.createNextTestVersion.testVersion;
        if (!masked) throw new Error("The editable Listening draft was not created");
        workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, masked);
        setVersion(workingVersion);
      }

      const workingSection = workingVersion.sections.find(({ position }) => position === 1);
      if (!workingSection) throw new Error("Listening Part 1 is unavailable");
      const generated = await generateAudio({
        variables: { input: { testSectionId: workingSection.id, transcript } },
      });
      const audio = generated.data?.generateListeningAudio.audio;
      if (!audio) throw new Error("Listening audio was not generated");

      setAudioPreview({ ...audio, transcript });
      setAudioState("ready");
    } catch {
      setAudioPreview(null);
      setAudioState("error");
    }
  };

  return (
    <main className="teacherPractices__detail teacherListening">
      <header className="teacherPractices__header">
        <ScrollToTopLink
          aria-label={practiceCopy.backToPractice}
          className="teacherGroups__backLink"
          href={practiceHref}
        >
          <ArrowBackRounded aria-hidden="true" />
        </ScrollToTopLink>

        <div className="teacherPractices__heading">
          <span>LISTENING</span>
          <h1>
            {practiceCopy.practiceTitle} {practiceNumber}
          </h1>
        </div>
      </header>

      <div className="teacherPractices__detailToolbar">
        <TeacherListeningPartTabs activePart={1} practiceHref={practiceHref} />
        <div
          aria-label={practiceCopy.skillActions}
          className="teacherPractices__actions"
          role="group"
        >
          <button
            aria-label={practiceCopy.deleteSkill}
            data-action="delete"
            onClick={clearEditor}
            type="button"
          >
            <DeleteOutlineRounded aria-hidden="true" />
          </button>
          <button
            aria-label={labels.save}
            data-action="save"
            disabled={
              !dirty ||
              saveState === "saving" ||
              audioState === "generating" ||
              (audioPreview !== null && !audioConfirmed)
            }
            onClick={() => void save()}
            type="button"
          >
            <SaveOutlined aria-hidden="true" />
          </button>
        </div>
      </div>

      <section className="teacherListening__intro">
        <div>
          <input
            aria-label={labels.title}
            onChange={(event) =>
              setEditor((current) => ({ ...current, title: event.target.value }))
            }
            value={editor.title}
          />
        </div>
        <textarea
          aria-label={labels.instructions}
          onChange={(event) =>
            setEditor((current) => ({ ...current, instructions: event.target.value }))
          }
          rows={2}
          value={editor.instructions}
        />
      </section>

      <section className="teacherListening__panel">
        <div className="teacherListening__panelHeading">
          <div>
            <span>{labels.formTable}</span>
            <h2>{editor.title}</h2>
          </div>
          {dirty ? <small>{labels.unsaved}</small> : null}
        </div>

        <div className="teacherListening__tableWrap">
          <table className="teacherListening__editorTable">
            <thead>
              <tr>
                <th aria-label={labels.number}>{labels.numberShort}</th>
                <th>{labels.question}</th>
                <th>{labels.answer}</th>
              </tr>
            </thead>
            <tbody>
              {editor.rows.map((row) => (
                <tr key={row.key}>
                  <td>
                    <span
                      className={
                        row.position === null
                          ? "teacherListening__rowLabel teacherListening__rowLabel--example"
                          : "teacherListening__rowLabel"
                      }
                    >
                      {row.position ?? labels.example}
                    </span>
                  </td>
                  <td>
                    <input
                      aria-label={`${labels.question} ${row.position ?? labels.example}`}
                      onChange={(event) => setRow(row.key, { question: event.target.value })}
                      value={row.question}
                    />
                  </td>
                  <td>
                    <input
                      aria-label={`${labels.answer} ${row.position ?? labels.example}`}
                      onChange={(event) => setRow(row.key, { answer: event.target.value })}
                      value={row.answer}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="teacherListening__audioPanel">
        <div className="teacherListening__audioHeading">
          <div className="teacherListening__audioStatus">
            <HeadphonesRounded aria-hidden="true" />
            <div>
              <strong>{labels.audioTitle}</strong>
              <span>
                {audioPreview
                  ? labels.audioPreviewReady
                  : partOne.mediaObjectId
                    ? labels.audioReady
                    : labels.audioPending}
              </span>
            </div>
          </div>
          <button
            disabled={audioState === "generating" || editor.transcript.trim().length === 0}
            onClick={() => void requestAudioGeneration()}
            type="button"
          >
            <GraphicEqRounded aria-hidden="true" />
            {labels.createAudio}
          </button>
        </div>
        <label htmlFor="teacher-listening-transcript">{labels.transcript}</label>
        <textarea
          id="teacher-listening-transcript"
          onChange={(event) => {
            setEditor((current) => ({ ...current, transcript: event.target.value }));
            setAudioPreview(null);
            setAudioConfirmed(false);
            setAudioState("idle");
          }}
          placeholder={labels.transcriptPlaceholder}
          rows={8}
          value={editor.transcript}
        />
        {audioSource ? (
          <div className="teacherListening__audioPreview">
            <audio controls preload="metadata" src={audioSource}>
              {labels.audioPlaybackUnsupported}
            </audio>
            {audioPreview ? (
              <label>
                <input
                  checked={audioConfirmed}
                  onChange={(event) => setAudioConfirmed(event.target.checked)}
                  type="checkbox"
                />
                <span>{labels.audioConfirm}</span>
              </label>
            ) : null}
          </div>
        ) : null}
        <p aria-live="polite" className={`teacherListening__audioMessage is-${audioState}`}>
          {audioState === "generating"
            ? labels.audioGenerating
            : audioState === "ready"
              ? audioConfirmed
                ? labels.audioConfirmed
                : labels.audioConfirmRequired
              : audioState === "error"
                ? labels.audioGenerationError
                : ""}
        </p>
      </section>

      <p aria-live="polite" className={`teacherListening__saveStatus is-${saveState}`}>
        {saveState === "saving"
          ? labels.saving
          : saveState === "saved"
            ? labels.saved
            : saveState === "error"
              ? saveError ?? labels.saveError
              : saveState === "validation"
                ? labels.validationError
                : ""}
      </p>
    </main>
  );
}

function editorStateFromVersion(version: TeacherTestAuthoringVersionFieldsFragment): EditorState {
  const section = version.sections.find(({ position }) => position === 1);
  const translation = section?.translations.find(
    ({ language }) => language === version.primaryLanguage,
  );
  const table = section?.blocks.find(({ kind }) => kind === "TABLE");
  const sectionQuestions = version.questions.filter(({ sectionPosition }) => sectionPosition === 1);
  const rows = (table?.tableRows ?? []).flatMap(({ cells }): EditorRow[] => {
    const question = cells[0] ?? "";
    const match = questionToken.exec(cells[1] ?? "");
    if (!match) return [];

    const position = Number(match[1]);
    const savedQuestion =
      sectionQuestions.find((candidate) => candidate.position === position) ?? null;
    return [
      {
        answer: savedQuestion?.acceptedAnswers[0] ?? "",
        key: `question-${String(position)}`,
        position,
        question,
      },
    ];
  });
  return {
    instructions: translation?.instructions ?? "",
    limits: Object.fromEntries(
      sectionQuestions.map((question) => [question.position, question.answerLimit ?? 2]),
    ),
    rows,
    title: translation?.title ?? "Phone interview",
    transcript: translation?.content ?? "",
  };
}

function serializeRowValue(row: EditorRow): string {
  if (row.position === null) return row.answer.trim();
  return `{{${String(row.position)}}}`;
}
