"use client";

import CloudUploadOutlined from "@mui/icons-material/CloudUploadOutlined";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import type { Locale } from "@/config/Locales";
import { getTeacherProfileMessages } from "@/dictionaries/teacher/TeacherProfileMessages";
import { TeacherPageHeader } from "@/features/teacher/layout/TeacherPageHeader";
import {
  changeTeacherPassword,
  confirmTeacherAvatarUpload,
  createTeacherAvatarUploadIntent,
  deleteTeacherAccount,
  updateTeacherProfile,
} from "@/features/teacher/profile/TeacherProfileActions";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { useNotifications } from "@/hooks/notifications/useNotifications";
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
export function TeacherSettings({ connected, copy, locale, profile }: TeacherSettingsProps) {
  const router = useRouter();
  const notifications = useNotifications();
  const confirm = useConfirmDialog();
  const messages = getTeacherProfileMessages(locale);
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const uploadedAvatarRef = useRef<{ file: File; mediaObjectId: string } | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [profileState, setProfileState] = useState(profile);
  const [firstName, setFirstName] = useState(
    () => splitTeacherDisplayName(profile.displayName).firstName,
  );
  const [lastName, setLastName] = useState(
    () => splitTeacherDisplayName(profile.displayName).lastName,
  );
  const [email, setEmail] = useState(profile.email ?? "");
  const [phone, setPhone] = useState(profile.phone ?? "");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);
  const [failedAvatarUrl, setFailedAvatarUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    return () => {
      if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    };
  }, [photoPreviewUrl]);

  const currentName = splitTeacherDisplayName(profileState.displayName);
  const isDirty =
    joinTeacherDisplayName(firstName, lastName) !== profileState.displayName ||
    email.trim().toLowerCase() !== (profileState.email ?? "") ||
    phone.trim() !== (profileState.phone ?? "") ||
    photoFile !== null ||
    removeAvatar;
  const avatarUrl = photoPreviewUrl ?? profileState.avatarUrl;

  const handleCancel = () => {
    setFirstName(currentName.firstName);
    setLastName(currentName.lastName);
    setEmail(profileState.email ?? "");
    setPhone(profileState.phone ?? "");
    setPhotoFile(null);
    setPhotoName(null);
    setPhotoPreviewUrl(null);
    setRemoveAvatar(false);
    uploadedAvatarRef.current = null;
  };

  const handleInformationSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSaving || !isDirty) return;
    const displayName = joinTeacherDisplayName(firstName, lastName);
    if (!connected) {
      setProfileState((current) => ({
        ...current,
        avatarMediaObjectId: removeAvatar ? null : current.avatarMediaObjectId,
        avatarUrl: removeAvatar ? null : current.avatarUrl,
        displayName,
        email: email.trim().toLowerCase(),
        initials: teacherInitials(displayName),
        phone: phone.trim() || null,
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
      let avatarMediaObjectId = removeAvatar ? null : profileState.avatarMediaObjectId;
      if (photoFile) {
        try {
          let uploaded = uploadedAvatarRef.current;
          if (uploaded?.file !== photoFile) {
            const intent = await createTeacherAvatarUploadIntent({
              mimeType: photoFile.type,
              originalName: photoFile.name,
              sizeBytes: photoFile.size,
            });
            const response = await fetch(intent.url, {
              body: photoFile,
              headers: new Headers(
                intent.requiredHeaders.map(({ name, value }): [string, string] => [name, value]),
              ),
              method: intent.method,
            });
            if (!response.ok) throw new Error("Avatar upload failed");
            const confirmed = await confirmTeacherAvatarUpload(intent.mediaObjectId);
            if (
              confirmed.mediaType !== "IMAGE" ||
              confirmed.status !== "READY" ||
              confirmed.malwareStatus !== "CLEAN"
            ) {
              throw new Error("Avatar is not ready");
            }
            uploaded = { file: photoFile, mediaObjectId: confirmed.id };
            uploadedAvatarRef.current = uploaded;
          }
          avatarMediaObjectId = uploaded.mediaObjectId;
        } catch {
          notifications.error({
            title: copy.profile.photoTitle,
            message: messages.photoUploadError,
          });
          return;
        }
      }
      const updated = await updateTeacherProfile({
        avatarMediaObjectId,
        branchName: profileState.branchName,
        displayName,
        email: email.trim().toLowerCase(),
        phone: phone.trim() || null,
        preferredLanguage: profileState.preferredLanguage,
        teacherSubject: profileState.teacherSubject,
      });
      setProfileState((current) => ({
        ...current,
        avatarMediaObjectId: updated.avatarMediaObjectId ?? null,
        avatarUrl:
          updated.avatarUrl ??
          (updated.avatarMediaObjectId === current.avatarMediaObjectId ? current.avatarUrl : null),
        branchName: updated.branchName ?? null,
        displayName: updated.displayName,
        email: updated.email ?? null,
        initials: teacherInitials(updated.displayName),
        phone: updated.phone ?? null,
        preferredLanguage: updated.preferredLanguage,
        teacherSubject: updated.teacherSubject ?? null,
      }));
      setPhotoFile(null);
      setEmail(updated.email ?? "");
      setPhotoPreviewUrl(null);
      setRemoveAvatar(false);
      setPhotoName(null);
      uploadedAvatarRef.current = null;
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
      !["image/png", "image/jpeg", "image/webp"].includes(file.type) ||
      file.size === 0 ||
      file.size > 5 * 1024 * 1024
    ) {
      setPhotoFile(null);
      setPhotoName(null);
      setPhotoPreviewUrl(null);
      uploadedAvatarRef.current = null;
      notifications.warning({ title: copy.profile.photoTitle, message: messages.photoInvalid });
      return;
    }
    setPhotoName(file.name);
    setRemoveAvatar(false);
    if (!connected) {
      notifications.info({ title: copy.profile.photoTitle, message: copy.profile.photoMessage });
      return;
    }
    uploadedAvatarRef.current = null;
    setPhotoFile(file);
    setPhotoPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreviewUrl(null);
    setPhotoName(null);
    setRemoveAvatar(Boolean(profileState.avatarMediaObjectId || profileState.avatarUrl));
    uploadedAvatarRef.current = null;
  };

  const handlePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isChangingPassword) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const currentPassword = String(values.get("currentPassword") ?? "");
    const newPassword = String(values.get("newPassword") ?? "");
    const confirmPassword = String(values.get("confirmPassword") ?? "");
    if (newPassword !== confirmPassword) {
      notifications.error({
        title: messages.changePasswordTitle,
        message: messages.passwordMismatch,
      });
      return;
    }
    if (!connected) {
      notifications.warning({
        title: messages.changePasswordTitle,
        message: messages.passwordUnavailable,
      });
      return;
    }
    setIsChangingPassword(true);
    try {
      const changed = await changeTeacherPassword({
        confirmPassword,
        currentPassword,
        newPassword,
      });
      if (!changed) throw new Error("Password was not changed");
      form.reset();
      notifications.success({
        title: messages.changePasswordTitle,
        message: messages.passwordChanged,
      });
    } catch {
      notifications.error({ title: messages.changePasswordTitle, message: messages.passwordError });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    const accepted = await confirm({
      cancelLabel: copy.profile.deleteAccountCancel,
      confirmLabel: copy.profile.deleteAccountConfirm,
      message: connected
        ? copy.profile.deleteVerificationMessage
        : messages.deletePreviewConfirmation,
      title: copy.profile.deleteAccount,
      tone: "danger",
    });
    if (!accepted) return;
    if (!connected) {
      notifications.warning({
        title: copy.profile.deleteAccountTitle,
        message: messages.deleteUnavailable,
      });
      return;
    }
    setIsDeleting(true);
    try {
      const deleted = await deleteTeacherAccount();
      if (!deleted) throw new Error("Account was not deleted");
    } catch {
      notifications.error({
        title: copy.profile.deleteAccountTitle,
        message: messages.deleteError,
      });
      setIsDeleting(false);
      return;
    }
    notifications.success({
      title: copy.profile.deleteAccountTitle,
      message: copy.profile.deleteAccountMessage,
    });
    const redirectTo = `/${locale}/login?role=teacher`;
    try {
      await signOut({ redirectTo });
    } catch {
      router.replace(redirectTo);
    }
  };

  return (
    <main className="teacherProfile__page">
      <TeacherPageHeader eyebrow={copy.profile.eyebrow} title={messages.accountTitle} />

      <form className="teacherProfile__account" onSubmit={handleInformationSubmit}>
        <section className="teacherProfile__accountBody" aria-label={messages.accountTitle}>
          <div className="teacherProfile__photoRow">
            <span className="teacherProfile__avatar">
              {avatarUrl && !removeAvatar && failedAvatarUrl !== avatarUrl ? (
                <Image
                  alt={profileState.displayName}
                  fill
                  onError={() => setFailedAvatarUrl(avatarUrl)}
                  sizes="88px"
                  src={avatarUrl}
                  unoptimized
                />
              ) : (
                profileState.initials
              )}
            </span>
            <div className="teacherProfile__photoDetails">
              <strong>{messages.profilePicture}</strong>
              <div className="teacherProfile__photoActions">
                <Button
                  disabled={isSaving}
                  hoverEffect="jump"
                  onClick={() => photoInputRef.current?.click()}
                  shape="soft"
                  size="small"
                  startIcon={<CloudUploadOutlined />}
                  type="button"
                  variant="primary"
                >
                  {messages.uploadImage}
                </Button>
                <Button
                  disabled={
                    isSaving ||
                    (!photoName &&
                      (removeAvatar ||
                        (!profileState.avatarUrl && !profileState.avatarMediaObjectId)))
                  }
                  onClick={handleRemovePhoto}
                  shape="soft"
                  size="small"
                  type="button"
                  variant="secondary"
                >
                  {messages.removeImage}
                </Button>
              </div>
              <small>{connected ? messages.photoHint : copy.profile.photoMessage}</small>
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
            <label>
              {messages.email}
              <input
                autoComplete="email"
                maxLength={320}
                onChange={(event) => setEmail(event.target.value)}
                required
                type="email"
                value={email}
              />
            </label>
            <label>
              {copy.profile.phone}
              <input
                autoComplete="tel"
                onChange={(event) => setPhone(event.target.value)}
                type="tel"
                value={phone}
              />
            </label>
          </div>
          {profileState.branchName ? (
            <p className="teacherProfile__accountMeta">
              {copy.profile.branch}: {profileState.branchName}
            </p>
          ) : null}
        </section>

        <footer className="teacherProfile__accountFooter">
          <Button
            disabled={isSaving}
            onClick={handleCancel}
            shape="soft"
            size="small"
            type="button"
            variant="secondary"
          >
            {copy.common.cancel}
          </Button>
          <Button
            disabled={!isDirty || isSaving}
            hoverEffect="jump"
            shape="soft"
            size="small"
            type="submit"
            variant="primary"
          >
            {isSaving ? messages.saving : connected ? messages.save : copy.common.savePreview}
          </Button>
        </footer>
      </form>

      <section className="teacherProfile__section teacherProfile__section--password">
        <h2>{messages.passwordTitle}</h2>
        <form aria-busy={isChangingPassword} onSubmit={handlePasswordSubmit}>
          <div className="teacherProfile__passwordFields">
            <label>
              {messages.currentPassword}
              <input
                autoComplete="current-password"
                name="currentPassword"
                required
                type="password"
              />
            </label>
            <label>
              {copy.profile.newPassword}
              <input
                autoComplete="new-password"
                minLength={12}
                name="newPassword"
                required
                type="password"
              />
            </label>
            <label>
              {messages.confirmPassword}
              <input
                autoComplete="new-password"
                minLength={12}
                name="confirmPassword"
                required
                type="password"
              />
            </label>
          </div>
          <div className="teacherProfile__passwordActions">
            <Button
              disabled={isChangingPassword}
              hoverEffect="jump"
              shape="soft"
              size="small"
              type="submit"
              variant="primary"
            >
              {isChangingPassword ? messages.changingPassword : copy.profile.changePassword}
            </Button>
          </div>
        </form>
      </section>

      <section className="teacherProfile__section teacherProfile__section--danger">
        <div className="teacherProfile__sectionHeading">
          <h2>{copy.profile.dangerZone}</h2>
        </div>
        <div className="teacherProfile__settingRow">
          <DeleteOutlineRounded aria-hidden="true" />
          <div>
            <strong>{copy.profile.deleteAccount}</strong>
            <small>
              {connected ? copy.profile.deleteAccountDescription : messages.deleteUnavailable}
            </small>
          </div>
          <Button
            className="teacherProfile__deleteButton"
            disabled={isDeleting}
            onClick={() => void handleDelete()}
            shape="soft"
            size="small"
            type="button"
            variant="ghost"
          >
            {copy.profile.deleteAccount}
          </Button>
        </div>
      </section>

      <input
        accept=".png,.jpg,.jpeg,.webp"
        className="teacherProfile__fileInput"
        onChange={handlePhotoChange}
        ref={photoInputRef}
        type="file"
      />
    </main>
  );
}
