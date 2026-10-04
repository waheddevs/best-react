"use server";

import { auth } from "@/Auth";
import {
  WorkspaceMarkAllNotificationsReadDocument,
  WorkspaceMarkNotificationReadDocument,
  WorkspaceNotificationFeedDocument,
  type WorkspaceMarkAllNotificationsReadMutation,
  type WorkspaceMarkNotificationReadMutation,
  type WorkspaceNotificationFeedQuery,
} from "@/gql/graphql";
import { executeApolloMutation, executeApolloQuery } from "@/lib/apollo/ApolloServerClient";
import type { WorkspaceNoticePage, WorkspaceRole } from "@/types/WorkspaceNotification";

async function roleToken(role: WorkspaceRole): Promise<string> {
  const session = await auth();
  if (session?.bestApi?.role !== role || !session.bestApi.accessToken) {
    throw new Error(`${role} session required`);
  }
  return session.bestApi.accessToken;
}

export async function loadWorkspaceNotifications(
  role: WorkspaceRole,
  first = 8,
  after: string | null = null,
  unreadOnly = false,
): Promise<WorkspaceNoticePage> {
  const accessToken = await roleToken(role);
  const data = await executeApolloQuery<
    WorkspaceNotificationFeedQuery,
    { first: number; after: string | null; unreadOnly: boolean }
  >(
    WorkspaceNotificationFeedDocument,
    { first: Math.max(1, Math.min(first, 30)), after, unreadOnly },
    { accessToken, cache: "no-store" },
  );
  return {
    edges: data.myNotifications.edges.map(({ cursor, node }) => ({ cursor, node })),
    pageInfo: data.myNotifications.pageInfo,
    unreadCount: data.myUnreadNotificationCount,
  };
}

export async function markWorkspaceNotificationRead(role: WorkspaceRole, notificationId: string) {
  const accessToken = await roleToken(role);
  const data = await executeApolloMutation<
    WorkspaceMarkNotificationReadMutation,
    { input: { notificationId: string } }
  >(
    WorkspaceMarkNotificationReadDocument,
    { input: { notificationId } },
    { accessToken, cache: "no-store" },
  );
  return data.markNotificationRead.notification;
}

export async function markAllWorkspaceNotificationsRead(role: WorkspaceRole) {
  const accessToken = await roleToken(role);
  const data = await executeApolloMutation<
    WorkspaceMarkAllNotificationsReadMutation,
    Record<string, never>
  >(WorkspaceMarkAllNotificationsReadDocument, {}, { accessToken, cache: "no-store" });
  return data.markAllNotificationsRead.updatedCount;
}
