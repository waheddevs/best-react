"use client";

import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import MicRounded from "@mui/icons-material/MicRounded";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Locale } from "@/config/Locales";
import { getStudentListeningTestNavbarCopy } from "@/dictionaries/student/StudentListeningTestNavbar";
import { getStudentSpeakingSimulatorCopy } from "@/dictionaries/student/StudentSpeakingSimulator";
import { useStudentTestExit } from "@/hooks/student/tests/useStudentTestExit";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { parseStudentSpeakingCueCard } from "@/lib/student/StudentSpeakingCueCard";
import {
  SaveStudentAttemptNoteDocument,
  SaveStudentTestAnswerDocument,
  type StudentAttemptFieldsFragment,
  SubmitStudentTestAttemptDocument,
} from "@/gql/graphql";

import { StudentAudioRecorder, type StudentAudioRecorderState } from "./StudentAudioRecorder";
import { StudentListeningTestNavbar } from "./StudentListeningTestNavbar";
import { StudentTestSectionIntro } from "./StudentTestSectionIntro";

type StudentSpeakingSimulatorProps = {
  attempt: StudentAttemptFieldsFragment;
  locale: Locale;
  paperId: string;
};

const copy = {
  uz: {
    audioRequired: "Davom etishdan oldin audio javobni yozib saqlang.",
    back: "Testga qaytish",
    completeDescription: "Audio javoblaringiz yuborildi va teacher tekshiruvi uchun saqlandi.",
    completeTitle: "Speaking practice yakunlandi",
    discussion: "Muhokama",
    finish: "Testni yakunlash",
    finishConfirm: "Speaking javoblarini yuborasizmi? Keyin ularni o'zgartirib bo'lmaydi.",
    introduction: "Kirish va suhbat",
    longTurn: "Long turn",
    next: "Keyingi savol",
    notes: "Qaydlar",
    notesHint: "Qaydlar avtomatik saqlanadi.",
    notesPlaceholder: "Bir daqiqalik tayyorgarlik uchun qisqa qaydlar...",
    part: "{part}/3 qism",
    preparation: "Tayyorgarlik",
    preparationHint: "Cue cardni o'qing va qisqa qaydlar qiling.",
    question: "{current}/{total} savol",
    return: "Qaytish",
    saveError: "Ma'lumot saqlanmadi. Internetni tekshirib qayta urinib ko'ring.",
    speaking: "Gapirish vaqti",
    startSpeaking: "Gapirishni boshlash",
    submitError: "Testni yakunlab bo'lmadi. Barcha audio javoblarni tekshiring.",
    timeRemaining: "Qolgan vaqt",
    totalTime: "Umumiy vaqt",
  },
  ru: {
    audioRequired: "Перед продолжением запишите и сохраните аудиоответ.",
    back: "Вернуться к тесту",
    completeDescription: "Аудиоответы отправлены и сохранены для проверки преподавателем.",
    completeTitle: "Практика Speaking завершена",
    discussion: "Обсуждение",
    finish: "Завершить тест",
    finishConfirm: "Отправить ответы Speaking? После отправки их нельзя изменить.",
    introduction: "Введение и интервью",
    longTurn: "Long turn",
    next: "Следующий вопрос",
    notes: "Заметки",
    notesHint: "Заметки сохраняются автоматически.",
    notesPlaceholder: "Краткие заметки для минутной подготовки...",
    part: "Часть {part} из 3",
    preparation: "Подготовка",
    preparationHint: "Прочитайте карточку и сделайте короткие заметки.",
    question: "Вопрос {current} из {total}",
    return: "Вернуться",
    saveError: "Не удалось сохранить данные. Проверьте интернет и повторите попытку.",
    speaking: "Время ответа",
    startSpeaking: "Начать ответ",
    submitError: "Не удалось завершить тест. Проверьте все аудиоответы.",
    timeRemaining: "Осталось",
    totalTime: "Общее время",
  },
  en: {
    audioRequired: "Record and save your audio response before continuing.",
    back: "Back to test",
    completeDescription: "Your audio responses were submitted and saved for teacher review.",
    completeTitle: "Speaking practice complete",
    discussion: "Discussion",
    finish: "Finish test",
    finishConfirm: "Submit your Speaking responses? You cannot change them afterwards.",
    introduction: "Introduction and interview",
    longTurn: "Long turn",
    next: "Next question",
    notes: "Notes",
    notesHint: "Notes are saved automatically.",
    notesPlaceholder: "Brief notes for your one-minute preparation...",
    part: "Part {part} of 3",
    preparation: "Preparation",
    preparationHint: "Read the cue card and make brief notes.",
    question: "Question {current} of {total}",
    return: "Return",
    saveError: "The data was not saved. Check your connection and try again.",
    speaking: "Speaking time",
    startSpeaking: "Start speaking",
    submitError: "The test could not be completed. Check every audio response.",
    timeRemaining: "Time remaining",
    totalTime: "Total time",
  },
} as const;

