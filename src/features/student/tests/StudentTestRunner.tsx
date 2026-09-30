"use client";

import ArrowBackIosNewRounded from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRounded from "@mui/icons-material/ArrowForwardIosRounded";
import FlagOutlined from "@mui/icons-material/FlagOutlined";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Locale } from "@/config/Locales";
import {
  SaveStudentAttemptNoteDocument,
  SaveStudentTestAnswerDocument,
  type SaveAttemptAnswerInput,
  StudentAttemptMediaDownloadDocument,
  type StudentAttemptFieldsFragment,
  SubmitStudentTestAttemptDocument,
} from "@/gql/graphql";
import { resolveDynamicTestLayout } from "@/lib/tests/DynamicTestLayout";

import { StudentAudioRecorder } from "./StudentAudioRecorder";
import { StudentListeningAudioPlayer } from "./StudentListeningAudioPlayer";
import { StudentListeningFormTable } from "./StudentListeningFormTable";
import { StudentTestSectionMaterial } from "./StudentTestSectionMaterial";
import { StudentTestShell } from "./StudentTestShell";

type StudentTestRunnerProps = {
  attempt: StudentAttemptFieldsFragment;
  locale: Locale;
  paperId: string;
};

type LocalAnswer = {
  responseMediaObjectId: string | null;
  selectedOptionId: string | null;
  selectedOptionIds: string[];
  textValue: string;
};

const emptyLocalAnswer: LocalAnswer = {
  responseMediaObjectId: null,
  selectedOptionId: null,
  selectedOptionIds: [],
  textValue: "",
};

const runnerCopy = {
  uz: {
    answer: "Javobingiz",
    answered: "Javob berildi",
    audio: "Listening audio",
    audioError: "Audio ochilmadi. Internetni tekshiring.",
    audioFinished: "Audio tugadi. Javoblaringizni tekshiring.",
    audioPlay: "Audioni bir marta ijro etish",
    audioPlaying: "Audio ijro etilmoqda...",
    audioPreparing: "Audio tayyorlanmoqda...",
    audioReady: "Audio test uchun biriktirilgan",
    completed: "Yakunlangan",
    incomplete: "Yakunlashdan oldin barcha Speaking savollariga audio javob yozing.",
    notes: "Qaydlar",
    notesPlaceholder: "Test davomida qisqa qaydlar yozing...",
    parts: "qism",
    exit: "Testga qaytish",
    next: "Keyingi",
    previous: "Oldingi",
    question: "Savol",
    review: "Ko‘rib chiqish uchun belgilash",
    saveError: "Javob saqlanmadi. Internetni tekshirib qayta urinib ko'ring.",
    saved: "Saqlandi",
    saving: "Saqlanmoqda...",
    submit: "Testni topshirish",
    submitConfirm: "Topshirgandan keyin javoblarni o'zgartira olmaysiz. Davom etilsinmi?",
    secureAudio: "Audio xavfsiz test sessiyasi orqali ochiladi",
    section: "Bo‘lim",
    time: "Qolgan vaqt",
  },
  ru: {
    answered: "Отвечено",
    audio: "Аудиозапись Listening",
    audioError: "Не удалось открыть аудио. Проверьте подключение.",
    audioFinished: "Аудио завершено. Проверьте ответы.",
    audioPlay: "Воспроизвести аудио один раз",
    audioPlaying: "Аудио воспроизводится...",
    audioPreparing: "Подготавливаем аудио...",
    audioReady: "Аудиозапись прикреплена к тесту",
    completed: "Завершено",
    review: "Отметить для проверки",
    secureAudio: "Аудио открывается через защищённую тестовую сессию",
    section: "Раздел",
    answer: "Ваш ответ",
    incomplete: "Запишите аудиоответ на каждый вопрос Speaking.",
    notes: "Заметки",
    notesPlaceholder: "Краткие заметки во время теста...",
    parts: "части",
    exit: "К тесту",
    next: "Далее",
    previous: "Назад",
    question: "Вопрос",
    saveError: "Ответ не сохранён. Проверьте интернет и повторите попытку.",
    saved: "Сохранено",
    saving: "Сохраняем...",
    submit: "Отправить тест",
    submitConfirm: "После отправки ответы нельзя изменить. Продолжить?",
    time: "Осталось",
  },
  en: {
    answer: "Your answer",
    answered: "Answered",
    audio: "Listening audio",
    audioError: "The audio could not be opened. Check your connection.",
    audioFinished: "Audio finished. Check your answers.",
    audioPlay: "Play the audio once",
    audioPlaying: "Audio is playing...",
    audioPreparing: "Preparing audio...",
    audioReady: "Audio is attached to this test",
    completed: "Completed",
    incomplete: "Record an audio response for every Speaking question before finishing.",
    notes: "Notes",
    notesPlaceholder: "Write brief notes during the test...",
    parts: "parts",
    exit: "Back to test",
    next: "Next",
    previous: "Previous",
    question: "Question",
    review: "Mark for review",
    saveError: "The answer was not saved. Check your connection and try again.",
    saved: "Saved",
    saving: "Saving...",
    submit: "Submit",
    submitConfirm: "You cannot change answers after submission. Continue?",
    secureAudio: "Audio opens through the secure test session",
    section: "Section",
    time: "Time left",
  },
} as const;

