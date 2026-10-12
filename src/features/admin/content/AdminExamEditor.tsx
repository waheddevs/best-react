"use client";

import { useMutation } from "@apollo/client/react";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/config/Locales";
import { getAdminContentText } from "@/dictionaries/admin/AdminContent";
import { AdminSaveExamDocument } from "@/gql/graphql";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { contentDraft, contentLines } from "@/lib/admin/AdminContentDraft";
import { examTranslations } from "@/lib/admin/AdminExamDraft";
import { courseSlug } from "@/lib/admin/AdminCourseDraft";
import type { AdminContentEntry } from "@/types/admin/AdminContent";
import { AdminRegistrySelect } from "../operations/AdminRegistrySelect";

export function AdminExamEditor({
  row,
  locale,
  onSaved,
  onClose,
}: {
  row?: AdminContentEntry;
  locale: Locale;
  onSaved: () => Promise<unknown>;
  onClose: () => void;
}) {
  const t = getAdminContentText(locale),
    notifications = useNotifications(),
    confirm = useConfirmDialog();
  const [initial] = useState(() => contentDraft("exams", row));
  const [draft, setDraft] = useState(() => contentDraft("exams", row));
  const [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const [save] = useMutation(AdminSaveExamDocument, { context: { authenticated: true } });
  const language = locale.toUpperCase();
  const source = draft.translations.find((entry) => entry.language === language)!;
  const change = (key: string, value: string) =>
    setDraft((current) => ({ ...current, fields: { ...current.fields, [key]: value } }));
  const field = (key: string, multiline = false, list = false) => {
    const props = {
      value: (list ? source.lists : source.fields)[key] ?? "",
      required: !list,
      maxLength: list ? 50000 : multiline ? 30000 : 160,
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setDraft((current) => ({
          ...current,
          translations: current.translations.map((entry) =>
            entry.language === language
              ? {
                  ...entry,
                  [list ? "lists" : "fields"]: {
                    ...entry[list ? "lists" : "fields"],
                    [key]: event.target.value,
                  },
                }
              : entry,
          ),
        })),
    };
    return (
      <label key={key}>
        <span>{t(key)}</span>
        {multiline ? <textarea {...props} rows={4} /> : <input {...props} />}
        {list && <small>{t("linesHelp")}</small>}
      </label>
    );
  };
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    setError("");
    if (
      ["title", "description", "formatLabel", "duration", "level"].some(
        (key) => !source.fields[key]?.trim(),
      )
    ) {
      setError(t("invalid"));
      return;
    }
    setBusy(true);
    try {
      if (
        ["PUBLISHED", "ARCHIVED"].includes(draft.fields.status) &&
        !(await confirm({
          brand: "admin",
          title: t("save"),
          message: t("confirmPublish"),
          confirmLabel: t("save"),
          cancelLabel: t("cancel"),
        }))
      )
        return;
      const status = (["DRAFT", "PUBLISHED", "ARCHIVED"] as const).find(
        (value) => value === draft.fields.status,
      )!;
      const result = await save({
        variables: {
          input: {
            ...(row ? { id: row.id, revision: draft.fields.revision } : {}),
            key: row
              ? draft.fields.key
              : `${courseSlug(source.fields.title, "").slice(0, 70).replace(/-+$/, "")}-${crypto.randomUUID().slice(0, 8)}`,
            position: Number(draft.fields.position),
            status,
            translations: examTranslations(draft, initial, language, !row).map((entry) => ({
              language: entry.language,
              title: entry.fields.title.trim(),
              description: entry.fields.description.trim(),
              formatLabel: entry.fields.formatLabel.trim(),
              duration: entry.fields.duration.trim(),
              level: entry.fields.level.trim(),
              highlights: contentLines(entry.lists.highlights),
            })),
          },
        },
      });
      if (!result.data?.adminSaveExam) throw new Error("Exam save failed");
      notifications.success({ message: t("savedPublic") });
      onClose();
      await onSaved();
    } catch (failure) {
      setError(
        t(
          failure instanceof Error && /changed|unique|already/i.test(failure.message)
            ? "conflict"
            : "invalid",
        ),
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <form
      className="adminRegistry__editor adminContent__editor adminExamEditor"
      data-section="exams"
      onSubmit={submit}
      aria-busy={busy}
    >
      <fieldset disabled={busy}>
        <div className="adminRegistry__formGrid">
          {field("title")}
          <AdminRegistrySelect
            externalLabel
            label={t("status")}
            value={draft.fields.status}
            options={["DRAFT", "PUBLISHED", "ARCHIVED"].map((id) => ({ id, label: t(id) }))}
            onChange={(value) => change("status", value)}
            disabled={busy}
          />
        </div>
        <div className="adminRegistry__formGrid adminExamEditor__metadata">
          {field("formatLabel")}
          {field("duration")}
          {field("level")}
        </div>
        <div className="adminRegistry__formGrid">
          {field("description", true)}
          {field("highlights", true, true)}
        </div>
        <details className="adminExamEditor__section">
          <summary>{t("displaySettings")}</summary>
          <div className="adminRegistry__formGrid">
            <label>
              <span>{t("position")}</span>
              <input
                type="number"
                min={0}
                max={100000}
                step={1}
                required
                value={draft.fields.position}
                onChange={(event) => change("position", event.target.value)}
              />
            </label>
          </div>
        </details>
      </fieldset>
      {error && (
        <p className="adminRegistry__error" role="alert">
          {error}
        </p>
      )}
      <div className="adminRegistry__formActions">
        <button type="button" onClick={onClose} disabled={busy}>
          {t("cancel")}
        </button>
        <button type="submit" className="adminRegistry__primary" disabled={busy}>
          {t(busy ? "loading" : "save")}
        </button>
      </div>
    </form>
  );
}
