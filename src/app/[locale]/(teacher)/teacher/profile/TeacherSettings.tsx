"use client";

import BadgeRounded from "@mui/icons-material/BadgeRounded";
import CameraAltRounded from "@mui/icons-material/CameraAltRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import ComputerRounded from "@mui/icons-material/ComputerRounded";
import DarkModeRounded from "@mui/icons-material/DarkModeRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import DevicesRounded from "@mui/icons-material/DevicesRounded";
import LanguageRounded from "@mui/icons-material/LanguageRounded";
import LockRounded from "@mui/icons-material/LockRounded";
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
import { TeacherPageHeader } from "@/features/teacher/layout/TeacherPageHeader";
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
type ProfileDialog = "information" | "password" | "qr" | "sessions" | "language" | null;

export function TeacherSettings({ connected, copy, locale, profile }: TeacherSettingsProps) {
  /* HOOKS */
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
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /* HANDLERS */
  const handleDialogOpen = (dialog: Exclude<ProfileDialog, null>) => {
    if (dialog === "information") {
      const name = splitTeacherDisplayName(profileState.displayName);
      setFirstName(name.firstName);
      setLastName(name.lastName);
      setPhone(profileState.phone ?? "");
      setSubject(profileState.teacherSubject ?? "");
    }
    setActiveDialog(dialog);
  };
  const handleDialogClose = () => {
    setActiveDialog(null);
    const name = splitTeacherDisplayName(profileState.displayName);
    setFirstName(name.firstName);
    setLastName(name.lastName);
    setPhone(profileState.phone ?? "");
    setSubject(profileState.teacherSubject ?? "");
  };

  const handleInformationSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!connected) {
      setActiveDialog(null);
      notifications.info({
        title: copy.profile.unsavedTitle,
        message: copy.profile.unsavedMessage,
      });
      return;
    }
    setIsSaving(true);
    try {
      const updated = await updateTeacherProfile({
        avatarMediaObjectId: profileState.avatarMediaObjectId,
        branchName: profileState.branchName,
        displayName: joinTeacherDisplayName(firstName, lastName),
        phone: phone.trim() || null,
        preferredLanguage: profileState.preferredLanguage,
        teacherSubject: subject.trim() || null,
      });
      setProfileState((current) => ({
        ...current,
        displayName: updated.displayName,
        email: updated.email ?? null,
        phone: updated.phone ?? null,
        teacherSubject: updated.teacherSubject ?? null,
        branchName: updated.branchName ?? null,
        preferredLanguage: updated.preferredLanguage,
        avatarMediaObjectId: updated.avatarMediaObjectId ?? null,
        initials: teacherInitials(updated.displayName),
      }));
      setActiveDialog(null);
      notifications.success({ title: copy.profile.profileInformation, message: messages.saved });
      router.refresh();
    } catch {
      notifications.error({ title: copy.profile.profileInformation, message: messages.saveError });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarError = () => setAvatarFailed(true);

  const handlePasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setActiveDialog(null);
    notifications.warning({
      title: copy.profile.passwordTitle,
      message: copy.profile.passwordMessage,
    });
  };

  const handlePhotoOpen = () => photoInputRef.current?.click();
  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file?.type.startsWith("image/") && file.size <= 5 * 1024 * 1024) setPhotoName(file.name);
    event.target.value = "";
    notifications.info({ title: copy.profile.photoTitle, message: copy.profile.photoMessage });
  };

  const handleDelete = async () => {
    const accepted = await confirm({
      cancelLabel: copy.profile.deleteAccountCancel,
      confirmLabel: copy.profile.deleteAccountConfirm,
      message: copy.profile.deleteVerificationMessage,
      title: copy.profile.deleteVerificationTitle,
      tone: "danger",
    });
    if (accepted)
      notifications.warning({
        title: copy.profile.deleteAccountTitle,
        message: copy.profile.deleteAccountMessage,
      });
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

  const handleSettingSelect = (settingId: Exclude<ProfileDialog, null>) => {
    handleDialogOpen(settingId);
  };

  const accountSettings = [
    {
      description: copy.profile.profileInformationDescription,
      icon: BadgeRounded,
      id: "information" as const,
      label: copy.profile.profileInformation,
    },
    {
      description: copy.profile.changePasswordDescription,
      icon: LockRounded,
      id: "password" as const,
      label: copy.profile.changePassword,
    },
  ];

  const accessSettings = [
    {
      description: copy.profile.computerLoginDescription,
      icon: ComputerRounded,
      id: "qr" as const,
      label: copy.profile.computerLogin,
    },
    {
      description: copy.profile.activeSessionsDescription,
      icon: DevicesRounded,
      id: "sessions" as const,
      label: copy.profile.activeSessions,
    },
  ];

  return (
    <main className="teacherProfile__page">
      <TeacherPageHeader eyebrow={copy.profile.eyebrow} title={copy.profile.pageTitle} />
      <div className="teacherProfile__layout">
        <aside className="teacherProfile__summary">
          <div className="teacherProfile__identity">
            <span className="teacherProfile__avatar">
              {profileState.avatarUrl && !avatarFailed ? (
                <Image
                  alt={profileState.displayName}
                  fill
                  onError={handleAvatarError}
                  sizes="84px"
                  src={profileState.avatarUrl}
                  unoptimized
                />
              ) : (
                profileState.initials
              )}
            </span>
            <div>
              <h2>{profileState.displayName}</h2>
              <p>
                {[copy.common.teacherRole, profileState.email, profileState.teacherSubject]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <small>
                {[profileState.phone, profileState.preferredLanguage, profileState.branchName]
                  .filter(Boolean)
                  .join(" · ")}
              </small>
            </div>
          </div>
          {photoName ? (
            <button
              className="teacherProfile__file"
              onClick={() => setPhotoName(null)}
              type="button"
            >
              {copy.common.reset}: {photoName}
            </button>
          ) : null}
          <div className="teacherProfile__summaryActions">
            <button
              className="teacherProfile__summaryAction"
              onClick={handlePhotoOpen}
              type="button"
            >
              <span className="teacherProfile__summaryActionIcon">
                <CameraAltRounded />
              </span>
              <span>
                <strong>{copy.profile.changePhoto}</strong>
                <small>{copy.profile.changePhotoDescription}</small>
              </span>
            </button>
            <button
              className="teacherProfile__summaryAction"
              data-danger="true"
              onClick={handleLogout}
              type="button"
            >
              <span className="teacherProfile__summaryActionIcon">
                <LogoutRounded />
              </span>
              <span>
                <strong>{copy.profile.logout}</strong>
                <small>{copy.profile.logoutDescription}</small>
              </span>
            </button>
          </div>
        </aside>

        <div className="teacherProfile__settings">
          <section className="teacherProfile__settingsGroup">
            <header className="teacherProfile__settingsGroupHeader">
              <h2>{copy.profile.accountSettings}</h2>
            </header>
            <div className="teacherProfile__settingsList">
              {accountSettings.map((setting) => {
                const SettingIcon = setting.icon;
                return (
                  <button
                    className="teacherProfile__setting"
                    key={setting.id}
                    onClick={() => handleSettingSelect(setting.id)}
                    type="button"
                  >
                    <span className="teacherProfile__settingIcon">
                      <SettingIcon />
                    </span>
                    <div>
                      <strong>{setting.label}</strong>
                      <small>{setting.description}</small>
                    </div>
                    <ChevronRightRounded />
                  </button>
                );
              })}
            </div>
          </section>

          <section className="teacherProfile__settingsGroup">
            <header className="teacherProfile__settingsGroupHeader">
              <h2>{copy.profile.accessSecurity}</h2>
            </header>
            <div className="teacherProfile__settingsList">
              {accessSettings.map((setting) => {
                const SettingIcon = setting.icon;
                return (
                  <button
                    className="teacherProfile__setting"
                    key={setting.id}
                    onClick={() => handleSettingSelect(setting.id)}
                    type="button"
                  >
                    <span className="teacherProfile__settingIcon">
                      <SettingIcon />
                    </span>
                    <div>
                      <strong>{setting.label}</strong>
                      <small>{setting.description}</small>
                    </div>
                    <ChevronRightRounded />
                  </button>
                );
              })}
            </div>
          </section>

          <section className="teacherProfile__settingsGroup">
            <header className="teacherProfile__settingsGroupHeader">
              <h2>{copy.profile.preferences}</h2>
            </header>
            <div className="teacherProfile__settingsList">
              <button
                className="teacherProfile__setting"
                onClick={() => handleSettingSelect("language")}
                type="button"
              >
                <span className="teacherProfile__settingIcon">
                  <LanguageRounded />
                </span>
                <div>
                  <strong>{copy.profile.language}</strong>
                  <small>{copy.profile.languageDescription}</small>
                </div>
                <ChevronRightRounded />
              </button>
              <div className="teacherProfile__setting">
                <span className="teacherProfile__settingIcon">
                  <DarkModeRounded />
                </span>
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
            </div>
          </section>

          <section className="teacherProfile__settingsGroup" data-danger="true">
            <header className="teacherProfile__settingsGroupHeader">
              <h2>{copy.profile.dangerZone}</h2>
            </header>
            <div className="teacherProfile__settingsList">
              <button
                className="teacherProfile__setting"
                data-danger="true"
                onClick={handleDelete}
                type="button"
              >
                <span className="teacherProfile__settingIcon">
                  <DeleteOutlineRounded />
                </span>
                <div>
                  <strong>{copy.profile.deleteAccount}</strong>
                  <small>{copy.profile.deleteAccountDescription}</small>
                </div>
                <ChevronRightRounded />
              </button>
            </div>
          </section>
        </div>
      </div>

      <input
        accept="image/*"
        className="teacherProfile__fileInput"
        onChange={handlePhotoChange}
        ref={photoInputRef}
        type="file"
      />

      <Dialog
        fullWidth
        maxWidth="sm"
        onClose={handleDialogClose}
        open={activeDialog === "information"}
      >
        <form onSubmit={handleInformationSubmit}>
          <DialogTitle>{copy.profile.profileInformation}</DialogTitle>
          <DialogContent className="teacherProfile__form">
            <label>
              {copy.profile.displayName}
              <input
                autoComplete="given-name"
                onChange={(event) => setFirstName(event.target.value)}
                required
                value={firstName}
              />
            </label>
            <label>
              {copy.profile.lastName}
              <input
                autoComplete="family-name"
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
              />
            </label>
            <label>
              {copy.profile.phone}
              <input onChange={(event) => setPhone(event.target.value)} type="tel" value={phone} />
            </label>
            <label>
              {copy.profile.subject}
              <input onChange={(event) => setSubject(event.target.value)} value={subject} />
            </label>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} variant="ghost">
              {copy.common.cancel}
            </Button>
            <Button disabled={isSaving} type="submit" variant="primary">
              {connected ? messages.save : copy.common.savePreview}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="xs"
        onClose={handleDialogClose}
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
            <Button onClick={handleDialogClose} variant="ghost">
              {copy.common.cancel}
            </Button>
            <Button type="submit" variant="primary">
              {copy.common.savePreview}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog maxWidth="xs" onClose={handleDialogClose} open={activeDialog === "qr"}>
        <DialogTitle>{copy.profile.qrTitle}</DialogTitle>
        <DialogContent className="teacherProfile__dialogCenter">
          <span className="teacherProfile__qr">
            <QrCode2Rounded />
          </span>
          <p>{copy.profile.qrMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} variant="primary">
            {copy.common.close}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="xs"
        onClose={handleDialogClose}
        open={activeDialog === "sessions"}
      >
        <DialogTitle>{copy.profile.activeSessions}</DialogTitle>
        <DialogContent>
          <div className="teacherProfile__session">
            <DevicesRounded />
            <div>
              <strong>{copy.profile.sessionDevice}</strong>
              <small>{copy.profile.sessionLocation}</small>
            </div>
          </div>
          <p className="teacherProfile__dialogCopy">{copy.profile.sessionPreview}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} variant="primary">
            {copy.common.close}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="xs"
        onClose={handleDialogClose}
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
