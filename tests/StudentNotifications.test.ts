import assert from "node:assert/strict";
import test from "node:test";

import type { WorkspaceNotice } from "../src/types/WorkspaceNotification";

const { recentWorkspaceNotices } = (await import(
  new URL("../src/lib/notifications/WorkspaceNotificationPreview.ts", import.meta.url).href
)) as typeof import("../src/lib/notifications/WorkspaceNotificationPreview");
const { workspaceNotificationTarget } = (await import(
  new URL("../src/lib/notifications/WorkspaceNotificationTarget.ts", import.meta.url).href
)) as typeof import("../src/lib/notifications/WorkspaceNotificationTarget");

function notice(id: string, createdAt: string): WorkspaceNotice {
  return {
    id,
    kind: "DEMO_STUDENT_TEST",
    taskId: null,
    title: "Fictional test notice",
    body: null,
    readAt: null,
    createdAt,
  };
}

test("student bell shows only the three newest notices without mutating the feed", () => {
  const feed = [
    notice("older", "2026-10-01T10:00:00.000Z"),
    notice("latest", "2026-10-05T10:00:00.000Z"),
    notice("middle", "2026-10-03T10:00:00.000Z"),
    notice("newer", "2026-10-04T10:00:00.000Z"),
  ];
  assert.deepEqual(
    recentWorkspaceNotices(feed, 3).map(({ id }) => id),
    ["latest", "newer", "middle"],
  );
  assert.equal(feed[0]?.id, "older");
});

test("fictional Student notices do not navigate to unrelated pages", () => {
  assert.equal(
    workspaceNotificationTarget("uz", "STUDENT", notice("sample", "2026-10-01T10:00:00.000Z")),
    null,
  );
});
