"use client";

import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import EditNoteRounded from "@mui/icons-material/EditNoteRounded";
import FullscreenRounded from "@mui/icons-material/FullscreenRounded";
import TimerOutlined from "@mui/icons-material/TimerOutlined";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { StudentBackButton } from "@/features/student/workspace/StudentBackButton";
import type { StudentListeningTestNavbarCopy } from "@/types/student/StudentListeningTestNavbar";

type StudentListeningTestNavbarProps = {
  audioPlayer?: ReactNode;
  backLabel: string;
  onExit: () => void;
  copy: StudentListeningTestNavbarCopy;
  currentSection: number;
  completeDisabled: boolean;
  nextSectionDisabled: boolean;
  notesLabel: string;
  notesOpen: boolean;
  onNextSection: () => void;
  onComplete: () => void;
  onNotesToggle: () => void;
  sectionLabel: string;
  sectionNavigation?: ReactNode;
  timeLabel: string;
  timeValue: string;
  title: string;
  totalSections?: number;
};

export function StudentListeningTestNavbar({
  audioPlayer,
  backLabel,
  onExit,
  copy,
  currentSection,
  completeDisabled,
  nextSectionDisabled,
  notesLabel,
  notesOpen,
  onNextSection,
  onComplete,
  onNotesToggle,
  sectionLabel,
  sectionNavigation,
  timeLabel,
  timeValue,
  title,
  totalSections = 4,
}: StudentListeningTestNavbarProps) {
  /* HANDLERS */
  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }
    void document.documentElement.requestFullscreen();
  };

  return (
    <header className="connectedTestRunner__header studentListeningTestNavbar">
      <div className="studentListeningTestNavbar__start">
        <StudentBackButton label={backLabel} onClick={onExit} />
        {sectionNavigation ?? (
          <strong>
            {sectionLabel} {currentSection}
          </strong>
        )}
      </div>

      <div className="studentListeningTestNavbar__center">
        <div
          aria-label={`${timeLabel}: ${timeValue}`}
          className="connectedTestRunner__timer studentListeningTestNavbar__timer"
        >
          <TimerOutlined aria-hidden="true" />
          <strong>{timeValue}</strong>
          <span>{timeLabel}</span>
        </div>
        <h1>{title}</h1>
      </div>

      <div className="studentListeningTestNavbar__actions">
        {audioPlayer}
        <button
          aria-expanded={notesOpen}
          aria-label={notesLabel}
          className="studentListeningTestNavbar__utility"
          onClick={onNotesToggle}
          type="button"
        >
          <EditNoteRounded aria-hidden="true" />
        </button>
        <button
          aria-label={copy.fullscreenLabel}
          className="studentListeningTestNavbar__utility"
          onClick={handleFullscreen}
          type="button"
        >
          <FullscreenRounded aria-hidden="true" />
        </button>
        {sectionNavigation != null || currentSection === totalSections ? (
          <Button
            className="studentListeningTestNavbar__complete"
            disabled={completeDisabled}
            hoverEffect="jump"
            onClick={onComplete}
            shape="soft"
            size="small"
            variant="primary"
          >
            {copy.completeLabel}
          </Button>
        ) : (
          <button
            aria-label={copy.nextSectionLabel}
            className="studentListeningTestNavbar__direction"
            disabled={nextSectionDisabled}
            onClick={onNextSection}
            type="button"
          >
            <ArrowForwardRounded aria-hidden="true" />
          </button>
        )}
      </div>
    </header>
  );
}
