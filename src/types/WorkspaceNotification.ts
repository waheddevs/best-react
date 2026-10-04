export type WorkspaceRole = "TEACHER" | "STUDENT" | "ADMIN";

export type WorkspaceNotice = {
  id: string;
  kind: string;
  taskId: string | null;
  attemptId?: string | null;
  groupId?: string | null;
  studentId?: string | null;
  title: string;
  body: string | null;
  readAt: string | null;
  createdAt: string;
};

export type WorkspaceNoticePage = {
  edges: Array<{ cursor: string; node: WorkspaceNotice }>;
  pageInfo: { endCursor: string | null; hasNextPage: boolean };
  unreadCount: number;
};
