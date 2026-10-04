import "server-only";

import type { DocumentNode } from "graphql";

import { auth } from "@/Auth";
import type { Locale } from "@/config/Locales";
import { getAdminStatusLabel, getAdminWorkspaceCopy } from "@/dictionaries/admin/AdminWorkspace";
import {
  AdminAttendanceDocument,
  AdminAuditLogsDocument,
  AdminContactRequestsDocument,
  AdminCoursesDocument,
  AdminEventRegistrationsDocument,
  AdminEventsDocument,
  AdminExamRegistrationsDocument,
  AdminGroupProgressesDocument,
  AdminGroupsDocument,
  AdminLibraryItemsDocument,
  AdminLocationsDocument,
  AdminMediaObjectsDocument,
  AdminNotificationsDocument,
  AdminOperationalOverviewDocument,
  AdminProfileDocument,
  type AdminProfileQuery,
  AdminScheduleDocument,
  AdminStudentsDocument,
  AdminTestsDocument,
  AdminTuitionLedgerDocument,
  AdminUsersDocument,
} from "@/gql/graphql";
import { executePublicApi } from "@/lib/PublicApi";
import type { AdminNavigationKey, AdminWorkspaceRecord } from "@/types/admin/AdminWorkspace";

type Connection<T> = {
  edges: Array<{ node: T }>;
  pageInfo: { endCursor?: string | null; hasNextPage: boolean };
};
type Status = AdminWorkspaceRecord["status"];
type DataResult = {
  records: AdminWorkspaceRecord[];
  metrics?: Array<{ label: string; value: string }>;
};

async function adminQuery<T>(
  document: DocumentNode,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const session = await auth();
  const accessToken = session?.bestApi?.accessToken;
  if (!accessToken || session.bestApi?.role !== "ADMIN") throw new Error("Admin session required");
  return executePublicApi<T, Record<string, unknown>>(document, variables, {
    accessToken,
    cache: "no-store",
  });
}

async function allNodes<T>(
  document: DocumentNode,
  field: string,
  variables: Record<string, unknown> = {},
): Promise<T[]> {
  const nodes: T[] = [];
  let after: string | null = null;
  do {
    const data: Record<string, Connection<T>> = await adminQuery<Record<string, Connection<T>>>(
      document,
      {
        ...variables,
        after,
        first: 100,
      },
    );
    const connection: Connection<T> | undefined = data[field];
    if (!connection) throw new Error(`Missing admin connection: ${field}`);
    nodes.push(...connection.edges.map(({ node }) => node));
    if (!connection.pageInfo.hasNextPage) break;
    if (!connection.pageInfo.endCursor || connection.pageInfo.endCursor === after) {
      throw new Error(`Invalid admin cursor: ${field}`);
    }
    after = connection.pageInfo.endCursor;
  } while (true);
  return nodes;
}

function tone(value: string): Status {
  if (/OVERDUE|REJECTED|DECLINED|FAILED|BLOCKED|CANCELLED|INFECTED|ABSENT/.test(value))
    return "danger";
  if (/PENDING|NEW|REVIEW|DUE|DRAFT|INACTIVE|QUARANTINED|LATE|VERIFYING/.test(value))
    return "warning";
  if (/PAID|PUBLISHED|ACTIVE|RESOLVED|APPROVED|COMPLETED|CLEAN|PRESENT|READY/.test(value))
    return "success";
  return "info";
}

