"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import type { StudentSettingsCopy } from "@/dictionaries/student/StudentSettings";
import { changeStudentPassword } from "@/features/student/settings/StudentSettingsActions";
import { useNotifications } from "@/hooks/notifications/useNotifications";

type StudentPasswordSettingsProps = {
  connected: boolean;
  copy: StudentSettingsCopy;
};

export function StudentPasswordSettings({ connected, copy }: StudentPasswordSettingsProps) {
  const notifications = useNotifications();
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const currentPassword = String(values.get("currentPassword") ?? "");
    const newPassword = String(values.get("newPassword") ?? "");
    const confirmPassword = String(values.get("confirmPassword") ?? "");
    if (newPassword !== confirmPassword) {
      notifications.error({ title: copy.changePassword, message: copy.passwordMismatch });
      return;
    }
    if (!connected) {
      form.reset();
      notifications.warning({ title: copy.changePassword, message: copy.passwordUnavailable });
      return;
    }
    setPending(true);
    try {
      const changed = await changeStudentPassword({
        confirmPassword,
        currentPassword,
        newPassword,
      });
      if (!changed) throw new Error("Password was not changed");
      form.reset();
      notifications.success({ title: copy.changePassword, message: copy.passwordChanged });
    } catch {
      notifications.error({ title: copy.changePassword, message: copy.passwordError });
    } finally {
      setPending(false);
    }
  }

  return (
    <section aria-labelledby="student-settings-password" className="studentSettings__passwordCard">
      <h2 id="student-settings-password">{copy.password}</h2>
      <form aria-busy={pending} onSubmit={(event) => void handleSubmit(event)}>
        <div className="studentSettings__passwordFields">
          <label>
            {copy.currentPassword}
            <input
              autoComplete="current-password"
              name="currentPassword"
              required
              type="password"
            />
          </label>
          <label>
            {copy.newPassword}
            <input
              autoComplete="new-password"
              minLength={12}
              name="newPassword"
              required
              type="password"
            />
          </label>
          <label>
            {copy.confirmPassword}
            <input
              autoComplete="new-password"
              minLength={12}
              name="confirmPassword"
              required
              type="password"
            />
          </label>
        </div>
        <div className="studentSettings__passwordActions">
          <Button
            className="studentSettings__save"
            disabled={pending}
            hoverEffect="jump"
            shape="soft"
            size="small"
            type="submit"
            variant="primary"
          >
            {pending ? copy.changingPassword : copy.changePassword}
          </Button>
        </div>
      </form>
    </section>
  );
}
