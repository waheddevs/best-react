"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import type { Locale } from "@/config/Locales";
import { getAdminSettingsCopy } from "@/dictionaries/admin/AdminSettings";
import { getAdminWorkspaceCopy } from "@/dictionaries/admin/AdminWorkspace";
import { updateAdminProfile } from "@/features/admin/settings/AdminSettingsActions";
import type { AdminProfileQuery } from "@/gql/graphql";
import { getWorkspaceInitials } from "@/lib/WorkspaceIdentity";

type AdminSettingsProps = {
  locale: Locale;
  profile: AdminProfileQuery["myProfile"];
};

function splitDisplayName(displayName: string) {
  const parts = displayName.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts.length > 1 ? parts.slice(0, -1).join(" ") : (parts[0] ?? ""),
    lastName: parts.length > 1 ? (parts.at(-1) ?? "") : "",
  };
}

export function AdminSettings({ locale, profile }: AdminSettingsProps) {
  const router = useRouter();
  const copy = getAdminSettingsCopy(locale);
  const workspaceCopy = getAdminWorkspaceCopy(locale);
  const section = workspaceCopy.sections.settings;
  const [savedProfile, setSavedProfile] = useState(profile);
  const [name, setName] = useState(() => splitDisplayName(profile.displayName));
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<"saved" | "error" | null>(null);
  const [validationError, setValidationError] = useState(false);
  const displayName = [name.firstName, name.lastName]
    .map((part) => part.trim().replace(/\s+/g, " "))
    .filter(Boolean)
    .join(" ");
  const changed = displayName !== savedProfile.displayName;

  const handleCancel = () => {
    setName(splitDisplayName(savedProfile.displayName));
    setFeedback(null);
    setValidationError(false);
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.firstName.trim() || displayName.length > 160) {
      setValidationError(true);
      return;
    }
    if (!changed || saving) return;

    setSaving(true);
    setFeedback(null);
    try {
      const updated = await updateAdminProfile({
        avatarMediaObjectId: savedProfile.avatarMediaObjectId,
        branchName: null,
        displayName,
        phone: savedProfile.phone,
        preferredLanguage: savedProfile.preferredLanguage,
        teacherSubject: null,
      });
      setSavedProfile((current) => ({ ...current, ...updated }));
      setName(splitDisplayName(updated.displayName));
      setFeedback("saved");
      router.refresh();
    } catch {
      setFeedback("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <article className="adminSettings">
      <header className="adminSettings__heading">
        <div>
          <span>{section.eyebrow}</span>
          <h1>{copy.account}</h1>
          <p>{section.description}</p>
        </div>
        <div className="adminWorkspace__health">
          <i />
          <span>{workspaceCopy.common.connectedNotice}</span>
        </div>
      </header>
      <form onSubmit={handleSave}>
        <section aria-label={copy.account} className="adminSettings__account">
          <div className="adminSettings__pictureRow">
            <span aria-hidden="true" className="adminSettings__avatar">
              {getWorkspaceInitials(savedProfile.displayName, locale)}
            </span>
            <div className="adminSettings__pictureContent">
              <h2>{copy.profilePicture}</h2>
              <div className="adminSettings__pictureActions">
                <button
                  aria-describedby="admin-settings-image-note"
                  className="adminSettings__button adminSettings__button_secondary"
                  disabled
                  type="button"
                >
                  {copy.uploadImage}
                </button>
                <button
                  aria-describedby="admin-settings-image-note"
                  className="adminSettings__button adminSettings__button_secondary"
                  disabled
                  type="button"
                >
                  {copy.removeImage}
                </button>
              </div>
              <p id="admin-settings-image-note">{copy.imageUnavailable}</p>
            </div>
          </div>

          <div className="adminSettings__nameFields">
            <label>
              <span>{copy.firstName}</span>
              <input
                aria-describedby={validationError ? "admin-settings-name-error" : undefined}
                aria-invalid={validationError}
                autoComplete="given-name"
                maxLength={79}
                onChange={(event) => {
                  setName((current) => ({ ...current, firstName: event.target.value }));
                  setFeedback(null);
                  setValidationError(false);
                }}
                type="text"
                value={name.firstName}
              />
            </label>
            <label>
              <span>{copy.lastName}</span>
              <input
                autoComplete="family-name"
                maxLength={79}
                onChange={(event) => {
                  setName((current) => ({ ...current, lastName: event.target.value }));
                  setFeedback(null);
                }}
                type="text"
                value={name.lastName}
              />
            </label>
          </div>
          {validationError ? (
            <p className="adminSettings__error" id="admin-settings-name-error" role="alert">
              {copy.firstNameRequired}
            </p>
          ) : null}

          <div className="adminSettings__emailField">
            <label>
              <span>{copy.email}</span>
              <input autoComplete="email" readOnly type="email" value={savedProfile.email ?? ""} />
            </label>
            <button
              aria-describedby="admin-settings-email-note"
              className="adminSettings__button adminSettings__button_secondary"
              disabled
              type="button"
            >
              {copy.editEmail}
            </button>
          </div>
          <p className="adminSettings__emailHelp" id="admin-settings-email-note">
            {copy.emailHelp} {copy.emailUnavailable}
          </p>
        </section>

        <section
          aria-labelledby="admin-settings-password-heading"
          className="adminSettings__password"
        >
          <div>
            <h2 id="admin-settings-password-heading">{copy.password}</h2>
            <p>
              {copy.passwordHelp} {copy.passwordUnavailable}
            </p>
          </div>
          <button
            aria-describedby="admin-settings-password-heading"
            className="adminSettings__button adminSettings__button_secondary"
            disabled
            type="button"
          >
            {copy.changePassword}
          </button>
        </section>

        <footer className="adminSettings__footer">
          {feedback ? (
            <p
              aria-live="polite"
              className={feedback === "error" ? "adminSettings__error" : "adminSettings__success"}
            >
              {feedback === "error" ? copy.saveError : copy.saved}
            </p>
          ) : null}
          <button
            className="adminSettings__button adminSettings__button_secondary"
            disabled={!changed || saving}
            onClick={handleCancel}
            type="button"
          >
            {copy.cancel}
          </button>
          <button
            className="adminSettings__button adminSettings__button_primary"
            disabled={!changed || saving}
            type="submit"
          >
            {saving ? copy.saving : copy.save}
          </button>
        </footer>
      </form>
    </article>
  );
}
