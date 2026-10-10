import "server-only";

import type { DocumentNode } from "graphql";

import { auth } from "@/Auth";
import type { Locale } from "@/config/Locales";
import { getAdminDirectoryCopy } from "@/dictionaries/admin/AdminDirectory";
import { getAdminOperationsCopy } from "@/dictionaries/admin/AdminOperations";
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
import { profileAvatarUrlsFor } from "@/lib/ProfileAvatarIntents";
import { formatAdminGroupSchedule } from "@/lib/admin/AdminGroupPresentation";
import type {
  AdminGroupRecordDetails,
  AdminNavigationKey,
  AdminWorkspaceMetric,
  AdminWorkspaceRecord,
  AdminWorkspaceRecordField,
} from "@/types/admin/AdminWorkspace";

type Connection<T> = {
  edges: Array<{ node: T }>;
  pageInfo: { endCursor?: string | null; hasNextPage: boolean };
};
type Status = AdminWorkspaceRecord["status"];
type DataResult = {
  records: AdminWorkspaceRecord[];
  metrics?: AdminWorkspaceMetric[];
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

function field(key: string, label: string, value: string): AdminWorkspaceRecordField {
  return { key, label, value };
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
            value: String(academic.activeStudentCount),
          },
          {
            href: "/admin/teachers",
            label: labels.navigation.teachers,
            tone: "navy",
            value: String(academic.activeTeacherCount),
          },
          {
            href: "/admin/requests",
            label: labels.common.openQueueLabel,
            tone: "amber",
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
      const items = [
        ...contacts.map((item) => ({ ...item, sourceLabel: directory.contactRequestsLabel })),
        ...events.map((item) => ({ ...item, sourceLabel: directory.eventRegistrationsLabel })),
        ...exams.map((item) => ({ ...item, sourceLabel: directory.examRegistrationsLabel })),
      ].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      return {
        metrics: [
          { label: directory.contactRequestsLabel, value: String(contacts.length) },
          {
            label: directory.eventRegistrationsLabel,
            value: String(events.length + exams.length),
          },
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
        studentId: string;
        displayName: string;
        currentGroupName?: string | null;
        status: string;
        averagePercentage?: number | null;
        scoredTestCount: number;
      };
      const nodes = await allNodes<Student>(AdminStudentsDocument, "adminStudents");
      const avatarUrls = await adminAvatarUrlsFor(nodes.map((item) => item.studentId));
      const scoredStudents = nodes.filter(
        (item): item is Student & { averagePercentage: number } =>
          item.averagePercentage !== null && item.averagePercentage !== undefined,
      );
      const average = scoredStudents.length
        ? `${Math.round(scoredStudents.reduce((sum, item) => sum + item.averagePercentage, 0) / scoredStudents.length)}%`
        : "—";
      return {
        metrics: [
          {
            label: directory.activeLabel,
            value: String(nodes.filter((item) => item.status === "ACTIVE").length),
          },
          { label: directory.averageLabel, value: average },
        ],
        records: nodes.map((item) =>
          withFields(
            record(
              item.studentId,
              item.displayName,
              item.currentGroupName ?? "—",
              getAdminStatusLabel(locale, item.status),
              tone(item.status),
              `/admin/students/${encodeURIComponent(item.studentId)}`,
              avatarUrls.get(item.studentId) ?? null,
            ),
            [
              field("group", directory.groupLabel, item.currentGroupName ?? "—"),
              field(
                "average",
                directory.averageLabel,
                item.averagePercentage === null || item.averagePercentage === undefined
                  ? "—"
                  : `${Math.round(item.averagePercentage)}%`,
              ),
              field("tests", directory.scoredTestsLabel, String(item.scoredTestCount)),
            ],
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
        phone?: string | null;
        teacherSubject?: string | null;
        status: string;
      };
      const nodes = await allNodes<User>(AdminUsersDocument, "adminUsers", { role: "TEACHER" });
      const avatarUrls = await adminAvatarUrlsFor(nodes.map((item) => item.id));
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
        records: nodes.map((item) =>
          withFields(
            record(
              item.id,
              item.displayName,
              [item.teacherSubject, item.branchName].filter(Boolean).join(" · ") ||
                item.email ||
                "—",
              getAdminStatusLabel(locale, item.status),
              tone(item.status),
              `/admin/teachers/${encodeURIComponent(item.id)}`,
              avatarUrls.get(item.id) ?? null,
            ),
            [
              field("subject", directory.subjectLabel, item.teacherSubject ?? "—"),
              field("branch", directory.branchLabel, item.branchName ?? "—"),
              field("email", directory.emailLabel, item.email ?? "—"),
              field("phone", directory.phoneLabel, item.phone ?? "—"),
            ],
          ),
        ),
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
              `/admin/courses/${encodeURIComponent(item.slug)}`,
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
    case "locations": {
      const data = await adminQuery<{
        adminLocations: Array<{
          room: string;
          activeGroupCount: number;
          scheduledLessonCount: number;
          nextLessonAt?: string | null;
        }>;
      }>(AdminLocationsDocument);
      const activeGroupTotal = data.adminLocations.reduce(
        (sum, item) => sum + item.activeGroupCount,
        0,
      );
      const scheduledLessonTotal = data.adminLocations.reduce(
        (sum, item) => sum + item.scheduledLessonCount,
        0,
      );
      return {
        metrics: [
          { label: directory.activeGroupsLabel, value: String(activeGroupTotal) },
          { label: directory.scheduledLessonsLabel, value: String(scheduledLessonTotal) },
        ],
        records: data.adminLocations.map((item) =>
          withFields(
            record(
              item.room,
              item.room,
              String(item.scheduledLessonCount),
              getAdminStatusLabel(locale, item.activeGroupCount ? "ACTIVE" : "INACTIVE"),
              item.activeGroupCount ? "success" : "neutral",
            ),
            [
              field("groups", directory.activeGroupsLabel, String(item.activeGroupCount)),
              field("lessons", directory.scheduledLessonsLabel, String(item.scheduledLessonCount)),
              field(
                "nextLesson",
                directory.nextLessonLabel,
                item.nextLessonAt ? date(item.nextLessonAt, locale) : "—",
              ),
            ],
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
              const lessonTitle =
                lesson.translations.find((translation) => translation.language === language)
                  ?.title ?? lesson.groupId;
              return result.adminAttendance.map((entry) =>
                withFields(
                  record(
                    entry.id,
                    entry.studentName,
                    `${lessonTitle} · ${dateTime(lesson.startsAt, locale)}`,
                    getAdminStatusLabel(locale, entry.status),
                    tone(entry.status),
                  ),
                  [
                    field("lesson", operations.lessonLabel, lessonTitle),
                    field("date", directory.dateLabel, dateTime(lesson.startsAt, locale)),
                    field("recorded", operations.recordedLabel, dateTime(entry.recordedAt, locale)),
                    field("note", operations.noteLabel, entry.note ?? "—"),
                  ],
                ),
              );
            }),
        );
        const records = rows.flat();
        return {
          metrics: [
            {
              label: getAdminStatusLabel(locale, "PRESENT"),
              value: String(records.filter((item) => item.status === "success").length),
            },
            {
              label: getAdminStatusLabel(locale, "ABSENT"),
              value: String(records.filter((item) => item.status === "danger").length),
            },
          ],
          records,
        };
      }
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
        metrics: [
          {
            label: operations.totalAttemptsLabel,
            value: String(nodes.reduce((sum, item) => sum + item.attemptCount, 0)),
          },
          {
            label: operations.awaitingReviewLabel,
            value: String(nodes.reduce((sum, item) => sum + item.awaitingReviewCount, 0)),
          },
        ],
        records: nodes.map((item) =>
          withFields(
            record(
              item.id,
              item.title,
              `${item.groupName} · ${item.questionCount}`,
              item.awaitingReviewCount
                ? `${operations.awaitingReviewLabel}: ${item.awaitingReviewCount}`
                : getAdminStatusLabel(locale, item.status),
              item.awaitingReviewCount ? "warning" : tone(item.status),
              `/admin/tests/${encodeURIComponent(item.id)}`,
            ),
            [
              field("group", directory.groupLabel, item.groupName),
              field("teacher", operations.teacherLabel, item.teacherDisplayName),
              field("questions", operations.questionCountLabel, String(item.questionCount)),
              field("attempts", operations.attemptCountLabel, String(item.attemptCount)),
            ],
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
      const averageCompletion = nodes.length
        ? Math.round(nodes.reduce((sum, item) => sum + item.completionPercentage, 0) / nodes.length)
        : 0;
      const scored = nodes.filter(
        (item): item is Progress & { averagePercentage: number } =>
          item.averagePercentage !== null && item.averagePercentage !== undefined,
      );
      const averageScore = scored.length
        ? Math.round(scored.reduce((sum, item) => sum + item.averagePercentage, 0) / scored.length)
        : 0;
      return {
        metrics: [
          { label: operations.completionLabel, value: `${averageCompletion}%` },
          { label: operations.averageScoreLabel, value: `${averageScore}%` },
        ],
        records: nodes.map((item) =>
          withFields(
            record(
              item.groupId,
              item.groupName,
              item.teacherDisplayName,
              `${item.completionPercentage}%`,
              tone(item.groupStatus),
            ),
            [
              field("teacher", operations.teacherLabel, item.teacherDisplayName),
              field("completion", operations.completionLabel, `${item.completionPercentage}%`),
              field(
                "average",
                operations.averageScoreLabel,
                item.averagePercentage === null || item.averagePercentage === undefined
                  ? "—"
                  : `${Math.round(item.averagePercentage)}%`,
              ),
            ],
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
        metrics: [
          {
            label: directory.publishedLabel,
            value: String(nodes.filter((item) => item.status === "PUBLISHED").length),
          },
          {
            label: operations.ownerLabel,
            value: String(new Set(nodes.map((item) => item.ownerName)).size),
          },
        ],
        records: nodes.map((item) =>
          withFields(
            record(
              item.id,
              item.title,
              `${item.ownerName} · ${date(item.updatedAt, locale)}`,
              getAdminStatusLabel(locale, item.status),
              tone(item.status),
              `/admin/library/${encodeURIComponent(item.id)}`,
            ),
            [
              field("owner", operations.ownerLabel, item.ownerName),
              field("updated", operations.updatedLabel, dateTime(item.updatedAt, locale)),
            ],
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
        metrics: [
          {
            label: operations.cleanFilesLabel,
            value: String(nodes.filter((item) => item.malwareStatus === "CLEAN").length),
          },
          {
            label: getAdminStatusLabel(locale, "VERIFYING"),
            value: String(nodes.filter((item) => item.malwareStatus === "VERIFYING").length),
          },
        ],
        records: nodes.map((item) =>
          withFields(
            record(
              item.id,
              item.originalName,
              `${item.mimeType} · ${date(item.createdAt, locale)}`,
              getAdminStatusLabel(locale, item.status),
              tone(`${item.status} ${item.malwareStatus}`),
              `/admin/imports/${encodeURIComponent(item.id)}`,
            ),
            [
              field("mime", operations.mimeTypeLabel, item.mimeType),
              field(
                "malware",
                operations.malwareStatusLabel,
                getAdminStatusLabel(locale, item.malwareStatus),
              ),
              field("created", operations.createdLabel, dateTime(item.createdAt, locale)),
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
        metrics: [
          {
            label: operations.actorLabel,
            value: String(new Set(nodes.map((item) => item.actorId).filter(Boolean)).size),
          },
          {
            label: operations.targetLabel,
            value: String(new Set(nodes.map((item) => item.targetType)).size),
          },
        ],
        records: nodes.map((item) =>
          withFields(
            record(
              item.id,
              item.action,
              `${item.targetType} · ${item.targetId} · ${dateTime(item.createdAt, locale)}`,
              item.reason ?? "—",
              "neutral",
            ),
            [
              field("target", operations.targetLabel, `${item.targetType} · ${item.targetId}`),
              field("actor", operations.actorLabel, item.actorId ?? "—"),
              field("created", operations.createdLabel, dateTime(item.createdAt, locale)),
              field("reason", operations.noteLabel, item.reason ?? "—"),
            ],
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
