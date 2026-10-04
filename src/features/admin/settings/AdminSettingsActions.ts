"use server";

import { auth } from "@/Auth";
import {
  AdminUpdateProfileDocument,
  type AdminUpdateProfileMutation,
  type UpdateMyProfileInput,
} from "@/gql/graphql";
import { executeApolloMutation } from "@/lib/apollo/ApolloServerClient";

export async function updateAdminProfile(input: UpdateMyProfileInput) {
  const session = await auth();
  if (session?.bestApi?.role !== "ADMIN" || !session.bestApi.accessToken) {
    throw new Error("Admin session required");
  }

  const data = await executeApolloMutation<
    AdminUpdateProfileMutation,
    { input: UpdateMyProfileInput }
  >(
    AdminUpdateProfileDocument,
    { input },
    { accessToken: session.bestApi.accessToken, cache: "no-store" },
  );
  return data.updateMyProfile.profile;
}
