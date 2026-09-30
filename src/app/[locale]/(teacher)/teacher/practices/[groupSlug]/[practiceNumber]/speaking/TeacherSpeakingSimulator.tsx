"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import MicRounded from "@mui/icons-material/MicRounded";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import { useMemo, useState } from "react";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/config/Locales";
import { getTeacherSpeakingCopy } from "@/dictionaries/teacher/TeacherSpeaking";
import type { TeacherSpeakingPromptSet } from "@/types/teacher/TeacherSpeaking";

type TeacherSpeakingSimulatorProps = {
  locale: Locale;
  partCount: number;
  practiceNumber: number;
  prompts: TeacherSpeakingPromptSet;
  publishedAt: string | null;
  questionCount: number;
  returnHref: string;
};

type PreviewStep =
  | { kind: "part1"; questionIndex: number }
  | { kind: "part2" }
  | { kind: "part3"; questionIndex: number };

function formatPublishedDate(locale: Locale, value: string | null) {
  if (!value) return "";
  const locales: Record<Locale, string> = { en: "en-GB", ru: "ru-RU", uz: "uz-UZ" };
  return new Intl.DateTimeFormat(locales[locale], {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(value));
}

export function TeacherSpeakingSimulator({
  locale,
  partCount,
  practiceNumber,
  prompts,
  publishedAt,
  questionCount,
  returnHref,
}: TeacherSpeakingSimulatorProps) {
  const copy = getTeacherSpeakingCopy(locale);
  const steps = useMemo<PreviewStep[]>(
    () => [
      ...prompts.part1.questions.map((_, questionIndex) => ({
        kind: "part1" as const,
        questionIndex,
      })),
      { kind: "part2" as const },
      ...prompts.part3.questions.map((_, questionIndex) => ({
        kind: "part3" as const,
        questionIndex,
      })),
    ],
    [prompts],
  );
  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];
  const part = step.kind === "part1" ? 1 : step.kind === "part2" ? 2 : 3;
  const partLabel = part === 1 ? copy.part1Label : part === 2 ? copy.part2Label : copy.part3Label;

  const move = (direction: -1 | 1) => {
    setStepIndex((current) => Math.min(steps.length - 1, Math.max(0, current + direction)));
  };

  return (
    <main className="teacherSpeaking" data-phase={step.kind} data-preview="true">
      <header className="teacherSpeaking__header">
        <ScrollToTopLink
          aria-label={copy.back}
          className="teacherGroups__backLink"
          href={returnHref}
        >
          <ArrowBackRounded aria-hidden="true" />
        </ScrollToTopLink>

        <div className="teacherSpeaking__title">
          <span>{copy.previewMode}</span>
          <h1>{copy.testTitle.replace("{number}", String(practiceNumber))}</h1>
          <p>{partLabel}</p>
        </div>

        <div className="teacherSpeaking__previewMark">
          <VisibilityOutlined aria-hidden="true" />
          <span>{copy.readOnly}</span>
        </div>
      </header>

      <p className="teacherSpeaking__previewNotice">
        <strong>{copy.questionSet}</strong>
        <span>
          {(publishedAt ? copy.questionSetPublished : copy.questionSetSummary)
            .replace("{questions}", String(questionCount))
            .replace("{parts}", String(partCount))
            .replace("{date}", formatPublishedDate(locale, publishedAt))}
        </span>
        <span>{copy.previewDescription}</span>
      </p>

      <div className="teacherSpeaking__progress" aria-hidden="true">
        {[1, 2, 3].map((item) => (
          <span data-active={item <= part ? "true" : undefined} key={item} />
        ))}
      </div>

      {step.kind === "part1" || step.kind === "part3" ? (
        <section className="teacherSpeaking__runner" aria-labelledby="speaking-preview-question">
          <div className="teacherSpeaking__promptMeta">
            <span>{step.kind === "part1" ? prompts.part1.topic : prompts.part3.topic}</span>
            <strong>
              {copy.questionProgress
                .replace("{current}", String(step.questionIndex + 1))
                .replace(
                  "{total}",
                  String(
                    step.kind === "part1"
                      ? prompts.part1.questions.length
                      : prompts.part3.questions.length,
                  ),
                )}
            </strong>
          </div>
          <p className="teacherSpeaking__promptLabel">{copy.examinerQuestion}</p>
          <h2 id="speaking-preview-question">
            {step.kind === "part1"
              ? prompts.part1.questions[step.questionIndex]
              : prompts.part3.questions[step.questionIndex]}
          </h2>
          <PreviewRecording copy={copy} />
        </section>
      ) : null}

      {step.kind === "part2" ? (
        <section className="teacherSpeaking__part2" aria-labelledby="speaking-preview-cue-card">
          <div className="teacherSpeaking__cueCard">
            <span>{copy.preparation}</span>
            <h2 id="speaking-preview-cue-card">{prompts.part2.prompt}</h2>
            {prompts.part2.points.length > 0 ? (
              <ol>
                {prompts.part2.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ol>
            ) : null}
            {prompts.part2.followUp ? (
              <p>
                <strong>{copy.followUp}:</strong> {prompts.part2.followUp}
              </p>
            ) : null}
          </div>

          <div className="teacherSpeaking__notes">
            <label htmlFor="teacher-speaking-preview-notes">{copy.notes}</label>
            <textarea
              disabled
              id="teacher-speaking-preview-notes"
              placeholder={copy.notesPreview}
              rows={8}
            />
            <p>{copy.readOnlyHint}</p>
            <PreviewRecording copy={copy} />
          </div>
        </section>
      ) : null}

      <nav aria-label={copy.previewNavigation} className="teacherSpeaking__previewActions">
        <Button
          disabled={stepIndex === 0}
          onClick={() => move(-1)}
          shape="soft"
          size="medium"
          variant="surface"
        >
          {copy.previousQuestion}
        </Button>
        <span>
          {stepIndex + 1} / {steps.length}
        </span>
        <Button
          disabled={stepIndex === steps.length - 1}
          endIcon={<ArrowForwardRounded />}
          onClick={() => move(1)}
          shape="soft"
          size="medium"
          variant="primary"
        >
          {copy.nextQuestion}
        </Button>
      </nav>
    </main>
  );
}

type PreviewRecordingProps = {
  copy: ReturnType<typeof getTeacherSpeakingCopy>;
};

function PreviewRecording({ copy }: PreviewRecordingProps) {
  return (
    <div className="teacherSpeaking__recording" data-preview="true">
      <span className="teacherSpeaking__recordingMic">
        <MicRounded aria-hidden="true" />
      </span>
      <div>
        <strong>{copy.audioResponse}</strong>
        <span>{copy.previewOnly}</span>
      </div>
      <span className="teacherSpeaking__waveform" aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => (
          <i key={index} />
        ))}
      </span>
    </div>
  );
}
