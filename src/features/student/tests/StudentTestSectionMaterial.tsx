import HeadphonesRounded from "@mui/icons-material/HeadphonesRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";
import type { ReactNode } from "react";

import { StudentListeningAudioPlayer } from "./StudentListeningAudioPlayer";

type StudentTestSectionMaterialProps = {
  audioLabel: string;
  audioErrorLabel: string;
  audioFinishedLabel: string;
  audioPlayLabel: string;
  audioPlayingLabel: string;
  audioPreparingLabel: string;
  audioReadyLabel: string;
  audioSourceUrl?: string | null;
  children?: ReactNode;
  instructions: string;
  mediaObjectId: string | null;
  partLabel: string;
  position: number;
  requestAudioSource?: () => Promise<string | null>;
  renderAudio?: boolean;
  secureLabel: string;
  skill: string;
  text: string | null;
  title: string;
  visualLabel: string;
};

export function StudentTestSectionMaterial({
  audioLabel,
  audioErrorLabel,
  audioFinishedLabel,
  audioPlayLabel,
  audioPlayingLabel,
  audioPreparingLabel,
  audioReadyLabel,
  audioSourceUrl = null,
  children,
  instructions,
  mediaObjectId,
  partLabel,
  position,
  requestAudioSource,
  renderAudio = true,
  secureLabel,
  skill,
  text,
  title,
  visualLabel,
}: StudentTestSectionMaterialProps) {
  const headingId = `test-section-${String(position)}-heading`;
  const isListening = skill === "LISTENING";
  const isReading = skill === "READING";

  return (
    <section aria-labelledby={headingId} className="connectedTestRunner__stimulus">
      <div className="connectedTestRunner__sectionHeading">
        <span>
          {partLabel} {position}
        </span>
        <strong id={headingId}>{title}</strong>
      </div>

      <div className="connectedTestRunner__materialTitle">
        {isListening ? <HeadphonesRounded aria-hidden="true" /> : null}
        {isReading ? <MenuBookRounded aria-hidden="true" /> : null}
        <h2>{instructions}</h2>
      </div>

      {isListening && renderAudio ? (
        <StudentListeningAudioPlayer
          key={mediaObjectId ?? "locked-audio"}
          errorLabel={audioErrorLabel}
          finishedLabel={audioFinishedLabel}
          lockedLabel={mediaObjectId ? audioReadyLabel : secureLabel}
          playLabel={audioPlayLabel}
          playingLabel={audioPlayingLabel}
          preparingLabel={audioPreparingLabel}
          requestSource={mediaObjectId ? requestAudioSource : undefined}
          sourceUrl={audioSourceUrl}
          title={audioLabel}
        />
      ) : null}

      {text ? (
        <div className="connectedTestRunner__content">
          {text.split(/\n{2,}/).map((paragraph, index) => (
            <p key={`section-${String(position)}-paragraph-${String(index)}`}>{paragraph}</p>
          ))}
        </div>
      ) : null}

      {isReading && mediaObjectId ? (
        <p className="connectedTestRunner__mediaState">
          <MenuBookRounded aria-hidden="true" />
          {visualLabel}
        </p>
      ) : null}

      {children}
    </section>
  );
}
