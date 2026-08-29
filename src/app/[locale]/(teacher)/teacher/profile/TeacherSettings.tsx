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
import { useRouter } from "next/navigation";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import type { Locale } from "@/config/Locales";
import { locales } from "@/config/Locales";
import styles from "@/css/teacher/profile.module.css";
import { TeacherPageHeader } from "@/features/teacher/layout/TeacherPageHeader";
import { useLocaleSwitcher } from "@/hooks/navigation/useLocaleSwitcher";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { useTeacherTheme } from "@/hooks/teacher/useTeacherTheme";
import type { TeacherCopy, TeacherProfileData } from "@/types/teacher/Teacher";

type TeacherSettingsProps = { copy: TeacherCopy; locale: Locale; profile: TeacherProfileData };
type ProfileDialog = "information" | "password" | "qr" | "sessions" | "language" | null;

export function TeacherSettings({ copy, locale, profile }: TeacherSettingsProps) {
  /* HOOKS */
  const router = useRouter();
  const session = useSession();
  const notifications = useNotifications();
  const confirm = useConfirmDialog();
  const localeSwitcher = useLocaleSwitcher();
  const teacherTheme = useTeacherTheme();
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const [activeDialog, setActiveDialog] = useState<ProfileDialog>(null);
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [phone, setPhone] = useState(profile.phone);
  const [subject, setSubject] = useState(profile.subject[locale]);
  const [photoName, setPhotoName] = useState<string | null>(null);

  /* HANDLERS */
  const handleDialogOpen = (dialog: Exclude<ProfileDialog, null>) => setActiveDialog(dialog);
  const handleDialogClose = () => setActiveDialog(null);

  const handleInformationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setActiveDialog(null);
    notifications.info({ title: copy.profile.unsavedTitle, message: copy.profile.unsavedMessage });
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
      message: copy.profile.deleteAccountMessage,
      title: copy.profile.deleteAccountTitle,
      tone: "danger",
    });
    if (accepted)
      notifications.warning({
        title: copy.profile.deleteAccountTitle,
        message: copy.profile.deleteAccountMessage,
      });
  };

  const handleLogout = async () => {
    const redirectTo = `/${locale}/login?role=teacher`;
    if (session.status === "authenticated") {
      await signOut({ redirectTo });
      return;
    }
    router.push(redirectTo);
  };

  const handleSettingSelect = (
    settingId: "information" | "password" | "qr" | "photo" | "sessions" | "language",
  ) => {
    if (settingId === "photo") {
      handlePhotoOpen();
      return;
    }
    handleDialogOpen(settingId);
  };

  const settings = [
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
    {
      description: copy.profile.computerLoginDescription,
      icon: ComputerRounded,
      id: "qr" as const,
      label: copy.profile.computerLogin,
    },
    {
      description: copy.profile.changePhotoDescription,
      icon: CameraAltRounded,
      id: "photo" as const,
      label: copy.profile.changePhoto,
    },
    {
      description: copy.profile.activeSessionsDescription,
      icon: DevicesRounded,
      id: "sessions" as const,
      label: copy.profile.activeSessions,
    },
    {
      description: copy.profile.languageDescription,
      icon: LanguageRounded,
      id: "language" as const,
      label: copy.profile.language,
    },
  ];

  return (
    <main>
      <TeacherPageHeader
        description={copy.profile.description}
        eyebrow={copy.profile.eyebrow}
        title={copy.profile.pageTitle}
      />
      <section className={styles.teacherProfile__identity}>
        <span className={styles.teacherProfile__avatar}>{profile.initials}</span>
        <div>
          <h2>{displayName}</h2>
          <p>
            {copy.common.teacherRole} · {profile.handle} · {subject}
          </p>
          <small>
            {phone} · {locale.toUpperCase()} · {profile.branch[locale]}
          </small>
        </div>
        {photoName ? (
          <button
            className={styles.teacherProfile__file}
            onClick={() => setPhotoName(null)}
            type="button"
          >
            {copy.common.reset}: {photoName}
          </button>
        ) : null}
      </section>

      <section className={styles.teacherProfile__settings}>
        {settings.map((setting) => {
          const SettingIcon = setting.icon;
          return (
            <button
              className={styles.teacherProfile__setting}
              key={setting.label}
              onClick={() => handleSettingSelect(setting.id)}
              type="button"
            >
              <span>
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
        <div className={styles.teacherProfile__setting}>
          <span>
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
        <button
          className={styles.teacherProfile__setting}
          data-danger="true"
          onClick={handleDelete}
          type="button"
        >
          <span>
            <DeleteOutlineRounded />
          </span>
          <div>
            <strong>{copy.profile.deleteAccount}</strong>
            <small>{copy.profile.deleteAccountDescription}</small>
          </div>
          <ChevronRightRounded />
        </button>
        <button
          className={styles.teacherProfile__setting}
          data-danger="true"
          onClick={handleLogout}
          type="button"
        >
          <span>
            <LogoutRounded />
          </span>
          <div>
            <strong>{copy.profile.logout}</strong>
            <small>{copy.profile.logoutDescription}</small>
          </div>
          <ChevronRightRounded />
        </button>
      </section>

      <input
        accept="image/*"
        className={styles.teacherProfile__fileInput}
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
          <DialogContent className={styles.teacherProfile__form}>
            <label>
              {copy.profile.displayName}
              <input
                onChange={(event) => setDisplayName(event.target.value)}
                required
                value={displayName}
              />
            </label>
            <label>
              {copy.profile.phone}
              <input onChange={(event) => setPhone(event.target.value)} required value={phone} />
            </label>
            <label>
              {copy.profile.subject}
              <input
                onChange={(event) => setSubject(event.target.value)}
                required
                value={subject}
              />
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

      <Dialog
        fullWidth
        maxWidth="xs"
        onClose={handleDialogClose}
        open={activeDialog === "password"}
      >
        <form onSubmit={handlePasswordSubmit}>
          <DialogTitle>{copy.profile.changePassword}</DialogTitle>
          <DialogContent className={styles.teacherProfile__form}>
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
        <DialogContent className={styles.teacherProfile__dialogCenter}>
          <span className={styles.teacherProfile__qr}>
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
          <div className={styles.teacherProfile__session}>
            <DevicesRounded />
            <div>
              <strong>{copy.profile.sessionDevice}</strong>
              <small>{copy.profile.sessionLocation}</small>
            </div>
          </div>
          <p className={styles.teacherProfile__dialogCopy}>{copy.profile.sessionPreview}</p>
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
        <DialogContent className={styles.teacherProfile__languages}>
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
