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
import { getTeacherListeningPartThreeCopy } from "@/dictionaries/teacher/TeacherListeningPartThree";
import { getTeacherListeningPartTwoCopy } from "@/dictionaries/teacher/TeacherListeningPartTwo";
import { getTeacherPracticesCopy } from "@/dictionaries/teacher/TeacherPractices";
import { useFragment as readFragment } from "@/gql/fragment-masking";
import {
  TeacherCreateNextTestVersionDocument,
  TeacherGenerateListeningAudioDocument,
  TeacherListeningAudioDownloadDocument,
  TeacherPublishTestVersionDocument,
  TeacherTestAuthoringVersionFieldsFragmentDoc,
  TeacherUpdateTestQuestionDocument,
  TeacherUpdateTestSectionDocument,
  type TeacherTestAuthoringVersionFieldsFragment,
} from "@/gql/graphql";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";

import { TeacherListeningPartTabs } from "./TeacherListeningPartTabs";

type TeacherListeningPartTwoEditorProps = {
  initialVersion: TeacherTestAuthoringVersionFieldsFragment;
  locale: Locale;
  part?: 2 | 3;
  practiceHref: string;
  practiceNumber: number;
};

type ChoiceKey = "A" | "B" | "C";

type PartTwoRow = {
  correctOption: ChoiceKey | "";
  optionA: string;
  optionB: string;
  optionC: string;
  position: number;
  question: string;
};

