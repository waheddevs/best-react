"use client";

import EditNoteRounded from "@mui/icons-material/EditNoteRounded";
import FullscreenRounded from "@mui/icons-material/FullscreenRounded";
import SendRounded from "@mui/icons-material/SendRounded";
import TimerOutlined from "@mui/icons-material/TimerOutlined";
import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

import type { StudentListeningTestNavbarCopy } from "@/types/student/StudentListeningTestNavbar";

import { StudentListeningTestNavbar } from "./StudentListeningTestNavbar";

type StudentTestShellProps = {
  answeredCount: number;
  answeredLabel: string;
  backHref: string;
  backLabel: string;
  exiting: boolean;
  children: ReactNode;
  currentSection: number;
  density: string;
  layout: string;
  listeningNavbarCopy: StudentListeningTestNavbarCopy;
  navigator?: ReactNode;
  nextSectionDisabled: boolean;
  notesLabel: string;
  notesPlaceholder: string;
  notesReadOnly: boolean;
  notesValue: string;
  onNextSection: () => void;
  onExit: () => void;
  onNotesChange: (value: string) => void;
  onSubmit: () => void;
  partsLabel: string;
  sectionLabel: string;
  skill: string;
  submitLabel: string;
  submitting: boolean;
  toolbar?: ReactNode;
  timeLabel: string;
  timeValue: string;
  title: string;
  totalQuestions: number;
  totalSections: number;
};

export function StudentTestShell({
  answeredCount,
  answeredLabel,
  backHref,
  backLabel,
  exiting,
  children,
  currentSection,
  density,
  layout,
  listeningNavbarCopy,
  navigator,
  nextSectionDisabled,
  notesLabel,
  notesPlaceholder,
  notesReadOnly,
  notesValue,
  onNextSection,
  onExit,
  onNotesChange,
  onSubmit,
  partsLabel,
  sectionLabel,
  skill,
  submitLabel,
  submitting,
  toolbar,
  timeLabel,
  timeValue,
  title,
  totalQuestions,
  totalSections,
}: StudentTestShellProps) {
  /* HOOKS */
  const [notesOpen, setNotesOpen] = useState(false);
  const isListening = skill === "LISTENING";
  const isReading = skill === "READING";

  return (
    <article
      inert={exiting}
      className="connectedTestRunner"
      data-density={density}
      data-layout={layout}
      data-skill={skill.toLowerCase()}
    >
      {isListening || isReading ? (
        <StudentListeningTestNavbar
          audioPlayer={toolbar}
          backLabel={backLabel}
          onExit={onExit}
          copy={listeningNavbarCopy}
          completeDisabled={submitting}
          currentSection={currentSection}
          nextSectionDisabled={nextSectionDisabled}
          notesLabel={notesLabel}
          notesOpen={notesOpen}
          onNextSection={onNextSection}
          onComplete={onSubmit}
          onNotesToggle={() => setNotesOpen((current) => !current)}
          sectionLabel={sectionLabel}
          timeLabel={timeLabel}
          timeValue={timeValue}
          title={title}
          totalSections={totalSections}
        />
      ) : (
        <>
          <header className="connectedTestRunner__header">
            <Link
              aria-label={backLabel}
              className="connectedTestRunner__brand"
              href={backHref}
              onClick={(event) => {
                if (
                  event.button !== 0 ||
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                )
                  return;
                event.preventDefault();
                onExit();
              }}
            >
              <Image alt="BEST LC" height={46} src="/icons/logo.svg" width={46} />
              <span>BEST LC</span>
            </Link>

            <div className="connectedTestRunner__heading">
              <div aria-label={`${timeLabel}: ${timeValue}`} className="connectedTestRunner__timer">
                <TimerOutlined aria-hidden="true" />
                <strong>{timeValue}</strong>
                <span>{timeLabel}</span>
              </div>
              <h1>{title}</h1>
            </div>

            <div className="connectedTestRunner__tools">
              {toolbar}
              <button
                aria-expanded={notesOpen}
                aria-label={notesLabel}
                onClick={() => setNotesOpen((current) => !current)}
                type="button"
              >
                <EditNoteRounded aria-hidden="true" />
              </button>
              <button
                aria-label="Fullscreen"
                onClick={() => {
                  if (document.fullscreenElement) {
                    void document.exitFullscreen();
                  } else {
                    void document.documentElement.requestFullscreen();
                  }
                }}
                type="button"
              >
                <FullscreenRounded aria-hidden="true" />
              </button>
              <button
                className="connectedTestRunner__submit"
                disabled={submitting}
                onClick={onSubmit}
                type="button"
              >
                {submitLabel}
                <SendRounded aria-hidden="true" />
              </button>
            </div>
          </header>

          <div className="connectedTestRunner__sectionBar">
            <strong>
              {sectionLabel} {currentSection}
            </strong>
            <span>
              {skill} · {answeredCount} / {totalQuestions} {answeredLabel.toLowerCase()} ·{" "}
              {totalSections} {partsLabel}
            </span>
          </div>
        </>
      )}

      {notesOpen ? (
        <aside className="connectedTestRunner__notesPanel">
          <div>
            <strong>{notesLabel}</strong>
            <button aria-label={notesLabel} onClick={() => setNotesOpen(false)} type="button">
              ×
            </button>
          </div>
          <textarea
            autoFocus
            maxLength={4000}
            onChange={(event) => onNotesChange(event.target.value)}
            placeholder={notesPlaceholder}
            readOnly={notesReadOnly}
            value={notesValue}
          />
        </aside>
      ) : null}

      {isListening || isReading ? (
        <div
          className={
            isReading
              ? "connectedTestRunner__readingScroll"
              : "connectedTestRunner__listeningScroll"
          }
        >
          {children}
          {navigator ?? null}
        </div>
      ) : (
        <>
          {children}
          {navigator ?? null}
        </>
      )}
    </article>
  );
}
