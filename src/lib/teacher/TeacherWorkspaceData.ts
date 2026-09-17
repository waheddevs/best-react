import "server-only";

import { auth } from "@/Auth";
import {
  AdminUsersDocument,
  TeacherAvatarIntentDocument,
  TeacherHeaderDocument,
  TeacherNotificationUpdatesDocument,
  TeacherProfileDocument,
  TeacherTasksDocument,
  type AdminUsersQuery,
  type TeacherHeaderQuery,
  type TeacherNotificationUpdatesQuery,
  type TeacherProfileQuery,
  type TeacherTasksQuery,
} from "@/gql/graphql";
import { executeApolloMutation, executeApolloQuery } from "@/lib/apollo/ApolloServerClient";
import { executePublicApi } from "@/lib/PublicApi";
import { teacherInitials, teacherShortName } from "@/lib/teacher/TeacherDisplayName";
import type {
  ConnectedTeacherTask,
  TeacherNoticeState,
  TeacherTopbarProfile,
} from "@/types/teacher/TeacherNotifications";
import type { TeacherProfileRecord } from "@/types/teacher/TeacherProfile";

async function tokenFor(role: "TEACHER" | "ADMIN"): Promise<string> {
  const session = await auth();
  if (session?.bestApi?.role !== role || !session.bestApi.accessToken) {
    throw new Error(`${role} session required`);
  }
  return session.bestApi.accessToken;
}

async function avatarUrlFor(
  accessToken: string,
  avatarMediaObjectId: string | null,
): Promise<string | null> {
  if (!avatarMediaObjectId) return null;
  try {
    const avatar = await executeApolloMutation<
      { createMediaDownloadIntent: { downloadIntent: { url: string } } },
      { input: { mediaObjectId: string } }
    >(
      TeacherAvatarIntentDocument,
      { input: { mediaObjectId: avatarMediaObjectId } },
      { accessToken, cache: "no-store" },
    );
    return avatar.createMediaDownloadIntent.downloadIntent.url;
  } catch {
    return null;
  }
}

export async function loadTeacherProfile(): Promise<TeacherProfileRecord> {
  const accessToken = await tokenFor("TEACHER");
  const data = await executeApolloQuery<TeacherProfileQuery, Record<string, never>>(
    TeacherProfileDocument,
    {},
    { accessToken, cache: "no-store" },
  );
  const profile = data.myProfile;
  return {
    displayName: profile.displayName,
    email: profile.email ?? null,
    phone: profile.phone ?? null,
    teacherSubject: profile.teacherSubject ?? null,
    branchName: profile.branchName ?? null,
    preferredLanguage: profile.preferredLanguage,
    avatarMediaObjectId: profile.avatarMediaObjectId ?? null,
    avatarUrl: await avatarUrlFor(accessToken, profile.avatarMediaObjectId ?? null),
    initials: teacherInitials(profile.displayName),
  };
}

export async function loadTeacherHeader(): Promise<{
  profile: TeacherTopbarProfile;
  notices: TeacherNoticeState;
}> {
  const accessToken = await tokenFor("TEACHER");
  const data = await executeApolloQuery<TeacherHeaderQuery, Record<string, never>>(
    TeacherHeaderDocument,
    {},
    { accessToken, cache: "no-store" },
  );
  const avatarUrl = await avatarUrlFor(accessToken, data.myProfile.avatarMediaObjectId);
  const displayName = data.myProfile.displayName;
  const initials = teacherInitials(displayName);
  return {
    profile: { displayName, shortName: teacherShortName(displayName), initials, avatarUrl },
    notices: {
      notifications: data.myNotifications.edges.map(({ node }) => node),
      unreadCount: data.myUnreadNotificationCount,
    },
  };
}

export async function loadTeacherNoticeUpdates(): Promise<TeacherNoticeState> {
  const accessToken = await tokenFor("TEACHER");
  const data = await executeApolloQuery<TeacherNotificationUpdatesQuery, Record<string, never>>(
    TeacherNotificationUpdatesDocument,
    {},
    { accessToken, cache: "no-store" },
  );
  return {
    notifications: data.myNotifications.edges.map(({ node }) => node),
    unreadCount: data.myUnreadNotificationCount,
  };
}

export async function loadConnectedTeacherTasks(): Promise<ConnectedTeacherTask[]> {
  const accessToken = await tokenFor("TEACHER");
  const tasks: ConnectedTeacherTask[] = [];
  let after: string | null = null;
  do {
    const data: TeacherTasksQuery = await executeApolloQuery<
      TeacherTasksQuery,
      { after: string | null; first: number }
    >(TeacherTasksDocument, { after, first: 100 }, { accessToken, cache: "no-store" });
    tasks.push(...data.teacherTasks.edges.map(({ node }) => node));
    if (!data.teacherTasks.pageInfo.hasNextPage) break;
    const next: string | null = data.teacherTasks.pageInfo.endCursor;
    if (!next || next === after) throw new Error("Invalid teacher tasks cursor");
    after = next;
  } while (true);
  return tasks;
}

// Admin-owned compatibility path; migrate it only when the Admin workspace enters scope.
export async function loadAdminTeacherRecipients(): Promise<Array<{ id: string; name: string }>> {
  const accessToken = await tokenFor("ADMIN");
  const recipients: Array<{ id: string; name: string }> = [];
  let after: string | null = null;
  do {
    const data: AdminUsersQuery = await executePublicApi<
      AdminUsersQuery,
      { after: string | null; first: number; role: "TEACHER" }
    >(
      AdminUsersDocument,
      { after, first: 100, role: "TEACHER" },
      { accessToken, cache: "no-store" },
    );
    recipients.push(
      ...data.adminUsers.edges
        .filter(({ node }) => node.status === "ACTIVE")
        .map(({ node }) => ({ id: node.id, name: node.displayName })),
    );
    if (!data.adminUsers.pageInfo.hasNextPage) break;
    const next: string | null = data.adminUsers.pageInfo.endCursor;
    if (!next || next === after) throw new Error("Invalid admin users cursor");
    after = next;
  } while (true);
  return recipients;
}