type PartTwoEditorState = {
  instructions: string;
  rows: PartTwoRow[];
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

const choiceKeys = ["A", "B", "C"] as const;
const partTitlePrefix = /^part\s*[23]\s*[—–-]\s*/iu;
export function TeacherListeningPartTwoEditor({
  initialVersion,
  locale,
  part = 2,
  practiceHref,
  practiceNumber,
}: TeacherListeningPartTwoEditorProps) {
  const labels = getTeacherListeningCopy(locale);
  const partTwoCopy = getTeacherListeningPartTwoCopy(locale);
  const partThreeCopy = getTeacherListeningPartThreeCopy(locale);
  const partCopy = part === 2 ? partTwoCopy : partThreeCopy;
  const practiceCopy = getTeacherPracticesCopy(locale);
  const confirm = useConfirmDialog();
  const initialState = useMemo(
    () => choiceStateFromVersion(initialVersion, locale, part),
    [initialVersion, locale, part],
  );
  const [version, setVersion] = useState(initialVersion);
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
  const [updateQuestion] = useMutation(TeacherUpdateTestQuestionDocument, {
    context: { authenticated: true },
  });
  const [publishVersion] = useMutation(TeacherPublishTestVersionDocument, {
    context: { authenticated: true },
  });
  const activePart = version.sections.find(({ position }) => position === part) ?? null;
  const dirty = JSON.stringify(editor) !== baseline || audioPreview !== null;
  const audioSource = audioPreview?.url ?? (activePart?.mediaObjectId ? attachedAudioUrl : null);

  useEffect(() => {
    const mediaObjectId = activePart?.mediaObjectId;
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
  }, [activePart?.mediaObjectId, createAudioDownload]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const setRow = (position: number, values: Partial<PartTwoRow>) => {
    setEditor((current) => ({
      ...current,
      rows: current.rows.map((row) => (row.position === position ? { ...row, ...values } : row)),
    }));
    setSaveState("idle");
  };

  const setSpeakerOption = (choice: ChoiceKey, value: string) => {
    const field = `option${choice}` as "optionA" | "optionB" | "optionC";
    setEditor((current) => ({
      ...current,
      rows: current.rows.map((row) => (row.position >= 26 ? { ...row, [field]: value } : row)),
    }));
    setSaveState("idle");
  };

  const clearEditor = () => {
    setEditor((current) => ({
      instructions: "",
      rows: current.rows.map((row) => ({
        ...row,
        correctOption: "",
        optionA: "",
        optionB: "",
        optionC: "",
        question: "",
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
    if (!activePart || saveState === "saving") return;
    const isComplete =
      editor.rows.length === 10 &&
      editor.title.trim().length > 0 &&
      editor.instructions.trim().length > 0 &&
      editor.transcript.trim().length > 0 &&
      editor.rows.every(
        ({ correctOption, optionA, optionB, optionC, question }) =>
          correctOption !== "" &&
          optionA.trim().length > 0 &&
          optionB.trim().length > 0 &&
          optionC.trim().length > 0 &&
          question.trim().length > 0,
      );
    if (!isComplete) {
      setSaveState("validation");
      return;
    }
    const transcriptChanged = editor.transcript.trim() !== savedTranscript;
    const needsConfirmedAudio =
      (!activePart.mediaObjectId || transcriptChanged || audioPreview !== null) &&
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
      }

      let workingSection = workingVersion.sections.find(({ position }) => position === part);
      if (!workingSection) throw new Error(`Listening Part ${String(part)} is unavailable`);

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
      if (!sectionMasked) throw new Error(`Listening Part ${String(part)} was not saved`);
      workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, sectionMasked);
      workingSection = workingVersion.sections.find(({ position }) => position === part);
      if (!workingSection) {
        throw new Error(`Saved Listening Part ${String(part)} is unavailable`);
      }

      for (const row of editor.rows) {
        const question = workingVersion.questions.find(({ position }) => position === row.position);
        if (!question || question.sectionPosition !== part) {
          throw new Error(`Question ${String(row.position)} was not found`);
        }
        const optionTexts = [row.optionA, row.optionB, row.optionC];
        const result = await updateQuestion({
          variables: {
            input: {
              acceptedAnswers: [],
              answerLimit: null,
              kind: "SINGLE_CHOICE",
              maxSelections: 1,
              options: optionTexts.map((text, optionIndex) => {
                const existingOption = question.options[optionIndex];
                const translations = existingOption
                  ? existingOption.translations.map((translation) => ({
                      language: translation.language,
                      text:
                        translation.language === workingVersion.primaryLanguage
                          ? text.trim()
                          : translation.text,
                    }))
                  : [{ language: workingVersion.primaryLanguage, text: text.trim() }];
                return {
                  isCorrect: row.correctOption === choiceKeys[optionIndex],
                  translations,
                };
              }),
              questionId: question.id,
              sectionId: workingSection.id,
              translations: question.translations.map((translation) => ({
                language: translation.language,
                prompt:
                  translation.language === workingVersion.primaryLanguage
                    ? row.question.trim()
                    : translation.prompt,
                rationale: translation.rationale,
              })),
            },
          },
        });
        const questionMasked = result.data?.updateTestQuestion.testVersion;
        if (!questionMasked) throw new Error(`Question ${String(row.position)} was not saved`);
        workingVersion = readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, questionMasked);
        workingSection = workingVersion.sections.find(({ position }) => position === part);
        if (!workingSection) {
          throw new Error(`Listening Part ${String(part)} is unavailable after saving`);
        }
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
    } catch {
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

      const workingSection = workingVersion.sections.find(({ position }) => position === part);
      if (!workingSection) throw new Error(`Listening Part ${String(part)} is unavailable`);
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

  if (!activePart) return <p className="teacherListening__empty">{labels.empty}</p>;

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
        <TeacherListeningPartTabs activePart={part} practiceHref={practiceHref} />
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
            onChange={(event) => {
              setEditor((current) => ({ ...current, title: event.target.value }));
              setSaveState("idle");
            }}
            value={editor.title}
          />
        </div>
        <textarea
          aria-label={labels.instructions}
          onChange={(event) => {
            setEditor((current) => ({ ...current, instructions: event.target.value }));
            setSaveState("idle");
          }}
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

        {part === 2 ? (
          <div className="teacherListening__tableWrap">
            <table className="teacherListening__editorTable teacherListening__choiceTable">
              <thead>
                <tr>
                  <th aria-label={labels.number}>{labels.numberShort}</th>
                  <th>{labels.question}</th>
                  <th>{partCopy.optionA}</th>
                  <th>{partCopy.optionB}</th>
                  <th>{partCopy.optionC}</th>
                  <th>{partCopy.correctAnswer}</th>
                </tr>
              </thead>
              <tbody>
                {editor.rows.map((row) => (
                  <tr key={row.position}>
                    <td>
                      <span className="teacherListening__rowLabel">{row.position}</span>
                    </td>
                    <td>
                      <input
                        aria-label={`${labels.question} ${String(row.position)}`}
                        onChange={(event) => setRow(row.position, { question: event.target.value })}
                        value={row.question}
                      />
                    </td>
                    <td>
                      <input
                        aria-label={`${partCopy.optionA} ${String(row.position)}`}
                        onChange={(event) => setRow(row.position, { optionA: event.target.value })}
                        value={row.optionA}
                      />
                    </td>
                    <td>
                      <input
                        aria-label={`${partCopy.optionB} ${String(row.position)}`}
                        onChange={(event) => setRow(row.position, { optionB: event.target.value })}
                        value={row.optionB}
                      />
                    </td>
                    <td>
                      <input
                        aria-label={`${partCopy.optionC} ${String(row.position)}`}
                        onChange={(event) => setRow(row.position, { optionC: event.target.value })}
                        value={row.optionC}
                      />
                    </td>
                    <td>
                      <select
                        aria-label={`${partCopy.correctAnswer} ${String(row.position)}`}
                        onChange={(event) =>
                          setRow(row.position, {
                            correctOption: event.target.value as ChoiceKey | "",
                          })
                        }
                        value={row.correctOption}
                      >
                        <option value="">{partCopy.select}</option>
                        {choiceKeys.map((choice) => (
                          <option key={choice} value={choice}>
                            {choice}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <PartThreeQuestionTables
            copy={partThreeCopy}
            labels={{
              number: labels.number,
              numberShort: labels.numberShort,
              question: labels.question,
            }}
            rows={editor.rows}
            setRow={setRow}
            setSpeakerOption={setSpeakerOption}
          />
        )}
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
                  : activePart.mediaObjectId
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
        <label htmlFor={`teacher-listening-part-${String(part)}-transcript`}>
          {labels.transcript}
        </label>
        <textarea
          id={`teacher-listening-part-${String(part)}-transcript`}
          onChange={(event) => {
            setEditor((current) => ({ ...current, transcript: event.target.value }));
            setAudioPreview(null);
            setAudioConfirmed(false);
            setAudioState("idle");
            setSaveState("idle");
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
              ? labels.saveError
              : saveState === "validation"
                ? labels.validationError
                : ""}
      </p>
    </main>
  );
}

type PartThreeQuestionTablesProps = {
  copy: ReturnType<typeof getTeacherListeningPartThreeCopy>;
  labels: { number: string; numberShort: string; question: string };
  rows: PartTwoRow[];
  setRow: (position: number, values: Partial<PartTwoRow>) => void;
  setSpeakerOption: (choice: ChoiceKey, value: string) => void;
};

function PartThreeQuestionTables({
  copy,
  labels,
  rows,
  setRow,
  setSpeakerOption,
}: PartThreeQuestionTablesProps) {
  const multipleChoiceRows = rows.slice(0, 5);
  const matchingRows = rows.slice(5);
  const speakerSource = matchingRows[0];
  const speakers = {
    A: speakerSource?.optionA ?? "",
    B: speakerSource?.optionB ?? "",
    C: speakerSource?.optionC ?? "",
  } as const;

  return (
    <div className="teacherListening__partThreeTables">
      <section>
        <h3>{copy.multipleChoiceHeading}</h3>
        <div className="teacherListening__tableWrap">
          <table className="teacherListening__editorTable teacherListening__choiceTable">
            <thead>
              <tr>
                <th aria-label={labels.number}>{labels.numberShort}</th>
                <th>{labels.question}</th>
                <th>{copy.optionA}</th>
                <th>{copy.optionB}</th>
                <th>{copy.optionC}</th>
                <th>{copy.correctAnswer}</th>
              </tr>
            </thead>
            <tbody>
              {multipleChoiceRows.map((row) => (
                <tr key={row.position}>
                  <td>
                    <span className="teacherListening__rowLabel">{row.position}</span>
                  </td>
                  <td>
                    <input
                      aria-label={`${labels.question} ${String(row.position)}`}
                      onChange={(event) => setRow(row.position, { question: event.target.value })}
                      value={row.question}
                    />
                  </td>
                  {choiceKeys.map((choice) => {
                    const field = `option${choice}` as "optionA" | "optionB" | "optionC";
                    return (
                      <td key={choice}>
                        <input
                          aria-label={`${choice} ${String(row.position)}`}
                          onChange={(event) =>
                            setRow(row.position, { [field]: event.target.value })
                          }
                          value={row[field]}
                        />
                      </td>
                    );
                  })}
                  <td>
                    <select
                      aria-label={`${copy.correctAnswer} ${String(row.position)}`}
                      onChange={(event) =>
                        setRow(row.position, {
                          correctOption: event.target.value as ChoiceKey | "",
                        })
                      }
                      value={row.correctOption}
                    >
                      <option value="">{copy.select}</option>
                      {choiceKeys.map((choice) => (
                        <option key={choice} value={choice}>
                          {choice}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3>{copy.matchingHeading}</h3>
        <fieldset className="teacherListening__speakerOptions">
          <legend>{copy.speakerOptions}</legend>
          {choiceKeys.map((choice) => (
            <label key={choice}>
              <span>{choice}</span>
              <input
                aria-label={copy[`speaker${choice}`]}
                onChange={(event) => setSpeakerOption(choice, event.target.value)}
                value={speakers[choice]}
              />
            </label>
          ))}
        </fieldset>
        <div className="teacherListening__tableWrap">
          <table className="teacherListening__editorTable teacherListening__matchingTable">
            <thead>
              <tr>
                <th aria-label={labels.number}>{labels.numberShort}</th>
                <th>{labels.question}</th>
                <th>{copy.correctAnswer}</th>
              </tr>
            </thead>
            <tbody>
              {matchingRows.map((row) => (
                <tr key={row.position}>
                  <td>
                    <span className="teacherListening__rowLabel">{row.position}</span>
                  </td>
                  <td>
                    <input
                      aria-label={`${labels.question} ${String(row.position)}`}
                      onChange={(event) => setRow(row.position, { question: event.target.value })}
                      value={row.question}
                    />
                  </td>
                  <td>
                    <select
                      aria-label={`${copy.correctAnswer} ${String(row.position)}`}
                      onChange={(event) =>
                        setRow(row.position, {
                          correctOption: event.target.value as ChoiceKey | "",
                        })
                      }
                      value={row.correctOption}
                    >
                      <option value="">{copy.select}</option>
                      {choiceKeys.map((choice) => (
                        <option key={choice} value={choice}>
                          {choice} · {speakers[choice]}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function choiceStateFromVersion(
  version: TeacherTestAuthoringVersionFieldsFragment,
  locale: Locale,
  sectionPosition: 2 | 3,
): PartTwoEditorState {
  const section = version.sections.find(({ position }) => position === sectionPosition);
  const partCopy =
    sectionPosition === 2
      ? getTeacherListeningPartTwoCopy(locale)
      : getTeacherListeningPartThreeCopy(locale);
  const translation = section?.translations.find(
    ({ language }) => language === version.primaryLanguage,
  );
  const sectionQuestions = version.questions
    .filter((question) => question.sectionPosition === sectionPosition)
    .sort((left, right) => left.position - right.position);
  const rows = Array.from({ length: 10 }, (_, index): PartTwoRow => {
    const position = (sectionPosition === 2 ? 11 : 21) + index;
    const question = sectionQuestions.find((candidate) => candidate.position === position);
    const options = [...(question?.options ?? [])].sort(
      (left, right) => left.position - right.position,
    );
    const optionText = (optionIndex: number) =>
      options[optionIndex]?.translations.find(
        ({ language }) => language === version.primaryLanguage,
      )?.text ?? "";
    const correctIndex = options.findIndex(({ isCorrect }) => isCorrect);
    return {
      correctOption: correctIndex >= 0 ? choiceKeys[correctIndex] : "",
      optionA: optionText(0),
      optionB: optionText(1),
      optionC: optionText(2),
      position,
      question:
        question?.translations.find(({ language }) => language === version.primaryLanguage)
          ?.prompt ?? "",
    };
  });
  return {
    instructions: translation?.instructions ?? partCopy.defaultInstructions,
    rows,
    title: (translation?.title ?? partCopy.defaultTitle).replace(partTitlePrefix, ""),
    transcript: translation?.content ?? "",
  };
}
