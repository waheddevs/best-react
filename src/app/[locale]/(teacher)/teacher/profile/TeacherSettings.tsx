"use client";

import CloudUploadOutlined from "@mui/icons-material/CloudUploadOutlined";
import ComputerRounded from "@mui/icons-material/ComputerRounded";
import DarkModeRounded from "@mui/icons-material/DarkModeRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import LanguageRounded from "@mui/icons-material/LanguageRounded";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import QrCode2Rounded from "@mui/icons-material/QrCode2Rounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Switch from "@mui/material/Switch";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import type { Locale } from "@/config/Locales";
import { locales } from "@/config/Locales";
import { getTeacherProfileMessages } from "@/dictionaries/teacher/TeacherProfileMessages";
import { updateTeacherProfile } from "@/features/teacher/profile/TeacherProfileActions";
import { useLocaleSwitcher } from "@/hooks/navigation/useLocaleSwitcher";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { useTeacherTheme } from "@/hooks/teacher/useTeacherTheme";
import {
  joinTeacherDisplayName,
  splitTeacherDisplayName,
  teacherInitials,
} from "@/lib/teacher/TeacherDisplayName";
import type { TeacherCopy } from "@/types/teacher/Teacher";
import type { TeacherProfileRecord } from "@/types/teacher/TeacherProfile";

type TeacherSettingsProps = {
  connected: boolean;
  copy: TeacherCopy;
  locale: Locale;
  profile: TeacherProfileRecord;
};
type ProfileDialog = "password" | "qr" | "language" | null;

