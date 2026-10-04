import "server-only";

import { auth } from "@/Auth";
import {
  StudentSettingsProfileDocument,
  type StudentSettingsProfileQuery,
} from "@/gql/graphql";
import { executeApolloQuery } from "@/lib/apollo/ApolloServerClient";
import type { StudentAccountIdentity } from "@/types/student/StudentSettings";

export async function loadStudentSettingsIdentity(): Promise<StudentAccountIdentity> {
  const session = await auth();
  if (session?.bestApi?.role !== "STUDENT" || !session.bestApi.accessToken) {
    throw new Error("Student session required");
  }

  const data = await executeApolloQuery<StudentSettingsProfileQuery, Record<string, never>>(
    StudentSettingsProfileDocument,
    {},
    { accessToken: session.bestApi.accessToken, cache: "no-store" },
  );
  return { displayName: data.myProfile.displayName, email: data.myProfile.email ?? null };
}
