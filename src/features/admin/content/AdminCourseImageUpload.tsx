"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import AddPhotoAlternateOutlined from "@mui/icons-material/AddPhotoAlternateOutlined";
import Image from "next/image";
import { useRef, useState } from "react";
import type { Locale } from "@/config/Locales";
import { getAdminCourseEditorText } from "@/dictionaries/admin/AdminCourseEditor";
import {
  AdminCourseUploadIntentDocument,
  AdminConfirmCourseUploadDocument,
  AdminCourseImagePreviewDocument,
  AdminCourseCoverDocument,
  AdminEventCoverDocument,
} from "@/gql/graphql";

export function AdminCourseImageUpload({
  locale,
  courseId,
  eventId,
  imageLabel,
  mediaId,
  imagePath,
  disabled,
  onChange,
  onBusy,
}: {
  locale: Locale;
  courseId?: string;
  eventId?: string;
  imageLabel?: string;
  mediaId: string;
  imagePath: string;
  disabled: boolean;
  onChange: (mediaId: string, imagePath: string) => void;
  onBusy: (busy: boolean) => void;
}) {
  const t = getAdminCourseEditorText(locale);
  const fileInput = useRef<HTMLInputElement>(null);
  const working = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<{ id: string; url: string }>();
  const context = { authenticated: true };
  const [createIntent] = useMutation(AdminCourseUploadIntentDocument, { context });
  const [confirmUpload] = useMutation(AdminConfirmCourseUploadDocument, { context });
  const [download] = useMutation(AdminCourseImagePreviewDocument, { context });
  const existing = useQuery(AdminCourseCoverDocument, {
    variables: { courseId: courseId ?? "" },
    skip: !courseId || !mediaId,
    context,
    fetchPolicy: "network-only",
  });
  const existingEvent = useQuery(AdminEventCoverDocument, {
    variables: { eventId: eventId ?? "" },
    skip: !eventId || !mediaId,
    context,
    fetchPolicy: "network-only",
  });
  const src = mediaId
    ? preview?.id === mediaId
      ? preview.url
      : eventId
        ? existingEvent.data?.adminEventCover?.url
        : existing.data?.adminCourseCover?.url
    : imagePath;
  const hasImage = Boolean(mediaId || imagePath);
  async function upload(file?: File) {
    if (!file || working.current) return;
    setError("");
    if (
      !/^(image\/jpeg|image\/png|image\/webp)$/.test(file.type) ||
      file.size < 1 ||
      file.size > 10 * 1024 * 1024
    ) {
      setError(t("imageInvalid"));
      return;
    }
    working.current = true;
    setBusy(true);
    onBusy(true);
    try {
      const result = await createIntent({
        variables: {
          input: { originalName: file.name, mimeType: file.type, sizeBytes: file.size },
        },
      });
      const intent = result.data?.createMediaUploadIntent.uploadIntent;
      if (!intent) throw new Error("Missing upload intent");
      const response = await fetch(intent.url, {
        method: intent.method,
        headers: Object.fromEntries(intent.requiredHeaders.map(({ name, value }) => [name, value])),
        body: file,
      });
      if (!response.ok) throw new Error("Upload failed");
      const confirmed = await confirmUpload({
        variables: { input: { mediaObjectId: intent.mediaObjectId } },
      });
      const media = confirmed.data?.confirmMediaUpload.mediaObject;
      if (media?.status !== "READY" || media.malwareStatus !== "CLEAN")
        throw new Error("Image verification failed");
      const image = await download({ variables: { input: { mediaObjectId: media.id } } });
      const url = image.data?.createMediaDownloadIntent.downloadIntent.url;
      if (!url) throw new Error("Missing preview");
      setPreview({ id: media.id, url });
      onChange(media.id, "");
    } catch {
      setError(t("imageError"));
    } finally {
      working.current = false;
      setBusy(false);
      onBusy(false);
    }
  }
  return (
    <section className="adminCourseEditor__image" aria-busy={busy}>
      <h3>{imageLabel ?? t("image")}</h3>
      <div className="adminCourseEditor__imagePreview">
        {src ? (
          <Image
            src={src}
            alt={imageLabel ?? t("image")}
            fill
            sizes="(max-width: 700px) 100vw, 300px"
            unoptimized
            onError={() => setError(t("previewError"))}
          />
        ) : (
          <AddPhotoAlternateOutlined aria-hidden="true" />
        )}
      </div>
      <input
        ref={fileInput}
        type="file"
        hidden
        accept="image/jpeg,image/png,image/webp"
        disabled={busy || disabled}
        aria-label={t("upload")}
        onChange={(event) => {
          void upload(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
      <div className="adminCourseEditor__imageActions">
        <button
          type="button"
          disabled={busy || disabled}
          onClick={() => fileInput.current?.click()}
        >
          {t(hasImage ? "replace" : "upload")}
        </button>
        {hasImage && (
          <button
            type="button"
            disabled={busy || disabled}
            onClick={() => {
              onChange("", "");
              setPreview(undefined);
              setError("");
            }}
          >
            {t("removeImage")}
          </button>
        )}
      </div>
      <p role="status">{t(busy ? "uploading" : "imageHelp")}</p>
      {(error || existing.error || existingEvent.error) && (
        <p className="adminRegistry__error" role="alert">
          {error || t("previewError")}
        </p>
      )}
    </section>
  );
}
