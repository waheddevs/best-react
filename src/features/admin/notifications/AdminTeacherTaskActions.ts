"use server";

import { auth } from "@/Auth";
import {
  AdminAssignTeacherTaskDocument,
  type AdminAssignTeacherTaskMutation,
  type TeacherTaskKind,
} from "@/gql/graphql";
import { executePublicApi } from "@/lib/PublicApi";

export async function assignTeacherTask(input: {
  teacherId: string;
  requestId: string;
  title: string;
  kind: TeacherTaskKind;
  dueAt?: string | null;
}) {
  const session = await auth();
  if (session?.bestApi?.role !== "ADMIN" || !session.bestApi.accessToken) {
    throw new Error("Admin session required");
  }
  const data = await executePublicApi<
    AdminAssignTeacherTaskMutation,
    { input: typeof input }
  >(
    AdminAssignTeacherTaskDocument,
    { input },
    { accessToken: session.bestApi.accessToken, cache: "no-store" },
  );
  return data.adminAssignTeacherTask.task;
}
