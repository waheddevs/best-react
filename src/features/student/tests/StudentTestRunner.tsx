"use client";

import ArrowBackIosNewRounded from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRounded from "@mui/icons-material/ArrowForwardIosRounded";
import FlagOutlined from "@mui/icons-material/FlagOutlined";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Locale } from "@/config/Locales";
import { getStudentListeningSectionCopy } from "@/dictionaries/student/StudentListeningSection";
import { getStudentListeningTestNavbarCopy } from "@/dictionaries/student/StudentListeningTestNavbar";
import { getStudentReadingSimulatorCopy } from "@/dictionaries/student/StudentReadingSimulator";
import {
  SaveStudentAttemptNoteDocument,
  SaveStudentTestAnswerDocument,
  type SaveAttemptAnswerInput,
  StudentAttemptMediaDownloadDocument,
  type StudentAttemptFieldsFragment,
  SubmitStudentTestAttemptDocument,
} from "@/gql/graphql";
import { resolveDynamicTestLayout } from "@/lib/tests/DynamicTestLayout";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { useStudentTestExit } from "@/hooks/student/tests/useStudentTestExit";

import { StudentAudioRecorder } from "./StudentAudioRecorder";
import {
  StudentAcademicReadingQuestions,
  type StudentAcademicReadingCopy,
} from "./StudentAcademicReadingQuestions";
import { StudentListeningAudioPlayer } from "./StudentListeningAudioPlayer";
import { StudentListeningFormTable } from "./StudentListeningFormTable";
import { StudentListeningMultipleChoiceList } from "./StudentListeningMultipleChoiceList";
import { StudentListeningPartFourCompletion } from "./StudentListeningPartFourCompletion";
import { StudentListeningPartThreeList } from "./StudentListeningPartThreeList";
import { StudentTestSectionMaterial } from "./StudentTestSectionMaterial";
import { StudentTestShell } from "./StudentTestShell";
import { StudentReadingSectionIntro } from "./StudentReadingSectionIntro";

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
    audioPlay: "Audioni ko‘pi bilan ikki marta ijro etish",
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
    submitTitle: "Ogohlantirish",
    submitCancel: "Bekor qilish",
    submitContinue: "Davom etish",
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
    audioPlay: "Воспроизвести аудио не более двух раз",
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
    submitTitle: "Предупреждение",
    submitCancel: "Отмена",
    submitContinue: "Продолжить",
    submitConfirm: "После отправки ответы нельзя изменить. Продолжить?",
    time: "Осталось",
  },
  en: {
    answer: "Your answer",
    answered: "Answered",
    audio: "Listening audio",
    audioError: "The audio could not be opened. Check your connection.",
    audioFinished: "Audio finished. Check your answers.",
    audioPlay: "Play the audio up to two times",
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
    submitTitle: "Warning",
    submitCancel: "Cancel",
    submitContinue: "Continue",
    submitConfirm: "You cannot change answers after submission. Do you want to continue?",
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

const listeningPartThreeCopy = {
  uz: {
    matching: "26–30 · Fikrlarni speakerlar bilan moslang",
    multipleChoice: "21–25 · A, B yoki C javobini tanlang",
    select: "Speakerni tanlang",
    speakers: "Speaker variantlari",
  },
  ru: {
    matching: "26–30 · Сопоставьте мнения с говорящими",
    multipleChoice: "21–25 · Выберите A, B или C",
    select: "Выберите говорящего",
    speakers: "Варианты говорящих",
  },
  en: {
    matching: "26–30 · Match the views to the speakers",
    multipleChoice: "21–25 · Choose A, B or C",
    select: "Choose a speaker",
    speakers: "Speaker options",
  },
} as const;

const listeningPartFourCopy = {
  uz: {
    noteCompletion: "31–35 · Qaydlarni to‘ldiring",
    tableCompletion: "36–40 · Jadvalni to‘ldiring",
  },
  ru: {
    noteCompletion: "31–35 · Заполните заметки",
    tableCompletion: "36–40 · Заполните таблицу",
  },
  en: {
    noteCompletion: "31–35 · Complete the notes",
    tableCompletion: "36–40 · Complete the table",
  },
} as const;

const academicReadingCopy: Record<Locale, StudentAcademicReadingCopy> = {
  uz: {
    choose: "Javobni tanlang",
    headingMatching: "14–18 · Sarlavhalarni moslang",
    informationMatching: "19–22 · Ma’lumotlarni moslang",
    multipleChoice: "32–36 · A, B, C yoki D javobini tanlang",
    noteCompletion: "7–13 · Qaydlarni to‘ldiring",
    sentenceCompletion: "23–26 · Gaplarni to‘ldiring",
    summaryCompletion: "37–40 · Xulosani to‘ldiring",
    trueFalseNotGiven: "1–6 · TRUE / FALSE / NOT GIVEN",
    yesNoNotGiven: "27–31 · YES / NO / NOT GIVEN",
  },
  ru: {
    choose: "Выберите ответ",
    headingMatching: "14–18 · Сопоставьте заголовки",
    informationMatching: "19–22 · Сопоставьте информацию",
    multipleChoice: "32–36 · Выберите A, B, C или D",
    noteCompletion: "7–13 · Заполните заметки",
    sentenceCompletion: "23–26 · Дополните предложения",
    summaryCompletion: "37–40 · Заполните краткое содержание",
    trueFalseNotGiven: "1–6 · TRUE / FALSE / NOT GIVEN",
    yesNoNotGiven: "27–31 · YES / NO / NOT GIVEN",
  },
  en: {
    choose: "Choose an answer",
    headingMatching: "14–18 · Match the headings",
    informationMatching: "19–22 · Match the information",
    multipleChoice: "32–36 · Choose A, B, C or D",
    noteCompletion: "7–13 · Complete the notes",
    sentenceCompletion: "23–26 · Complete the sentences",
    summaryCompletion: "37–40 · Complete the summary",
    trueFalseNotGiven: "1–6 · TRUE / FALSE / NOT GIVEN",
    yesNoNotGiven: "27–31 · YES / NO / NOT GIVEN",
  },
};

export function StudentTestRunner({ attempt, locale, paperId }: StudentTestRunnerProps) {
  const copy = runnerCopy[locale];
  const dynamicCopy = dynamicRunnerCopy[locale];
  const listeningSectionCopy = getStudentListeningSectionCopy(locale);
  const listeningNavbarCopy = getStudentListeningTestNavbarCopy(locale);
  const readingCopy = getStudentReadingSimulatorCopy(locale);
  const readOnly = attempt.status !== "IN_PROGRESS";
  const router = useRouter();
  const confirm = useConfirmDialog();
  const submissionPendingRef = useRef(false);
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
  const { exit, exiting, exitingRef, trackWrite } = useStudentTestExit({
    attemptId: attempt.id,
    locale,
    returnHref: `/${locale}/student/tests/${paperId}`,
    active: !readOnly,
    reading: attempt.skill === "READING",
    canExit: () => !autoSubmittedRef.current && !submissionPendingRef.current,
  });
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
  const listeningMultipleChoiceQuestions =
    attempt.skill === "LISTENING" &&
    section?.position === 2 &&
    sectionQuestions.length > 0 &&
    sectionQuestions.every((item) => item.kind === "SINGLE_CHOICE" && item.options.length === 3)
      ? sectionQuestions
      : null;
  const listeningPartThreeQuestions =
    attempt.skill === "LISTENING" &&
    section?.position === 3 &&
    sectionQuestions.length === 10 &&
    sectionQuestions.every((item) => item.kind === "SINGLE_CHOICE" && item.options.length === 3)
      ? sectionQuestions
      : null;
  const listeningPartFourQuestions =
    attempt.skill === "LISTENING" &&
    section?.position === 4 &&
    sectionQuestions.length === 10 &&
    sectionQuestions.every(
      (item) => item.kind === "SHORT_TEXT" && item.position >= 31 && item.position <= 40,
    )
      ? [...sectionQuestions].sort((left, right) => left.position - right.position)
      : null;
  const listeningPartFourTableBlock = listeningPartFourQuestions
    ? (section?.blocks.find(
        (block) =>
          block.kind === "TABLE" &&
          block.tableRows.some(({ cells }) =>
            cells.some((cell) => /\{\{(?:3[6-9]|40)\}\}/u.test(cell)),
          ),
      ) ?? null)
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
      if (exitingRef.current) return;
      void trackWrite(
        saveNote({
          variables: {
            input: { attemptId: attempt.id, sectionId: section.id, text },
          },
        }),
      )
        .then(() => {
          savedNotesRef.current[section.id] = text;
        })
        .catch(() => setSaveState("error"));
    }, 700);
    return () => window.clearTimeout(timeout);
  }, [attempt.id, attempt.skill, notes, readOnly, saveNote, section, exitingRef, trackWrite]);

  useEffect(() => {
    if (readOnly) return;
    const timer = window.setInterval(
      () => setRemainingSeconds((current) => (current === null ? null : Math.max(0, current - 1))),
      1_000,
    );
    return () => window.clearInterval(timer);
  }, [readOnly]);

  useEffect(() => {
    if (readOnly || remainingSeconds !== 0 || autoSubmittedRef.current || exitingRef.current)
      return;
    autoSubmittedRef.current = true;
    void submitAttempt({ variables: { input: { attemptId: attempt.id } } })
      .then(() => {
        router.replace(
          attempt.skill === "LISTENING" || attempt.skill === "READING"
            ? `/${locale}/student/results/${attempt.id}`
            : `/${locale}/student/tests/${paperId}`,
        );
      })
      .catch(() => setSaveState("error"));
  }, [
    attempt.id,
    attempt.skill,
    locale,
    paperId,
    readOnly,
    remainingSeconds,
    router,
    submitAttempt,
    exitingRef,
    exiting,
  ]);

  if (!question) return null;

  const persistForQuestion = async (
    questionId: string,
    input: Omit<SaveAttemptAnswerInput, "attemptId" | "questionId">,
  ) => {
    if (readOnly || exitingRef.current) return;
    setSaveState("saving");
    try {
      await trackWrite(
        saveAnswer({
          variables: { input: { ...input, attemptId: attempt.id, questionId } },
        }),
      );
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

  const handleMatching = (questionId: string, optionId: string) => {
    const matchingQuestion = attempt.questions.find(({ id }) => id === questionId);
    if (matchingQuestion?.kind !== "MATCHING") {
      handleSingle(questionId, optionId);
      return;
    }

    const localAnswer = answers[questionId] ?? emptyLocalAnswer;
    const selectedOptionIds = [optionId];
    setAnswers((current) => ({
      ...current,
      [questionId]: { ...localAnswer, selectedOptionIds },
    }));
    void persistForQuestion(questionId, { selectedOptionIds });
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
    if (readOnly || submitting || submissionPendingRef.current || exitingRef.current) return;
    if (attempt.skill === "SPEAKING" && answeredIds.size < attempt.questions.length) {
      setSaveState("error");
      return;
    }
    submissionPendingRef.current = true;
    try {
      const confirmed = await confirm({
        brand: attempt.skill === "READING" ? "student-reading" : "student",
        cancelLabel: copy.submitCancel,
        confirmLabel: copy.submitContinue,
        icon: "tone",
        message: copy.submitConfirm,
        title: copy.submitTitle,
        tone: "warning",
      });
      if (!confirmed || autoSubmittedRef.current || exitingRef.current) return;
      await submitAttempt({ variables: { input: { attemptId: attempt.id } } });
      router.replace(
        attempt.skill === "LISTENING" || attempt.skill === "READING"
          ? `/${locale}/student/results/${attempt.id}`
          : `/${locale}/student/tests/${paperId}`,
      );
    } catch {
      setSaveState("error");
    } finally {
      submissionPendingRef.current = false;
    }
  };

  return (
    <StudentTestShell
      answeredCount={answeredIds.size}
      answeredLabel={copy.answered}
      backHref={`/${locale}/student/tests/${paperId}`}
      backLabel={copy.exit}
      exiting={exiting}
      currentSection={currentSectionNumber}
      density={layout.density}
      layout={layout.preset}
      listeningNavbarCopy={listeningNavbarCopy}
      nextSectionDisabled={currentSectionIndex >= attempt.sections.length - 1}
      notesLabel={copy.notes}
      notesPlaceholder={copy.notesPlaceholder}
      notesReadOnly={readOnly}
      notesValue={section ? (notes[section.id] ?? "") : ""}
      onNextSection={() => moveSection(1)}
      onExit={() => void exit()}
      onNotesChange={(value) => {
        if (!section) return;
        setNotes((current) => ({ ...current, [section.id]: value }));
      }}
      onSubmit={() => void handleSubmit()}
      partsLabel={copy.parts}
      sectionLabel={attempt.skill === "READING" ? readingCopy.passage : copy.section}
      skill={attempt.skill ?? "READING"}
      submitLabel={readOnly ? copy.completed : copy.submit}
      submitting={submitting || readOnly || exiting}
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
            maximumPlays={2}
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
      {attempt.skill === "READING" && section ? (
        <StudentReadingSectionIntro
          instructions={section.instructions}
          generalInstruction={readingCopy.instruction.replace("{range}", questionRange)}
          generalInstructionLabel={readingCopy.instructionLabel}
        />
      ) : null}
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
            generalInstruction={
              attempt.skill === "LISTENING"
                ? listeningSectionCopy.generalInstruction.replace("{range}", questionRange)
                : undefined
            }
            generalInstructionLabel={
              attempt.skill === "LISTENING"
                ? listeningSectionCopy.generalInstructionLabel
                : undefined
            }
            instructions={section.instructions}
            mediaObjectId={section.mediaObjectId}
            partLabel={attempt.skill === "READING" ? readingCopy.passage : dynamicCopy.part}
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
          {attempt.skill === "LISTENING" ? (
            <h2 className="studentListeningSectionTitle">
              {listeningFormBlock?.caption || section?.title || attempt.title}
            </h2>
          ) : null}
          {listeningFormBlock ||
          listeningPartThreeQuestions ||
          listeningPartFourQuestions ||
          attempt.skill === "READING" ? null : (
            <header className="connectedTestRunner__questionGroupHeading">
              <h2>
                {copy.question} {questionRange}
              </h2>
            </header>
          )}

          {attempt.skill === "READING" && section ? (
            <StudentAcademicReadingQuestions
              answerLabel={copy.answer}
              answers={answers}
              copy={academicReadingCopy[locale]}
              currentQuestionId={question.id}
              onChoiceAnswer={handleSingle}
              onMatchingAnswer={handleMatching}
              onQuestionFocus={(questionId) => {
                const index = attempt.questions.findIndex(({ id }) => id === questionId);
                if (index >= 0) setCurrentIndex(index);
              }}
              onReviewToggle={(questionId) =>
                setReviewIds((current) =>
                  current.includes(questionId)
                    ? current.filter((id) => id !== questionId)
                    : [...current, questionId],
                )
              }
              onTextAnswerBlur={handleTextSave}
              onTextAnswerChange={handleTextChange}
              questions={sectionQuestions}
              readOnly={readOnly}
              reviewIds={reviewIds}
              reviewLabel={copy.review}
              sectionPosition={section.position}
            />
          ) : listeningFormBlock ? (
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
              showCaption={false}
            />
          ) : listeningMultipleChoiceQuestions ? (
            <StudentListeningMultipleChoiceList
              answers={answers}
              currentQuestionId={question.id}
              onAnswer={handleSingle}
              onQuestionFocus={(questionId) => {
                const index = attempt.questions.findIndex(({ id }) => id === questionId);
                if (index >= 0) setCurrentIndex(index);
              }}
              onReviewToggle={(questionId) =>
                setReviewIds((current) =>
                  current.includes(questionId)
                    ? current.filter((id) => id !== questionId)
                    : [...current, questionId],
                )
              }
              questions={listeningMultipleChoiceQuestions}
              readOnly={readOnly}
              reviewIds={reviewIds}
              reviewLabel={copy.review}
            />
          ) : listeningPartThreeQuestions ? (
            <StudentListeningPartThreeList
              answers={answers}
              copy={listeningPartThreeCopy[locale]}
              currentQuestionId={question.id}
              onAnswer={handleSingle}
              onQuestionFocus={(questionId) => {
                const index = attempt.questions.findIndex(({ id }) => id === questionId);
                if (index >= 0) setCurrentIndex(index);
              }}
              onReviewToggle={(questionId) =>
                setReviewIds((current) =>
                  current.includes(questionId)
                    ? current.filter((id) => id !== questionId)
                    : [...current, questionId],
                )
              }
              questions={listeningPartThreeQuestions}
              readOnly={readOnly}
              reviewIds={reviewIds}
              reviewLabel={copy.review}
            />
          ) : listeningPartFourQuestions ? (
            <StudentListeningPartFourCompletion
              answerLabel={copy.answer}
              answers={answers}
              copy={listeningPartFourCopy[locale]}
              currentQuestionId={question.id}
              noteQuestions={listeningPartFourQuestions.slice(0, 5)}
              onAnswerBlur={handleTextSave}
              onAnswerChange={handleTextChange}
              onQuestionFocus={(questionId) => {
                const index = attempt.questions.findIndex(({ id }) => id === questionId);
                if (index >= 0) setCurrentIndex(index);
              }}
              readOnly={readOnly}
              tableBlock={listeningPartFourTableBlock}
              tableQuestions={listeningPartFourQuestions.slice(5)}
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

          {attempt.skill !== "LISTENING" && attempt.skill !== "READING" ? (
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
          ) : null}
        </section>
      </div>

      <div
        aria-live="polite"
        className={`connectedTestRunner__save connectedTestRunner__save_${saveState}`}
      >
        {saveState === "saving"
          ? copy.saving
          : saveState === "saved" && attempt.skill !== "LISTENING" && attempt.skill !== "READING"
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
                  {attempt.skill === "READING"
                    ? readingCopy.passage
                    : attempt.skill === "LISTENING"
                      ? copy.section
                      : dynamicCopy.part}{" "}
                  {item.position}
                  {attempt.skill === "LISTENING" || attempt.skill === "READING" ? null : ":"}
                </strong>
                <span>
                  {answeredInSection}/{questionIds.length} {copy.question.toLowerCase()}
                </span>
              </button>
              {active || attempt.skill === "LISTENING" || attempt.skill === "READING" ? (
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
