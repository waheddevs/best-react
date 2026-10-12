import "server-only";
import { getAdminStudentFinancials } from "./AdminStudentFinancials";

import type { DocumentNode } from "graphql";

import { auth } from "@/Auth";
import type { Locale } from "@/config/Locales";
import { getAdminDirectoryCopy } from "@/dictionaries/admin/AdminDirectory";
import { getAdminOperationsCopy } from "@/dictionaries/admin/AdminOperations";
import { getAdminStudentsCopy } from "@/dictionaries/admin/AdminStudents";
import { getAdminTeachersCopy } from "@/dictionaries/admin/AdminTeachers";
import { getAdminStatusLabel, getAdminWorkspaceCopy } from "@/dictionaries/admin/AdminWorkspace";
import {
  AdminContactRequestsDocument,
  type AdminContactRequestsQuery,
  AdminCoursesDocument,
  AdminEventRegistrationsDocument,
  AdminEventsDocument,
  AdminExamRegistrationsDocument,
  AdminGroupsDocument,
  AdminNotificationsDocument,
  AdminOperationalOverviewDocument,
  AdminProfileDocument,
  type AdminProfileQuery,
  AdminScheduleDocument,
  AdminTuitionLedgerDocument,
  type AdminTuitionLedgerQuery,
  AdminUsersDocument,
} from "@/gql/graphql";
import { executePublicApi } from "@/lib/PublicApi";
import { profileAvatarUrlsFor } from "@/lib/ProfileAvatarIntents";
import { formatAdminGroupSchedule } from "@/lib/admin/AdminGroupPresentation";
import type {
  AdminGroupRecordDetails,
  AdminNavigationKey,
  AdminWorkspaceMetric,
  AdminWorkspaceRecord,
  AdminWorkspaceRecordField,
} from "@/types/admin/AdminWorkspace";
import type { AdminProvisionGroupOption } from "@/types/admin/AdminProvisionUser";
import type { AdminStudentStatus } from "@/types/admin/AdminStudents";
import type { AdminTeacherStatus } from "@/types/admin/AdminTeachers";

type Connection<T> = {
  edges: Array<{ node: T }>;
  pageInfo: { endCursor?: string | null; hasNextPage: boolean };
};
type Status = AdminWorkspaceRecord["status"];
type DataResult = {
  records: AdminWorkspaceRecord[];
  metrics?: AdminWorkspaceMetric[];
  provisionGroups?: AdminProvisionGroupOption[];
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

export async function loadAdminMessages() {
  return allNodes<AdminContactRequestsQuery["adminContactRequests"]["edges"][number]["node"]>(
    AdminContactRequestsDocument,
    "adminContactRequests",
  );
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

function dateTime(value: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "uz" ? "uz-UZ" : locale === "ru" ? "ru-RU" : "en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Tashkent",
  }).format(new Date(value));
}

function time(value: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "uz" ? "uz-UZ" : locale === "ru" ? "ru-RU" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tashkent",
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
  avatarUrl?: string | null,
  group?: AdminGroupRecordDetails,
): AdminWorkspaceRecord {
  return { id, title, meta, detail, status, href, avatarUrl, group };
}

function field(
  key: string,
  label: string,
  value: string,
  tone?: AdminWorkspaceRecordField["tone"],
): AdminWorkspaceRecordField {
  return { key, label, tone, value };
}

function withFields(
  workspaceRecord: AdminWorkspaceRecord,
  fields: AdminWorkspaceRecordField[],
): AdminWorkspaceRecord {
  return {
    ...workspaceRecord,
    fields,
    searchText: fields.map(({ value }) => value).join(" "),
  };
}

