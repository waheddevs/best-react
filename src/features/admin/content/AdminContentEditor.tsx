"use client";
import { useMutation } from "@apollo/client/react";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/config/Locales";
import { getAdminContentText } from "@/dictionaries/admin/AdminContent";
import {
  AdminSaveCourseContentDocument,
  AdminSaveEventContentDocument,
  AdminSaveExamDocument,
} from "@/gql/graphql";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import {
  contentDraft,
  contentLines,
  courseFields,
  courseLists,
  eventFields,
  eventLists,
  nestedFields,
} from "@/lib/admin/AdminContentDraft";
import type { AdminContentEntry, AdminContentSection } from "@/types/admin/AdminContent";
import { AdminRegistrySelect } from "../operations/AdminRegistrySelect";

export function AdminContentEditor({
  section,
  row,
  locale,
  onSaved,
  onClose,
}: {
  section: AdminContentSection;
  row?: AdminContentEntry;
  locale: Locale;
  onSaved: () => Promise<unknown>;
  onClose: () => void;
}) {
  const t = getAdminContentText(locale),
    notifications = useNotifications(),
    confirm = useConfirmDialog();
  const [draft, setDraft] = useState(() => contentDraft(section, row));
  const [language, setLanguage] = useState(0),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const [saveCourse] = useMutation(AdminSaveCourseContentDocument, {
    context: { authenticated: true },
  });
  const [saveEvent] = useMutation(AdminSaveEventContentDocument, {
    context: { authenticated: true },
  });
  const [saveExam] = useMutation(AdminSaveExamDocument, { context: { authenticated: true } });
  const f = draft.fields,
    translation = draft.translations[language];
  const change = (key: string, value: string) =>
    setDraft((d) => ({ ...d, fields: { ...d.fields, [key]: value } }));
  const changeTranslation = (key: string, value: string, list = false) =>
    setDraft((d) => ({
      ...d,
      translations: d.translations.map((x, i) =>
        i === language
          ? { ...x, [list ? "lists" : "fields"]: { ...x[list ? "lists" : "fields"], [key]: value } }
          : x,
      ),
    }));
  const field = (key: string, type = "text", required = false) => (
    <label key={key}>
      <span>{t(key)}</span>
      <input
        type={type}
        required={required}
        value={f[key] ?? ""}
        min={type === "number" ? 0 : undefined}
        step={type === "number" ? 1 : undefined}
        maxLength={500}
        onChange={(e) => change(key, e.target.value)}
      />
    </label>
  );
  const pick = (key: string, values: readonly string[]) => (
    <AdminRegistrySelect
      key={key}
      label={t(key)}
      value={f[key] ?? ""}
      options={values.map((id) => ({ id, label: t(id || "default") }))}
      onChange={(v) => change(key, v)}
      disabled={busy}
    />
  );
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setError("");
    if (draft.translations.some((x) => !x.fields.title?.trim() || !x.fields.description?.trim())) {
      setError(t("invalid"));
      return;
    }
    if (
      (f.status === "PUBLISHED" || f.status === "ARCHIVED") &&
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
      const common = {
        ...(row ? { id: row.id, expectedUpdatedAt: f.expectedUpdatedAt } : {}),
        slug: f.slug,
        position: Number(f.position),
        imagePath: f.imagePath ?? "",
      };
      if (section === "courses") {
        const category = (["ENGLISH", "EXAM", "LANGUAGE"] as const).find((v) => v === f.category),
          accent = (["BLUE", "TURQUOISE", "YELLOW"] as const).find((v) => v === f.accent);
        if (!category || !accent) throw new Error("Invalid form");
        await saveCourse({
          variables: {
            input: {
              ...common,
              category,
              accent,
              symbol: f.symbol,
              featured: f.featured === "yes",
              heroVariant: f.heroVariant ?? "",
              posterImagePath: f.posterImagePath ?? "",
              translations: draft.translations.map((x) => ({
                language: x.language,
                title: x.fields.title,
                description: x.fields.description,
                ...Object.fromEntries(courseFields.map((k) => [k, x.fields[k] ?? ""])),
                overview: contentLines(x.lists.overview),
                highlights: contentLines(x.lists.highlights),
                outcomes: contentLines(x.lists.outcomes),
                curriculum: contentLines(x.lists.curriculum),
                tracks: (x.nested.tracks ?? []).map((v) => ({
                  title: v.title ?? "",
                  summary: v.summary ?? "",
                  level: v.level ?? "",
                  highlights: contentLines(v.highlights),
                })),
              })),
            },
          },
        });
      } else if (section === "events") {
        const timelineStatus = (["UPCOMING", "PAST"] as const).find((v) => v === f.timelineStatus);
        if (!timelineStatus) throw new Error("Invalid form");
        await saveEvent({
          variables: {
            input: {
              ...common,
              timelineStatus,
              startsAt: new Date(f.startsAt + ":00+05:00").toISOString(),
              endsAt: f.endsAt ? new Date(f.endsAt + ":00+05:00").toISOString() : null,
              location: f.location ?? "",
              capacity: f.capacity ? Number(f.capacity) : null,
              translations: draft.translations.map((x) => ({
                language: x.language,
                title: x.fields.title,
                description: x.fields.description,
                ...Object.fromEntries(eventFields.map((k) => [k, x.fields[k] ?? ""])),
                topics: contentLines(x.lists.topics),
                overview: contentLines(x.lists.overview),
                audience: contentLines(x.lists.audience),
                takeaways: contentLines(x.lists.takeaways),
                practicalInfo: contentLines(x.lists.practicalInfo),
                programme: (x.nested.programme ?? []).map((v) => ({
                  timeLabel: v.timeLabel ?? "",
                  title: v.title ?? "",
                  description: v.description ?? "",
                })),
                faq: (x.nested.faq ?? []).map((v) => ({
                  question: v.question ?? "",
                  answer: v.answer ?? "",
                })),
              })),
            },
          },
        });
      } else {
        const status = (["DRAFT", "PUBLISHED", "ARCHIVED"] as const).find((v) => v === f.status);
        if (!status) throw new Error("Invalid form");
        await saveExam({
          variables: {
            input: {
              ...(row ? { id: row.id, revision: f.revision } : {}),
              key: f.key,
              position: Number(f.position),
              status,
              translations: draft.translations.map((x) => ({
                language: x.language,
                title: x.fields.title,
                description: x.fields.description,
                formatLabel: x.fields.formatLabel ?? "",
                duration: x.fields.duration ?? "",
                level: x.fields.level ?? "",
                highlights: contentLines(x.lists.highlights),
              })),
            },
          },
        });
      }
      notifications.success({ message: t("savedPublic") });
      onClose();
      await onSaved();
    } catch (e) {
      setError(
        t(
          e instanceof Error && /changed|capacity|already|unique/i.test(e.message)
            ? "conflict"
            : "invalid",
        ),
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <form className="adminRegistry__editor adminContent__editor" onSubmit={submit} aria-busy={busy}>
      <fieldset disabled={busy}>
        <div className="adminRegistry__formGrid">
          {field(section === "exams" ? "key" : "slug", "text", true)}
          {field("position", "number", true)}
          {section === "courses" ? (
            <>
              {pick("category", ["ENGLISH", "EXAM", "LANGUAGE"])}
              {pick("accent", ["BLUE", "TURQUOISE", "YELLOW"])}
              {pick("featured", ["no", "yes"])}
              {field("symbol", "text", true)}
              {pick("heroVariant", ["", "immersive"])}
              {field("posterImagePath")}
            </>
          ) : null}
          {section !== "exams"
            ? field("imagePath")
            : pick("status", ["DRAFT", "PUBLISHED", "ARCHIVED"])}
          {section === "events" ? (
            <>
              {field("startsAt", "datetime-local", true)}
              {field("endsAt", "datetime-local")}
              {field("location")}
              {field("capacity", "number")}
              {pick("timelineStatus", ["UPCOMING", "PAST"])}
              <p>Asia/Tashkent · UTC+05:00</p>
            </>
          ) : null}
        </div>
        {section !== "exams" ? <p className="adminContent__help">{t("mediaHelp")}</p> : null}
        <div className="adminContent__tabs" role="tablist" aria-label={t("language")}>
          {draft.translations.map((x, i) => (
            <button
              type="button"
              key={x.language}
              role="tab"
              aria-selected={language === i}
              onClick={() => setLanguage(i)}
            >
              {x.language}
            </button>
          ))}
        </div>
        <p className="adminContent__help">{t("translationsHelp")}</p>
        <div className="adminRegistry__formGrid">
          {[
            "title",
            "description",
            ...(section === "courses"
              ? courseFields
              : section === "events"
                ? eventFields
                : ["formatLabel", "duration", "level"]),
          ].map((key) => (
            <label key={key} className={key === "description" ? "adminContent__wide" : undefined}>
              <span>{t(key)}</span>
              {["description", "focus", "prerequisites", "audience"].includes(key) ? (
                <textarea
                  value={translation.fields[key] ?? ""}
                  onChange={(e) => changeTranslation(key, e.target.value)}
                  maxLength={30000}
                />
              ) : (
                <input
                  value={translation.fields[key] ?? ""}
                  onChange={(e) => changeTranslation(key, e.target.value)}
                  maxLength={key === "imageAlt" || key === "posterAlt" ? 500 : 240}
                />
              )}
            </label>
          ))}
          {(section === "courses"
            ? courseLists
            : section === "events"
              ? eventLists
              : ["highlights"]
          ).map((key) => (
            <label key={key}>
              <span>{t(key)}</span>
              <textarea
                value={translation.lists[key] ?? ""}
                onChange={(e) => changeTranslation(key, e.target.value)}
                maxLength={50000}
              />
              <small>{t("linesHelp")}</small>
            </label>
          ))}
        </div>
        {(section === "courses"
          ? ["tracks"]
          : section === "events"
            ? ["programme", "faq"]
            : []
        ).map((key) => (
          <section className="adminContent__nested" key={key}>
            <h3>{t(key)}</h3>
            {(translation.nested[key] ?? []).map((item, index) => (
              <div className="adminRegistry__formGrid" key={index}>
                {nestedFields[key].map((k) => (
                  <label key={k}>
                    <span>{t(k)}</span>
                    <textarea
                      value={item[k] ?? ""}
                      maxLength={
                        k === "timeLabel" ? 40 : k === "title" ? 240 : k === "level" ? 160 : 5000
                      }
                      onChange={(e) =>
                        setDraft((d) => ({
                          ...d,
                          translations: d.translations.map((x, i) =>
                            i === language || (key === "programme" && k === "timeLabel")
                              ? {
                                  ...x,
                                  nested: {
                                    ...x.nested,
                                    [key]: (x.nested[key] ?? []).map((v, j) =>
                                      j === index ? { ...v, [k]: e.target.value } : v,
                                    ),
                                  },
                                }
                              : x,
                          ),
                        }))
                      }
                    />
                  </label>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setDraft((d) => ({
                      ...d,
                      translations: d.translations.map((x) => ({
                        ...x,
                        nested: {
                          ...x.nested,
                          [key]: (x.nested[key] ?? []).filter((_, i) => i !== index),
                        },
                      })),
                    }))
                  }
                >
                  {t("remove")}
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setDraft((d) => ({
                  ...d,
                  translations: d.translations.map((x) => ({
                    ...x,
                    nested: {
                      ...x.nested,
                      [key]: [
                        ...(x.nested[key] ?? []),
                        Object.fromEntries(nestedFields[key].map((k) => [k, ""])),
                      ],
                    },
                  })),
                }))
              }
            >
              {t("add")}
            </button>
          </section>
        ))}
      </fieldset>
      {error ? (
        <p className="adminRegistry__error" role="alert">
          {error}
        </p>
      ) : null}
      <div className="adminRegistry__formActions">
        <button type="button" onClick={onClose} disabled={busy}>
          {t("cancel")}
        </button>
        <button className="adminRegistry__primary" disabled={busy}>
          {t(busy ? "loading" : "save")}
        </button>
      </div>
    </form>
  );
}
