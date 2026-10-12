"use client";

import { createContext, useContext } from "react";
import type { AdminProfileQuery } from "@/gql/graphql";

export type AdminAvatarSource = { id: string; url: string };

export const adminProfileContext = createContext<{
  profile: AdminProfileQuery["myProfile"] | undefined;
  avatarUrl: string | null;
  setAvatar: (avatar: AdminAvatarSource | null) => void;
} | null>(null);

export function useAdminProfile() {
  const context = useContext(adminProfileContext);
  if (!context) throw new Error("AdminProfileProvider is required");
  return context;
}
