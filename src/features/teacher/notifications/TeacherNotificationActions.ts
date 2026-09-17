"use server";

import { auth } from "@/Auth";
import {
  TeacherCompleteTaskDocument,
  TeacherMarkNotificationReadDocument,
  type TeacherCompleteTaskMutation,
  type TeacherMarkNotificationReadMutation,
} from "@/gql/graphql";
import { executeApolloMutation } from "@/lib/apollo/ApolloServerClient";
import { loadTeacherNoticeUpdates } from "@/lib/teacher/TeacherWorkspaceData";

async function teacherToken(): Promise<string> {
  const session = await auth();
  if (session?.bestApi?.role !== "TEACHER" || !session.bestApi.accessToken) {
    throw new Error("Teacher session required");
  }
  return session.bestApi.accessToken;
}

export async function refreshTeacherNotifications() {
  await teacherToken();
  return loadTeacherNoticeUpdates();
}

export async function markTeacherNotificationRead(notificationId: string) {
  const accessToken = await teacherToken();
  const data = await executeApolloMutation<
    TeacherMarkNotificationReadMutation,
    { input: { notificationId: string } }
  >(
    TeacherMarkNotificationReadDocument,
    { input: { notificationId } },
    { accessToken, cache: "no-store" },
  );
  return data.markNotificationRead.notification;
}

export async function completeConnectedTeacherTask(taskId: string) {
  const accessToken = await teacherToken();
  const data = await executeApolloMutation<
    TeacherCompleteTaskMutation,
    { input: { taskId: string } }
  >(TeacherCompleteTaskDocument, { input: { taskId } }, { accessToken, cache: "no-store" });
  return data.completeTeacherTask.task;
}
