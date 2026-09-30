"use client";

import EditNoteRounded from "@mui/icons-material/EditNoteRounded";
import FullscreenRounded from "@mui/icons-material/FullscreenRounded";
import SendRounded from "@mui/icons-material/SendRounded";
import TimerOutlined from "@mui/icons-material/TimerOutlined";
import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

type StudentTestShellProps = {
  answeredCount: number;
  answeredLabel: string;
  backHref: string;
  backLabel: string;
  children: ReactNode;
  currentSection: number;
  density: string;
  layout: string;
  navigator?: ReactNode;
  notesLabel: string;
  notesPlaceholder: string;
  notesReadOnly: boolean;
  notesValue: string;
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
  children,
  currentSection,
  density,
  layout,
  navigator,
  notesLabel,
  notesPlaceholder,
  notesReadOnly,
  notesValue,
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
  const [notesOpen, setNotesOpen] = useState(false);

  return (
    <article
      className="connectedTestRunner"
      data-density={density}
      data-layout={layout}
      data-skill={skill.toLowerCase()}
    >
      <header className="connectedTestRunner__header">
        <Link aria-label={backLabel} className="connectedTestRunner__brand" href={backHref}>
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

      {children}
      {navigator ?? null}
    </article>
  );
}