const dynamicRunnerCopy = {
  uz: { part: "Qism", visual: "Vizual material" },
  ru: { part: "Часть", visual: "Визуальный материал" },
  en: { part: "Part", visual: "Visual material" },
} as const;

export function StudentTestRunner({ attempt, locale, paperId }: StudentTestRunnerProps) {
  const copy = runnerCopy[locale];
  const dynamicCopy = dynamicRunnerCopy[locale];
  const readOnly = attempt.status !== "IN_PROGRESS";
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, LocalAnswer>>(() =>
    Object.fromEntries(
      attempt.answers.map((answer) => [
        answer.questionId,
        {
          responseMediaObjectId: answer.responseMediaObjectId,
          selectedOptionId: answer.selectedOptionId,
          selectedOptionIds: [...answer.selectedOptionIds],
          textValue: answer.textValue ?? "",
        },
      ]),
    ),
  );
  const [notes, setNotes] = useState<Record<string, string>>(() =>
    Object.fromEntries(attempt.notes.map((note) => [note.sectionId, note.text])),
  );
  const savedNotesRef = useRef<Record<string, string>>(
    Object.fromEntries(attempt.notes.map((note) => [note.sectionId, note.text])),
  );
  const [reviewIds, setReviewIds] = useState<string[]>([]);
  const [saveState, setSaveState] = useState<"error" | "idle" | "saved" | "saving">("idle");
  const [remainingSeconds, setRemainingSeconds] = useState(() =>
    secondsRemaining(attempt.expiresAt, attempt.serverTime),
  );
  const [saveAnswer] = useMutation(SaveStudentTestAnswerDocument, {
    context: { authenticated: true },
  });
  const [saveNote] = useMutation(SaveStudentAttemptNoteDocument, {
    context: { authenticated: true },
  });
  const [submitAttempt, { loading: submitting }] = useMutation(SubmitStudentTestAttemptDocument, {
    context: { authenticated: true },
  });
  const [loadAttemptMedia] = useLazyQuery(StudentAttemptMediaDownloadDocument, {
    fetchPolicy: "no-cache",
  });
  const autoSubmittedRef = useRef(false);
  const question = attempt.questions[currentIndex];
  const section = attempt.sections.find((item) => item.id === question?.sectionId) ?? null;
  const currentSectionNumber = section?.position ?? 1;
  const currentSectionIndex = section
    ? attempt.sections.findIndex((item) => item.id === section.id)
    : 0;
  const sectionQuestions = useMemo(
    () =>
      attempt.questions.filter((item) =>
        section ? item.sectionId === section.id : item.sectionId === null,
      ),
    [attempt.questions, section],
  );
  const listeningFormBlock =
    attempt.skill === "LISTENING" && section?.position === 1
      ? (section.blocks.find((block) => block.kind === "TABLE" && block.tableRows.length > 0) ??
        null)
      : null;
  const questionRange = sectionQuestions.length
    ? `${String(sectionQuestions[0]?.position)}–${String(sectionQuestions.at(-1)?.position)}`
    : "";
  const layout = useMemo(
    () => resolveDynamicTestLayout(attempt.skill ?? "READING", attempt.sections, attempt.questions),
    [attempt.questions, attempt.sections, attempt.skill],
  );
  const answeredIds = useMemo(
    () =>
      new Set(
        Object.entries(answers)
          .filter(([, answer]) =>
            Boolean(
              answer.selectedOptionId ||
              answer.selectedOptionIds.length > 0 ||
              answer.textValue.trim() ||
              answer.responseMediaObjectId,
            ),
          )
          .map(([questionId]) => questionId),
      ),
    [answers],
  );
  const requestAudioSource = useCallback(async () => {
    const mediaObjectId = section?.mediaObjectId;
    if (attempt.skill !== "LISTENING" || !mediaObjectId) return null;
    const result = await loadAttemptMedia({
      context: { authenticated: true },
      variables: { attemptId: attempt.id, mediaObjectId },
    });
    return result.data?.studentAttemptMediaDownload.url ?? null;
  }, [attempt.id, attempt.skill, loadAttemptMedia, section?.mediaObjectId]);

  useEffect(() => {
    if (!section || readOnly) return;
    const text = notes[section.id] ?? "";
    if (savedNotesRef.current[section.id] === text) return;
    const timeout = window.setTimeout(() => {
      void saveNote({
        variables: {
          input: { attemptId: attempt.id, sectionId: section.id, text },
        },
      })
        .then(() => {
          savedNotesRef.current[section.id] = text;
        })
        .catch(() => setSaveState("error"));
    }, 700);
    return () => window.clearTimeout(timeout);
  }, [attempt.id, attempt.skill, notes, readOnly, saveNote, section]);

  useEffect(() => {
    if (readOnly) return;
    const timer = window.setInterval(
      () => setRemainingSeconds((current) => (current === null ? null : Math.max(0, current - 1))),
      1_000,
    );
    return () => window.clearInterval(timer);
  }, [readOnly]);

  useEffect(() => {
    if (readOnly || remainingSeconds !== 0 || autoSubmittedRef.current) return;
    autoSubmittedRef.current = true;
    void submitAttempt({ variables: { input: { attemptId: attempt.id } } }).finally(() => {
      router.push(`/${locale}/student/tests/${paperId}`);
      router.refresh();
    });
  }, [attempt.id, locale, paperId, readOnly, remainingSeconds, router, submitAttempt]);

  if (!question) return null;

  const persistForQuestion = async (
    questionId: string,
    input: Omit<SaveAttemptAnswerInput, "attemptId" | "questionId">,
  ) => {
    if (readOnly) return;
    setSaveState("saving");
    try {
      await saveAnswer({
        variables: { input: { ...input, attemptId: attempt.id, questionId } },
      });
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  };
  const handleSingle = (questionId: string, selectedOptionId: string) => {
    const localAnswer = answers[questionId] ?? emptyLocalAnswer;
    setAnswers((current) => ({
      ...current,
      [questionId]: { ...localAnswer, selectedOptionId },
    }));
    void persistForQuestion(questionId, { selectedOptionId });
  };

  const handleMultiple = (questionId: string, optionId: string) => {
    const localAnswer = answers[questionId] ?? emptyLocalAnswer;
    if (
      localAnswer.selectedOptionIds.length === 1 &&
      localAnswer.selectedOptionIds.includes(optionId)
    ) {
      return;
    }
    const selectedOptionIds = localAnswer.selectedOptionIds.includes(optionId)
      ? localAnswer.selectedOptionIds.filter((id) => id !== optionId)
      : [...localAnswer.selectedOptionIds, optionId];
    setAnswers((current) => ({
      ...current,
      [questionId]: { ...localAnswer, selectedOptionIds },
    }));
    if (selectedOptionIds.length > 0) {
      void persistForQuestion(questionId, { selectedOptionIds });
    }
  };

  const handleTextChange = (questionId: string, textValue: string) =>
    setAnswers((current) => ({
      ...current,
      [questionId]: { ...(current[questionId] ?? emptyLocalAnswer), textValue },
    }));

  const handleTextSave = (questionId: string) => {
    const textValue = answers[questionId]?.textValue.trim();
    if (textValue) void persistForQuestion(questionId, { textValue });
  };

  const moveToQuestion = (index: number) => {
    setCurrentIndex(index);
    window.requestAnimationFrame(() => {
      document.getElementById(`student-question-${attempt.questions[index]?.id}`)?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    });
  };

  const moveSection = (offset: number) => {
    const targetSection = attempt.sections[currentSectionIndex + offset];
    if (!targetSection) return;
    const targetIndex = attempt.questions.findIndex(
      ({ sectionId }) => sectionId === targetSection.id,
    );
    if (targetIndex >= 0) moveToQuestion(targetIndex);
  };

  const handleSubmit = async () => {
    if (attempt.skill === "SPEAKING" && answeredIds.size < attempt.questions.length) {
      setSaveState("error");
      return;
    }
    if (!window.confirm(copy.submitConfirm)) return;
    await submitAttempt({ variables: { input: { attemptId: attempt.id } } });
    router.push(`/${locale}/student/tests/${paperId}`);
    router.refresh();
  };

  return (
    <StudentTestShell
      answeredCount={answeredIds.size}
      answeredLabel={copy.answered}
      backHref={`/${locale}/student/tests/${paperId}`}
      backLabel={copy.exit}
      currentSection={currentSectionNumber}
      density={layout.density}
      layout={layout.preset}
      notesLabel={copy.notes}
      notesPlaceholder={copy.notesPlaceholder}
      notesReadOnly={readOnly}
      notesValue={section ? (notes[section.id] ?? "") : ""}
      onNotesChange={(value) => {
        if (!section) return;
        setNotes((current) => ({ ...current, [section.id]: value }));
      }}
      onSubmit={() => void handleSubmit()}
      partsLabel={copy.parts}
      sectionLabel={copy.section}
      skill={attempt.skill ?? "READING"}
      submitLabel={readOnly ? copy.completed : copy.submit}
      submitting={submitting || readOnly}
      timeLabel={copy.time}
      timeValue={formatTime(remainingSeconds)}
      title={attempt.title}
      toolbar={
        attempt.skill === "LISTENING" ? (
          <StudentListeningAudioPlayer
            compact
            key={section?.mediaObjectId ?? "locked-audio"}
            errorLabel={copy.audioError}
            finishedLabel={copy.audioFinished}
            lockedLabel={section?.mediaObjectId ? copy.audioReady : copy.secureAudio}
            playLabel={copy.audioPlay}
            playingLabel={copy.audioPlaying}
            preparingLabel={copy.audioPreparing}
            requestSource={section?.mediaObjectId ? requestAudioSource : undefined}
            sourceUrl={null}
            title={copy.audio}
          />
        ) : null
      }
      totalQuestions={attempt.questions.length}
      totalSections={attempt.sections.length}
    >
      <div className="connectedTestRunner__body">
        {section ? (
          <StudentTestSectionMaterial
            audioLabel={copy.audio}
            audioErrorLabel={copy.audioError}
            audioFinishedLabel={copy.audioFinished}
            audioPlayLabel={copy.audioPlay}
            audioPlayingLabel={copy.audioPlaying}
            audioPreparingLabel={copy.audioPreparing}
            audioReadyLabel={copy.audioReady}
            instructions={section.instructions}
            mediaObjectId={section.mediaObjectId}
            partLabel={dynamicCopy.part}
            position={section.position}
            renderAudio={false}
            requestAudioSource={requestAudioSource}
            secureLabel={copy.secureAudio}
            skill={attempt.skill ?? "READING"}
            text={section.content}
            title={section.title}
            visualLabel={dynamicCopy.visual}
          >
            {attempt.skill === "SPEAKING" && section.position === 2 ? (
              <label className="connectedTestRunner__notes">
                <span>{copy.notes}</span>
                <textarea
                  maxLength={4000}
                  onChange={(event) =>
                    setNotes((current) => ({
                      ...current,
                      [section.id]: event.target.value,
                    }))
                  }
                  placeholder={copy.notesPlaceholder}
                  rows={8}
                  value={notes[section.id] ?? ""}
                />
              </label>
            ) : null}
          </StudentTestSectionMaterial>
        ) : null}

        <section className="connectedTestRunner__questionCanvas">
          {listeningFormBlock ? null : (
            <header className="connectedTestRunner__questionGroupHeading">
              <h2>
                {copy.question} {questionRange}
              </h2>
            </header>
          )}

          {listeningFormBlock ? (
            <StudentListeningFormTable
              answerLabel={copy.answer}
              answers={answers}
              block={listeningFormBlock}
              onAnswerBlur={handleTextSave}
              onAnswerChange={handleTextChange}
              onQuestionFocus={(questionId) => {
                const index = attempt.questions.findIndex(({ id }) => id === questionId);
                if (index >= 0) setCurrentIndex(index);
              }}
              questions={sectionQuestions}
              readOnly={readOnly}
            />
          ) : (
            <div className="connectedTestRunner__questionList">
              {sectionQuestions.map((item) => {
                const itemIndex = attempt.questions.findIndex(({ id }) => id === item.id);
                const localAnswer = answers[item.id] ?? emptyLocalAnswer;
                const isSingle = [
                  "SINGLE_CHOICE",
                  "TRUE_FALSE_NOT_GIVEN",
                  "YES_NO_NOT_GIVEN",
                ].includes(item.kind);
                const isMultiple = ["MULTIPLE_CHOICE", "MATCHING"].includes(item.kind);
                const isShortText = item.kind === "SHORT_TEXT";
                const [promptBeforeAnswer, promptAfterAnswer = ""] = item.prompt.split(/_{3,}/, 2);

                return (
                  <article
                    className="connectedTestRunner__questionItem"
                    data-active={itemIndex === currentIndex || undefined}
                    id={`student-question-${item.id}`}
                    key={item.id}
                    onFocusCapture={() => setCurrentIndex(itemIndex)}
                  >
                    <div className="connectedTestRunner__questionTop">
                      <button
                        aria-label={copy.review}
                        aria-pressed={reviewIds.includes(item.id)}
                        onClick={() =>
                          setReviewIds((current) =>
                            current.includes(item.id)
                              ? current.filter((id) => id !== item.id)
                              : [...current, item.id],
                          )
                        }
                        type="button"
                      >
                        <FlagOutlined aria-hidden="true" />
                      </button>
                    </div>

                    {isShortText ? (
                      <label className="connectedTestRunner__inlineAnswer">
                        <span>{promptBeforeAnswer}</span>
                        <span aria-hidden="true" className="connectedTestRunner__questionNumber">
                          {item.position}
                        </span>
                        <input
                          aria-label={`${copy.answer} ${String(item.position)}`}
                          maxLength={item.answerLimit ?? 160}
                          onBlur={() => handleTextSave(item.id)}
                          onChange={(event) => handleTextChange(item.id, event.target.value)}
                          readOnly={readOnly}
                          type="text"
                          value={localAnswer.textValue}
                        />
                        {promptAfterAnswer ? <span>{promptAfterAnswer}</span> : null}
                      </label>
                    ) : (
                      <h3>
                        <span>{item.position}.</span> {item.prompt}
                      </h3>
                    )}

                    {isSingle ? (
                      <div className="connectedTestRunner__choices">
                        {item.options.map((option, optionIndex) => (
                          <label key={option.id}>
                            <span aria-hidden="true" className="connectedTestRunner__optionMarker">
                              {String.fromCharCode(65 + optionIndex)}
                            </span>
                            <input
                              checked={localAnswer.selectedOptionId === option.id}
                              disabled={readOnly}
                              name={item.id}
                              onChange={() => handleSingle(item.id, option.id)}
                              type="radio"
                            />
                            <span>{option.text}</span>
                          </label>
                        ))}
                      </div>
                    ) : null}

                    {isMultiple ? (
                      <div className="connectedTestRunner__choices">
                        {item.options.map((option, optionIndex) => (
                          <label key={option.id}>
                            <span aria-hidden="true" className="connectedTestRunner__optionMarker">
                              {String.fromCharCode(65 + optionIndex)}
                            </span>
                            <input
                              checked={localAnswer.selectedOptionIds.includes(option.id)}
                              disabled={readOnly}
                              onChange={() => handleMultiple(item.id, option.id)}
                              type="checkbox"
                            />
                            <span>{option.text}</span>
                          </label>
                        ))}
                      </div>
                    ) : null}

                    {item.kind === "LONG_TEXT" ? (
                      <label className="connectedTestRunner__text">
                        <span>{copy.answer}</span>
                        <textarea
                          onBlur={() => handleTextSave(item.id)}
                          onChange={(event) => handleTextChange(item.id, event.target.value)}
                          readOnly={readOnly}
                          rows={10}
                          value={localAnswer.textValue}
                        />
                      </label>
                    ) : null}

                    {item.kind === "AUDIO_RESPONSE" ? (
                      <StudentAudioRecorder
                        attemptId={attempt.id}
                        locale={locale}
                        onUploaded={async (responseMediaObjectId) => {
                          setAnswers((current) => ({
                            ...current,
                            [item.id]: { ...localAnswer, responseMediaObjectId },
                          }));
                          await persistForQuestion(item.id, { responseMediaObjectId });
                        }}
                        questionId={item.id}
                        saved={Boolean(localAnswer.responseMediaObjectId)}
                      />
                    ) : null}
                  </article>
                );
              })}
            </div>
          )}

          <footer className="connectedTestRunner__sectionActions">
            <button
              aria-label={copy.previous}
              disabled={currentSectionIndex <= 0}
              onClick={() => moveSection(-1)}
              type="button"
            >
              <ArrowBackIosNewRounded aria-hidden="true" />
            </button>
            <button
              aria-label={copy.next}
              disabled={currentSectionIndex >= attempt.sections.length - 1}
              onClick={() => moveSection(1)}
              type="button"
            >
              <ArrowForwardIosRounded aria-hidden="true" />
            </button>
          </footer>
        </section>
      </div>

      <div
        aria-live="polite"
        className={`connectedTestRunner__save connectedTestRunner__save_${saveState}`}
      >
        {saveState === "saving"
          ? copy.saving
          : saveState === "saved"
            ? copy.saved
            : saveState === "error"
              ? copy.saveError
              : ""}
      </div>

      <nav aria-label={copy.question} className="connectedTestRunner__navigator">
        {attempt.sections.map((item) => {
          const questionIds = layout.sectionQuestionIds[item.id] ?? [];
          if (questionIds.length === 0) return null;
          const active = item.id === section?.id;
          const answeredInSection = questionIds.filter((id) => answeredIds.has(id)).length;
          return (
            <section data-active={active || undefined} key={item.id}>
              <button
                className="connectedTestRunner__partButton"
                onClick={() => {
                  const index = attempt.questions.findIndex(({ id }) => id === questionIds[0]);
                  if (index >= 0) moveToQuestion(index);
                }}
                type="button"
              >
                <strong>
                  {dynamicCopy.part} {item.position}:
                </strong>
                <span>
                  {answeredInSection} / {questionIds.length} {copy.question.toLowerCase()}
                </span>
              </button>
              {active ? (
                <div>
                  {questionIds.map((questionId) => {
                    const index = attempt.questions.findIndex(({ id }) => id === questionId);
                    const target = attempt.questions[index];
                    if (!target || index < 0) return null;
                    return (
                      <button
                        aria-current={index === currentIndex ? "step" : undefined}
                        aria-label={`${copy.question} ${String(target.position)}`}
                        className={answeredIds.has(target.id) ? "is-answered" : undefined}
                        key={target.id}
                        onClick={() => moveToQuestion(index)}
                        type="button"
                      >
                        {target.position}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </section>
          );
        })}
        {layout.ungroupedQuestionIds.length > 0 ? (
          <section>
            <span>{copy.question}</span>
            <div>
              {layout.ungroupedQuestionIds.map((questionId) => {
                const index = attempt.questions.findIndex(({ id }) => id === questionId);
                const target = attempt.questions[index];
                if (!target || index < 0) return null;
                return (
                  <button
                    aria-current={index === currentIndex ? "step" : undefined}
                    aria-label={`${copy.question} ${String(target.position)}`}
                    className={answeredIds.has(target.id) ? "is-answered" : undefined}
                    key={target.id}
                    onClick={() => moveToQuestion(index)}
                    type="button"
                  >
                    {target.position}
                  </button>
                );
              })}
            </div>
          </section>
        ) : null}
      </nav>
    </StudentTestShell>
  );
}

function secondsRemaining(expiresAt: string | null, serverTime: string): number | null {
  if (!expiresAt) return null;
  return Math.max(0, Math.floor((Date.parse(expiresAt) - Date.parse(serverTime)) / 1_000));
}

function formatTime(seconds: number | null): string {
  if (seconds === null) return "--:--";
  const hours = Math.floor(seconds / 3_600);
  const minutes = Math.floor((seconds % 3_600) / 60);
  const remainder = seconds % 60;
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`
    : `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}
