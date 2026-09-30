"use client";

import GraphicEqRounded from "@mui/icons-material/GraphicEqRounded";
import LockRounded from "@mui/icons-material/LockRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import { useEffect, useRef, useState } from "react";

type AudioStatus = "done" | "error" | "idle" | "loading" | "locked" | "playing";
type PlaybackStatus = Exclude<AudioStatus, "locked">;

type StudentListeningAudioPlayerProps = {
  compact?: boolean;
  errorLabel: string;
  finishedLabel: string;
  lockedLabel: string;
  playLabel: string;
  playingLabel: string;
  preparingLabel: string;
  requestSource?: () => Promise<string | null>;
  sourceUrl: string | null;
  title: string;
};

export function StudentListeningAudioPlayer({
  compact = false,
  errorLabel,
  finishedLabel,
  lockedLabel,
  playLabel,
  playingLabel,
  preparingLabel,
  requestSource,
  sourceUrl,
  title,
}: StudentListeningAudioPlayerProps) {
  const [playbackStatus, setPlaybackStatus] = useState<PlaybackStatus>("idle");
  const [volume, setVolume] = useState(0.72);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const status: AudioStatus = sourceUrl || requestSource ? playbackStatus : "locked";

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [sourceUrl]);

  const play = async () => {
    if ((!sourceUrl && !requestSource) || status !== "idle") return;

    setPlaybackStatus("loading");
    try {
      const resolvedSource = sourceUrl ?? (await requestSource?.());
      if (!resolvedSource) {
        setPlaybackStatus("error");
        return;
      }
      const audio = new Audio(resolvedSource);
      audio.preload = "metadata";
      audio.volume = volume;
      audioRef.current = audio;
      audio.addEventListener("ended", () => setPlaybackStatus("done"), { once: true });
      audio.addEventListener("error", () => setPlaybackStatus("error"), { once: true });
      await audio.play();
      setPlaybackStatus("playing");
    } catch {
      setPlaybackStatus("error");
    }
  };

  const statusLabel =
    status === "loading"
      ? preparingLabel
      : status === "playing"
        ? playingLabel
        : status === "done"
          ? finishedLabel
          : status === "error"
            ? errorLabel
            : lockedLabel;

  return (
    <div
      aria-label={title}
      className="connectedTestRunner__listeningMedia"
      data-compact={compact || undefined}
      data-status={status}
    >
      <button
        aria-label={playLabel}
        disabled={status !== "idle"}
        onClick={() => void play()}
        type="button"
      >
        {status === "locked" ? (
          <LockRounded aria-hidden="true" />
        ) : status === "playing" ? (
          <GraphicEqRounded aria-hidden="true" />
        ) : (
          <PlayArrowRounded aria-hidden="true" />
        )}
      </button>
      <div>
        <strong>{title}</strong>
        <span aria-live="polite">{statusLabel}</span>
      </div>
      <span aria-hidden="true" className="connectedTestRunner__waveform">
        {Array.from({ length: 18 }, (_, index) => (
          <i key={index} />
        ))}
      </span>
      {status === "locked" ? (
        <LockRounded aria-hidden="true" className="connectedTestRunner__mediaLock" />
      ) : (
        <label className="connectedTestRunner__volume">
          <VolumeUpRounded aria-hidden="true" />
          <input
            aria-label="Volume"
            max="1"
            min="0"
            onChange={(event) => {
              const nextVolume = Number(event.target.value);
              setVolume(nextVolume);
              if (audioRef.current) audioRef.current.volume = nextVolume;
            }}
            step="0.05"
            type="range"
            value={volume}
          />
        </label>
      )}
    </div>
  );
}
