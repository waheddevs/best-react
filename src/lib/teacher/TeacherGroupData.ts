import "server-only";

import { auth } from "@/Auth";
import type { Locale } from "@/config/Locales";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";
import { redirect } from "next/navigation";
import {
  TeacherGroupDocument,
  TeacherGroupOverviewDataDocument,
  TeacherGroupRosterDataDocument,
  TeacherGroupsDocument,
  type TeacherGroupQuery,
  type TeacherGroupOverviewDataQuery,
  type TeacherGroupRosterDataQuery,
  type TeacherGroupsQuery,
} from "@/gql/graphql";
import { executeApolloQuery } from "@/lib/apollo/ApolloServerClient";
import type {
  TeacherGroup,
  TeacherGroupOverviewLesson,
  TeacherGroupOverviewMetrics,
  TeacherGroupRosterSummary,
  TeacherLearner,
} from "@/types/teacher/Teacher";

type GroupNode = TeacherGroupQuery["teacherGroup"];
type OverviewLessonNode =
  TeacherGroupOverviewDataQuery["teacherGroupLessons"]["edges"][number]["node"];
type RosterNode = TeacherGroupRosterDataQuery["teacherGroupRoster"]["edges"][number]["node"];

async function teacherToken(locale: Locale): Promise<string> {
  const session = await auth();
  if (session?.bestApi?.role !== "TEACHER" || !session.bestApi.accessToken) {
    redirect(`/${locale}/login?role=teacher`);
  }
  return session.bestApi.accessToken;
}

function formatMinutes(value: number | null | undefined): string {
  if (value == null) return "—";
  return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
}

function mapGroup(group: GroupNode): TeacherGroup {
  const lessonDays = Object.fromEntries(
    (["uz", "ru", "en"] as const).map((locale) => [
      locale,
      group.scheduleDays
        .map((day) => getTeacherCopy(locale).groups.weekdays[day - 1])
        .join(" / ") || "—",
    ]),
  ) as TeacherGroup["lessonDays"];
  return {
    attendance: null,
    category:
      group.category === "IELTS"
        ? "ielts"
        : group.category === "CEFR"
          ? "cefr"
          : group.category === "GENERAL_ENGLISH"
            ? "generalEnglish"
            : null,
    id: group.id,
    learnerCount: group.activeStudentCount,
    lessonDays,
    scheduleDays: group.scheduleDays,
    startsAtMinutes: group.startsAtMinutes ?? null,
    endsAtMinutes: group.endsAtMinutes ?? null,
    name: group.name,
    recordSlug: group.slug,
    room: group.room ?? "—",
    slug: group.id,
    time:
      group.startsAtMinutes == null || group.endsAtMinutes == null
        ? "—"
        : `${formatMinutes(group.startsAtMinutes)}–${formatMinutes(group.endsAtMinutes)}`,
  };
}

function mapRosterStatus(status: RosterNode["rosterStatus"]): TeacherLearner["status"] {
  if (status === "PAUSED") return "paused";
  if (status === "DEBTOR") return "debtor";
  if (status === "DEPARTED") return "departed";
  return "active";
}

function learnerInitials(displayName: string): string {
  const names = displayName.trim().split(/\s+/);
  return `${names[0]?.[0] ?? "B"}${names[1]?.[0] ?? "L"}`.toUpperCase();
}

function mapRosterMember(groupId: string, member: RosterNode): TeacherLearner {
  const balance = Number(member.outstandingBalanceUzs);
  return {
    balance: Number.isSafeInteger(balance) ? balance : 0,
    groupSlug: groupId,
    id: member.studentId,
    initials: learnerInitials(member.displayName),
    membershipId: member.membershipId,
    name: member.displayName,
    phone: member.phone ?? "—",
    status: mapRosterStatus(member.rosterStatus),
    taskProgress: null,
  };
}

function tashkentDateTime(value: string): { date: string; time: string } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Tashkent",
    year: "numeric",
  }).formatToParts(new Date(value));
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((entry) => entry.type === type)?.value ?? "";
  return {
    date: `${part("year")}-${part("month")}-${part("day")}`,
    time: `${part("hour")}:${part("minute")}`,
  };
}

function mapOverviewLesson(lesson: OverviewLessonNode): TeacherGroupOverviewLesson | null {
  if (lesson.status !== "SCHEDULED" && lesson.status !== "COMPLETED") return null;
  const fallbackTitle = lesson.translations[0]?.title ?? "—";
  const topic = Object.fromEntries(
    (["uz", "ru", "en"] as const).map((locale) => {
      const language = locale.toUpperCase();
      const translation = lesson.translations.find((entry) => entry.language === language);
      return [locale, translation?.title ?? fallbackTitle];
    }),
  ) as TeacherGroupOverviewLesson["topic"];
  const startsAt = tashkentDateTime(lesson.startsAt);
  const endsAt = tashkentDateTime(lesson.endsAt);
  return {
    date: startsAt.date,
    endsAt: endsAt.time,
    id: lesson.id,
    room: lesson.room ?? "—",
    startsAt: startsAt.time,
    status: lesson.status === "COMPLETED" ? "completed" : "planned",
    topic,
  };
}