async function adminAvatarUrlsFor(userIds: string[]): Promise<Map<string, string>> {
  const session = await auth();
  if (session?.bestApi?.role !== "ADMIN" || !session.bestApi.accessToken) {
    throw new Error("Admin session required");
  }
  return profileAvatarUrlsFor(session.bestApi.accessToken, userIds).catch(() => new Map());
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
  const directory = getAdminDirectoryCopy(locale);
  const operations = getAdminOperationsCopy(locale);
  switch (sectionKey) {
    case "exams":
    case "salary":
      return { records: [] };
    case "dashboard": {
      const labels = getAdminWorkspaceCopy(locale);
      type DashboardUser = { id: string };
      const [data, students, teachers] = await Promise.all([
        adminQuery<{
          adminOperationalOverview: {
            activeGroups: number;
            pendingIntakes: number;
            unreadNotifications: number;
          };
        }>(AdminOperationalOverviewDocument),
        allNodes<DashboardUser>(AdminUsersDocument, "adminUsers", { role: "STUDENT" }),
        allNodes<DashboardUser>(AdminUsersDocument, "adminUsers", { role: "TEACHER" }),
      ]);
      const op = data.adminOperationalOverview;
      return {
        metrics: [
          {
            href: "/admin/groups",
            label: labels.navigation.groups,
            tone: "emerald",
            value: String(op.activeGroups),
          },
          {
            href: "/admin/students",
            label: labels.navigation.students,
            tone: "cyan",
            value: String(students.length),
          },
          {
            href: "/admin/teachers",
            label: labels.navigation.teachers,
            tone: "navy",
            value: String(teachers.length),
          },
          {
            href: "/admin/requests",
            label: labels.common.openQueueLabel,
            tone: "amber",
            value: String(op.pendingIntakes),
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
            "notifications",
            labels.navigation.notifications,
            String(op.unreadNotifications),
            labels.common.openQueueLabel,
            op.unreadNotifications ? "warning" : "success",
            "/admin/notifications",
          ),
        ],
      };
    }
    case "messages": {
      const messages = await loadAdminMessages();
      return {
        records: messages.map((item) =>
          withFields(
            record(
              item.id,
              item.name,
              item.subject ?? directory.contactRequestsLabel,
              getAdminStatusLabel(locale, item.status),
              tone(item.status),
            ),
            [
              field("contact", directory.contactLabel, item.email ?? item.phone ?? "—"),
              field("subject", directory.subjectLabel, item.subject ?? "—"),
              field("message", directory.messageLabel, item.message ?? "—"),
              field("received", directory.receivedLabel, date(item.createdAt, locale)),
            ],
          ),
        ),
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
      const [events, exams] = await Promise.all([
        allNodes<Intake>(AdminEventRegistrationsDocument, "adminEventRegistrations"),
        allNodes<Intake>(AdminExamRegistrationsDocument, "adminExamRegistrations"),
      ]);
      const items = [
        ...events.map((item) => ({ ...item, sourceLabel: directory.eventRegistrationsLabel })),
        ...exams.map((item) => ({ ...item, sourceLabel: directory.examRegistrationsLabel })),
      ].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      return {
        metrics: [
          { label: directory.eventRegistrationsLabel, value: String(events.length) },
          { label: directory.examRegistrationsLabel, value: String(exams.length) },
        ],
        records: items.map((item) =>
          withFields(
            record(
              item.id,
              item.name,
              `${item.kind} · ${date(item.createdAt, locale)}`,
              getAdminStatusLabel(locale, item.status),
              tone(item.status),
            ),
            [
              field("kind", directory.kindLabel, item.sourceLabel),
              field("contact", directory.contactLabel, item.email ?? item.phone ?? "—"),
              field("received", directory.receivedLabel, date(item.createdAt, locale)),
            ],
          ),
        ),
      };
    }
    case "students": {
      type Student = {
        activeGroupId?: string | null;
        activeGroupName?: string | null;
        activeMembershipStartedAt?: string | null;
        activeTeacherId?: string | null;
        activeTeacherName?: string | null;
        createdAt: string;
        id: string;
        displayName: string;
        email?: string | null;
        phone?: string | null;
        branchName?: string | null;
        status: string;
      };
      type TuitionEntry = AdminTuitionLedgerQuery["adminTuitionLedger"]["edges"][number]["node"];
      type ProvisionGroup = {
        activeStudentCount: number;
        category: AdminProvisionGroupOption["category"] | null;
        id: string;
        name: string;
      };
      const [nodes, tuitionEntries, groupNodes] = await Promise.all([
        allNodes<Student>(AdminUsersDocument, "adminUsers", { role: "STUDENT" }),
        allNodes<TuitionEntry>(AdminTuitionLedgerDocument, "adminTuitionLedger"),
        allNodes<ProvisionGroup>(AdminGroupsDocument, "adminGroups", { status: "ACTIVE" }),
      ]);
      const avatarUrls = await adminAvatarUrlsFor(nodes.map((item) => item.id));
      const debtorIds = new Set(
        tuitionEntries
          .filter(
            (entry) => entry.status === "OVERDUE" && BigInt(entry.outstandingAmountUzs) > BigInt(0),
          )
          .map((entry) => entry.studentId),
      );
      const studentCopy = getAdminStudentsCopy(locale);
      const tuitionByStudent = new Map<string, TuitionEntry[]>();
      tuitionEntries.forEach((entry) => {
        const entries = tuitionByStudent.get(entry.studentId) ?? [];
        entries.push(entry);
        tuitionByStudent.set(entry.studentId, entries);
      });
      const resolveStudentStatus = (student: Student): AdminStudentStatus => {
        if (student.status === "DELETED") return "DEPARTED";
        if (student.status === "INACTIVE") return "PAUSED";
        if (debtorIds.has(student.id)) return "DEBTOR";
        return "ACTIVE";
      };

      return {
        provisionGroups: groupNodes.filter(
          (group): group is ProvisionGroup & { category: AdminProvisionGroupOption["category"] } =>
            group.category !== null,
        ),
        records: nodes.map((item) => {
          const studentTuition = tuitionByStudent.get(item.id) ?? [];
          const paymentIsPaid =
            studentTuition.length > 0 &&
            studentTuition.every(
              (entry) =>
                entry.status === "PAID" && BigInt(entry.outstandingAmountUzs) === BigInt(0),
            );
          const payment = paymentIsPaid
            ? { label: studentCopy.paymentPaidLabel, tone: "success" as const }
            : { label: studentCopy.paymentUnpaidLabel, tone: "danger" as const };
          const studentStatus = resolveStudentStatus(item);
          const statusTone: Status =
            studentStatus === "ACTIVE"
              ? "success"
              : studentStatus === "PAUSED"
                ? "warning"
                : studentStatus === "DEBTOR"
                  ? "danger"
                  : "neutral";

          return {
            ...withFields(
              record(
                item.id,
                item.displayName,
                item.branchName ?? item.email ?? "—",
                studentCopy.statusLabels[studentStatus],
                statusTone,
                `/admin/students/${encodeURIComponent(item.id)}`,
                avatarUrls.get(item.id) ?? null,
              ),
              [
                field("phone", directory.phoneLabel, item.phone ?? "—"),
                field("email", directory.emailLabel, item.email ?? "—"),
                field("payment", studentCopy.paymentLabel, payment.label, payment.tone),
              ],
            ),
            studentFinancials: getAdminStudentFinancials(studentTuition),
            studentDirectory: {
              activeGroupId: item.activeGroupId ?? null,
              activeGroupName: item.activeGroupName ?? null,
              activeMembershipStartedAt: item.activeMembershipStartedAt ?? null,
              activeTeacherId: item.activeTeacherId ?? null,
              activeTeacherName: item.activeTeacherName ?? null,
            },
            studentStatus,
          };
        }),
      };
    }
    case "teachers": {
      type User = {
        id: string;
        displayName: string;
        email?: string | null;
        branchName?: string | null;
        phone?: string | null;
        status: string;
      };
      type Group = {
        id: string;
        name: string;
        status: string;
        teacherId: string;
      };
      const [nodes, groups] = await Promise.all([
        allNodes<User>(AdminUsersDocument, "adminUsers", { role: "TEACHER" }),
        allNodes<Group>(AdminGroupsDocument, "adminGroups"),
      ]);
      const avatarUrls = await adminAvatarUrlsFor(nodes.map((item) => item.id));
      const teacherCopy = getAdminTeachersCopy(locale);
      const activeGroupCounts = groups.reduce<Map<string, number>>((counts, group) => {
        if (group.status !== "ACTIVE") return counts;
        counts.set(group.teacherId, (counts.get(group.teacherId) ?? 0) + 1);
        return counts;
      }, new Map());
      return {
        metrics: [
          {
            label: directory.activeLabel,
            value: String(nodes.filter((item) => item.status === "ACTIVE").length),
          },
          {
            label: directory.branchesLabel,
            value: String(new Set(nodes.map((item) => item.branchName).filter(Boolean)).size),
          },
        ],
        records: nodes.map((item) => {
          const teacherStatus: AdminTeacherStatus =
            item.status === "INACTIVE" ? "PAUSED" : "ACTIVE";
          return {
            ...withFields(
              record(
                item.id,
                item.displayName,
                item.email || "—",
                teacherCopy.statusLabels[teacherStatus],
                tone(item.status),
                `/admin/teachers/${encodeURIComponent(item.id)}`,
                avatarUrls.get(item.id) ?? null,
              ),
              [
                field("email", directory.emailLabel, item.email ?? "—"),
                field("phone", directory.phoneLabel, item.phone ?? "—"),
                field(
                  "groups",
                  teacherCopy.groupsLabel,
                  String(activeGroupCounts.get(item.id) ?? 0),
                ),
              ],
            ),
            teacherGroups: groups
              .filter((group) => group.teacherId === item.id && group.status === "ACTIVE")
              .map(({ id, name }) => ({ id, name })),
            teacherStatus,
          };
        }),
      };
    }
    case "groups": {
      type Group = {
        activeStudentCount: number;
        category: "CEFR" | "GENERAL_ENGLISH" | "IELTS" | null;
        endsAtMinutes?: number | null;
        id: string;
        monthlyTuitionUzs?: string | null;
        name: string;
        room?: string | null;
        scheduleDays: number[];
        slug: string;
        startsAtMinutes?: number | null;
        status: string;
        teacherId: string;
        timeZone: string;
      };
      type Teacher = {
        branchName?: string | null;
        displayName: string;
        id: string;
      };
      const [nodes, teachers] = await Promise.all([
        allNodes<Group>(AdminGroupsDocument, "adminGroups"),
        allNodes<Teacher>(AdminUsersDocument, "adminUsers", { role: "TEACHER" }),
      ]);
      const teachersById = new Map(teachers.map((teacher) => [teacher.id, teacher]));
      return {
        records: nodes.map((item) => {
          const teacher = teachersById.get(item.teacherId);
          const startsAtMinutes = item.startsAtMinutes ?? null;
          const endsAtMinutes = item.endsAtMinutes ?? null;
          const groupDetails: AdminGroupRecordDetails = {
            activeStudentCount: item.activeStudentCount,
            branchName: teacher?.branchName ?? null,
            capacity: 15,
            category: item.category,
            endsAtMinutes,
            monthlyTuitionUzs: item.monthlyTuitionUzs ? uzs(item.monthlyTuitionUzs, locale) : null,
            room: item.room ?? null,
            scheduleDays: item.scheduleDays,
            slug: item.slug,
            startsAtMinutes,
            teacherName: teacher?.displayName ?? item.teacherId,
            timeZone: item.timeZone,
          };
          const schedule = formatAdminGroupSchedule(groupDetails, locale);
          return record(
            item.id,
            item.name,
            `${teacher?.displayName ?? item.teacherId} · ${schedule}`,
            getAdminStatusLabel(locale, item.status),
            tone(item.status),
            `/admin/groups/${encodeURIComponent(item.slug)}`,
            undefined,
            groupDetails,
          );
        }),
      };
    }
    case "courses": {
      type Course = {
        category: string;
        featured: boolean;
        formatLabel?: string | null;
        id: string;
        slug: string;
        title: string;
        level?: string | null;
        status: string;
        duration?: string | null;
        schedule?: string | null;
      };
      const nodes = await allNodes<Course>(AdminCoursesDocument, "adminCourses", { language });
      return {
        metrics: [
          {
            label: directory.publishedLabel,
            value: String(nodes.filter((item) => item.status === "PUBLISHED").length),
          },
          {
            label: directory.featuredLabel,
            value: String(nodes.filter((item) => item.featured).length),
          },
        ],
        records: nodes.map((item) =>
          withFields(
            record(
              item.id,
              item.title,
              [item.level, item.duration].filter(Boolean).join(" · ") || "—",
              getAdminStatusLabel(locale, item.status),
              tone(item.status),
              "/admin/courses",
            ),
            [
              field("level", directory.levelLabel, item.level ?? "—"),
              field("duration", directory.durationLabel, item.duration ?? "—"),
              field("format", directory.formatLabel, item.formatLabel ?? "—"),
              field("schedule", directory.scheduleLabel, item.schedule ?? "—"),
            ],
          ),
        ),
      };
    }
    case "events": {
      type Event = {
        capacity?: number | null;
        id: string;
        slug: string;
        title: string;
        location?: string | null;
        startsAt: string;
        status: string;
        timelineStatus: string;
      };
      const nodes = await allNodes<Event>(AdminEventsDocument, "adminEvents", { language });
      return {
        metrics: [
          {
            label: directory.upcomingLabel,
            value: String(nodes.filter((item) => item.timelineStatus === "UPCOMING").length),
          },
          {
            label: directory.capacityLabel,
            value: String(nodes.reduce((sum, item) => sum + (item.capacity ?? 0), 0)),
          },
        ],
        records: nodes.map((item) =>
          withFields(
            record(
              item.id,
              item.title,
              `${date(item.startsAt, locale)} · ${item.location ?? "—"}`,
              getAdminStatusLabel(locale, item.status),
              tone(item.status),
              `/admin/events/${encodeURIComponent(item.slug)}`,
            ),
            [
              field("date", directory.dateLabel, date(item.startsAt, locale)),
              field("location", directory.locationLabel, item.location ?? "—"),
              field("capacity", directory.capacityLabel, item.capacity?.toString() ?? "—"),
              field(
                "timeline",
                directory.timelineLabel,
                getAdminStatusLabel(locale, item.timelineStatus),
              ),
            ],
          ),
        ),
      };
    }
    case "schedule": {
      const now = new Date();
      const from = new Date(now);
      from.setDate(from.getDate() - 30);
      const to = new Date(now);
      to.setDate(to.getDate() + 90);
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
      const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tashkent" }).format(now);
      return {
        metrics: [
          { label: operations.totalLessonsLabel, value: String(data.adminSchedule.length) },
          {
            label: operations.todayLabel,
            value: String(
              data.adminSchedule.filter(
                (item) =>
                  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tashkent" }).format(
                    new Date(item.startsAt),
                  ) === today,
              ).length,
            ),
          },
        ],
        records: data.adminSchedule.map((item) =>
          withFields(
            record(
              item.id,
              item.translations.find((entry) => entry.language === language)?.title ?? item.groupId,
              `${dateTime(item.startsAt, locale)} · ${item.room ?? "—"}`,
              getAdminStatusLabel(locale, item.status),
              tone(item.status),
            ),
            [
              field("date", directory.dateLabel, date(item.startsAt, locale)),
              field("start", operations.startTimeLabel, time(item.startsAt, locale)),
              field("end", operations.endTimeLabel, time(item.endsAt, locale)),
              field("room", directory.roomLabel, item.room ?? "—"),
            ],
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
      const totalAmount = nodes.reduce((sum, item) => sum + BigInt(item.amountUzs), BigInt(0));
      const outstandingAmount = nodes.reduce(
        (sum, item) => sum + BigInt(item.outstandingAmountUzs),
        BigInt(0),
      );
      return {
        metrics: [
          { label: directory.totalAmountLabel, value: uzs(totalAmount.toString(), locale) },
          { label: directory.outstandingLabel, value: uzs(outstandingAmount.toString(), locale) },
        ],
        records: nodes.map((item) =>
          withFields(
            record(
              item.chargeId,
              item.studentDisplayName,
              `${item.groupName} · ${uzs(item.amountUzs, locale)} · ${date(item.billingMonth, locale)}`,
              getAdminStatusLabel(locale, item.status),
              tone(item.status),
              `/admin/payments/${encodeURIComponent(item.chargeId)}`,
            ),
            [
              field("group", directory.groupLabel, item.groupName),
              field("month", directory.billingMonthLabel, date(item.billingMonth, locale)),
              field("due", directory.dueDateLabel, date(item.dueDate, locale)),
              field("amount", directory.amountLabel, uzs(item.amountUzs, locale)),
              field(
                "outstanding",
                directory.outstandingLabel,
                uzs(item.outstandingAmountUzs, locale),
              ),
            ],
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