export function TeacherSettings({ connected, copy, locale, profile }: TeacherSettingsProps) {
  const router = useRouter();
  const session = useSession();
  const notifications = useNotifications();
  const confirm = useConfirmDialog();
  const localeSwitcher = useLocaleSwitcher();
  const teacherTheme = useTeacherTheme();
  const messages = getTeacherProfileMessages(locale);
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const [activeDialog, setActiveDialog] = useState<ProfileDialog>(null);
  const [profileState, setProfileState] = useState(profile);
  const [firstName, setFirstName] = useState(
    () => splitTeacherDisplayName(profile.displayName).firstName,
  );
  const [lastName, setLastName] = useState(
    () => splitTeacherDisplayName(profile.displayName).lastName,
  );
  const [phone, setPhone] = useState(profile.phone ?? "");
  const [subject, setSubject] = useState(profile.teacherSubject ?? "");
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const currentName = splitTeacherDisplayName(profileState.displayName);
  const isDirty =
    joinTeacherDisplayName(firstName, lastName) !== profileState.displayName ||
    phone.trim() !== (profileState.phone ?? "") ||
    subject.trim() !== (profileState.teacherSubject ?? "") ||
    removeAvatar;

  const handleCancel = () => {
    setFirstName(currentName.firstName);
    setLastName(currentName.lastName);
    setPhone(profileState.phone ?? "");
    setSubject(profileState.teacherSubject ?? "");
    setPhotoName(null);
    setRemoveAvatar(false);
  };

  const handleInformationSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isDirty) return;
    const displayName = joinTeacherDisplayName(firstName, lastName);
    if (!connected) {
      setProfileState((current) => ({
        ...current,
        avatarMediaObjectId: removeAvatar ? null : current.avatarMediaObjectId,
        avatarUrl: removeAvatar ? null : current.avatarUrl,
        displayName,
        initials: teacherInitials(displayName),
        phone: phone.trim() || null,
        teacherSubject: subject.trim() || null,
      }));
      setRemoveAvatar(false);
      setPhotoName(null);
      notifications.info({
        title: copy.profile.unsavedTitle,
        message: copy.profile.unsavedMessage,
      });
      return;
    }
    setIsSaving(true);
    try {
      const updated = await updateTeacherProfile({
        avatarMediaObjectId: removeAvatar ? null : profileState.avatarMediaObjectId,
        branchName: profileState.branchName,
        displayName,
        phone: phone.trim() || null,
        preferredLanguage: profileState.preferredLanguage,
        teacherSubject: subject.trim() || null,
      });
      setProfileState((current) => ({
        ...current,
        avatarMediaObjectId: updated.avatarMediaObjectId ?? null,
        avatarUrl: removeAvatar ? null : current.avatarUrl,
        branchName: updated.branchName ?? null,
        displayName: updated.displayName,
        email: updated.email ?? null,
        initials: teacherInitials(updated.displayName),
        phone: updated.phone ?? null,
        preferredLanguage: updated.preferredLanguage,
        teacherSubject: updated.teacherSubject ?? null,
      }));
      setRemoveAvatar(false);
      setPhotoName(null);
      notifications.success({ title: copy.profile.profileInformation, message: messages.saved });
      router.refresh();
    } catch {
      notifications.error({ title: copy.profile.profileInformation, message: messages.saveError });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (
      !["image/png", "image/jpeg", "image/gif"].includes(file.type) ||
      file.size > 5 * 1024 * 1024
    ) {
      notifications.warning({ title: copy.profile.photoTitle, message: messages.photoInvalid });
      return;
    }
    setPhotoName(file.name);
    notifications.info({ title: copy.profile.photoTitle, message: copy.profile.photoMessage });
  };

  const handleRemovePhoto = () => {
    setPhotoName(null);
    if (profileState.avatarMediaObjectId || profileState.avatarUrl) setRemoveAvatar(true);
  };

  const handlePasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setActiveDialog(null);
    notifications.warning({
      title: copy.profile.passwordTitle,
      message: copy.profile.passwordMessage,
    });
  };

  const handleDelete = async () => {
    const accepted = await confirm({
      cancelLabel: copy.profile.deleteAccountCancel,
      confirmLabel: copy.profile.deleteAccountConfirm,
      message: copy.profile.deleteVerificationMessage,
      title: copy.profile.deleteVerificationTitle,
      tone: "danger",
    });
    if (accepted) {
      notifications.warning({
        title: copy.profile.deleteAccountTitle,
        message: copy.profile.deleteAccountMessage,
      });
    }
  };

  const handleLogout = async () => {
    const accepted = await confirm({
      cancelLabel: copy.profile.logoutCancel,
      confirmLabel: copy.profile.logoutConfirm,
      message: copy.profile.logoutVerificationMessage,
      title: copy.profile.logoutVerificationTitle,
      tone: "danger",
    });
    if (!accepted) return;
    const redirectTo = `/${locale}/login?role=teacher`;
    if (session.status === "authenticated") {
      await signOut({ redirectTo });
      return;
    }
    router.push(redirectTo);
  };

  return (
    <main className="teacherProfile__page">
      <form className="teacherProfile__account" onSubmit={handleInformationSubmit}>
        <header className="teacherProfile__accountHeader">
          <span>{copy.profile.eyebrow}</span>
          <h1>{messages.accountTitle}</h1>
        </header>

        <section className="teacherProfile__accountBody" aria-label={messages.accountTitle}>
          <div className="teacherProfile__photoRow">
            <span className="teacherProfile__avatar">
              {profileState.avatarUrl && !removeAvatar && !avatarFailed ? (
                <Image
                  alt={profileState.displayName}
                  fill
                  onError={() => setAvatarFailed(true)}
                  sizes="88px"
                  src={profileState.avatarUrl}
                  unoptimized
                />
              ) : (
                profileState.initials
              )}
            </span>
            <div className="teacherProfile__photoDetails">
              <strong>{messages.profilePicture}</strong>
              <div className="teacherProfile__photoActions">
                <button
                  className="teacherProfile__upload"
                  onClick={() => photoInputRef.current?.click()}
                  type="button"
                >
                  <CloudUploadOutlined aria-hidden="true" />
                  {messages.uploadImage}
                </button>
                <button
                  className="teacherProfile__remove"
                  disabled={
                    !photoName &&
                    (removeAvatar || (!profileState.avatarUrl && !profileState.avatarMediaObjectId))
                  }
                  onClick={handleRemovePhoto}
                  type="button"
                >
                  {messages.removeImage}
                </button>
              </div>
              <small>{messages.photoHint}</small>
              {photoName ? (
                <small className="teacherProfile__selectedFile">{photoName}</small>
              ) : null}
            </div>
          </div>

          <div className="teacherProfile__fieldGrid">
            <label>
              {copy.profile.displayName}
              <input
                autoComplete="given-name"
                maxLength={80}
                onChange={(event) => setFirstName(event.target.value)}
                required
                value={firstName}
              />
            </label>
            <label>
              {copy.profile.lastName}
              <input
                autoComplete="family-name"
                maxLength={80}
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
              />
            </label>
            <div className="teacherProfile__emailField">
              <label>
                {messages.email}
                <input
                  autoComplete="email"
                  readOnly
                  type="email"
                  value={profileState.email ?? ""}
                />
              </label>
              <button
                className="teacherProfile__remove"
                onClick={() =>
                  notifications.info({
                    title: messages.editEmail,
                    message: messages.editEmailUnavailable,
                  })
                }
                type="button"
              >
                {messages.editEmail}
              </button>
              <small>{messages.emailHelp}</small>
            </div>
            <label>
              {copy.profile.phone}
              <input
                autoComplete="tel"
                onChange={(event) => setPhone(event.target.value)}
                type="tel"
                value={phone}
              />
            </label>
            <label>
              {copy.profile.subject}
              <input onChange={(event) => setSubject(event.target.value)} value={subject} />
            </label>
          </div>
          {profileState.branchName ? (
            <p className="teacherProfile__accountMeta">
              {copy.profile.branch}: {profileState.branchName}
            </p>
          ) : null}
        </section>

        <footer className="teacherProfile__accountFooter">
          <button className="teacherProfile__remove" onClick={handleCancel} type="button">
            {copy.common.cancel}
          </button>
          <button className="teacherProfile__save" disabled={!isDirty || isSaving} type="submit">
            {connected ? messages.save : copy.common.savePreview}
          </button>
        </footer>
      </form>

      <section className="teacherProfile__section">
        <div>
          <h2>{messages.passwordTitle}</h2>
          <p>{messages.passwordHelp}</p>
        </div>
        <button
          className="teacherProfile__remove"
          onClick={() => setActiveDialog("password")}
          type="button"
        >
          {copy.profile.changePassword}
        </button>
      </section>

      <section className="teacherProfile__section teacherProfile__section--preferences">
        <div className="teacherProfile__sectionHeading">
          <h2>{copy.profile.preferences}</h2>
        </div>
        <div className="teacherProfile__settingRow">
          <LanguageRounded aria-hidden="true" />
          <div>
            <strong>{copy.profile.language}</strong>
            <small>{copy.profile.languageDescription}</small>
          </div>
          <button
            className="teacherProfile__remove"
            onClick={() => setActiveDialog("language")}
            type="button"
          >
            {locale.toUpperCase()}
          </button>
        </div>
        <div className="teacherProfile__settingRow">
          <DarkModeRounded aria-hidden="true" />
          <div>
            <strong>{copy.profile.nightMode}</strong>
            <small>{copy.profile.nightModeDescription}</small>
          </div>
          <Switch
            checked={teacherTheme.mode === "dark"}
            onChange={teacherTheme.toggleMode}
            slotProps={{ input: { "aria-label": copy.profile.nightMode } }}
          />
        </div>
        <div className="teacherProfile__settingRow">
          <ComputerRounded aria-hidden="true" />
          <div>
            <strong>{copy.profile.computerLogin}</strong>
            <small>{copy.profile.computerLoginDescription}</small>
          </div>
          <button
            className="teacherProfile__remove"
            onClick={() => setActiveDialog("qr")}
            type="button"
          >
            {messages.open}
          </button>
        </div>
      </section>

      <section className="teacherProfile__section teacherProfile__section--danger">
        <div className="teacherProfile__sectionHeading">
          <h2>{copy.profile.dangerZone}</h2>
        </div>
        <div className="teacherProfile__settingRow">
          <DeleteOutlineRounded aria-hidden="true" />
          <div>
            <strong>{copy.profile.deleteAccount}</strong>
            <small>{copy.profile.deleteAccountDescription}</small>
          </div>
          <button
            className="teacherProfile__remove"
            onClick={() => void handleDelete()}
            type="button"
          >
            {copy.profile.deleteAccount}
          </button>
        </div>
        <div className="teacherProfile__settingRow">
          <LogoutRounded aria-hidden="true" />
          <div>
            <strong>{copy.profile.logout}</strong>
            <small>{copy.profile.logoutDescription}</small>
          </div>
          <button
            className="teacherProfile__remove"
            onClick={() => void handleLogout()}
            type="button"
          >
            {copy.profile.logout}
          </button>
        </div>
      </section>

      <input
        accept=".png,.jpg,.jpeg,.gif"
        className="teacherProfile__fileInput"
        onChange={handlePhotoChange}
        ref={photoInputRef}
        type="file"
      />

      <Dialog
        fullWidth
        maxWidth="xs"
        onClose={() => setActiveDialog(null)}
        open={activeDialog === "password"}
      >
        <form onSubmit={handlePasswordSubmit}>
          <DialogTitle>{copy.profile.changePassword}</DialogTitle>
          <DialogContent className="teacherProfile__form">
            <label>
              {copy.profile.currentPassword}
              <input autoComplete="current-password" required type="password" />
            </label>
            <label>
              {copy.profile.newPassword}
              <input autoComplete="new-password" required type="password" />
            </label>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setActiveDialog(null)} variant="ghost">
              {copy.common.cancel}
            </Button>
            <Button type="submit" variant="primary">
              {copy.common.savePreview}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog maxWidth="xs" onClose={() => setActiveDialog(null)} open={activeDialog === "qr"}>
        <DialogTitle>{copy.profile.qrTitle}</DialogTitle>
        <DialogContent className="teacherProfile__dialogCenter">
          <span className="teacherProfile__qr">
            <QrCode2Rounded />
          </span>
          <p>{copy.profile.qrMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActiveDialog(null)} variant="primary">
            {copy.common.close}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="xs"
        onClose={() => setActiveDialog(null)}
        open={activeDialog === "language"}
      >
        <DialogTitle>{copy.profile.language}</DialogTitle>
        <DialogContent className="teacherProfile__languages">
          {locales.map((item) => (
            <button
              data-active={item === locale}
              key={item}
              onClick={() => localeSwitcher.handleLocaleSelect(item)}
              type="button"
            >
              {item.toUpperCase()}
            </button>
          ))}
        </DialogContent>
      </Dialog>
    </main>
  );
}
