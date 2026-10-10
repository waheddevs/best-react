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
import { getTeacherListeningPartFourCopy } from "@/dictionaries/teacher/TeacherListeningPartFour";
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

type TeacherListeningPartFourEditorProps = {
  initialVersion: TeacherTestAuthoringVersionFieldsFragment;
  locale: Locale;
  practiceHref: string;
  practiceNumber: number;
};

type NoteRow = {
  after: string;
  answer: string;
  before: string;
  position: number;
};

type TableRow = {
  answer: string;
  description: string;
  factor: string;
  position: number;
};

type EditorState = {
  instructions: string;
  noteRows: NoteRow[];
  tableRows: TableRow[];
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

const partTitlePrefix = /^part\s*4\s*[\u2014\u2013-]\s*/iu;
const questionToken = /\{\{(\d+)\}\}/u;

export function TeacherListeningPartFourEditor({
  initialVersion,
  locale,
  practiceHref,
  practiceNumber,
}: TeacherListeningPartFourEditorProps) {
  const labels = getTeacherListeningCopy(locale);
  const partCopy = getTeacherListeningPartFourCopy(locale);
  const practiceCopy = getTeacherPracticesCopy(locale);
  const confirm = useConfirmDialog();
  const initialState = useMemo(() => stateFromVersion(initialVersion), [initialVersion]);
  const [version, setVersion] = useState(initialVersion);
  const [saveError, setSaveError] = useState<string | null>(null);
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
  const partFour = version.sections.find(({ position }) => position === 4) ?? null;
  const tableBlocks = (partFour?.blocks ?? [])
    .filter(({ kind }) => kind === "TABLE")
    .toSorted((left, right) => left.position - right.position);
  const dirty = JSON.stringify(editor) !== baseline || audioPreview !== null;
  const audioSource = audioPreview?.url ?? (partFour?.mediaObjectId ? attachedAudioUrl : null);

  useEffect(() => {
    const mediaObjectId = partFour?.mediaObjectId;
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
  }, [createAudioDownload, partFour?.mediaObjectId]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const setNoteRow = (position: number, values: Partial<NoteRow>) => {
    setEditor((current) => ({
      ...current,
      noteRows: current.noteRows.map((row) =>
        row.position === position ? { ...row, ...values } : row,
      ),
    }));
    setSaveState("idle");
  };

  const setTableRow = (position: number, values: Partial<TableRow>) => {
    setEditor((current) => ({
      ...current,
      tableRows: current.tableRows.map((row) =>
        row.position === position ? { ...row, ...values } : row,
      ),
    }));
    setSaveState("idle");
  };

  const clearEditor = () => {
    setEditor((current) => ({
      instructions: "",
      noteRows: current.noteRows.map((row) => ({ ...row, after: "", answer: "", before: "" })),
      tableRows: current.tableRows.map((row) => ({
        ...row,
        answer: "",
        description: "",
        factor: "",
      })),
      title: "",
      transcript: "",
    }));
    setAudioPreview(null);
    setAudioConfirmed(false);
    setAudioState("idle");
    setSaveState("idle");
  };

  const save = async () => {
    if (!partFour || tableBlocks.length < 2 || saveState === "saving") return;
    const isComplete =
      editor.title.trim().length > 0 &&
      editor.instructions.trim().length > 0 &&
      editor.transcript.trim().length > 0 &&
      editor.noteRows.length === 5 &&
      editor.noteRows.every(
        ({ after, answer, before }) =>
          answer.trim().length > 0 && (before.trim().length > 0 || after.trim().length > 0),
      ) &&
      editor.tableRows.length === 5 &&
      editor.tableRows.every(
        ({ answer, description, factor }) =>
          answer.trim().length > 0 && description.trim().length > 0 && factor.trim().length > 0,
      );
    if (!isComplete) {
      setSaveState("validation");
      return;
    }
    const transcriptChanged = editor.transcript.trim() !== savedTranscript;
    const needsConfirmedAudio =
      (!partFour.mediaObjectId || transcriptChanged || audioPreview !== null) &&
      (!audioPreview || !audioConfirmed || audioPreview.transcript !== editor.transcript.trim());
    if (needsConfirmedAudio) {
      setSaveState("validation");
      return;
    }
    const accepted = await confirm({
      cancelLabel: practiceCopy.cancel,
      confirmLabel: partCopy.publishConfirm,
      message: partCopy.publishMessage,
      title: partCopy.publishTitle,
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

      let workingSection = workingVersion.sections.find(({ position }) => position === 4);
      if (!workingSection) throw new Error("Listening Part 4 is unavailable");
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
                  ? editor.transcript.trim()
                  : translation.content,
              instructions:
                translation.language === workingVersion.primaryLanguage
                  ? editor.instructions.trim()
                  : translation.instructions,
              language: translation.language,
              title:
                translation.language === workingVersion.primaryLanguage
                  ? editor.title.trim()
                  : translation.title,
            })),
          },
        },
      });
      const sectionMasked = sectionResult.data?.updateTestSection.testVersion;
      if (!sectionMasked) throw new Error("Listening Part 4 was not saved");
      workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, sectionMasked);
      workingSection = workingVersion.sections.find(({ position }) => position === 4);
      let workingBlocks = (workingSection?.blocks ?? [])
        .filter(({ kind }) => kind === "TABLE")
        .toSorted((left, right) => left.position - right.position);
      if (!workingSection || workingBlocks.length < 2) {
        throw new Error("Listening Part 4 completion tables are unavailable");
      }

      const noteBlockResult = await updateBlock({
        variables: {
          input: {
            kind: "TABLE",
            questionIds: [],
            tableHeaderRows: workingBlocks[0].tableHeaderRows,
            tableRows: editor.noteRows.map((row) => ({
              cells: [row.before.trim(), `{{${String(row.position)}}}`, row.after.trim()],
            })),
            testSectionBlockId: workingBlocks[0].id,
            translations: workingBlocks[0].translations.map((translation) => ({
              altText: translation.altText,
              caption: translation.caption,
              language: translation.language,
              text: translation.text,
            })),
          },
        },
      });
      const noteMasked = noteBlockResult.data?.updateTestSectionBlock.testVersion;
      if (!noteMasked) throw new Error("The Part 4 notes were not saved");
      workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, noteMasked);
      workingSection = workingVersion.sections.find(({ position }) => position === 4);
      workingBlocks = (workingSection?.blocks ?? [])
        .filter(({ kind }) => kind === "TABLE")
        .toSorted((left, right) => left.position - right.position);
      if (!workingSection || workingBlocks.length < 2) {
        throw new Error("The saved Part 4 table is unavailable");
      }

      const tableBlockResult = await updateBlock({
        variables: {
          input: {
            kind: "TABLE",
            questionIds: [],
            tableHeaderRows: workingBlocks[1].tableHeaderRows,
            tableRows: editor.tableRows.map((row) => ({
              cells: [row.factor.trim(), row.description.trim(), `{{${String(row.position)}}}`],
            })),
            testSectionBlockId: workingBlocks[1].id,
            translations: workingBlocks[1].translations.map((translation) => ({
              altText: translation.altText,
              caption: translation.caption,
              language: translation.language,
              text: translation.text,
            })),
          },
        },
      });
      const tableMasked = tableBlockResult.data?.updateTestSectionBlock.testVersion;
      if (!tableMasked) throw new Error("The Part 4 table was not saved");
      workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, tableMasked);

      for (const row of [...editor.noteRows, ...editor.tableRows]) {
        const question = workingVersion.questions.find(({ position }) => position === row.position);
        if (!question) throw new Error(`Question ${String(row.position)} was not found`);
        const prompt =
          "before" in row
            ? `${row.before.trim()} ___ ${row.after.trim()}`.trim()
            : `${row.factor.trim()}: ${row.description.trim()}`;
        const result = await updateQuestion({
          variables: {
            input: {
              acceptedAnswers: [row.answer.trim()],
              answerLimit: 2,
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
                    ? prompt
                    : translation.prompt,
                rationale: translation.rationale,
              })),
            },
          },
        });
        const questionMasked = result.data?.updateTestQuestion.testVersion;
        if (!questionMasked) throw new Error("A Part 4 answer was not saved");
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
      const workingSection = workingVersion.sections.find(({ position }) => position === 4);
      if (!workingSection) throw new Error("Listening Part 4 is unavailable");
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

  if (!partFour || tableBlocks.length < 2 || editor.noteRows.length !== 5) {
    return <p className="teacherListening__empty">{labels.empty}</p>;
  }

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
        <TeacherListeningPartTabs activePart={4} practiceHref={practiceHref} />
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
            <span>{partCopy.studentQuestions}</span>
            <h2>{editor.title}</h2>
          </div>
          {dirty ? <small>{labels.unsaved}</small> : null}
        </div>
        <div className="teacherListening__partFourTables">
          <section>
            <h3>{partCopy.noteCompletion}</h3>
            <div className="teacherListening__tableWrap">
              <table className="teacherListening__editorTable teacherListening__completionTable">
                <thead>
                  <tr>
                    <th>{labels.numberShort}</th>
                    <th>{partCopy.textBeforeGap}</th>
                    <th>{partCopy.answer}</th>
                    <th>{partCopy.textAfterGap}</th>
                  </tr>
                </thead>
                <tbody>
                  {editor.noteRows.map((row) => (
                    <tr key={row.position}>
                      <td>
                        <span className="teacherListening__rowLabel">{row.position}</span>
                      </td>
                      <td>
                        <input
                          aria-label={`${partCopy.textBeforeGap} ${String(row.position)}`}
                          onChange={(event) =>
                            setNoteRow(row.position, { before: event.target.value })
                          }
                          value={row.before}
                        />
                      </td>
                      <td>
                        <input
                          aria-label={`${partCopy.answer} ${String(row.position)}`}
                          onChange={(event) =>
                            setNoteRow(row.position, { answer: event.target.value })
                          }
                          value={row.answer}
                        />
                      </td>
                      <td>
                        <input
                          aria-label={`${partCopy.textAfterGap} ${String(row.position)}`}
                          onChange={(event) =>
                            setNoteRow(row.position, { after: event.target.value })
                          }
                          value={row.after}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section>
            <h3>{partCopy.tableCompletion}</h3>
            <div className="teacherListening__tableWrap">
              <table className="teacherListening__editorTable teacherListening__completionTable">
                <thead>
                  <tr>
                    <th>{labels.numberShort}</th>
                    <th>{partCopy.factor}</th>
                    <th>{partCopy.description}</th>
                    <th>{partCopy.answer}</th>
                  </tr>
                </thead>
                <tbody>
                  {editor.tableRows.map((row) => (
                    <tr key={row.position}>
                      <td>
                        <span className="teacherListening__rowLabel">{row.position}</span>
                      </td>
                      <td>
                        <input
                          aria-label={`${partCopy.factor} ${String(row.position)}`}
                          onChange={(event) =>
                            setTableRow(row.position, { factor: event.target.value })
                          }
                          value={row.factor}
                        />
                      </td>
                      <td>
                        <input
                          aria-label={`${partCopy.description} ${String(row.position)}`}
                          onChange={(event) =>
                            setTableRow(row.position, { description: event.target.value })
                          }
                          value={row.description}
                        />
                      </td>
                      <td>
                        <input
                          aria-label={`${partCopy.answer} ${String(row.position)}`}
                          onChange={(event) =>
                            setTableRow(row.position, { answer: event.target.value })
                          }
                          value={row.answer}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
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
                  : partFour.mediaObjectId
                    ? partCopy.audioReady
                    : partCopy.audioPending}
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
        <label htmlFor="teacher-listening-part-four-transcript">{labels.transcript}</label>
        <textarea
          id="teacher-listening-part-four-transcript"
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

function stateFromVersion(version: TeacherTestAuthoringVersionFieldsFragment): EditorState {
  const section = version.sections.find(({ position }) => position === 4);
  const translation = section?.translations.find(
    ({ language }) => language === version.primaryLanguage,
  );
  const tables = (section?.blocks ?? [])
    .filter(({ kind }) => kind === "TABLE")
    .toSorted((left, right) => left.position - right.position);
  const questions = version.questions.filter(({ sectionPosition }) => sectionPosition === 4);
  const answerFor = (position: number) =>
    questions.find((question) => question.position === position)?.acceptedAnswers[0] ?? "";
  const noteRows = (tables[0]?.tableRows ?? []).flatMap(({ cells }): NoteRow[] => {
    const match = questionToken.exec(cells[1] ?? "");
    if (!match) return [];
    const position = Number(match[1]);
    return [
      {
        after: cells[2] ?? "",
        answer: answerFor(position),
        before: cells[0] ?? "",
        position,
      },
    ];
  });
  const tableRows = (tables[1]?.tableRows ?? []).flatMap(({ cells }): TableRow[] => {
    const match = questionToken.exec(cells[2] ?? "");
    if (!match) return [];
    const position = Number(match[1]);
    return [
      {
        answer: answerFor(position),
        description: cells[1] ?? "",
        factor: cells[0] ?? "",
        position,
      },
    ];
  });
  return {
    instructions: translation?.instructions ?? "",
    noteRows,
    tableRows,
    title: (translation?.title ?? "Urban trees and summer heat").replace(partTitlePrefix, ""),
    transcript: translation?.content ?? "",
  };
}
