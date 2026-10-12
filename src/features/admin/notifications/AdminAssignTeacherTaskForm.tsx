"use client";

import { AdminRegistrySelect } from "../operations/AdminRegistrySelect";
import { useState, type FormEvent } from "react";

import type { Locale } from "@/config/Locales";
import { getAdminTeacherTaskCopy } from "@/dictionaries/admin/AdminTeacherTasks";
import { assignTeacherTask } from "@/features/admin/notifications/AdminTeacherTaskActions";
import type { TeacherTaskKind } from "@/gql/graphql";

type AdminAssignTeacherTaskFormProps = {
  locale: Locale;
  teachers: Array<{ id: string; name: string }>;
};

export function AdminAssignTeacherTaskForm({ locale, teachers }: AdminAssignTeacherTaskFormProps) {
  /* HOOKS */
  const copy = getAdminTeacherTaskCopy(locale);
  const [teacherId, setTeacherId] = useState(teachers[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState<TeacherTaskKind>("ADMINISTRATIVE");
  const [dueAt, setDueAt] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<"sent" | "error" | null>(null);
  const [requestId, setRequestId] = useState(() => crypto.randomUUID());

  /* HANDLERS */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!teacherId || !title.trim() || pending) return;
    setPending(true);
    setResult(null);
    try {
      await assignTeacherTask({
        teacherId,
        requestId,
        title: title.trim(),
        kind,
        dueAt: dueAt ? new Date(dueAt).toISOString() : null,
      });
      setTitle("");
      setDueAt("");
      setRequestId(crypto.randomUUID());
      setResult("sent");
    } catch {
      setResult("error");
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="adminTeacherTasks">
      <h2>{copy.heading}</h2>
      {teachers.length === 0 ? (
        <p>{copy.noTeachers}</p>
      ) : (
        <form onSubmit={(event) => void handleSubmit(event)}>
          <AdminRegistrySelect
            label={copy.teacher}
            value={teacherId}
            options={teachers.map((t) => ({ id: t.id, label: t.name }))}
            onChange={setTeacherId}
            wide
            disabled={pending}
          />
          <label>
            <span>{copy.title}</span>
            <input
              maxLength={240}
              onChange={(event) => setTitle(event.target.value)}
              required
              type="text"
              value={title}
            />
          </label>
          <AdminRegistrySelect
            label={copy.kind}
            value={kind}
            options={(["ADMINISTRATIVE", "FOLLOW_UP", "PREPARATION"] as const).map((id) => ({
              id,
              label: copy.kinds[id],
            }))}
            onChange={(v) => {
              const next = (["ADMINISTRATIVE", "FOLLOW_UP", "PREPARATION"] as const).find(
                (k) => k === v,
              );
              if (next) setKind(next);
            }}
            disabled={pending}
          />
          <label>
            <span>{copy.dueAt}</span>
            <input
              onChange={(event) => setDueAt(event.target.value)}
              type="datetime-local"
              value={dueAt}
            />
          </label>
          <button disabled={pending} type="submit">
            {pending ? copy.sending : copy.submit}
          </button>
        </form>
      )}
      {result ? <p role="status">{result === "sent" ? copy.sent : copy.error}</p> : null}
    </section>
  );
}
