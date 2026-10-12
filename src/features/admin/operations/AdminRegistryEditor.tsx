"use client";
import { useMutation } from "@apollo/client/react";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/config/Locales";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import {
  AdminSaveGroupDocument,
  AdminSaveLessonDocument,
  type AdminOperationsQuery,
} from "@/gql/graphql";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import type { AdminRegistryRow, AdminRegistrySection } from "@/types/admin/AdminRegistry";
import { AdminRegistrySelect } from "./AdminRegistrySelect";
import { AdminGroupTimePicker } from "./AdminGroupTimePicker";

export function AdminRegistryEditor({
  section,
  locale,
  row,
  options,
  onClose,
  onSaved,
}: {
  section: AdminRegistrySection;
  locale: Locale;
  row: AdminRegistryRow | null;
  options: AdminOperationsQuery["adminDirectoryOptions"];
  onClose: () => void;
  onSaved: () => Promise<void>;
}) {
  const t = getAdminRegistryText(locale);
  const notifications = useNotifications();
  const [values, setValues] = useState<Record<string, string>>(
    () =>
      row?.values ?? {
        teacherId: "",
        groupId: "",
        name: "",
        category: "CEFR",
        room: "",
        slug: "group-" + crypto.randomUUID(),
        days: "1,3,5",
        start: "09:00",
        end: "10:30",
        rate: "300000",
      },
  );
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [saveGroup] = useMutation(AdminSaveGroupDocument, { context: { authenticated: true } });
  const [saveLesson] = useMutation(AdminSaveLessonDocument, { context: { authenticated: true } });
  const update = (key: string, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setError("");
  };
  const input = (key: string, type = "text", required = true) => (
    <label key={key}>
      <span>{t(key)}</span>
      <input
        required={required}
        type={type}
        value={values[key] ?? ""}
        min={type === "number" ? 0 : undefined}
        step={type === "number" ? 1 : undefined}
        maxLength={key === "note" ? 1000 : 160}
        onChange={(e) => update(key, e.target.value)}
      />
    </label>
  );
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setError("");
    setBusy(true);
    try {
      if (section === "groups") {
        if (!values.teacherId || !values.days) throw new Error("Invalid form");
        const minutes = (v: string) => {
          const [h, m] = v.split(":").map(Number);
          return h * 60 + m;
        };
        const category = (["IELTS", "CEFR", "GENERAL_ENGLISH"] as const).find(
          (c) => c === values.category,
        );
        if (!category) throw new Error("Invalid category");
        const result = await saveGroup({
          variables: {
            input: {
              teacherId: values.teacherId,
              name: values.name,
              slug: values.slug,
              category,
              room: values.room,
              scheduleDays: values.days.split(",").map(Number),
              startsAtMinutes: minutes(values.start),
              endsAtMinutes: minutes(values.end),
              monthlyTuitionUzs: values.rate,
              timeZone: "Asia/Tashkent",
              ...(row ? { groupId: row.id, expectedUpdatedAt: row.updatedAt } : {}),
            },
          },
        });
        if (!result.data) throw new Error("Save failed");
      } else if (section === "schedule") {
        if (!values.groupId) throw new Error("Invalid form");
        const result = await saveLesson({
          variables: {
            input: {
              groupId: values.groupId,
              startsAt: new Date(values.from + ":00+05:00").toISOString(),
              endsAt: new Date(values.to + ":00+05:00").toISOString(),
              room: values.room,
              translations: [
                { language: "UZ", title: values.titleUz || values.name, summary: values.summaryUz },
                { language: "RU", title: values.titleRu || values.name, summary: values.summaryRu },
                { language: "EN", title: values.titleEn || values.name, summary: values.summaryEn },
              ],
              ...(row ? { lessonId: row.id, expectedUpdatedAt: row.updatedAt } : {}),
            },
          },
        });
        if (!result.data) throw new Error("Save failed");
      }
      notifications.success({ message: t("saved") });
      await onSaved();
      onClose();
    } catch (error) {
      setError(
        error instanceof Error &&
          /conflict|changed|booked|already|active students/i.test(error.message)
          ? t("conflict")
          : t("error"),
      );
    } finally {
      setBusy(false);
    }
  };
  const pick = (
    key: string,
    label: string,
    items: Array<{ id: string; label: string }>,
    disabled = false,
  ) => (
    <AdminRegistrySelect
      label={t(label)}
      options={[{ id: "", label: t("select") }, ...items]}
      value={values[key] ?? ""}
      onChange={(v) => update(key, v)}
      disabled={disabled || busy}
      wide={key === "teacherId"}
      externalLabel={section === "groups"}
    />
  );
  return (
    <form
      onSubmit={submit}
      className="adminRegistry__editor"
      data-section={section}
      aria-busy={busy}
    >
      <fieldset disabled={busy}>
        <div className="adminRegistry__formGrid">
          {section === "groups" ? (
            <>
              {pick(
                "teacherId",
                "teacher",
                options.teachers.filter(
                  (o) => o.status === "ACTIVE" || o.id === row?.values.teacherId,
                ),
                Boolean(row),
              )}
              {pick("category", "category", [
                { id: "IELTS", label: "IELTS" },
                { id: "CEFR", label: "CEFR" },
                { id: "GENERAL_ENGLISH", label: "General English" },
              ])}
              {input("name")}
              {input("room", "text", false)}
              {input("rate", "number")}
              <div className="adminRegistry__timeRange">
                {(["start", "end"] as const).map((key) => (
                  <AdminGroupTimePicker
                    key={key}
                    label={t(key)}
                    locale={locale}
                    value={values[key]}
                    onChange={(value) => update(key, value)}
                    disabled={busy}
                  />
                ))}
              </div>
              <fieldset className="adminRegistry__days">
                <legend>{t("date")}</legend>
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <button
                    key={day}
                    type="button"
                    aria-pressed={(values.days ?? "").split(",").includes(String(day))}
                    onClick={() => {
                      const days = new Set(values.days ? values.days.split(",") : []);
                      if (days.has(String(day))) days.delete(String(day));
                      else days.add(String(day));
                      update("days", [...days].sort().join(","));
                    }}
                  >
                    {new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }).format(
                      new Date(Date.UTC(2024, 0, day)),
                    )}
                  </button>
                ))}
              </fieldset>
            </>
          ) : null}
          {section === "schedule" ? (
            <>
              {pick(
                "groupId",
                "group",
                options.groups.filter((o) => o.status === "ACTIVE"),
              )}
              {input("name")}
              {input("room", "text", false)}
              {input("from", "datetime-local")}
              {input("to", "datetime-local")}
              <p>Asia/Tashkent · UTC+05:00</p>
              {["titleUz", "titleRu", "titleEn"].map((key, i) => (
                <label key={key}>
                  <span>
                    {t("name")} · {["UZ", "RU", "EN"][i]}
                  </span>
                  <input
                    value={values[key] ?? ""}
                    maxLength={240}
                    placeholder={values.name}
                    onChange={(e) => update(key, e.target.value)}
                  />
                </label>
              ))}
            </>
          ) : null}
        </div>
      </fieldset>
      {error ? (
        <p role="alert" className="adminRegistry__error">
          {error}
        </p>
      ) : null}
      <div className="adminRegistry__formActions">
        <button type="button" onClick={onClose} disabled={busy}>
          {t("cancel")}
        </button>
        <button className="adminRegistry__primary" type="submit" disabled={busy}>
          {t(busy ? "loading" : "save")}
        </button>
      </div>
    </form>
  );
}
