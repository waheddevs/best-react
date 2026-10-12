"use client";

import { useId } from "react";
import Dialog from "@mui/material/Dialog";
import CloseRounded from "@mui/icons-material/CloseRounded";
import type { Locale } from "@/config/Locales";
import type { IntakeStatus } from "@/gql/graphql";
import type { AdminMessage } from "@/types/admin/AdminMessages";
import { getAdminMessagesText } from "@/dictionaries/admin/AdminMessages";
import { AdminMessageStatusMenu } from "./AdminMessageStatusMenu";

export function AdminMessageDetails({
  message,
  locale,
  busy,
  statuses,
  onClose,
  onStatusChange,
}: {
  message: AdminMessage;
  locale: Locale;
  busy: boolean;
  statuses: IntakeStatus[];
  onClose: () => void;
  onStatusChange: (status: IntakeStatus) => void;
}) {
  const t = getAdminMessagesText(locale);
  const id = useId();
  const initials = message.name
    .trim()
    .split(/\s+/u)
    .slice(0, 2)
    .map((part) => Array.from(part)[0])
    .join("")
    .toLocaleUpperCase(locale);
  const fields = [
    ["email", message.email || "—"],
    ["phone", message.phone],
    [
      "date",
      new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Tashkent",
      }).format(new Date(message.createdAt)),
    ],
  ].filter(([, value]) => value !== null && value !== undefined && value !== "");
  return (
    <Dialog
      open
      onClose={() => !busy && onClose()}
      aria-labelledby={`${id}-title`}
      slotProps={{
        paper: { className: "adminRegistry__dialog adminMessageDetails" },
        backdrop: { className: "adminMessageDetails__backdrop" },
      }}
    >
      <header className="adminMessageDetails__header">
        <span className="adminMessageDetails__avatar" aria-hidden="true">
          {initials}
        </span>
        <div className="adminMessageDetails__identity">
          <h2 id={`${id}-title`}>{message.name}</h2>
          <p>{message.email || message.phone || "—"}</p>
          <AdminMessageStatusMenu
            locale={locale}
            name={message.name}
            value={message.status}
            options={statuses}
            disabled={busy}
            onChange={onStatusChange}
          />
        </div>
        <button
          type="button"
          className="adminMessageDetails__close"
          aria-label={t("close")}
          disabled={busy}
          onClick={onClose}
        >
          <CloseRounded />
        </button>
      </header>
      <dl className="adminMessageDetails__fields">
        {fields.map(([key, value]) => (
          <div key={key}>
            <dt>{t(String(key))}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <section className="adminMessageDetails__body" aria-labelledby={`${id}-subject`}>
        <h3 id={`${id}-subject`}>{message.subject || t("message")}</h3>
        <p>{message.message || "—"}</p>
      </section>
    </Dialog>
  );
}
