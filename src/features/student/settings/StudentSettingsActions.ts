"use server";

import { auth } from "@/Auth";
import {
  StudentChangePasswordDocument,
  StudentConfirmProfileUploadDocument,
  StudentProfileAvatarDownloadIntentDocument,
  StudentProfileUploadIntentDocument,
  StudentSettingsProfileDocument,
  StudentUpdateSettingsProfileDocument,
  type ChangeMyPasswordInput,
  type CreateMediaUploadIntentInput,
  type StudentChangePasswordMutation,
  type StudentConfirmProfileUploadMutation,
  type StudentProfileAvatarDownloadIntentMutation,
  type StudentProfileUploadIntentMutation,
  type StudentSettingsProfileQuery,
  type StudentUpdateSettingsProfileMutation,
  type UpdateMyProfileInput,
} from "@/gql/graphql";
import { executeApolloMutation, executeApolloQuery } from "@/lib/apollo/ApolloServerClient";
import type { StudentAccountIdentity } from "@/types/student/StudentSettings";

async function studentAccessToken(): Promise<string> {
  const session = await auth();
  if (session?.bestApi?.role !== "STUDENT" || !session.bestApi.accessToken) {
    throw new Error("Student session required");
  }
  return session.bestApi.accessToken;
}

export async function createStudentAvatarUploadIntent(input: CreateMediaUploadIntentInput) {
  const accessToken = await studentAccessToken();
  const data = await executeApolloMutation<
    StudentProfileUploadIntentMutation,
    { input: CreateMediaUploadIntentInput }
  >(StudentProfileUploadIntentDocument, { input }, { accessToken, cache: "no-store" });
  return data.createMediaUploadIntent.uploadIntent;
}

export async function confirmStudentAvatarUpload(mediaObjectId: string) {
  const accessToken = await studentAccessToken();
  const data = await executeApolloMutation<
    StudentConfirmProfileUploadMutation,
    { input: { mediaObjectId: string } }
  >(
    StudentConfirmProfileUploadDocument,
    { input: { mediaObjectId } },
    { accessToken, cache: "no-store" },
  );
  return data.confirmMediaUpload.mediaObject;
}

type StudentProfileUpdate = Pick<
  UpdateMyProfileInput,
  "avatarMediaObjectId" | "displayName" | "email" | "phone"
>;

export async function updateStudentProfile(
  input: StudentProfileUpdate,
): Promise<StudentAccountIdentity> {
  const accessToken = await studentAccessToken();
  const current = await executeApolloQuery<StudentSettingsProfileQuery, Record<string, never>>(
    StudentSettingsProfileDocument,
    {},
    { accessToken, cache: "no-store" },
  );
  const data = await executeApolloMutation<
    StudentUpdateSettingsProfileMutation,
    { input: UpdateMyProfileInput }
  >(
    StudentUpdateSettingsProfileDocument,
    { input: { ...input, preferredLanguage: current.myProfile.preferredLanguage } },
    { accessToken, cache: "no-store" },
  );
  const updated = data.updateMyProfile.profile;
  let avatarUrl: string | null = null;
  if (updated.avatarMediaObjectId) {
    try {
      const avatar = await executeApolloMutation<
        StudentProfileAvatarDownloadIntentMutation,
        { input: { mediaObjectId: string } }
      >(
        StudentProfileAvatarDownloadIntentDocument,
        { input: { mediaObjectId: updated.avatarMediaObjectId } },
        { accessToken, cache: "no-store" },
      );
      avatarUrl = avatar.createMediaDownloadIntent.downloadIntent.url;
    } catch {
      // The saved profile still succeeds if its image URL cannot be issued immediately.
    }
  }
  return {
    avatarMediaObjectId: updated.avatarMediaObjectId ?? null,
    avatarUrl,
    displayName: updated.displayName,
    email: updated.email ?? null,
    phone: updated.phone ?? null,
  };
}

export async function changeStudentPassword(input: ChangeMyPasswordInput): Promise<boolean> {
  const accessToken = await studentAccessToken();
  const data = await executeApolloMutation<
    StudentChangePasswordMutation,
    { input: ChangeMyPasswordInput }
  >(StudentChangePasswordDocument, { input }, { accessToken, cache: "no-store" });
  return data.changeMyPassword.changed;
}
