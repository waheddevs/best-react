"use server";

import { auth } from "@/Auth";
import {
  TeacherUpdateProfileDocument,
  type TeacherUpdateProfileMutation,
  type UpdateMyProfileInput,
} from "@/gql/graphql";
import { executeApolloMutation } from "@/lib/apollo/ApolloServerClient";

export async function updateTeacherProfile(input: UpdateMyProfileInput) {
  const session = await auth();
  if (session?.bestApi?.role !== "TEACHER" || !session.bestApi.accessToken) {
    throw new Error("Teacher session required");
  }
  const data = await executeApolloMutation<
    TeacherUpdateProfileMutation,
    { input: UpdateMyProfileInput }
  >(
    TeacherUpdateProfileDocument,
    { input },
    { accessToken: session.bestApi.accessToken, cache: "no-store" },
  );
  return data.updateMyProfile.profile;
}
