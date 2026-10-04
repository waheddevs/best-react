export type TeacherTopbarProfile = {
  displayName: string;
  shortName: string;
  initials: string;
  avatarUrl: string | null;
};

export type TeacherNotice = {
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

export type TeacherNoticeState = {
  notifications: TeacherNotice[];
  unreadCount: number;
};

export type ConnectedTeacherTask = {
  id: string;
  groupId: string | null;
  kind: "FOLLOW_UP" | "PREPARATION" | "ADMINISTRATIVE";
  status: "OPEN" | "COMPLETED";
  title: string;
  dueAt: string | null;
  createdAt: string;
  completedAt: string | null;
};