export async function loadConnectedTeacherGroups(locale: Locale): Promise<TeacherGroup[]> {
  const accessToken = await teacherToken(locale);
  const groups: TeacherGroupsQuery["teacherGroups"]["edges"][number]["node"][] = [];
  let after: string | null = null;
  do {
    const data: TeacherGroupsQuery = await executeApolloQuery<
      TeacherGroupsQuery,
      { after: string | null; first: number }
    >(TeacherGroupsDocument, { after, first: 100 }, { accessToken, cache: "no-store" });
    groups.push(...data.teacherGroups.edges.map(({ node }) => node));
    if (!data.teacherGroups.pageInfo.hasNextPage) break;
    const next: string | null = data.teacherGroups.pageInfo.endCursor;
    if (!next || next === after) throw new Error("Invalid teacher groups cursor");
    after = next;
  } while (true);
  return groups.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map(mapGroup);
}

export async function loadConnectedTeacherGroup(
  locale: Locale,
  groupId: string,
): Promise<TeacherGroup> {
  const accessToken = await teacherToken(locale);
  const data = await executeApolloQuery<TeacherGroupQuery, { groupId: string }>(
    TeacherGroupDocument,
    { groupId },
    { accessToken, cache: "no-store" },
  );
  return mapGroup(data.teacherGroup);
}

export async function loadConnectedTeacherGroupOverview(
  locale: Locale,
  groupId: string,
): Promise<{ lessons: TeacherGroupOverviewLesson[]; metrics: TeacherGroupOverviewMetrics }> {
  const accessToken = await teacherToken(locale);
  const lessons: OverviewLessonNode[] = [];
  let after: string | null = null;
  let overview: TeacherGroupOverviewDataQuery["teacherGroupOverview"] | undefined;
  do {
    const data: TeacherGroupOverviewDataQuery = await executeApolloQuery<
      TeacherGroupOverviewDataQuery,
      { after: string | null; first: number; groupId: string }
    >(
      TeacherGroupOverviewDataDocument,
      { after, first: 100, groupId },
      { accessToken, cache: "no-store" },
    );
    overview ??= data.teacherGroupOverview;
    lessons.push(...data.teacherGroupLessons.edges.map(({ node }) => node));
    if (!data.teacherGroupLessons.pageInfo.hasNextPage) break;
    const next = data.teacherGroupLessons.pageInfo.endCursor;
    if (!next || next === after) throw new Error("Invalid teacher group lessons cursor");
    after = next;
  } while (true);
  if (!overview) throw new Error("Teacher group overview was not returned");
  return {
    lessons: lessons
      .sort((left, right) => left.startsAt.localeCompare(right.startsAt))
      .map(mapOverviewLesson)
      .filter((lesson): lesson is TeacherGroupOverviewLesson => lesson !== null),
    metrics: {
      activeAssignments: overview.activeAssignmentCount,
      materials: overview.materialCount,
      scheduledTests: overview.scheduledTestCount,
      students: overview.currentStudentCount,
    },
  };
}

export async function loadConnectedTeacherGroupRoster(
  locale: Locale,
  groupId: string,
): Promise<{ learners: TeacherLearner[]; summary: TeacherGroupRosterSummary }> {
  const accessToken = await teacherToken(locale);
  const members: RosterNode[] = [];
  let after: string | null = null;
  let rosterSummary: TeacherGroupRosterDataQuery["teacherGroupRosterSummary"] | undefined;
  do {
    const data: TeacherGroupRosterDataQuery = await executeApolloQuery<
      TeacherGroupRosterDataQuery,
      { after: string | null; first: number; groupId: string }
    >(
      TeacherGroupRosterDataDocument,
      { after, first: 100, groupId },
      { accessToken, cache: "no-store" },
    );
    rosterSummary ??= data.teacherGroupRosterSummary;
    members.push(...data.teacherGroupRoster.edges.map(({ node }) => node));
    if (!data.teacherGroupRoster.pageInfo.hasNextPage) break;
    const next = data.teacherGroupRoster.pageInfo.endCursor;
    if (!next || next === after) throw new Error("Invalid teacher group roster cursor");
    after = next;
  } while (true);
  if (!rosterSummary) throw new Error("Teacher group roster summary was not returned");
  return {
    learners: members.map((member) => mapRosterMember(groupId, member)),
    summary: {
      active: rosterSummary.active,
      debtor: rosterSummary.debtors,
      departed: rosterSummary.departed,
      historicalTotal: rosterSummary.historicalTotal,
      paused: rosterSummary.paused,
      total: rosterSummary.currentTotal,
    },
  };
}
