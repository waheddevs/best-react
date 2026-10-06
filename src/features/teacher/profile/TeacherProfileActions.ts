"use server";

import { auth } from "@/Auth";
import {
  TeacherChangePasswordDocument,
  TeacherConfirmProfileUploadDocument,
  TeacherDeleteAccountDocument,
  TeacherProfileAvatarDownloadIntentDocument,
  TeacherProfileUploadIntentDocument,
  TeacherUpdateProfileDocument,
  type ChangeMyPasswordInput,
  type CreateMediaUploadIntentInput,
  type TeacherChangePasswordMutation,
  type TeacherConfirmProfileUploadMutation,
  type TeacherDeleteAccountMutation,
  type TeacherDeleteAccountMutationVariables,
  type TeacherProfileAvatarDownloadIntentMutation,
  type TeacherProfileUploadIntentMutation,
  type TeacherUpdateProfileMutation,
  type UpdateMyProfileInput,
} from "@/gql/graphql";
import { executeApolloMutation } from "@/lib/apollo/ApolloServerClient";

async function requireTeacherAccessToken(): Promise<string> {
  const session = await auth();
  if (session?.bestApi?.role !== "TEACHER" || !session.bestApi.accessToken) {
    throw new Error("Teacher session required");
  }
  return session.bestApi.accessToken;
}

export async function createTeacherAvatarUploadIntent(input: CreateMediaUploadIntentInput) {
  const accessToken = await requireTeacherAccessToken();
  const data = await executeApolloMutation<
    TeacherProfileUploadIntentMutation,
    { input: CreateMediaUploadIntentInput }
  >(TeacherProfileUploadIntentDocument, { input }, { accessToken, cache: "no-store" });
  return data.createMediaUploadIntent.uploadIntent;
}

export async function confirmTeacherAvatarUpload(mediaObjectId: string) {
  const accessToken = await requireTeacherAccessToken();
  const data = await executeApolloMutation<
    TeacherConfirmProfileUploadMutation,
    { input: { mediaObjectId: string } }
  >(
    TeacherConfirmProfileUploadDocument,
    { input: { mediaObjectId } },
    { accessToken, cache: "no-store" },
  );
  return data.confirmMediaUpload.mediaObject;
}

export async function updateTeacherProfile(input: UpdateMyProfileInput) {
  const accessToken = await requireTeacherAccessToken();
  const data = await executeApolloMutation<
    TeacherUpdateProfileMutation,
    { input: UpdateMyProfileInput }
  >(TeacherUpdateProfileDocument, { input }, { accessToken, cache: "no-store" });
  const profile = data.updateMyProfile.profile;
  if (!profile.avatarMediaObjectId) return { ...profile, avatarUrl: null };
  try {
    const avatar = await executeApolloMutation<
      TeacherProfileAvatarDownloadIntentMutation,
      { input: { mediaObjectId: string } }
    >(
      TeacherProfileAvatarDownloadIntentDocument,
      { input: { mediaObjectId: profile.avatarMediaObjectId } },
      { accessToken, cache: "no-store" },
    );
    return { ...profile, avatarUrl: avatar.createMediaDownloadIntent.downloadIntent.url };
  } catch {
    return { ...profile, avatarUrl: null };
  }
}

export async function changeTeacherPassword(input: ChangeMyPasswordInput) {
  const accessToken = await requireTeacherAccessToken();
  const data = await executeApolloMutation<
    TeacherChangePasswordMutation,
    { input: ChangeMyPasswordInput }
  >(TeacherChangePasswordDocument, { input }, { accessToken, cache: "no-store" });
  return data.changeMyPassword.changed;
}

export async function deleteTeacherAccount() {
  const accessToken = await requireTeacherAccessToken();
  const data = await executeApolloMutation<
    TeacherDeleteAccountMutation,
    TeacherDeleteAccountMutationVariables
  >(
    TeacherDeleteAccountDocument,
    {},
    { accessToken, cache: "no-store" },
  );
  return data.deleteMyAccount.deleted;
}
