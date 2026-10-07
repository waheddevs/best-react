"use client";

import CloudUploadOutlined from "@mui/icons-material/CloudUploadOutlined";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import type { Locale } from "@/config/Locales";
import type { StudentSettingsCopy } from "@/dictionaries/student/StudentSettings";
import { StudentProfileAvatar } from "@/features/student/layout/StudentProfileAvatar";
import {
  confirmStudentAvatarUpload,
  createStudentAvatarUploadIntent,
  updateStudentProfile,
} from "@/features/student/settings/StudentSettingsActions";
import { useNotifications } from "@/hooks/notifications/useNotifications";
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
  const notifications = useNotifications();
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const uploadedAvatarRef = useRef<{ file: File; mediaObjectId: string } | null>(null);
  const [profileState, setProfileState] = useState(profile);
  const [firstName, setFirstName] = useState(() => nameParts(profile.displayName).firstName);
  const [lastName, setLastName] = useState(() => nameParts(profile.displayName).lastName);
  const [email, setEmail] = useState(profile.email ?? "");
  const [phone, setPhone] = useState(profile.phone ?? "");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    return () => {
      if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    };
  }, [photoPreviewUrl]);

  const normalizedName = `${firstName.trim()} ${lastName.trim()}`;
  const firstValid = firstName.trim().length > 0 && firstName.trim().length <= 80;
  const lastValid = lastName.trim().length > 0 && lastName.trim().length <= 80;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const phoneValid = !phone.trim() || (phone.trim().length >= 7 && phone.trim().length <= 32);
  const dirty =
    normalizedName !== profileState.displayName ||
    email.trim().toLowerCase() !== (profileState.email ?? "") ||
    phone.trim() !== (profileState.phone ?? "") ||
    photoFile !== null ||
    removeAvatar;
  const avatarUrl = photoPreviewUrl ?? (removeAvatar ? null : profileState.avatarUrl);

  function handleCancel() {
    const current = nameParts(profileState.displayName);
    setFirstName(current.firstName);
    setLastName(current.lastName);
    setEmail(profileState.email ?? "");
    setPhone(profileState.phone ?? "");
    setPhotoFile(null);
    setPhotoPreviewUrl(null);
    setRemoveAvatar(false);
    setAttempted(false);
    uploadedAvatarRef.current = null;
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (
      !["image/png", "image/jpeg", "image/webp"].includes(file.type) ||
      file.size === 0 ||
      file.size > 5 * 1024 * 1024
    ) {
      notifications.warning({ title: copy.picture, message: copy.photoInvalid });
      return;
    }
    if (!connected) {
      notifications.info({ title: copy.picture, message: copy.previewNotice });
      return;
    }
    uploadedAvatarRef.current = null;
    setPhotoFile(file);
    setPhotoPreviewUrl(URL.createObjectURL(file));
    setRemoveAvatar(false);
  }

  function handleRemovePhoto() {
    setPhotoFile(null);
    setPhotoPreviewUrl(null);
    setRemoveAvatar(Boolean(profileState.avatarMediaObjectId));
    uploadedAvatarRef.current = null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    if (!firstValid || !lastValid || !emailValid || !phoneValid || !dirty || pending) return;
    if (!connected) {
      notifications.info({ title: copy.account, message: copy.previewNotice });
      return;
    }
    setPending(true);
    try {
      let avatarMediaObjectId = removeAvatar ? null : profileState.avatarMediaObjectId;
      if (photoFile) {
        try {
          let uploaded = uploadedAvatarRef.current;
          if (uploaded?.file !== photoFile) {
            const intent = await createStudentAvatarUploadIntent({
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
            const confirmed = await confirmStudentAvatarUpload(intent.mediaObjectId);
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
          notifications.error({ title: copy.picture, message: copy.photoUploadError });
          return;
        }
      }
      const updated = await updateStudentProfile({
        avatarMediaObjectId,
        displayName: normalizedName,
        email: email.trim().toLowerCase(),
        phone: phone.trim() || null,
      });
      setProfileState(updated);
      setFirstName(nameParts(updated.displayName).firstName);
      setLastName(nameParts(updated.displayName).lastName);
      setEmail(updated.email ?? "");
      setPhone(updated.phone ?? "");
      setPhotoFile(null);
      setPhotoPreviewUrl(null);
      setRemoveAvatar(false);
      setAttempted(false);
      uploadedAvatarRef.current = null;
      notifications.success({ title: copy.account, message: copy.saved });
      router.refresh();
    } catch {
      notifications.error({ title: copy.account, message: copy.saveError });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="studentSettings" noValidate onSubmit={(event) => void handleSubmit(event)}>
      <section aria-labelledby="student-settings-details" className="studentSettings__body">
        <h2 id="student-settings-details">{copy.details}</h2>
        <div className="studentSettings__pictureRow">
          <StudentProfileAvatar
            avatarUrl={avatarUrl}
            className="studentSettings__avatar"
            displayName={normalizedName}
            locale={locale}
            size={88}
          />
          <div>
            <div className="studentSettings__pictureActions">
              <Button
                className="studentSettings__save"
                disabled={pending}
                hoverEffect="jump"
                onClick={() => photoInputRef.current?.click()}
                shape="soft"
                size="small"
                startIcon={<CloudUploadOutlined />}
                type="button"
                variant="primary"
              >
                {copy.uploadPicture}
              </Button>
              <Button
                className="studentSettings__cancel"
                disabled={pending || (!photoFile && !profileState.avatarMediaObjectId)}
                onClick={handleRemovePhoto}
                shape="soft"
                size="small"
                type="button"
                variant="secondary"
              >
                {copy.removePicture}
              </Button>
            </div>
            <p>{connected ? copy.pictureHelp : copy.previewNotice}</p>
            {photoFile ? (
              <small className="studentSettings__selectedFile">{photoFile.name}</small>
            ) : null}
          </div>
        </div>

        <div className="studentSettings__nameGrid">
          <div className="studentSettings__field">
            <label htmlFor="student-first-name">{copy.firstName}</label>
            <input
              aria-invalid={attempted && !firstValid}
              autoComplete="given-name"
              disabled={pending}
              id="student-first-name"
              maxLength={80}
              onChange={(event) => setFirstName(event.target.value)}
              value={firstName}
            />
            {attempted && !firstValid ? (
              <small className="studentSettings__error">{copy.firstNameError}</small>
            ) : null}
          </div>
          <div className="studentSettings__field">
            <label htmlFor="student-last-name">{copy.lastName}</label>
            <input
              aria-invalid={attempted && !lastValid}
              autoComplete="family-name"
              disabled={pending}
              id="student-last-name"
              maxLength={80}
              onChange={(event) => setLastName(event.target.value)}
              value={lastName}
            />
            {attempted && !lastValid ? (
              <small className="studentSettings__error">{copy.lastNameError}</small>
            ) : null}
          </div>
          <div className="studentSettings__field">
            <label htmlFor="student-settings-email">{copy.email}</label>
            <input
              aria-invalid={attempted && !emailValid}
              autoComplete="email"
              disabled={pending}
              id="student-settings-email"
              maxLength={320}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              value={email}
            />
            {attempted && !emailValid ? (
              <small className="studentSettings__error">{copy.emailError}</small>
            ) : null}
          </div>
          <div className="studentSettings__field">
            <label htmlFor="student-settings-phone">{copy.phone}</label>
            <input
              aria-invalid={attempted && !phoneValid}
              autoComplete="tel"
              disabled={pending}
              id="student-settings-phone"
              maxLength={32}
              onChange={(event) => setPhone(event.target.value)}
              type="tel"
              value={phone}
            />
            {attempted && !phoneValid ? (
              <small className="studentSettings__error">{copy.phoneError}</small>
            ) : null}
          </div>
        </div>
      </section>

      <footer className="studentSettings__footer">
        <Button
          className="studentSettings__cancel"
          disabled={pending}
          onClick={handleCancel}
          shape="soft"
          size="small"
          type="button"
          variant="secondary"
        >
          {copy.cancel}
        </Button>
        <Button
          className="studentSettings__save"
          disabled={!dirty || pending}
          hoverEffect="jump"
          shape="soft"
          size="small"
          type="submit"
          variant="primary"
        >
          {pending ? copy.saving : copy.save}
        </Button>
      </footer>
      <input
        accept=".png,.jpg,.jpeg,.webp"
        className="studentSettings__fileInput"
        onChange={handlePhotoChange}
        ref={photoInputRef}
        type="file"
      />
    </form>
  );
}
