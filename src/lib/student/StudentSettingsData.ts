import "server-only";

import { cache } from "react";

import { auth } from "@/Auth";
import {
  StudentProfileAvatarDownloadIntentDocument,
  StudentSettingsProfileDocument,
  type StudentProfileAvatarDownloadIntentMutation,
  type StudentSettingsProfileQuery,
} from "@/gql/graphql";
import { executeApolloMutation, executeApolloQuery } from "@/lib/apollo/ApolloServerClient";
import type { StudentAccountIdentity } from "@/types/student/StudentSettings";

export const loadStudentSettingsIdentity = cache(async (): Promise<StudentAccountIdentity> => {
  const session = await auth();
  if (session?.bestApi?.role !== "STUDENT" || !session.bestApi.accessToken) {
    throw new Error("Student session required");
  }

  const data = await executeApolloQuery<StudentSettingsProfileQuery, Record<string, never>>(
    StudentSettingsProfileDocument,
    {},
    { accessToken: session.bestApi.accessToken, cache: "no-store" },
  );
  const avatarMediaObjectId = data.myProfile.avatarMediaObjectId;
  let avatarUrl: string | null = null;
  if (avatarMediaObjectId) {
    try {
      const avatar = await executeApolloMutation<
        StudentProfileAvatarDownloadIntentMutation,
        { input: { mediaObjectId: string } }
      >(
        StudentProfileAvatarDownloadIntentDocument,
        { input: { mediaObjectId: avatarMediaObjectId } },
        { accessToken: session.bestApi.accessToken, cache: "no-store" },
      );
      avatarUrl = avatar.createMediaDownloadIntent.downloadIntent.url;
    } catch {
      // The name remains available if the saved image is no longer downloadable.
    }
  }
  return {
    avatarUrl,
    displayName: data.myProfile.displayName,
    email: data.myProfile.email ?? null,
  };
});
