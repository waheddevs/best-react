"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import type { StudentSettingsCopy } from "@/dictionaries/student/StudentSettings";
import { StudentProfileAvatar } from "@/features/student/layout/StudentProfileAvatar";
import { saveStudentName } from "@/features/student/settings/StudentSettingsActions";
import type { Locale } from "@/config/Locales";
import type { StudentAccountIdentity } from "@/types/student/StudentSettings";

type StudentAccountSettingsProps = {
  connected: boolean;
  copy: StudentSettingsCopy;
  locale: Locale;
  profile: StudentAccountIdentity;
};

function nameParts(displayName: string): { firstName: string; lastName: string } {
  const [firstName = "", ...remainder] = displayName.trim().split(/\s+/);
  return { firstName, lastName: remainder.join(" ") };
}

export function StudentAccountSettings({
  connected,
  copy,
  locale,
  profile,
}: StudentAccountSettingsProps) {
  const router = useRouter();
  const [savedName, setSavedName] = useState(profile.displayName);
  const [firstName, setFirstName] = useState(() => nameParts(profile.displayName).firstName);
  const [lastName, setLastName] = useState(() => nameParts(profile.displayName).lastName);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [attempted, setAttempted] = useState(false);
  const firstValid = firstName.trim().length > 0 && firstName.trim().length <= 80;
  const lastValid = lastName.trim().length > 0 && lastName.trim().length <= 80;
  const dirty = `${firstName.trim()} ${lastName.trim()}` !== savedName.trim();

  function handleCancel() {
    const initial = nameParts(savedName);
    setFirstName(initial.firstName);
    setLastName(initial.lastName);
    setAttempted(false);
    setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    if (!connected || !firstValid || !lastValid || !dirty || pending) return;
    setPending(true);
    setStatus("idle");
    try {
      const result = await saveStudentName(firstName, lastName);
      if (!result.ok) {
        setStatus("error");
        return;
      }
      const normalized = nameParts(result.displayName);
      setSavedName(result.displayName);
      setFirstName(normalized.firstName);
      setLastName(normalized.lastName);
      setAttempted(false);
      setStatus("saved");
      router.refresh();
    } catch {
      setStatus("error");
    } finally {
      setPending(false);
    }
  }

  return (
    <article className="studentSettings">
      <form noValidate onSubmit={(event) => void handleSubmit(event)}>
        <div className="studentSettings__body">
          <section
            aria-labelledby="student-settings-picture"
            className="studentSettings__pictureRow"
          >
            <StudentProfileAvatar
              avatarUrl={profile.avatarUrl}
              className="studentSettings__avatar"
              displayName={savedName}
              locale={locale}
              size={84}
            />
            <div>
              <h2 id="student-settings-picture">{copy.picture}</h2>
              <div className="studentSettings__pictureActions">
                <button disabled type="button">
                  {copy.uploadPicture}
                </button>
                <button disabled type="button">
                  {copy.removePicture}
                </button>
              </div>
              <p>{copy.pictureHelp}</p>
            </div>
          </section>

          <div className="studentSettings__nameGrid">
            <div className="studentSettings__field">
              <label htmlFor="student-first-name">{copy.firstName}</label>
              <input
                aria-describedby={attempted && !firstValid ? "student-first-name-error" : undefined}
                aria-invalid={attempted && !firstValid}
                autoComplete="given-name"
                disabled={!connected || pending}
                id="student-first-name"
                maxLength={80}
                onChange={(event) => {
                  setFirstName(event.target.value);
                  setStatus("idle");
                }}
                value={firstName}
              />
              {attempted && !firstValid ? (
                <small className="studentSettings__error" id="student-first-name-error">
                  {copy.firstNameError}
                </small>
              ) : null}
            </div>
            <div className="studentSettings__field">
              <label htmlFor="student-last-name">{copy.lastName}</label>
              <input
                aria-describedby={attempted && !lastValid ? "student-last-name-error" : undefined}
                aria-invalid={attempted && !lastValid}
                autoComplete="family-name"
                disabled={!connected || pending}
                id="student-last-name"
                maxLength={80}
                onChange={(event) => {
                  setLastName(event.target.value);
                  setStatus("idle");
                }}
                value={lastName}
              />
              {attempted && !lastValid ? (
                <small className="studentSettings__error" id="student-last-name-error">
                  {copy.lastNameError}
                </small>
              ) : null}
            </div>
          </div>

          <div className="studentSettings__field studentSettings__email">
            <label htmlFor="student-settings-email">{copy.email}</label>
            <input
              autoComplete="email"
              id="student-settings-email"
              readOnly
              type="email"
              value={profile.email ?? ""}
            />
            <small>{copy.emailHelp}</small>
          </div>
          {!connected ? <p className="studentSettings__notice">{copy.previewNotice}</p> : null}
        </div>

        <section aria-labelledby="student-settings-password" className="studentSettings__password">
          <div>
            <h2 id="student-settings-password">{copy.password}</h2>
            <p>{copy.passwordHelp}</p>
          </div>
          <span>{copy.passwordUnavailable}</span>
        </section>

        <footer className="studentSettings__footer">
          <p
            aria-live="polite"
            className={`studentSettings__status studentSettings__status_${status}`}
          >
            {status === "saved" ? copy.saved : status === "error" ? copy.saveError : ""}
          </p>
          <button
            className="studentSettings__cancel"
            disabled={pending}
            onClick={handleCancel}
            type="button"
          >
            {copy.cancel}
          </button>
          <button
            className="studentSettings__save"
            disabled={!connected || !dirty || pending}
            type="submit"
          >
            {pending ? copy.saving : copy.save}
          </button>
        </footer>
      </form>
    </article>
  );
}
