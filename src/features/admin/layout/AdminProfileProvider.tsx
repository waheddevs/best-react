"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import { useEffect, useState, type ReactNode } from "react";
import { AdminProfileDocument, AdminProfileImageDownloadDocument } from "@/gql/graphql";
import { adminProfileContext, type AdminAvatarSource } from "@/hooks/admin/useAdminProfile";

export function AdminProfileProvider({ children }: { children: ReactNode }) {
  const { data } = useQuery(AdminProfileDocument, {
    context: { authenticated: true },
    ssr: false,
  });
  const [download] = useMutation(AdminProfileImageDownloadDocument, {
    context: { authenticated: true },
  });
  const [avatar, setAvatar] = useState<AdminAvatarSource | null>(null);
  const mediaId = data?.myProfile.avatarMediaObjectId;

  useEffect(() => {
    if (!mediaId || avatar?.id === mediaId) return;
    let active = true;
    void download({ variables: { input: { mediaObjectId: mediaId } } })
      .then((result) => {
        const url = result.data?.createMediaDownloadIntent.downloadIntent.url;
        if (active && url) setAvatar({ id: mediaId, url });
      })
      .catch(() => {
        // A missing or unavailable image retains the initials fallback.
      });
    return () => {
      active = false;
    };
  }, [mediaId, avatar?.id, download]);

  return (
    <adminProfileContext.Provider
      value={{
        profile: data?.myProfile,
        avatarUrl: mediaId && avatar?.id === mediaId ? avatar.url : null,
        setAvatar,
      }}
    >
      {children}
    </adminProfileContext.Provider>
  );
}
