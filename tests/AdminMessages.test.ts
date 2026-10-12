import assert from "node:assert/strict";
import test from "node:test";
import type { AdminMessage } from "../src/types/admin/AdminMessages";

const { filterAdminMessages } = (await import(
  new URL("../src/lib/admin/AdminMessageDirectory.ts", import.meta.url).href
)) as typeof import("../src/lib/admin/AdminMessageDirectory");

const message = (
  id: string,
  createdAt: string,
  status: AdminMessage["status"] = "NEW",
): AdminMessage => ({
  id,
  createdAt,
  status,
  name: "Example Learner",
  email: "learner@example.com",
  phone: null,
  kind: "CONTACT",
  subject: "Weekend lessons",
  message: "Is a Saturday class available?",
  reviewNote: null,
});
const empty = { search: "", status: "", from: "", to: "" };

test("message date filters include both ends of the Tashkent day", () => {
  const messages = [
    message("before", "2026-10-10T18:59:59.999Z"),
    message("start", "2026-10-10T19:00:00Z"),
    message("end", "2026-10-11T18:59:59.999Z"),
    message("after", "2026-10-11T19:00:00Z"),
  ];
  assert.deepEqual(
    filterAdminMessages(messages, { ...empty, from: "2026-10-11", to: "2026-10-11" }).map(
      (item) => item.id,
    ),
    ["end", "start"],
  );
  assert.equal(
    filterAdminMessages(messages, { ...empty, from: "2026-10-12", to: "2026-10-11" }).length,
    0,
  );
});

test("message search combines with status, covers content and contact, and leaves source intact", () => {
  const messages = [
    message("old", "2026-10-10T12:00:00Z"),
    message("new", "2026-10-11T12:00:00Z", "RESOLVED"),
  ];
  assert.deepEqual(
    filterAdminMessages(messages, { ...empty, search: " SATURDAY ", status: "RESOLVED" }).map(
      (item) => item.id,
    ),
    ["new"],
  );
  assert.equal(
    filterAdminMessages(messages, { ...empty, search: "LEARNER@EXAMPLE.COM" }).length,
    2,
  );
  assert.equal(filterAdminMessages(messages, { ...empty, search: "missing" }).length, 0);
  assert.deepEqual(
    filterAdminMessages(messages, empty).map((item) => item.id),
    ["new", "old"],
  );
  assert.deepEqual(
    messages.map((item) => item.id),
    ["old", "new"],
  );
});
