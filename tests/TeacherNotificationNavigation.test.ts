import assert from "node:assert/strict";
import test from "node:test";

import type { WorkspaceNotice } from "../src/types/WorkspaceNotification";

const { teacherNavigationItems } = (await import(
  new URL("../src/config/TeacherNavigation.ts", import.meta.url).href
)) as typeof import("../src/config/TeacherNavigation");
const { adminNavigationItems } = (await import(
  new URL("../src/config/AdminNavigation.ts", import.meta.url).href
)) as typeof import("../src/config/AdminNavigation");
const { workspaceNotificationTarget } = (await import(
  new URL("../src/lib/notifications/WorkspaceNotificationTarget.ts", import.meta.url).href
)) as typeof import("../src/lib/notifications/WorkspaceNotificationTarget");

const notice: WorkspaceNotice = {
  id: "notice-1",
  kind: "DEMO",
  taskId: null,
  title: "Demo",
  body: null,
  readAt: null,
  createdAt: "2026-10-04T00:00:00.000Z",
};

test("teacher sidebar exposes notifications instead of tasks", () => {
  assert.ok(teacherNavigationItems.some(({ href }) => href === "/teacher/notifications"));
  assert.ok(teacherNavigationItems.every(({ href }) => href !== "/teacher/tasks"));
});

test("workspace sidebars do not expose transfer requests", () => {
  assert.ok(teacherNavigationItems.every(({ href }) => href !== "/teacher/transfer-requests"));
  assert.ok(adminNavigationItems.every(({ href }) => href !== "/admin/transfer-requests"));
});

test("review and debt notifications navigate to the relevant teacher workspace", () => {
  assert.equal(
    workspaceNotificationTarget("uz", "TEACHER", {
      ...notice,
      kind: "REVIEW_REQUIRED",
      attemptId: "attempt-1",
    }),
    "/uz/teacher/results/attempt-1",
  );
  assert.equal(
    workspaceNotificationTarget("uz", "TEACHER", {
      ...notice,
      kind: "DEBT_FOLLOW_UP",
      groupId: "group-1",
    }),
    "/uz/teacher/groups/group-1/students",
  );
  assert.equal(
    workspaceNotificationTarget("uz", "TEACHER", {
      ...notice,
      kind: "TEACHER_TASK",
      taskId: "legacy-task",
    }),
    "/uz/teacher/notifications",
  );
});
