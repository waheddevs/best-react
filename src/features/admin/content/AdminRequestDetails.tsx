"use client";

import { useId, useState } from "react";
import Dialog from "@mui/material/Dialog";
import CloseRounded from "@mui/icons-material/CloseRounded";
import EditOutlined from "@mui/icons-material/EditOutlined";
import type { Locale } from "@/config/Locales";
import type { AdminRequestDirectoryQuery, IntakeStatus } from "@/gql/graphql";
import { getAdminContentText } from "@/dictionaries/admin/AdminContent";
import { AdminRequestStatusMenu } from "./AdminRequestStatusMenu";

type Request = AdminRequestDirectoryQuery["adminRequestDirectory"]["nodes"][number];

export function AdminRequestDetails({
  request,
  locale,
  busy,
  statuses,
  onClose,
  onStatusChange,
  onSaveNote,
}: {
  request: Request;
  locale: Locale;
  busy: boolean;
  statuses: IntakeStatus[];
  onClose: () => void;
  onStatusChange: (status: IntakeStatus) => void;
  onSaveNote: (note: string) => Promise<boolean>;
}) {
  const t = getAdminContentText(locale);
  const id = useId();
  const [editing, setEditing] = useState(false);
  const [note, setNote] = useState(request.reviewNote ?? "");
  const [error, setError] = useState(false);
  const date = (value: string) =>
    new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Tashkent",
    }).format(new Date(value));
  const initials = request.name
    .trim()
    .split(/\s+/u)
    .slice(0, 2)
    .map((part) => Array.from(part)[0])
    .join("")
    .toLocaleUpperCase(locale);
  const fields = [
    ["phone", request.phone],
    ["email", request.email || "—"],
    ["date", date(request.createdAt)],
    ["currentLevel", request.currentLevel],
    ["participantCount", request.participantCount],
    ["sessionAt", request.sessionAt ? date(request.sessionAt) : null],
    ["message", request.message],
  ].filter(([, value]) => value !== null && value !== undefined && value !== "");

  return (
    <Dialog
      open
      onClose={() => !busy && onClose()}
      aria-labelledby={`${id}-title`}
      slotProps={{
        paper: { className: "adminRegistry__dialog adminRequestDetails" },
        backdrop: { className: "adminRequestDetails__backdrop" },
      }}
    >
      <header className="adminRequestDetails__header">
        <span className="adminRequestDetails__avatar" aria-hidden="true">
          {initials}
        </span>
        <div className="adminRequestDetails__identity">
          <h2 id={`${id}-title`}>{request.name}</h2>
          <p>
            {t(request.kind)} · {request.subjectName}
          </p>
          <AdminRequestStatusMenu
            locale={locale}
            name={request.name}
            value={request.status}
            options={statuses}
            disabled={busy || editing}
            onChange={onStatusChange}
          />
        </div>
        <button
          type="button"
          className="adminRequestDetails__close"
          disabled={busy}
          onClick={onClose}
          aria-label={t("close")}
        >
          <CloseRounded />
        </button>
      </header>
      <dl className="adminRequestDetails__fields">
        {fields.map(([key, value]) => (
          <div
            key={String(key)}
            className={key === "message" ? "adminRequestDetails__wide" : undefined}
          >
            <dt>{t(String(key))}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <section className="adminRequestDetails__note" aria-labelledby={`${id}-note`}>
        <div className="adminRequestDetails__noteHeading">
          <h3 id={`${id}-note`}>{t("note")}</h3>
          {!editing ? (
            <button
              type="button"
              className="adminRequestDetails__edit"
              disabled={busy}
              onClick={() => {
                setNote(request.reviewNote ?? "");
                setError(false);
                setEditing(true);
              }}
            >
              <EditOutlined aria-hidden="true" />
              {t("editNote")}
            </button>
          ) : null}
        </div>
        {editing ? (
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              if (busy || !note.trim()) return;
              setError(false);
              const saved = await onSaveNote(note.trim());
              if (saved) setEditing(false);
              else setError(true);
            }}
          >
            <textarea
              autoFocus
              aria-labelledby={`${id}-note`}
              aria-describedby={error ? `${id}-error` : undefined}
              required
              maxLength={5000}
              disabled={busy}
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
            {error ? (
              <p id={`${id}-error`} className="adminRegistry__error" role="alert">
                {t("conflict")}
              </p>
            ) : null}
            <div className="adminRegistry__formActions">
              <button type="button" disabled={busy} onClick={() => setEditing(false)}>
                {t("cancel")}
              </button>
              <button
                type="submit"
                className="adminRegistry__primary"
                disabled={busy || !note.trim() || note.trim() === (request.reviewNote ?? "").trim()}
              >
                {t("save")}
              </button>
            </div>
          </form>
        ) : (
          <p className={!request.reviewNote ? "adminRequestDetails__empty" : undefined}>
            {request.reviewNote || t("noNote")}
          </p>
        )}
      </section>
    </Dialog>
  );
}
