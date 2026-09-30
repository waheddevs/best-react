"use client";

import MicRounded from "@mui/icons-material/MicRounded";
import StopRounded from "@mui/icons-material/StopRounded";
import { useMutation } from "@apollo/client/react";
import { useEffect, useRef, useState } from "react";

import type { Locale } from "@/config/Locales";
import {
  ConfirmStudentAttemptAudioUploadDocument,
  CreateStudentAttemptAudioUploadDocument,
} from "@/gql/graphql";

type StudentAudioRecorderProps = {
  attemptId: string;
  autoStop?: boolean;
  locale: Locale;
  onStateChange?: (state: StudentAudioRecorderState) => void;
  onUploaded: (mediaObjectId: string) => Promise<void>;
  questionId: string;
  saved: boolean;
};

export type StudentAudioRecorderState = "error" | "idle" | "recording" | "uploading";

const copy = {
  uz: {
    denied: "Mikrofonga ruxsat berilmadi.",
    record: "Javobni yozish",
    recorded: "Audio javob saqlandi",
    recording: "Yozilmoqda",
    stop: "To‘xtatish va saqlash",
    unsupported: "Bu brauzer audio yozishni qo‘llamaydi.",
    uploadError: "Audio yuklanmadi. Qayta urinib ko‘ring.",
    uploading: "Audio tekshirilmoqda va saqlanmoqda...",
  },
  ru: {
    denied: "Нет доступа к микрофону.",
    record: "Записать ответ",
    recorded: "Аудиоответ сохранён",
    recording: "Идёт запись",
    stop: "Остановить и сохранить",
    unsupported: "Этот браузер не поддерживает запись аудио.",
    uploadError: "Аудио не загружено. Повторите попытку.",
    uploading: "Аудио проверяется и сохраняется...",
  },
  en: {
    denied: "Microphone permission was not granted.",
    record: "Record answer",
    recorded: "Audio response saved",
    recording: "Recording",
    stop: "Stop and save",
    unsupported: "This browser does not support audio recording.",
    uploadError: "The audio was not uploaded. Please try again.",
    uploading: "Checking and saving audio...",
  },
} as const;

export function StudentAudioRecorder({
  attemptId,
  autoStop = false,
  locale,
  onStateChange,
  onUploaded,
  questionId,
  saved,
}: StudentAudioRecorderProps) {
  const labels = copy[locale];
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [state, setState] = useState<StudentAudioRecorderState>("idle");
  const [message, setMessage] = useState("");
  const [createUpload] = useMutation(CreateStudentAttemptAudioUploadDocument, {
    context: { authenticated: true },
  });
  const [confirmUpload] = useMutation(ConfirmStudentAttemptAudioUploadDocument, {
    context: { authenticated: true },
  });

  const upload = async (blob: Blob, mimeType: "audio/ogg" | "audio/webm") => {
    setState("uploading");
    setMessage(labels.uploading);
    try {
      const extension = mimeType === "audio/ogg" ? "ogg" : "webm";
      const result = await createUpload({
        variables: {
          input: {
            attemptId,
            mimeType,
            originalName: `speaking-response-${questionId}.${extension}`,
            questionId,
            sizeBytes: blob.size,
          },
        },
      });
      const intent = result.data?.createAttemptAudioUploadIntent.uploadIntent;
      if (!intent) throw new Error("Upload intent was not returned");
      const response = await fetch(intent.url, {
        body: blob,
        headers: Object.fromEntries(intent.requiredHeaders.map(({ name, value }) => [name, value])),
        method: intent.method,
      });
      if (!response.ok) throw new Error("Object upload failed");
      const confirmation = await confirmUpload({
        variables: {
          input: {
            attemptId,
            mediaObjectId: intent.mediaObjectId,
            questionId,
          },
        },
      });
      const mediaObjectId = confirmation.data?.confirmAttemptAudioUpload.mediaObject.id;
      if (!mediaObjectId) throw new Error("Upload confirmation was not returned");
      await onUploaded(mediaObjectId);
      setState("idle");
      setMessage(labels.recorded);
    } catch {
      setState("error");
      setMessage(labels.uploadError);
    }
  };

  const start = async () => {
    if (!("MediaRecorder" in window) || !navigator.mediaDevices?.getUserMedia) {
      setState("error");
      setMessage(labels.unsupported);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const requestedType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/ogg;codecs=opus")
          ? "audio/ogg;codecs=opus"
          : "";
      if (!requestedType) {
        stream.getTracks().forEach((track) => track.stop());
        setState("error");
        setMessage(labels.unsupported);
        return;
      }
      const recorder = new MediaRecorder(stream, { mimeType: requestedType });
      chunksRef.current = [];
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const outputType: "audio/ogg" | "audio/webm" = recorder.mimeType
          .toLowerCase()
          .startsWith("audio/ogg")
          ? "audio/ogg"
          : "audio/webm";
        const blob = new Blob(chunksRef.current, { type: outputType });
        stream.getTracks().forEach((track) => track.stop());
        void upload(blob, outputType);
      };
      recorder.start(250);
      setState("recording");
      setMessage(labels.recording);
    } catch {
      setState("error");
      setMessage(labels.denied);
    }
  };

  const stop = () => {
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
  };

  useEffect(() => {
    onStateChange?.(state);
  }, [onStateChange, state]);

  useEffect(() => {
    if (autoStop) stop();
  }, [autoStop]);

  return (
    <div className="connectedTestRunner__recorder">
      <button
        disabled={state === "uploading"}
        onClick={state === "recording" ? stop : () => void start()}
        type="button"
      >
        {state === "recording" ? <StopRounded /> : <MicRounded />}
        {state === "recording" ? labels.stop : labels.record}
      </button>
      <span aria-live="polite" data-error={state === "error" || undefined}>
        {message || (saved ? labels.recorded : "")}
      </span>
    </div>
  );
}
