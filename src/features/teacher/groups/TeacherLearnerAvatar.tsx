"use client";

import Image from "next/image";
import { useState } from "react";

type TeacherLearnerAvatarProps = {
  avatarUrl?: string | null;
  className: string;
  initials: string;
};

export function TeacherLearnerAvatar({
  avatarUrl,
  className,
  initials,
}: TeacherLearnerAvatarProps) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  return (
    <span aria-hidden="true" className={className}>
      {avatarUrl && failedUrl !== avatarUrl ? (
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