export function StudentSpeakingSimulator({
  attempt,
  locale,
  paperId,
}: StudentSpeakingSimulatorProps) {
  const labels = copy[locale];
  const confirm = useConfirmDialog();
  const navbarCopy = getStudentListeningTestNavbarCopy(locale);
  const speakingCopy = getStudentSpeakingSimulatorCopy(locale);
  const router = useRouter();
  const orderedQuestions = useMemo(
    () =>
      [...attempt.questions].sort((left, right) => {
        const leftSection = attempt.sections.find((section) => section.id === left.sectionId);
        const rightSection = attempt.sections.find((section) => section.id === right.sectionId);
        return (
          (leftSection?.position ?? 0) - (rightSection?.position ?? 0) ||
          left.position - right.position
        );
      }),
    [attempt.questions, attempt.sections],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>(() =>
    Object.fromEntries(attempt.notes.map((note) => [note.sectionId, note.text])),
  );
  const [recordedIds, setRecordedIds] = useState(
    () =>
      new Set(
        attempt.answers
          .filter((answer) => Boolean(answer.responseMediaObjectId))
          .map((answer) => answer.questionId),
      ),
  );
  const [remainingSeconds, setRemainingSeconds] = useState(() =>
    secondsRemaining(attempt.expiresAt, attempt.serverTime),
  );
  const [partTwoStage, setPartTwoStage] = useState<"preparation" | "speaking">("preparation");
  const [partTwoSeconds, setPartTwoSeconds] = useState(60);
  const [recorderState, setRecorderState] = useState<StudentAudioRecorderState>("idle");
  const [autoStopPartTwo, setAutoStopPartTwo] = useState(false);
  const savedNotesRef = useRef<Record<string, string>>(
    Object.fromEntries(attempt.notes.map((note) => [note.sectionId, note.text])),
  );
  const autoSubmittedRef = useRef(false);
  const confirmingSubmitRef = useRef(false);
  const advancedFromPartTwoRef = useRef(false);
  const question = orderedQuestions[currentIndex];
  const section = attempt.sections.find((item) => item.id === question?.sectionId) ?? null;
  const part = Math.min(3, Math.max(1, section?.position ?? 1));
  const questionsInPart = orderedQuestions.filter((item) => item.sectionId === section?.id);
  const questionInPart = Math.max(
    0,
    questionsInPart.findIndex((item) => item.id === question?.id),
  );
  const isPartTwo = part === 2;
  const [saveAnswer] = useMutation(SaveStudentTestAnswerDocument, {
    context: { authenticated: true },
  });
  const [saveNote] = useMutation(SaveStudentAttemptNoteDocument, {
    context: { authenticated: true },
  });
  const [submitAttempt, { loading: submitting }] = useMutation(SubmitStudentTestAttemptDocument, {
    context: { authenticated: true },
  });

  const returnHref = `/${locale}/student/tests/${paperId}`;
  const testsHref = `/${locale}/student/tests`;
  const { exit, exiting, exitingRef, trackWrite } = useStudentTestExit({
    attemptId: attempt.id,
    locale,
    returnHref,
    active: !completed && attempt.status === "IN_PROGRESS",
    speaking: true,
    canExit: () => !autoSubmittedRef.current && !submitting && !confirmingSubmitRef.current,
  });

  const moveToNext = useCallback(() => {
    setError("");
    setAutoStopPartTwo(false);
    setRecorderState("idle");
    setCurrentIndex((current) => Math.min(orderedQuestions.length - 1, current + 1));
  }, [orderedQuestions.length]);

  const advanceFromPartTwo = useCallback(() => {
    if (
      advancedFromPartTwoRef.current ||
      exitingRef.current ||
      !isPartTwo ||
      !question ||
      !recordedIds.has(question.id) ||
      recorderState !== "idle"
    )
      return;
    advancedFromPartTwoRef.current = true;
    moveToNext();
  }, [exitingRef, isPartTwo, moveToNext, question, recordedIds, recorderState]);

  const handleRecorderStateChange = useCallback((nextState: StudentAudioRecorderState) => {
    setRecorderState(nextState);
  }, []);

  useEffect(() => {
    if (autoStopPartTwo) advanceFromPartTwo();
  }, [advanceFromPartTwo, autoStopPartTwo]);

  useEffect(() => {
    if (completed) return;
    const timer = window.setInterval(
      () => setRemainingSeconds((current) => (current === null ? null : Math.max(0, current - 1))),
      1_000,
    );
    return () => window.clearInterval(timer);
  }, [completed]);

  useEffect(() => {
    if (remainingSeconds !== 0 || autoSubmittedRef.current || exitingRef.current) return;
    autoSubmittedRef.current = true;
    void submitAttempt({ variables: { input: { attemptId: attempt.id } } })
      .then(() => {
        setCompleted(true);
        router.push(testsHref);
        router.refresh();
      })
      .catch(() => {
        autoSubmittedRef.current = false;
        setError(labels.submitError);
      });
  }, [
    attempt.id,
    remainingSeconds,
    testsHref,
    router,
    submitAttempt,
    exiting,
    exitingRef,
    labels.submitError,
  ]);

  useEffect(() => {
    if (!section || (isPartTwo && partTwoStage !== "preparation")) return;
    const text = notes[section.id] ?? "";
    if (savedNotesRef.current[section.id] === text) return;
    const timeout = window.setTimeout(() => {
      if (exitingRef.current) return;
      void trackWrite(
        saveNote({
          variables: { input: { attemptId: attempt.id, sectionId: section.id, text } },
        }),
      )
        .then(() => {
          savedNotesRef.current[section.id] = text;
        })
        .catch(() => setError(labels.saveError));
    }, 700);
    return () => window.clearTimeout(timeout);
  }, [
    attempt.id,
    isPartTwo,
    labels.saveError,
    notes,
    partTwoStage,
    saveNote,
    section,
    exitingRef,
    trackWrite,
  ]);

  useEffect(() => {
    if (!isPartTwo || partTwoSeconds <= 0) return;
    const timeout = window.setTimeout(() => {
      if (partTwoSeconds > 1) {
        setPartTwoSeconds(partTwoSeconds - 1);
        return;
      }
      if (partTwoStage === "preparation") {
        setPartTwoStage("speaking");
        setPartTwoSeconds(120);
        return;
      }
      setPartTwoSeconds(0);
      setAutoStopPartTwo(true);
    }, 1_000);
    return () => window.clearTimeout(timeout);
  }, [isPartTwo, partTwoSeconds, partTwoStage]);

  if (!question || !section) return null;

  const handleUploaded = async (responseMediaObjectId: string) => {
    if (exitingRef.current) return;
    setError("");
    try {
      await trackWrite(
        saveAnswer({
          variables: {
            input: { attemptId: attempt.id, questionId: question.id, responseMediaObjectId },
          },
        }),
      );
      setRecordedIds((current) => new Set(current).add(question.id));
    } catch {
      setError(labels.saveError);
      throw new Error("Speaking answer was not saved");
    }
  };

  const handleNext = () => {
    if (exitingRef.current || recorderState === "recording" || recorderState === "uploading")
      return;
    if (!recordedIds.has(question.id)) {
      setError(labels.audioRequired);
      return;
    }
    moveToNext();
  };

  const handleSubmit = async () => {
    if (exitingRef.current || autoSubmittedRef.current || confirmingSubmitRef.current) return;
    if (!recordedIds.has(question.id) || recordedIds.size < orderedQuestions.length) {
      setError(labels.audioRequired);
      return;
    }
    confirmingSubmitRef.current = true;
    try {
      const confirmed = await confirm({
        brand: "student-speaking",
        cancelLabel: navbarCopy.cancelExitLabel,
        confirmLabel: navbarCopy.completeLabel,
        icon: "tone",
        message: labels.finishConfirm,
        title: labels.finish,
        tone: "warning",
      });
      if (!confirmed || exitingRef.current || autoSubmittedRef.current) return;
      setError("");
      autoSubmittedRef.current = true;
      await submitAttempt({ variables: { input: { attemptId: attempt.id } } });
      setCompleted(true);
      router.push(testsHref);
      router.refresh();
    } catch {
      autoSubmittedRef.current = false;
      setError(labels.submitError);
    } finally {
      confirmingSubmitRef.current = false;
    }
  };

  const startPartTwoSpeaking = () => {
    setPartTwoStage("speaking");
    setPartTwoSeconds(120);
  };

  if (completed) return null;

  const partLabel =
    part === 1 ? labels.introduction : part === 2 ? labels.longTurn : labels.discussion;
  const lastQuestion = currentIndex === orderedQuestions.length - 1;
  const cueCard = parseStudentSpeakingCueCard(question.prompt);

  return (
    <main className="studentSpeakingSimulator studentSpeakingSimulator--exam" inert={exiting}>
      <StudentListeningTestNavbar
        backLabel={labels.back}
        onExit={() => void exit()}
        copy={navbarCopy}
        currentSection={part}
        completeDisabled={
          submitting || recorderState === "recording" || recorderState === "uploading"
        }
        nextSectionDisabled={
          submitting || recorderState === "recording" || recorderState === "uploading"
        }
        notesLabel={labels.notes}
        notesOpen={notesOpen}
        onNextSection={handleNext}
        onComplete={() => void handleSubmit()}
        onNotesToggle={() => setNotesOpen((current) => !current)}
        sectionLabel={partLabel}
        sectionNavigation={<strong>{labels.part.replace("{part}", String(part))}</strong>}
        timeLabel={labels.totalTime}
        timeValue={formatTime(remainingSeconds)}
        title={attempt.title}
        totalSections={3}
      />

      {notesOpen ? (
        <aside className="connectedTestRunner__notesPanel">
          <div>
            <strong>{labels.notes}</strong>
            <button aria-label={labels.notes} onClick={() => setNotesOpen(false)} type="button">
              ×
            </button>
          </div>
          <textarea
            aria-label={labels.notes}
            autoFocus
            maxLength={4000}
            onChange={(event) =>
              setNotes((current) => ({ ...current, [section.id]: event.target.value }))
            }
            readOnly={submitting || (isPartTwo && partTwoStage === "speaking")}
            value={notes[section.id] ?? ""}
          />
        </aside>
      ) : null}

      <div
        className={`studentSpeakingSimulator__workspace${isPartTwo ? " studentSpeakingSimulator__workspace--partTwo" : ""}`}
      >
        <StudentTestSectionIntro
          question={section.title}
          instruction={section.instructions || speakingCopy.instruction}
          instructionLabel={speakingCopy.instructionLabel}
        />

        <div className="studentSpeakingSimulator__progress" aria-hidden="true">
          {[1, 2, 3].map((item) => (
            <span data-active={item <= part ? "true" : undefined} key={item} />
          ))}
        </div>

        {isPartTwo ? (
          <section className="studentSpeakingSimulator__partTwo">
            <article className="studentSpeakingSimulator__cueCard">
              <span>{partTwoStage === "preparation" ? labels.preparation : labels.speaking}</span>
              <h2>{cueCard.title}</h2>
              {cueCard.points.length > 0 ? (
                <ul className="studentSpeakingSimulator__cuePoints">
                  {cueCard.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              ) : null}
              <footer className="studentSpeakingSimulator__cueFooter">
                {section.content ? <p>{section.content}</p> : null}
                <div className="studentSpeakingSimulator__partTime" role="timer">
                  <span>{labels.timeRemaining}</span>
                  <strong>{formatTime(partTwoSeconds)}</strong>
                </div>
              </footer>
            </article>

            <aside className="studentSpeakingSimulator__notes">
              <label htmlFor="student-speaking-notes">{labels.notes}</label>
              <textarea
                disabled={partTwoStage === "speaking"}
                id="student-speaking-notes"
                maxLength={4000}
                onChange={(event) =>
                  setNotes((current) => ({ ...current, [section.id]: event.target.value }))
                }
                placeholder={labels.notesPlaceholder}
                value={notes[section.id] ?? ""}
              />
              <p>{partTwoStage === "preparation" ? labels.preparationHint : labels.notesHint}</p>
              {partTwoStage === "speaking" ? (
                <StudentAudioRecorder
                  attemptId={attempt.id}
                  autoStop={autoStopPartTwo}
                  locale={locale}
                  onStateChange={handleRecorderStateChange}
                  onUploaded={handleUploaded}
                  questionId={question.id}
                  saved={recordedIds.has(question.id)}
                />
              ) : null}
            </aside>

            {partTwoStage === "preparation" ? (
              <button
                className="studentSpeakingSimulator__primaryAction"
                onClick={startPartTwoSpeaking}
                type="button"
              >
                {labels.startSpeaking}
                <ArrowForwardRounded aria-hidden="true" />
              </button>
            ) : recordedIds.has(question.id) ? (
              <button
                className="studentSpeakingSimulator__nextQuestion"
                disabled={
                  submitting || recorderState === "recording" || recorderState === "uploading"
                }
                onClick={handleNext}
                type="button"
              >
                {labels.next}
                <ArrowForwardRounded aria-hidden="true" />
              </button>
            ) : null}
          </section>
        ) : (
          <section className="studentSpeakingSimulator__questionCard">
            <p>
              {labels.question
                .replace("{current}", String(questionInPart + 1))
                .replace("{total}", String(questionsInPart.length))}
            </p>
            <h2>{question.prompt}</h2>
            <StudentAudioRecorder
              attemptId={attempt.id}
              locale={locale}
              onStateChange={handleRecorderStateChange}
              onUploaded={handleUploaded}
              questionId={question.id}
              saved={recordedIds.has(question.id)}
            />
            <button
              className={
                lastQuestion
                  ? "studentSpeakingSimulator__primaryAction"
                  : "studentSpeakingSimulator__nextQuestion"
              }
              disabled={
                exiting ||
                submitting ||
                recorderState === "recording" ||
                recorderState === "uploading"
              }
              onClick={lastQuestion ? () => void handleSubmit() : handleNext}
              type="button"
            >
              {lastQuestion ? labels.finish : labels.next}
              <ArrowForwardRounded aria-hidden="true" />
            </button>
          </section>
        )}

        {error ? (
          <p className="studentSpeakingSimulator__error" role="alert">
            <MicRounded aria-hidden="true" />
            {error}
          </p>
        ) : null}
      </div>
    </main>
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
