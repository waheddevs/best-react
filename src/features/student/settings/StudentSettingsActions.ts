"use server";

import { auth } from "@/Auth";
import {
  StudentSettingsProfileDocument,
  StudentUpdateSettingsProfileDocument,
  type StudentSettingsProfileQuery,
  type StudentUpdateSettingsProfileMutation,
  type UpdateMyProfileInput,
} from "@/gql/graphql";
import { executeApolloMutation, executeApolloQuery } from "@/lib/apollo/ApolloServerClient";

type SaveStudentNameResult = { ok: true; displayName: string } | { ok: false };

export async function saveStudentName(firstName: string, lastName: string): Promise<SaveStudentNameResult> {
  if (typeof firstName !== "string" || typeof lastName !== "string") return { ok: false };
  const first = firstName.trim().replace(/\s+/g, " ");
  const last = lastName.trim().replace(/\s+/g, " ");
  if (!first || first.length > 80 || !last || last.length > 80) return { ok: false };

  const session = await auth();
  if (session?.bestApi?.role !== "STUDENT" || !session.bestApi.accessToken) {
    return { ok: false };
  }

  try {
    const accessToken = session.bestApi.accessToken;
    const current = await executeApolloQuery<StudentSettingsProfileQuery, Record<string, never>>(
      StudentSettingsProfileDocument,
      {},
      { accessToken, cache: "no-store" },
    );
    const input: UpdateMyProfileInput = {
      avatarMediaObjectId: current.myProfile.avatarMediaObjectId ?? null,
      displayName: `${first} ${last}`,
      phone: current.myProfile.phone ?? null,
      preferredLanguage: current.myProfile.preferredLanguage,
    };
    const data = await executeApolloMutation<
      StudentUpdateSettingsProfileMutation,
      { input: UpdateMyProfileInput }
    >(
      StudentUpdateSettingsProfileDocument,
      { input },
      { accessToken, cache: "no-store" },
    );
    return { ok: true, displayName: data.updateMyProfile.profile.displayName };
  } catch {
    return { ok: false };
  }
}
