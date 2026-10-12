"use client";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/config/Locales";
import { getAdminSettingsCopy } from "@/dictionaries/admin/AdminSettings";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import { getAdminWorkspaceCopy } from "@/dictionaries/admin/AdminWorkspace";
import {
  AdminUpdateProfileDocument,
  AdminChangePasswordDocument,
  type AdminProfileQuery,
  type Language,
} from "@/gql/graphql";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { getWorkspaceInitials } from "@/lib/WorkspaceIdentity";
import { useAdminTheme } from "@/features/admin/layout/AdminThemeContext";
import { AdminRegistrySelect } from "@/features/admin/operations/AdminRegistrySelect";

type Props = { locale: Locale; profile: AdminProfileQuery["myProfile"] };
function splitName(displayName: string) {
  const parts = displayName.trim().split(/\s+/);
  return {
    firstName: parts.slice(0, -1).join(" ") || parts[0] || "",
    lastName: parts.length > 1 ? (parts.at(-1) ?? "") : "",
  };
}
export function AdminSettings({ locale, profile }: Props) {
  const copy = getAdminSettingsCopy(locale),
    t = getAdminRegistryText(locale),
    section = getAdminWorkspaceCopy(locale).sections.settings;
  const notifications = useNotifications(),
    confirm = useConfirmDialog(),
    router = useRouter(),
    theme = useAdminTheme();
  const [saved, setSaved] = useState(profile);
  const [name, setName] = useState(() => splitName(profile.displayName));
  const [phone, setPhone] = useState(profile.phone ?? "");
  const [email, setEmail] = useState(profile.email ?? "");
  const [language, setLanguage] = useState<Language>(profile.preferredLanguage);
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [updateProfile, { loading: saving }] = useMutation(AdminUpdateProfileDocument, {
    context: { authenticated: true },
  });
  const [changePassword, { loading: changing }] = useMutation(AdminChangePasswordDocument, {
    context: { authenticated: true },
  });
  const displayName = [name.firstName, name.lastName]
    .map((p) => p.trim())
    .filter(Boolean)
    .join(" ");
  const changed =
    displayName !== saved.displayName ||
    phone !== (saved.phone ?? "") ||
    email !== (saved.email ?? "") ||
    language !== saved.preferredLanguage;
  const reset = () => {
    setName(splitName(saved.displayName));
    setPhone(saved.phone ?? "");
    setEmail(saved.email ?? "");
    setLanguage(saved.preferredLanguage);
    setError("");
  };
  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (saving || !changed) return;
    if (!name.firstName.trim()) {
      setError(copy.firstNameRequired);
      return;
    }
    setError("");
    try {
      const result = await updateProfile({
        variables: {
          input: {
            displayName,
            phone: phone || null,
            email,
            preferredLanguage: language,
            avatarMediaObjectId: saved.avatarMediaObjectId,
          },
        },
      });
      if (!result.data) throw new Error("Missing profile");
      setSaved((p) => ({ ...p, ...result.data!.updateMyProfile.profile }));
      notifications.success({ message: copy.saved });
      router.refresh();
    } catch {
      setError(copy.saveError);
    }
  };
  const savePassword = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    if (changing) return;
    if (password.newPassword !== password.confirmPassword) {
      setPasswordError(t("error"));
      return;
    }
    if (
      !(await confirm({
        brand: "admin",
        title: copy.changePassword,
        message: copy.passwordHelp,
        confirmLabel: copy.save,
        cancelLabel: copy.cancel,
      }))
    )
      return;
    try {
      const result = await changePassword({ variables: { input: password } });
      if (!result.data?.changeMyPassword.changed) throw new Error("Not changed");
      setPassword({ currentPassword: "", newPassword: "", confirmPassword: "" });
      notifications.success({ message: t("saved") });
    } catch {
      setPasswordError(t("error"));
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
      <section className="adminRegistry__creation">
        <header>
          <span className="adminSettings__avatar">
            {getWorkspaceInitials(saved.displayName, locale)}
          </span>
          <div>
            <h2>{copy.account}</h2>
            <p>{saved.email}</p>
          </div>
        </header>
        <form onSubmit={save} className="adminRegistry__editor">
          <fieldset disabled={saving}>
            <div className="adminRegistry__formGrid">
              {(["firstName", "lastName"] as const).map((key) => (
                <label key={key}>
                  <span>{copy[key]}</span>
                  <input
                    required={key === "firstName"}
                    maxLength={79}
                    autoComplete={key === "firstName" ? "given-name" : "family-name"}
                    value={name[key]}
                    onChange={(e) => setName((n) => ({ ...n, [key]: e.target.value }))}
                  />
                </label>
              ))}
              <label>
                <span>{copy.email}</span>
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={254}
                />
              </label>
              <label>
                <span>{t("phone")}</span>
                <input
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  minLength={7}
                  maxLength={32}
                />
              </label>
              <AdminRegistrySelect
                label={t("language")}
                options={[
                  { id: "UZ", label: "O‘zbekcha" },
                  { id: "RU", label: "Русский" },
                  { id: "EN", label: "English" },
                ]}
                value={language}
                onChange={(value) => {
                  if (value === "UZ" || value === "RU" || value === "EN") setLanguage(value);
                }}
              />
            </div>
          </fieldset>
          {error ? (
            <p role="alert" className="adminRegistry__error">
              {error}
            </p>
          ) : null}
          <div className="adminRegistry__formActions">
            <button type="button" onClick={reset} disabled={saving || !changed}>
              {copy.cancel}
            </button>
            <button className="adminRegistry__primary" disabled={saving || !changed}>
              {saving ? copy.saving : copy.save}
            </button>
          </div>
        </form>
      </section>
      <section className="adminRegistry__creation">
        <header>
          <div>
            <h2>{t("appearance")}</h2>
            <p>{t(theme.mode)}</p>
          </div>
          <button type="button" onClick={theme.toggleMode}>
            {t(theme.mode === "dark" ? "light" : "dark")}
          </button>
        </header>
      </section>
      <section className="adminRegistry__creation">
        <header>
          <div>
            <h2>{copy.password}</h2>
            <p>
              {copy.passwordHelp} {t("passwordHint")}
            </p>
          </div>
        </header>
        <form onSubmit={savePassword} className="adminRegistry__editor">
          <fieldset disabled={changing}>
            <div className="adminRegistry__formGrid">
              {(["currentPassword", "newPassword", "confirmPassword"] as const).map((key) => (
                <label key={key}>
                  <span>{t(key)}</span>
                  <input
                    type="password"
                    required
                    autoComplete={key === "currentPassword" ? "current-password" : "new-password"}
                    minLength={key === "currentPassword" ? 1 : 12}
                    maxLength={256}
                    value={password[key]}
                    onChange={(e) => setPassword((p) => ({ ...p, [key]: e.target.value }))}
                  />
                </label>
              ))}
            </div>
          </fieldset>
          {passwordError ? (
            <p role="alert" className="adminRegistry__error">
              {passwordError}
            </p>
          ) : null}
          <div className="adminRegistry__formActions">
            <button className="adminRegistry__primary" disabled={changing}>
              {copy.changePassword}
            </button>
          </div>
        </form>
      </section>
    </article>
  );
}
