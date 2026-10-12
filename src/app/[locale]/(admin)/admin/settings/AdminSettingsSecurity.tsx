"use client";
import { CombinedGraphQLErrors } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import LockOutlined from "@mui/icons-material/LockOutlined";
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import { useRef, useState, type FormEvent } from "react";
import type { Locale } from "@/config/Locales";
import { AdminChangePasswordDocument } from "@/gql/graphql";
import { getAdminSettingsCopy } from "@/dictionaries/admin/AdminSettings";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";

const empty = { currentPassword: "", newPassword: "", confirmPassword: "" };
type Field = keyof typeof empty;
export function AdminSettingsSecurity({ locale }: { locale: Locale }) {
  const copy = getAdminSettingsCopy(locale),
    t = getAdminRegistryText(locale);
  const notifications = useNotifications(),
    confirm = useConfirmDialog();
  const [open, setOpen] = useState(false),
    [busy, setBusy] = useState(false);
  const [password, setPassword] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [error, setError] = useState("");
  const trigger = useRef<HTMLButtonElement>(null);
  const [changePassword] = useMutation(AdminChangePasswordDocument, {
    context: { authenticated: true },
  });
  const close = () => {
    setPassword(empty);
    setErrors({});
    setError("");
    setOpen(false);
    trigger.current?.focus();
  };
  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    const next: Partial<Record<Field, string>> = {};
    if (!password.currentPassword) next.currentPassword = copy.currentRequired;
    if (password.newPassword.length < 12 || password.newPassword.length > 128)
      next.newPassword = copy.passwordLength;
    else if (password.newPassword === password.currentPassword)
      next.newPassword = copy.passwordDifferent;
    if (password.newPassword !== password.confirmPassword)
      next.confirmPassword = copy.passwordMismatch;
    setErrors(next);
    setError("");
    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      const control = event.currentTarget.elements.namedItem(firstInvalid);
      if (control instanceof HTMLElement) control.focus();
      return;
    }
    setBusy(true);
    try {
      if (
        !(await confirm({
          brand: "admin",
          title: copy.changePassword,
          message: copy.passwordConfirm,
          confirmLabel: copy.save,
          cancelLabel: copy.cancel,
        }))
      )
        return;
      const result = await changePassword({ variables: { input: password } });
      if (!result.data?.changeMyPassword.changed) throw new Error("Password unchanged");
      close();
      notifications.success({ message: copy.passwordSaved });
    } catch (cause) {
      if (
        CombinedGraphQLErrors.is(cause) &&
        cause.errors.some((item) => item.message === "Current password is incorrect")
      )
        setErrors({ currentPassword: copy.passwordIncorrect });
      else setError(copy.passwordSaveError);
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className="adminSettingsPage__card" aria-labelledby="admin-security-title">
      <header className="adminSettingsPage__cardHeading">
        <LockOutlined aria-hidden="true" />
        <h2 id="admin-security-title">{copy.security}</h2>
      </header>
      <div className="adminSettingsPage__body">
        <p className="adminSettingsPage__help">{copy.passwordHelp}</p>
        <button
          ref={trigger}
          type="button"
          className="adminSettingsPage__expand"
          aria-expanded={open}
          aria-controls="admin-password-form"
          disabled={busy}
          onClick={() => {
            if (open) close();
            else setOpen(true);
          }}
        >
          {copy.changePassword}
          <ExpandMoreRounded aria-hidden="true" />
        </button>
      </div>
      {open && (
        <form
          id="admin-password-form"
          noValidate
          onSubmit={save}
          className="adminSettingsPage__passwordForm"
        >
          <fieldset
            disabled={busy}
            className="adminSettingsPage__fields adminSettingsPage__fields_single"
          >
            {(["currentPassword", "newPassword", "confirmPassword"] as const).map((key) => (
              <label key={key}>
                <span>{t(key)}</span>
                <input
                  name={key}
                  type="password"
                  required
                  autoFocus={key === "currentPassword"}
                  autoComplete={key === "currentPassword" ? "current-password" : "new-password"}
                  maxLength={key === "currentPassword" ? 256 : 128}
                  value={password[key]}
                  aria-invalid={Boolean(errors[key])}
                  aria-describedby={
                    errors[key]
                      ? `settings-${key}-error`
                      : key === "newPassword"
                        ? "settings-password-help"
                        : undefined
                  }
                  onChange={(event) => {
                    setPassword((current) => ({ ...current, [key]: event.target.value }));
                    setErrors((current) => ({ ...current, [key]: undefined }));
                    setError("");
                  }}
                />
                {errors[key] ? (
                  <small
                    className="adminSettingsPage__error"
                    id={`settings-${key}-error`}
                    role="alert"
                  >
                    {errors[key]}
                  </small>
                ) : key === "newPassword" ? (
                  <small id="settings-password-help">{copy.passwordLength}</small>
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
            <button type="button" onClick={close} disabled={busy}>
              {copy.cancel}
            </button>
            <button
              type="submit"
              className="adminSettingsPage__primary"
              disabled={
                busy ||
                !password.currentPassword ||
                !password.newPassword ||
                !password.confirmPassword
              }
            >
              {busy ? copy.saving : copy.save}
            </button>
          </footer>
        </form>
      )}
    </section>
  );
}
