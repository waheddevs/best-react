"use client";

import { useMutation } from "@apollo/client/react";
import PhotoCameraOutlined from "@mui/icons-material/PhotoCameraOutlined";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import { useRef, useState } from "react";
import type { Locale } from "@/config/Locales";
import { getAdminSettingsCopy } from "@/dictionaries/admin/AdminSettings";
import {
  AdminProfileUploadIntentDocument,
  AdminConfirmProfileUploadDocument,
  AdminProfileImageDownloadDocument,
  AdminUpdateProfileDocument,
  type AdminProfileQuery,
  type AdminUpdateProfileMutation,
} from "@/gql/graphql";
import { useAdminProfile } from "@/hooks/admin/useAdminProfile";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { AdminRecordAvatar } from "@/features/admin/workspace/AdminRecordAvatar";

type Props = {
  locale: Locale;
  profile: AdminProfileQuery["myProfile"];
  disabled: boolean;
  onBusy: (busy: boolean) => void;
  onSaved: (profile: AdminUpdateProfileMutation["updateMyProfile"]["profile"]) => void;
};

export function AdminProfileImageUpload({ locale, profile, disabled, onBusy, onSaved }: Props) {
  const copy = getAdminSettingsCopy(locale);
  const { avatarUrl, setAvatar } = useAdminProfile();
  const notifications = useNotifications();
  const fileInput = useRef<HTMLInputElement>(null);
  const working = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const context = { authenticated: true };
  const [createIntent] = useMutation(AdminProfileUploadIntentDocument, { context });
  const [confirmUpload] = useMutation(AdminConfirmProfileUploadDocument, { context });
  const [download] = useMutation(AdminProfileImageDownloadDocument, { context });
  const [updateProfile] = useMutation(AdminUpdateProfileDocument, { context });

  async function changeImage(file: File | null) {
    if (working.current || disabled) return;
    setError("");
    if (
      file &&
      (!["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
        file.size < 1 ||
        file.size > 5 * 1024 * 1024)
    ) {
      setError(copy.imageInvalid);
      return;
    }
    working.current = true;
    setBusy(true);
    onBusy(true);
    try {
      let avatar: { id: string; url: string } | null = null;
      if (file) {
        const result = await createIntent({
          variables: {
            input: {
              originalName: file.name,
              mimeType: file.type,
              sizeBytes: file.size,
            },
          },
        });
        const intent = result.data?.createMediaUploadIntent.uploadIntent;
        if (!intent) throw new Error("Missing upload intent");
        const response = await fetch(intent.url, {
          method: intent.method,
          headers: Object.fromEntries(
            intent.requiredHeaders.map(({ name, value }) => [name, value]),
          ),
          body: file,
        });
        if (!response.ok) throw new Error("Upload failed");
        const confirmed = await confirmUpload({
          variables: { input: { mediaObjectId: intent.mediaObjectId } },
        });
        const media = confirmed.data?.confirmMediaUpload.mediaObject;
        if (
          media?.mediaType !== "IMAGE" ||
          media.status !== "READY" ||
          media.malwareStatus !== "CLEAN"
        )
          throw new Error("Image verification failed");
        const image = await download({ variables: { input: { mediaObjectId: media.id } } });
        const url = image.data?.createMediaDownloadIntent.downloadIntent.url;
        if (!url) throw new Error("Missing image URL");
        avatar = { id: media.id, url };
      }
      const result = await updateProfile({
        variables: {
          input: {
            displayName: profile.displayName,
            email: profile.email,
            phone: profile.phone,
            preferredLanguage: profile.preferredLanguage,
            avatarMediaObjectId: avatar?.id ?? null,
          },
        },
      });
      const updated = result.data?.updateMyProfile.profile;
      if (!updated) throw new Error("Missing updated profile");
      setAvatar(avatar);
      onSaved(updated);
      notifications.success({ message: copy.imageSaved });
    } catch {
      setError(copy.imageError);
    } finally {
      working.current = false;
      setBusy(false);
      onBusy(false);
    }
  }

  return (
    <div className="adminSettingsPage__imageUpload" aria-busy={busy}>
      <div className="adminSettingsPage__avatarControl">
        <AdminRecordAvatar
          avatarUrl={avatarUrl}
          displayName={profile.displayName}
          className="adminSettings__avatar"
        />
        <button
          className="adminSettingsPage__camera"
          type="button"
          aria-label={copy.uploadImage}
          title={copy.uploadImage}
          aria-describedby="admin-avatar-help"
          disabled={busy || disabled}
          onClick={() => fileInput.current?.click()}
        >
          <PhotoCameraOutlined aria-hidden="true" />
        </button>
      </div>
      <div className="adminSettingsPage__profileName">
        <h2 id="admin-profile-title">{profile.displayName}</h2>
        <span className="adminSettingsPage__role">{copy.adminRole}</span>
      </div>
      <div className="adminSettingsPage__imageActions">
        {profile.avatarMediaObjectId && (
          <button type="button" disabled={busy || disabled} onClick={() => void changeImage(null)}>
            <DeleteOutlineRounded aria-hidden="true" />
            {copy.removeImage}
          </button>
        )}
      </div>
      <input
        ref={fileInput}
        hidden
        type="file"
        accept="image/jpeg,image/png,image/webp"
        aria-label={copy.profilePicture}
        disabled={busy || disabled}
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (file) void changeImage(file);
        }}
      />
      <p id="admin-avatar-help" role="status">
        {busy ? copy.imageUploading : copy.imageHelp}
      </p>
      {error && (
        <p className="adminSettingsPage__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
