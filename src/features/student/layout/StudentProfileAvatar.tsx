"use client";

import Image from "next/image";
import { useState } from "react";

import { getWorkspaceInitials } from "@/lib/WorkspaceIdentity";

type StudentProfileAvatarProps = {
  avatarUrl: string | null;
  className: string;
  displayName: string;
  locale: string;
  size: number;
};

export function StudentProfileAvatar({
  avatarUrl,
  className,
  displayName,
  locale,
  size,
}: StudentProfileAvatarProps) {
  const [failedAvatarUrl, setFailedAvatarUrl] = useState<string | null>(null);

  return (
    <span aria-hidden="true" className={className}>
      {avatarUrl && failedAvatarUrl !== avatarUrl ? (
        <Image
          alt=""
          fill
          onError={() => setFailedAvatarUrl(avatarUrl)}
          sizes={`${size}px`}
          src={avatarUrl}
          style={{ objectFit: "cover" }}
          unoptimized
        />
      ) : (
        getWorkspaceInitials(displayName, locale)
      )}
    </span>
  );
}
