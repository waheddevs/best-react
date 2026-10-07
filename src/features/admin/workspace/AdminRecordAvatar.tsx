"use client";

import Image from "next/image";
import { useState } from "react";

type AdminRecordAvatarProps = {
  avatarUrl: string | null;
  className?: string;
  displayName: string;
};

export function AdminRecordAvatar({
  avatarUrl,
  className = "",
  displayName,
}: AdminRecordAvatarProps) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const initials = displayName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();

  return (
    <span aria-hidden="true" className={`adminWorkspace__avatar ${className}`.trim()}>
      {avatarUrl && avatarUrl !== failedUrl ? (
        <Image
          alt=""
          fill
          onError={() => setFailedUrl(avatarUrl)}
          sizes="48px"
          src={avatarUrl}
          unoptimized
        />
      ) : (
        initials
      )}
    </span>
  );
}
