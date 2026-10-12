"use client";

import { useMutation } from "@apollo/client/react";
import { useState, type FormEvent } from "react";
import AddRounded from "@mui/icons-material/AddRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import type { Locale } from "@/config/Locales";
import { getAdminContentText } from "@/dictionaries/admin/AdminContent";
import { AdminSaveEventContentDocument } from "@/gql/graphql";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import {
  contentDraft,
  contentLines,
  eventFields,
  eventLists,
  nestedFields,
} from "@/lib/admin/AdminContentDraft";
import { courseSlug } from "@/lib/admin/AdminCourseDraft";
import { eventTranslations } from "@/lib/admin/AdminEventDraft";
import type { AdminContentEntry } from "@/types/admin/AdminContent";
import { AdminRegistrySelect } from "../operations/AdminRegistrySelect";
import { AdminDateTimeField } from "../operations/AdminDateTimeField";
import { AdminCourseImageUpload } from "./AdminCourseImageUpload";

export function AdminEventEditor({
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
  const [initial, setInitial] = useState(() => contentDraft("events", row));
  const [draft, setDraft] = useState(() => contentDraft("events", row));
  const [busy, setBusy] = useState(false),
    [uploading, setUploading] = useState(false),
    [error, setError] = useState("");
  const [save] = useMutation(AdminSaveEventContentDocument, { context: { authenticated: true } });
  const disabled = busy || uploading,
    language = locale.toUpperCase();
  const source = draft.translations.find((entry) => entry.language === language)!;
  const f = draft.fields;
  const change = (key: string, value: string) =>
    setDraft((current) => ({ ...current, fields: { ...current.fields, [key]: value } }));
  const field = (key: string, type = "text", required = false) => (
    <label key={key}>
      <span>{t(key)}</span>
      <input
        type={type}
        required={required}
        value={f[key] ?? ""}
        min={
          type === "number"
            ? key === "capacity"
              ? 1
              : 0
            : key === "endsAt"
              ? f.startsAt
              : undefined
        }
        max={type === "number" ? 100000 : undefined}
        step={type === "number" ? 1 : undefined}
        maxLength={240}
        onChange={(event) => change(key, event.target.value)}
      />
    </label>
  );
  const text = (key: string, multiline = false, list = false, required = false) => {
    const props = {
      required,
      maxLength: multiline ? 30000 : key === "imageAlt" ? 500 : 240,
      value: (list ? source.lists : source.fields)[key] ?? "",
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
        {multiline ? <textarea {...props} rows={3} /> : <input {...props} />}
        {list && <small>{t("linesHelp")}</small>}
      </label>
    );
  };
  const nested = (key: "programme" | "faq") => (
    <details className="adminEventEditor__section">
      <summary>
        {t(key)}
        {Boolean(source.nested[key]?.length) && ` (${source.nested[key].length})`}
      </summary>
      <div className="adminEventEditor__items">
        {(source.nested[key] ?? []).map((item, index) => (
          <section className="adminEventEditor__item" key={index}>
            <header>
              <h3>
                {t(key)} {index + 1}
              </h3>
              <button
                type="button"
                className="adminRegistry__action adminRegistry__action_delete"
                aria-label={`${t("remove")}: ${t(key)} ${index + 1}`}
                onClick={() => {
                  const remove = (current: typeof draft) => ({
                    ...current,
                    translations: current.translations.map((entry) => ({
                      ...entry,
                      nested: {
                        ...entry.nested,
                        [key]: (entry.nested[key] ?? []).filter((_, i) => i !== index),
                      },
                    })),
                  });
                  setDraft(remove);
                  setInitial(remove);
                }}
              >
                <DeleteOutlineRounded />
              </button>
            </header>
            <div className="adminRegistry__formGrid">
              {nestedFields[key].map((name) => {
                const props = {
                  required: true,
                  value: item[name] ?? "",
                  maxLength: name === "timeLabel" ? 40 : name === "title" ? 240 : 5000,
                  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                    setDraft((current) => ({
                      ...current,
                      translations: current.translations.map((entry) =>
                        entry.language === language
                          ? {
                              ...entry,
                              nested: {
                                ...entry.nested,
                                [key]: (entry.nested[key] ?? []).map((value, i) =>
                                  i === index ? { ...value, [name]: event.target.value } : value,
                                ),
                              },
                            }
                          : entry,
                      ),
                    })),
                };
                return (
                  <label
                    key={name}
                    className={
                      name === "description" || name === "answer" ? "adminContent__wide" : undefined
                    }
                  >
                    <span>{t(name)}</span>
                    {name === "description" || name === "answer" ? (
                      <textarea {...props} rows={3} />
                    ) : (
                      <input {...props} />
                    )}
                  </label>
                );
              })}
            </div>
          </section>
        ))}
        <button
          type="button"
          className="adminEventEditor__add"
          disabled={(source.nested[key]?.length ?? 0) >= 100}
          onClick={() =>
            setDraft((current) => ({
              ...current,
              translations: current.translations.map((entry) => ({
                ...entry,
                nested: {
                  ...entry.nested,
                  [key]: [
                    ...(entry.nested[key] ?? []),
                    Object.fromEntries(nestedFields[key].map((name) => [name, ""])),
                  ],
                },
              })),
            }))
          }
        >
          <AddRounded />
          {t("add")}
        </button>
      </div>
    </details>
  );
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (disabled) return;
    setError("");
    if (
      !source.fields.title.trim() ||
      !source.fields.description.trim() ||
      !f.startsAt ||
      (f.endsAt && f.endsAt <= f.startsAt)
    ) {
      setError(t("invalid"));
      return;
    }
    setBusy(true);
    try {
      if (
        f.status === "PUBLISHED" &&
        !(await confirm({
          brand: "admin",
          title: t("save"),
          message: t("confirmPublish"),
          confirmLabel: t("save"),
          cancelLabel: t("cancel"),
        }))
      )
        return;
      const timelineStatus = f.timelineStatus === "PAST" ? "PAST" : "UPCOMING";
      const result = await save({
        variables: {
          input: {
            ...(row ? { id: row.id, expectedUpdatedAt: f.expectedUpdatedAt } : {}),
            slug: row ? f.slug : courseSlug(source.fields.title, crypto.randomUUID().slice(0, 8)),
            position: Number(f.position),
            imagePath: f.imagePath ?? "",
            coverMediaId: f.coverMediaId || null,
            startsAt: new Date(f.startsAt + ":00+05:00").toISOString(),
            endsAt: f.endsAt ? new Date(f.endsAt + ":00+05:00").toISOString() : null,
            location: f.location ?? "",
            capacity: f.capacity ? Number(f.capacity) : null,
            timelineStatus,
            translations: eventTranslations(draft, initial, language, !row).map((entry) => ({
              language: entry.language,
              title: entry.fields.title.trim(),
              description: entry.fields.description.trim(),
              ...Object.fromEntries(eventFields.map((key) => [key, entry.fields[key] ?? ""])),
              imageAlt: entry.fields.imageAlt || entry.fields.title,
              topics: contentLines(entry.lists.topics),
              overview: contentLines(entry.lists.overview),
              audience: contentLines(entry.lists.audience),
              takeaways: contentLines(entry.lists.takeaways),
              practicalInfo: contentLines(entry.lists.practicalInfo),
              programme: (entry.nested.programme ?? []).map((item) => ({
                timeLabel: item.timeLabel ?? "",
                title: item.title ?? "",
                description: item.description ?? "",
              })),
              faq: (entry.nested.faq ?? []).map((item) => ({
                question: item.question ?? "",
                answer: item.answer ?? "",
              })),
            })),
          },
        },
      });
      if (!result.data?.adminSaveEventContent) throw new Error("Event save failed");
      notifications.success({ message: t("savedPublic") });
      onClose();
      await onSaved();
    } catch (failure) {
      setError(
        t(
          failure instanceof Error && /changed|capacity|already|unique/i.test(failure.message)
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
      className="adminRegistry__editor adminContent__editor adminEventEditor"
      data-section="events"
      onSubmit={submit}
      onInvalidCapture={(event) => {
        const field = event.target as HTMLElement;
        const section = field.closest("details");
        if (section) section.open = true;
      }}
      aria-busy={disabled}
    >
      <fieldset disabled={disabled}>
        <div className="adminCourseEditor__basics">
          <section>
            <div className="adminRegistry__formGrid">
              {text("title", false, false, true)}
              {text("formatLabel")}
              <div className="adminContent__wide">{text("description", true, false, true)}</div>
              {field("location")}
              {field("capacity", "number")}
            </div>
          </section>
          <AdminCourseImageUpload
            imageLabel={t("eventImage")}
            locale={locale}
            eventId={row?.id}
            mediaId={f.coverMediaId ?? ""}
            imagePath={f.imagePath ?? ""}
            disabled={busy}
            onBusy={setUploading}
            onChange={(mediaId, imagePath) =>
              setDraft((current) => ({
                ...current,
                fields: { ...current.fields, coverMediaId: mediaId, imagePath },
              }))
            }
          />
        </div>
        <section className="adminEventEditor__schedule">
          <h3>{t("schedule")}</h3>
          <div className="adminRegistry__formGrid">
            <AdminDateTimeField
              label={t("startsAt")}
              locale={locale}
              value={f.startsAt ?? ""}
              required
              disabled={disabled}
              onChange={(value) => change("startsAt", value)}
            />
            <AdminDateTimeField
              label={t("endsAt")}
              locale={locale}
              value={f.endsAt ?? ""}
              after={f.startsAt}
              disabled={disabled}
              onChange={(value) => change("endsAt", value)}
            />
          </div>
          <p>Asia/Tashkent · UTC+05:00</p>
        </section>
        <details className="adminEventEditor__section">
          <summary>{t("eventContent")}</summary>
          <div className="adminRegistry__formGrid">
            {eventLists.map((key) => text(key, true, true))}
          </div>
        </details>
        {nested("programme")}
        {nested("faq")}
        <details className="adminEventEditor__section">
          <summary>{t("displaySettings")}</summary>
          <div className="adminRegistry__formGrid">
            <AdminRegistrySelect
              externalLabel
              label={t("timelineStatus")}
              value={f.timelineStatus}
              options={["UPCOMING", "PAST"].map((id) => ({ id, label: t(id) }))}
              disabled={disabled}
              onChange={(value) => change("timelineStatus", value)}
            />
            {field("position", "number", true)}
            {eventFields.filter((key) => key !== "formatLabel").map((key) => text(key))}
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
        <button type="submit" className="adminRegistry__primary" disabled={disabled}>
          {t(disabled ? "loading" : "save")}
        </button>
      </div>
    </form>
  );
}
