"use client";
import { useMutation } from "@apollo/client/react";
import { CombinedGraphQLErrors } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/config/Locales";
import { getAdminSettingsCopy } from "@/dictionaries/admin/AdminSettings";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import { getAdminWorkspaceCopy } from "@/dictionaries/admin/AdminWorkspace";
import { AdminUpdateProfileDocument, type AdminProfileQuery } from "@/gql/graphql";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { AdminProfileImageUpload } from "@/features/admin/settings/AdminProfileImageUpload";
import { AdminSettingsSecurity } from "./AdminSettingsSecurity";

type Props = { locale: Locale; profile: AdminProfileQuery["myProfile"] };
type Field = "firstName" | "lastName" | "email" | "phone";
function splitName(displayName: string) {
  const parts = displayName.trim().split(/\s+/);
  return {
    firstName: parts.slice(0, -1).join(" ") || parts[0] || "",
    lastName: parts.length > 1 ? (parts.at(-1) ?? "") : "",
  };
}
export function AdminSettings({ locale, profile }: Props) {
  const copy = getAdminSettingsCopy(locale),
    t = getAdminRegistryText(locale);
  const section = getAdminWorkspaceCopy(locale).sections.settings;
  const notifications = useNotifications(),
    router = useRouter();
  const [saved, setSaved] = useState(profile);
  const [uploading, setUploading] = useState(false);
  const [fields, setFields] = useState(() => ({
    ...splitName(profile.displayName),
    email: profile.email ?? "",
    phone: profile.phone ?? "",
  }));
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [error, setError] = useState("");
  const [updateProfile, { loading: saving }] = useMutation(AdminUpdateProfileDocument, {
    context: { authenticated: true },
  });
  const displayName = [fields.firstName, fields.lastName]
    .map((p) => p.trim())
    .filter(Boolean)
    .join(" ");
  const changed =
    displayName !== saved.displayName ||
    fields.phone.trim() !== (saved.phone ?? "") ||
    fields.email.trim().toLowerCase() !== (saved.email ?? "");
  const reset = () => {
    setFields({
      ...splitName(saved.displayName),
      email: saved.email ?? "",
      phone: saved.phone ?? "",
    });
    setErrors({});
    setError("");
  };
  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving || uploading || !changed) return;
    const next: Partial<Record<Field, string>> = {};
    if (!fields.firstName.trim()) next.firstName = copy.firstNameRequired;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) next.email = copy.invalidEmail;
    if (fields.phone.trim() && fields.phone.trim().length < 7) next.phone = copy.invalidPhone;
    setErrors(next);
    setError("");
    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      const control = event.currentTarget.elements.namedItem(firstInvalid);
      if (control instanceof HTMLElement) control.focus();
      return;
    }
    try {
      const result = await updateProfile({
        variables: {
          input: {
            displayName,
            phone: fields.phone.trim() || null,
            email: fields.email.trim(),
            preferredLanguage: saved.preferredLanguage,
            avatarMediaObjectId: saved.avatarMediaObjectId,
          },
        },
      });
      const updated = result.data?.updateMyProfile.profile;
      if (!updated) throw new Error("Missing profile");
      setSaved((current) => ({ ...current, ...updated }));
      setFields({
        ...splitName(updated.displayName),
        email: updated.email ?? "",
        phone: updated.phone ?? "",
      });
      notifications.success({ message: copy.saved });
      router.refresh();
    } catch (cause) {
      if (
        CombinedGraphQLErrors.is(cause) &&
        cause.errors.some((item) => item.extensions?.code === "CONFLICT")
      )
        setErrors({ email: copy.emailTaken });
      else setError(copy.saveError);
    }
  };
  return (
    <article className="adminWorkspace adminSettingsPage">
      <header className="adminWorkspace__header">
        <div>
          <h1>{section.title}</h1>
          <p>{section.description}</p>
        </div>
      </header>
      <div className="adminSettingsPage__layout">
        <section
          className="adminSettingsPage__card adminSettingsPage__profileCard"
          aria-labelledby="admin-profile-title"
        >
          <header className="adminSettingsPage__identity">
            <AdminProfileImageUpload
              locale={locale}
              profile={saved}
              disabled={saving}
              onBusy={setUploading}
              onSaved={(updated) => {
                setSaved((current) => ({ ...current, ...updated }));
                router.refresh();
              }}
            />
          </header>
          <form noValidate onSubmit={save} className="adminSettingsPage__form">
            <h2 className="adminSettingsPage__formTitle">{copy.account}</h2>
            <fieldset disabled={saving || uploading} className="adminSettingsPage__fields">
              {(["firstName", "lastName", "email", "phone"] as const).map((key) => (
                <label key={key}>
                  <span>{key === "phone" ? t("phone") : copy[key]}</span>
                  <input
                    name={key}
                    type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                    required={key === "firstName" || key === "email"}
                    autoComplete={
                      key === "firstName"
                        ? "given-name"
                        : key === "lastName"
                          ? "family-name"
                          : key === "phone"
                            ? "tel"
                            : "email"
                    }
                    maxLength={key === "email" ? 254 : key === "phone" ? 32 : 79}
                    value={fields[key]}
                    aria-invalid={Boolean(errors[key])}
                    aria-describedby={
                      errors[key]
                        ? `settings-${key}-error`
                        : key === "email"
                          ? "settings-email-help"
                          : undefined
                    }
                    onChange={(event) => {
                      setFields((current) => ({ ...current, [key]: event.target.value }));
                      setErrors((current) => ({ ...current, [key]: undefined }));
                      setError("");
                    }}
                  />
                  {errors[key] ? (
                    <small
                      id={`settings-${key}-error`}
                      className="adminSettingsPage__error"
                      role="alert"
                    >
                      {errors[key]}
                    </small>
                  ) : key === "email" ? (
                    <small id="settings-email-help">{copy.emailHelp}</small>
                  ) : null}
                </label>
              ))}
            </fieldset>
            {error && (
              <p role="alert" className="adminSettingsPage__error">
                {error}
              </p>
            )}
            <footer className="adminSettingsPage__actions">
              <button type="button" onClick={reset} disabled={saving || uploading || !changed}>
                {copy.cancel}
              </button>
              <button
                type="submit"
                className="adminSettingsPage__primary"
                disabled={saving || uploading || !changed}
              >
                {saving ? copy.saving : copy.save}
              </button>
            </footer>
          </form>
        </section>
        <AdminSettingsSecurity locale={locale} />
      </div>
    </article>
  );
}
