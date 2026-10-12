"use client";

import { useMutation } from "@apollo/client/react";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/config/Locales";
import { getAdminContentText } from "@/dictionaries/admin/AdminContent";
import { getAdminCourseEditorText } from "@/dictionaries/admin/AdminCourseEditor";
import { AdminSaveCourseContentDocument } from "@/gql/graphql";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import {
  contentDraft,
  contentLines,
  courseFields,
  courseLists,
} from "@/lib/admin/AdminContentDraft";
import { courseSlug, courseTranslations } from "@/lib/admin/AdminCourseDraft";
import type { AdminContentEntry } from "@/types/admin/AdminContent";
import { AdminRegistrySelect } from "../operations/AdminRegistrySelect";
import { AdminCourseImageUpload } from "./AdminCourseImageUpload";
import { AdminCourseTracksEditor } from "./AdminCourseTracksEditor";

export function AdminCourseEditor({
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
    copy = getAdminCourseEditorText(locale);
  const notifications = useNotifications(),
    confirm = useConfirmDialog();
  const [initial, setInitial] = useState(() => contentDraft("courses", row));
  const [draft, setDraft] = useState(() => contentDraft("courses", row));
  const [uploading, setUploading] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const [save] = useMutation(AdminSaveCourseContentDocument, { context: { authenticated: true } });
  const language = locale.toUpperCase();
  const source = draft.translations.find((entry) => entry.language === language)!;
  const f = draft.fields;
  const disabled = busy || uploading;
  const change = (key: string, value: string) =>
    setDraft((d) => ({ ...d, fields: { ...d.fields, [key]: value } }));
  const textField = (key: string, multiline = false, list = false, required = false) => (
    <label key={key} className={key === "description" ? "adminContent__wide" : undefined}>
      <span>{t(key)}</span>
      {multiline ? (
        <textarea
          required={required}
          value={(list ? source.lists : source.fields)[key] ?? ""}
          maxLength={list ? 50000 : 30000}
          onChange={(e) => changeText(key, e.target.value, list)}
        />
      ) : (
        <input
          required={required}
          value={source.fields[key] ?? ""}
          maxLength={
            ["duration", "formatLabel", "level"].includes(key)
              ? 160
              : key === "imageAlt"
                ? 500
                : 240
          }
          onChange={(e) => changeText(key, e.target.value)}
        />
      )}
      {list && <small>{t("linesHelp")}</small>}
    </label>
  );
  function changeText(key: string, value: string, list = false) {
    setDraft((d) => ({
      ...d,
      translations: d.translations.map((entry) =>
        entry.language === language
          ? {
              ...entry,
              [list ? "lists" : "fields"]: { ...entry[list ? "lists" : "fields"], [key]: value },
            }
          : entry,
      ),
    }));
  }
  const pick = (key: string, options: readonly string[]) => (
    <AdminRegistrySelect
      key={key}
      externalLabel
      label={t(key)}
      value={f[key] ?? ""}
      options={options.map((id) => ({ id, label: t(id || "default") }))}
      onChange={(value) => change(key, value)}
      disabled={disabled}
    />
  );

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (disabled) return;
    setError("");
    if (!source.fields.title.trim() || !source.fields.description.trim()) {
      setError(t("invalid"));
      return;
    }
    if (
      ["PUBLISHED", "ARCHIVED"].includes(f.status) &&
      !(await confirm({
        brand: "admin",
        title: t("save"),
        message: t("confirmPublish"),
        confirmLabel: t("save"),
        cancelLabel: t("cancel"),
      }))
    )
      return;
    setBusy(true);
    try {
      const category = (["ENGLISH", "EXAM", "LANGUAGE"] as const).find(
        (value) => value === f.category,
      )!;
      const accent = (["BLUE", "TURQUOISE", "YELLOW"] as const).find(
        (value) => value === f.accent,
      )!;
      const translations = courseTranslations(draft, initial, language, !row);
      const result = await save({
        variables: {
          input: {
            ...(row ? { id: row.id, expectedUpdatedAt: f.expectedUpdatedAt } : {}),
            slug: row ? f.slug : courseSlug(source.fields.title, crypto.randomUUID().slice(0, 8)),
            position: Number(f.position),
            category,
            accent,
            symbol: f.symbol,
            featured: f.featured === "yes",
            heroVariant: f.heroVariant ?? "",
            coverMediaId: f.coverMediaId || null,
            imagePath: f.imagePath ?? "",
            posterImagePath: f.posterImagePath ?? "",
            translations: translations.map((entry) => ({
              language: entry.language,
              title: entry.fields.title.trim(),
              description: entry.fields.description.trim(),
              ...Object.fromEntries(courseFields.map((key) => [key, entry.fields[key] ?? ""])),
              imageAlt: entry.fields.imageAlt || entry.fields.title,
              overview: contentLines(entry.lists.overview),
              highlights: contentLines(entry.lists.highlights),
              outcomes: contentLines(entry.lists.outcomes),
              curriculum: contentLines(entry.lists.curriculum),
              tracks: (entry.nested.tracks ?? []).map((track) => ({
                title: track.title ?? "",
                summary: track.summary ?? "",
                level: track.level ?? "",
                highlights: contentLines(track.highlights),
              })),
            })),
          },
        },
      });
      if (!result.data?.adminSaveCourseContent) throw new Error("Save failed");
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
      className="adminRegistry__editor adminContent__editor adminCourseEditor"
      data-section="courses"
      onSubmit={submit}
      aria-busy={disabled}
    >
      <fieldset disabled={disabled}>
        <div className="adminCourseEditor__basics">
          <section>
            <h3>{copy("basics")}</h3>
            <div className="adminRegistry__formGrid">
              {textField("title", false, false, true)}
              {pick("category", ["ENGLISH", "EXAM", "LANGUAGE"])}
              {textField("description", true, false, true)}
            </div>
          </section>
          <AdminCourseImageUpload
            locale={locale}
            courseId={row?.id}
            mediaId={f.coverMediaId ?? ""}
            imagePath={f.imagePath ?? ""}
            disabled={busy}
            onBusy={setUploading}
            onChange={(mediaId, imagePath) =>
              setDraft((d) => ({ ...d, fields: { ...d.fields, coverMediaId: mediaId, imagePath } }))
            }
          />
        </div>
        <details className="adminCourseEditor__section">
          <summary>{copy("details")}</summary>
          <div className="adminRegistry__formGrid">
            {["duration", "level", "formatLabel", "schedule"].map((key) => textField(key))}
            {["audience", "focus", "prerequisites"].map((key) => textField(key, true))}
            {courseLists.map((key) => textField(key, true, true))}
          </div>
          <AdminCourseTracksEditor
            locale={locale}
            tracks={source.nested.tracks ?? []}
            disabled={disabled}
            onChange={(index, key, value) =>
              setDraft((d) => ({
                ...d,
                translations: d.translations.map((entry) =>
                  entry.language === language
                    ? {
                        ...entry,
                        nested: {
                          ...entry.nested,
                          tracks: (entry.nested.tracks ?? []).map((item, i) =>
                            i === index ? { ...item, [key]: value } : item,
                          ),
                        },
                      }
                    : entry,
                ),
              }))
            }
            onRemove={(index) => {
              const remove = (d: typeof draft) => ({
                ...d,
                translations: d.translations.map((entry) => ({
                  ...entry,
                  nested: {
                    ...entry.nested,
                    tracks: (entry.nested.tracks ?? []).filter((_, i) => i !== index),
                  },
                })),
              });
              setDraft(remove);
              setInitial(remove);
            }}
            onAdd={() =>
              setDraft((d) => ({
                ...d,
                translations: d.translations.map((entry) => ({
                  ...entry,
                  nested: {
                    ...entry.nested,
                    tracks: [
                      ...(entry.nested.tracks ?? []),
                      { title: "", summary: "", level: "", highlights: "" },
                    ],
                  },
                })),
              }))
            }
          />
        </details>
        <details className="adminCourseEditor__section">
          <summary>{copy("display")}</summary>
          <div className="adminRegistry__formGrid">
            {pick("featured", ["no", "yes"])}
            {pick("accent", ["BLUE", "TURQUOISE", "YELLOW"])}
            {pick("heroVariant", ["", "immersive"])}
            {textField("imageAlt")}
            {textField("comparisonTitle")}
            {textField("posterTitle")}
            {textField("posterAlt")}
            <label>
              <span>{t("symbol")}</span>
              <input
                value={f.symbol}
                required
                maxLength={16}
                onChange={(e) => change("symbol", e.target.value)}
              />
            </label>
            <label>
              <span>{t("position")}</span>
              <input
                type="number"
                value={f.position}
                min={0}
                max={100000}
                step={1}
                required
                onChange={(e) => change("position", e.target.value)}
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
        <button type="button" disabled={disabled} onClick={onClose}>
          {t("cancel")}
        </button>
        <button className="adminRegistry__primary" disabled={disabled}>
          {t(disabled ? "loading" : "save")}
        </button>
      </div>
    </form>
  );
}