function date(value: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "uz" ? "uz-UZ" : locale === "ru" ? "ru-RU" : "en-GB", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function uzs(value: string, locale: Locale): string {
  const numberLocale = locale === "uz" ? "uz-UZ" : locale === "ru" ? "ru-RU" : "en-GB";
  return `${new Intl.NumberFormat(numberLocale).format(BigInt(value))} UZS`;
}

function record(
  id: string,
  title: string,
  meta: string,
  detail: string,
  status: Status,
  href?: string,
): AdminWorkspaceRecord {
  return { id, title, meta, detail, status, href };
}

export async function loadAdminProfile() {
  const data = await adminQuery<AdminProfileQuery>(AdminProfileDocument);
  return data.myProfile;
}

export async function loadAdminWorkspaceData(
  sectionKey: AdminNavigationKey,
  locale: Locale,
): Promise<DataResult> {
  const language = locale.toUpperCase();
  switch (sectionKey) {
    case "dashboard": {
      const labels = getAdminWorkspaceCopy(locale);
      const data = await adminQuery<{
        adminOperationalOverview: {
          activeGroups: number;
          activeUsers: number;
          pendingIntakes: number;
          pendingMedia: number;
          unreadNotifications: number;
        };
        adminAcademicOverview: {
          activeStudentCount: number;
          activeTeacherCount: number;
          assignedTestCount: number;
          completionPercentage: number;
        };
      }>(AdminOperationalOverviewDocument);
      const op = data.adminOperationalOverview;
      const academic = data.adminAcademicOverview;
      return {
        metrics: [
          { label: labels.navigation.groups, value: String(op.activeGroups) },
          { label: labels.navigation.students, value: String(academic.activeStudentCount) },
          { label: labels.navigation.teachers, value: String(academic.activeTeacherCount) },
          {
            label: labels.common.openQueueLabel,
            value: String(op.pendingIntakes + op.pendingMedia),
          },
        ],
        records: [
          record(
            "intakes",
            labels.navigation.requests,
            String(op.pendingIntakes),
            labels.common.openQueueLabel,
            op.pendingIntakes ? "warning" : "success",
            "/admin/requests",
          ),
          record(
            "media",
            labels.navigation.imports,
            String(op.pendingMedia),
            labels.common.openQueueLabel,
            op.pendingMedia ? "warning" : "success",
            "/admin/imports",
          ),
          record(
            "tests",
            labels.navigation.tests,
            String(academic.assignedTestCount),
            labels.common.all,
            "info",
            "/admin/tests",
          ),
        ],
      };
    }
    case "requests": {
      type Intake = {
        id: string;
        name: string;
        kind: string;
        status: string;
        createdAt: string;
        email?: string | null;
        phone?: string | null;
      };
      const [contacts, events, exams] = await Promise.all([
        allNodes<Intake>(AdminContactRequestsDocument, "adminContactRequests"),
        allNodes<Intake>(AdminEventRegistrationsDocument, "adminEventRegistrations"),
        allNodes<Intake>(AdminExamRegistrationsDocument, "adminExamRegistrations"),
      ]);
      return {
        records: [...contacts, ...events, ...exams]
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
          .map((item) =>
            record(
              item.id,
              item.name,
              `${item.kind} · ${date(item.createdAt, locale)}`,
              getAdminStatusLabel(locale, item.status),
              tone(item.status),
            ),
          ),
      };
    }
    case "students": {
      type Student = {
        studentId: string;
        displayName: string;
        currentGroupName?: string | null;
        status: string;
        averagePercentage?: number | null;
        scoredTestCount: number;
      };
      const nodes = await allNodes<Student>(AdminStudentsDocument, "adminStudents");
      return {
        records: nodes.map((item) =>
          record(
            item.studentId,
            item.displayName,
            item.currentGroupName ?? "—",
            getAdminStatusLabel(locale, item.status),
            tone(item.status),
            `/admin/students/${encodeURIComponent(item.studentId)}`,
          ),
        ),
      };
    }
    case "teachers": {
      type User = {
        id: string;
        displayName: string;
        email?: string | null;
        branchName?: string | null;
        teacherSubject?: string | null;
        status: string;
      };
      const nodes = await allNodes<User>(AdminUsersDocument, "adminUsers", { role: "TEACHER" });
      return {
        records: nodes.map((item) =>
          record(
            item.id,
            item.displayName,
            [item.teacherSubject, item.branchName].filter(Boolean).join(" · ") || item.email || "—",
            getAdminStatusLabel(locale, item.status),
            tone(item.status),
            `/admin/teachers/${encodeURIComponent(item.id)}`,
          ),
        ),
      };
    }
    case "groups": {
      type Group = { id: string; slug: string; name: string; room?: string | null; status: string };
      const nodes = await allNodes<Group>(AdminGroupsDocument, "adminGroups");
      return {
        records: nodes.map((item) =>
          record(
            item.id,
            item.name,
            item.room ?? "—",
            getAdminStatusLabel(locale, item.status),
            tone(item.status),
            `/admin/groups/${encodeURIComponent(item.slug)}`,
          ),
        ),
      };
    }
    case "courses": {
      type Course = {
        id: string;
        slug: string;
        title: string;
        level?: string | null;
        status: string;
        duration?: string | null;
      };
      const nodes = await allNodes<Course>(AdminCoursesDocument, "adminCourses", { language });
      return {
        records: nodes.map((item) =>
          record(
            item.id,
            item.title,
            [item.level, item.duration].filter(Boolean).join(" · ") || "—",
            getAdminStatusLabel(locale, item.status),
            tone(item.status),
            `/admin/courses/${encodeURIComponent(item.slug)}`,
          ),
        ),
      };
    }
    case "events": {
      type Event = {
        id: string;
        slug: string;
        title: string;
        location?: string | null;
        startsAt: string;
        status: string;
      };
      const nodes = await allNodes<Event>(AdminEventsDocument, "adminEvents", { language });
      return {
        records: nodes.map((item) =>
          record(
            item.id,
            item.title,
            `${date(item.startsAt, locale)} · ${item.location ?? "—"}`,
            getAdminStatusLabel(locale, item.status),
            tone(item.status),
            `/admin/events/${encodeURIComponent(item.slug)}`,
          ),
        ),
      };
    }
    case "locations": {
      const data = await adminQuery<{
        adminLocations: Array<{
          room: string;
          activeGroupCount: number;
          scheduledLessonCount: number;
          nextLessonAt?: string | null;
        }>;
      }>(AdminLocationsDocument);
      return {
        records: data.adminLocations.map((item) =>
          record(
            item.room,
            item.room,
            String(item.scheduledLessonCount),
            String(item.activeGroupCount),
            "info",
          ),
        ),
      };
    }
    case "schedule":
    case "attendance": {
      const now = new Date();
      const from = new Date(now);
      from.setDate(from.getDate() - (sectionKey === "attendance" ? 7 : 30));
      const to = new Date(now);
      to.setDate(to.getDate() + (sectionKey === "attendance" ? 0 : 90));
      type Lesson = {
        id: string;
        groupId: string;
        startsAt: string;
        endsAt: string;
        room?: string | null;
        status: string;
        translations: Array<{ language: string; title: string }>;
      };
      const data = await adminQuery<{ adminSchedule: Lesson[] }>(AdminScheduleDocument, {
        from: from.toISOString(),
        to: to.toISOString(),
      });
      if (sectionKey === "attendance") {
        type Attendance = {
          id: string;
          studentId: string;
          studentName: string;
          status: string;
          note?: string | null;
          recordedAt: string;
        };
        const rows = await Promise.all(
          data.adminSchedule
            .filter((lesson) => new Date(lesson.startsAt) <= now)
            .map(async (lesson) => {
              const result = await adminQuery<{ adminAttendance: Attendance[] }>(
                AdminAttendanceDocument,
                { lessonId: lesson.id },
              );
              return result.adminAttendance.map((entry) =>
                record(
                  entry.id,
                  entry.studentName,
                  `${lesson.translations.find((translation) => translation.language === language)?.title ?? lesson.groupId} · ${date(lesson.startsAt, locale)}`,
                  getAdminStatusLabel(locale, entry.status),
                  tone(entry.status),
                ),
              );
            }),
        );
        return { records: rows.flat() };
      }
      return {
        records: data.adminSchedule.map((item) =>
          record(
            item.id,
            item.translations.find((entry) => entry.language === language)?.title ?? item.groupId,
            `${date(item.startsAt, locale)} · ${item.room ?? "—"}`,
            getAdminStatusLabel(locale, item.status),
            tone(item.status),
          ),
        ),
      };
    }
    case "payments": {
      type Charge = {
        chargeId: string;
        studentDisplayName: string;
        groupName: string;
        billingMonth: string;
        dueDate: string;
        amountUzs: string;
        outstandingAmountUzs: string;
        status: string;
      };
      const nodes = await allNodes<Charge>(AdminTuitionLedgerDocument, "adminTuitionLedger");
      return {
        records: nodes.map((item) =>
          record(
            item.chargeId,
            item.studentDisplayName,
            `${item.groupName} · ${uzs(item.amountUzs, locale)} · ${date(item.billingMonth, locale)}`,
            getAdminStatusLabel(locale, item.status),
            tone(item.status),
            `/admin/payments/${encodeURIComponent(item.chargeId)}`,
          ),
        ),
      };
    }
    case "tests": {
      type Test = {
        id: string;
        title: string;
        groupName: string;
        teacherDisplayName: string;
        questionCount: number;
        attemptCount: number;
        awaitingReviewCount: number;
        status: string;
      };
      const nodes = await allNodes<Test>(AdminTestsDocument, "adminTests", { language });
      return {
        records: nodes.map((item) =>
          record(
            item.id,
            item.title,
            `${item.groupName} · ${item.questionCount}`,
            item.awaitingReviewCount
              ? String(item.awaitingReviewCount)
              : getAdminStatusLabel(locale, item.status),
            item.awaitingReviewCount ? "warning" : tone(item.status),
            `/admin/tests/${encodeURIComponent(item.id)}`,
          ),
        ),
      };
    }
    case "results":
    case "reports": {
      type Progress = {
        groupId: string;
        groupName: string;
        teacherDisplayName: string;
        completionPercentage: number;
        averagePercentage?: number | null;
        groupStatus: string;
      };
      const nodes = await allNodes<Progress>(AdminGroupProgressesDocument, "adminGroupProgresses");
      return {
        records: nodes.map((item) =>
          record(
            item.groupId,
            item.groupName,
            item.teacherDisplayName,
            `${item.completionPercentage}%`,
            tone(item.groupStatus),
          ),
        ),
      };
    }
    case "library": {
      type Item = {
        id: string;
        title: string;
        ownerName: string;
        status: string;
        updatedAt: string;
      };
      const nodes = await allNodes<Item>(AdminLibraryItemsDocument, "adminLibraryItems");
      return {
        records: nodes.map((item) =>
          record(
            item.id,
            item.title,
            `${item.ownerName} · ${date(item.updatedAt, locale)}`,
            getAdminStatusLabel(locale, item.status),
            tone(item.status),
            `/admin/library/${encodeURIComponent(item.id)}`,
          ),
        ),
      };
    }
    case "imports": {
      type Media = {
        id: string;
        originalName: string;
        mimeType: string;
        status: string;
        malwareStatus: string;
        createdAt: string;
      };
      const nodes = await allNodes<Media>(AdminMediaObjectsDocument, "adminMediaObjects");
      return {
        records: nodes.map((item) =>
          record(
            item.id,
            item.originalName,
            `${item.mimeType} · ${date(item.createdAt, locale)}`,
            getAdminStatusLabel(locale, item.status),
            tone(item.status),
            `/admin/imports/${encodeURIComponent(item.id)}`,
          ),
        ),
      };
    }
    case "notifications": {
      type Notification = {
        id: string;
        title: string;
        body?: string | null;
        kind: string;
        readAt?: string | null;
        createdAt: string;
      };
      const nodes = await allNodes<Notification>(AdminNotificationsDocument, "myNotifications");
      return {
        records: nodes.map((item) =>
          record(
            item.id,
            item.title,
            item.body ?? date(item.createdAt, locale),
            getAdminStatusLabel(locale, item.readAt ? "READ" : "UNREAD"),
            item.readAt ? "neutral" : "warning",
          ),
        ),
      };
    }
    case "audit": {
      type Audit = {
        id: string;
        action: string;
        actorId?: string | null;
        targetId: string;
        targetType: string;
        reason?: string | null;
        createdAt: string;
      };
      const nodes = await allNodes<Audit>(AdminAuditLogsDocument, "adminAuditLogs");
      return {
        records: nodes.map((item) =>
          record(
            item.id,
            item.action,
            `${item.targetType} · ${item.targetId} · ${date(item.createdAt, locale)}`,
            item.reason ?? "—",
            "neutral",
          ),
        ),
      };
    }
    case "settings": {
      const profile = await loadAdminProfile();
      return {
        records: [
          record(
            profile.id,
            profile.displayName,
            profile.email ?? profile.branchName ?? "—",
            getAdminStatusLabel(locale, profile.status),
            tone(profile.status),
          ),
        ],
      };
    }
  }
}
