import "server-only";

import { auth } from "@/Auth";
import type { Locale } from "@/config/Locales";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";
import { getTeacherSpeakingCopy } from "@/dictionaries/teacher/TeacherSpeaking";
import { PublicApiError } from "@/lib/ApiError";
import { redirect } from "next/navigation";
import {
  TeacherGroupDocument,
  TeacherGroupOverviewDataDocument,
  TeacherGroupRosterDataDocument,
  TeacherGroupsDocument,
  TeacherGroupTestPapersDocument,
  TeacherPracticeTestDocument,
  TeacherObjectivePracticeDocument,
  TeacherSpeakingPracticeDocument,
  TeacherTestAuthoringDraftDocument,
  TeacherTestAuthoringVersionFieldsFragmentDoc,
  TeacherSpeakingAttemptReviewDocument,
  TeacherWritingPracticeDocument,
  TeacherStudentAttemptsDocument,
  type TeacherSpeakingAttemptReviewQuery,
  type TeacherStudentAttemptsQuery,
  type TeacherGroupQuery,
  type TeacherGroupOverviewDataQuery,
  type TeacherGroupRosterDataQuery,
  type TeacherGroupsQuery,
  type TeacherGroupTestPapersQuery,
  type TeacherPracticeTestQuery,
  type TeacherObjectivePracticeQuery,
  type TeacherSpeakingPracticeQuery,
  type TeacherWritingPracticeQuery,
  type TeacherTestAuthoringDraftQuery,
} from "@/gql/graphql";
import { useFragment as readFragment } from "@/gql/fragment-masking";
import { executeApolloQuery } from "@/lib/apollo/ApolloServerClient";
import type {
  TeacherGroup,
  TeacherGroupOverviewMetrics,
  TeacherGroupRosterSummary,
  TeacherLearner,
} from "@/types/teacher/Teacher";
import type { TeacherSpeakingSessionContent } from "@/types/teacher/TeacherSpeaking";
import type { TeacherWritingSessionContent } from "@/types/teacher/TeacherWriting";
import type { TeacherObjectivePracticeContent } from "@/types/teacher/TeacherObjectivePractice";

type GroupNode = TeacherGroupQuery["teacherGroup"];
type RosterNode = TeacherGroupRosterDataQuery["teacherGroupRoster"]["edges"][number]["node"];

function speakingLongTurn(prompt: string) {
  const [lead, detail = ""] = prompt.split(/\.\s+(?=Say\s+)/, 2);
  const points = detail
    .replace(/^Say\s+/i, "")
    .replace(/\.$/, "")
    .split(/,\s*(?:and\s+)?/)
    .map((point) => point.trim())
    .filter(Boolean);
  return {
    points,
    prompt: lead.endsWith(".") ? lead : `${lead}.`,
  };
}

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
    monthlyTuitionUzs: group.monthlyTuitionUzs === null ? null : Number(group.monthlyTuitionUzs),
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
    email: member.email,
    endedAt: member.endedAt,
    groupSlug: groupId,
    id: member.studentId,
    initials: learnerInitials(member.displayName),
    membershipId: member.membershipId,
    name: member.displayName,
    paidAmountUzs: Number(member.paidAmountUzs),
    paymentHistory: member.recentPayments.map((payment) => ({
      amountUzs: Number(payment.amountUzs),
      id: payment.id,
      paidAt: payment.paidAt,
    })),
    phone: member.phone ?? "—",
    startedAt: member.startedAt,
    status: mapRosterStatus(member.rosterStatus),
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
): Promise<{ metrics: TeacherGroupOverviewMetrics; rosterSummary: TeacherGroupRosterSummary }> {
  const accessToken = await teacherToken(locale);
  const data: TeacherGroupOverviewDataQuery = await executeApolloQuery<
    TeacherGroupOverviewDataQuery,
    { groupId: string }
  >(TeacherGroupOverviewDataDocument, { groupId }, { accessToken, cache: "no-store" });
  const overview = data.teacherGroupOverview;
  const roster = data.teacherGroupRosterSummary;
  return {
    metrics: {
      activeAssignments: overview.activeAssignmentCount,
      materials: overview.materialCount,
      scheduledTests: overview.scheduledTestCount,
      students: overview.currentStudentCount,
    },
    rosterSummary: {
      active: roster.active,
      debtor: roster.debtors,
      departed: roster.departed,
      historicalTotal: roster.historicalTotal,
      paused: roster.paused,
      total: roster.currentTotal,
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

export async function loadConnectedTeacherGroupTestPapers(
  locale: Locale,
  groupId: string,
  page: number,
): Promise<TeacherGroupTestPapersQuery["teacherTestPapers"]> {
  const accessToken = await teacherToken(locale);
  const data = await executeApolloQuery<
    TeacherGroupTestPapersQuery,
    { groupId: string; page: number }
  >(TeacherGroupTestPapersDocument, { groupId, page }, { accessToken, cache: "no-store" });
  return data.teacherTestPapers;
}

export async function loadConnectedTeacherPractice(
  locale: Locale,
  groupId: string,
  practiceNumber: number,
) {
  const accessToken = await teacherToken(locale);
  try {
    const data = await executeApolloQuery<
      TeacherPracticeTestQuery,
      { groupId: string; practiceNumber: number }
    >(TeacherPracticeTestDocument, { groupId, practiceNumber }, { accessToken, cache: "no-store" });
    return data.teacherTestPaper;
  } catch (error) {
    if (error instanceof PublicApiError && error.code === "NOT_FOUND") return null;
    throw error;
  }
}

export async function loadConnectedTeacherObjectivePractice(
  locale: Locale,
  testVersionId: string,
): Promise<TeacherObjectivePracticeContent | null> {
  const accessToken = await teacherToken(locale);
  const data = await executeApolloQuery<TeacherObjectivePracticeQuery, { testVersionId: string }>(
    TeacherObjectivePracticeDocument,
    { testVersionId },
    { accessToken, cache: "no-store" },
  );
  const version = data.teacherTestVersion;
  if (version.status !== "PUBLISHED") return null;

  const title =
    version.translations.find(({ language }) => language === version.primaryLanguage)?.title ??
    "Practice test";
  const questions = version.questions
    .map((question) => {
      const prompt = question.translations.find(
        ({ language }) => language === version.primaryLanguage,
      )?.prompt;
      if (!prompt?.trim() || question.sectionPosition === null) return null;
      return {
        id: question.id,
        options: question.options
          .map((option) => ({
            id: option.id,
            position: option.position,
            text:
              option.translations.find(({ language }) => language === version.primaryLanguage)
                ?.text ?? "",
          }))
          .filter(({ text }) => Boolean(text.trim()))
          .sort((left, right) => left.position - right.position),
        position: question.position,
        prompt,
        sectionPosition: question.sectionPosition,
      };
    })
    .filter((question) => question !== null)
    .sort((left, right) => left.position - right.position);

  const sections = version.sections
    .map((section) => {
      const translation = section.translations.find(
        ({ language }) => language === version.primaryLanguage,
      );
      if (!translation?.title.trim() || !translation.instructions.trim()) return null;
      return {
        content: translation.content,
        id: section.id,
        instructions: translation.instructions,
        mediaObjectId: section.mediaObjectId,
        position: section.position,
        questions: questions.filter(({ sectionPosition }) => sectionPosition === section.position),
        title: translation.title,
      };
    })
    .filter((section) => section !== null)
    .sort((left, right) => left.position - right.position);

  if (sections.length === 0 || questions.length === 0) return null;
  return {
    durationMinutes: version.durationMinutes,
    publishedAt: version.publishedAt ?? null,
    sections,
    title,
  };
}

export async function loadConnectedTeacherTestAuthoringVersion(
  locale: Locale,
  testVersionId: string,
) {
  const accessToken = await teacherToken(locale);
  const data = await executeApolloQuery<TeacherTestAuthoringDraftQuery, { testVersionId: string }>(
    TeacherTestAuthoringDraftDocument,
    { testVersionId },
    { accessToken, cache: "no-store" },
  );
  return readFragment(TeacherTestAuthoringVersionFieldsFragmentDoc, data.teacherTestVersion);
}

export async function loadConnectedTeacherSpeakingPractice(
  locale: Locale,
  testVersionId: string,
): Promise<TeacherSpeakingSessionContent | null> {
  const accessToken = await teacherToken(locale);
  const data = await executeApolloQuery<TeacherSpeakingPracticeQuery, { testVersionId: string }>(
    TeacherSpeakingPracticeDocument,
    { testVersionId },
    { accessToken, cache: "no-store" },
  );
  const version = data.teacherTestVersion;
  const questions = version.questions
    .map((question) => ({
      position: question.position,
      sectionPosition: question.sectionPosition,
      prompt:
        question.translations.find(
          (translation) => translation.language === version.primaryLanguage,
        )?.prompt ?? null,
    }))
    .filter(
      (question): question is { position: number; prompt: string; sectionPosition: number } =>
        Boolean(question.prompt?.trim()) && question.sectionPosition !== null,
    )
    .sort((left, right) => left.position - right.position);
  const part1Questions = questions.filter(({ sectionPosition }) => sectionPosition === 1);
  const part2Questions = questions.filter(({ sectionPosition }) => sectionPosition === 2);
  const part3Questions = questions.filter(({ sectionPosition }) => sectionPosition === 3);
  if (
    version.status !== "PUBLISHED" ||
    part1Questions.length !== 4 ||
    part2Questions.length !== 1 ||
    part3Questions.length !== 4
  ) {
    return null;
  }

  const copy = getTeacherSpeakingCopy(locale);
  const longTurn = speakingLongTurn(part2Questions[0].prompt);
  return {
    partCount: 3,
    prompts: {
      part1: {
        questions: part1Questions.map(({ prompt }) => prompt),
        topic: copy.part1Label,
      },
      part2: { followUp: "", ...longTurn },
      part3: {
        questions: part3Questions.map(({ prompt }) => prompt),
        topic: copy.part3Label,
      },
    },
    publishedAt: version.publishedAt ?? null,
    questionCount: questions.length,
  };
}

export async function loadConnectedTeacherWritingPractice(
  locale: Locale,
  testVersionId: string,
): Promise<TeacherWritingSessionContent | null> {
  const accessToken = await teacherToken(locale);
  const data = await executeApolloQuery<TeacherWritingPracticeQuery, { testVersionId: string }>(
    TeacherWritingPracticeDocument,
    { testVersionId },
    { accessToken, cache: "no-store" },
  );
  const version = data.teacherTestVersion;
  const questions = version.questions
    .map((question) => ({
      position: question.position,
      sectionPosition: question.sectionPosition,
      prompt:
        question.translations.find(
          (translation) => translation.language === version.primaryLanguage,
        )?.prompt ?? null,
    }))
    .filter(
      (question): question is { position: number; prompt: string; sectionPosition: number } =>
        Boolean(question.prompt?.trim()) && question.sectionPosition !== null,
    )
    .sort(
      (left, right) =>
        left.sectionPosition - right.sectionPosition || left.position - right.position,
    );
  const sections = version.sections
    .map((section) => {
      const translation = section.translations.find(
        (item) => item.language === version.primaryLanguage,
      );
      return {
        content: translation?.content ?? null,
        instructions: translation?.instructions ?? null,
        position: section.position,
        title: translation?.title ?? null,
      };
    })
    .filter(
      (
        section,
      ): section is {
        content: string | null;
        instructions: string;
        position: number;
        title: string;
      } => Boolean(section.instructions?.trim()) && Boolean(section.title?.trim()),
    )
    .sort((left, right) => left.position - right.position);
  if (version.status !== "PUBLISHED" || questions.length !== 2 || sections.length !== 2) {
    return null;
  }

  return {
    durationMinutes: version.durationMinutes ?? 60,
    publishedAt: version.publishedAt ?? null,
    tasks: questions.map((question) => {
      const section = sections.find((item) => item.position === question.sectionPosition);
      if (!section) throw new Error("Writing question section was not returned");
      return {
        content: section.content,
        instructions: section.instructions,
        minimumWords: question.sectionPosition === 1 ? 150 : 250,
        position: question.sectionPosition,
        prompt: question.prompt,
        suggestedMinutes: question.sectionPosition === 1 ? 20 : 40,
        title: section.title,
      };
    }),
  };
}

export async function loadConnectedTeacherStudentAttempts(
  locale: Locale,
  groupId: string,
  studentId: string,
): Promise<TeacherStudentAttemptsQuery["teacherStudentAttempts"]["edges"]> {
  const accessToken = await teacherToken(locale);
  const data = await executeApolloQuery<
    TeacherStudentAttemptsQuery,
    { groupId: string; language: "EN"; studentId: string }
  >(
    TeacherStudentAttemptsDocument,
    { groupId, language: "EN", studentId },
    { accessToken, cache: "no-store" },
  );
  return data.teacherStudentAttempts.edges;
}

export async function loadConnectedTeacherSpeakingAttemptReview(
  locale: Locale,
  attemptId: string,
): Promise<TeacherSpeakingAttemptReviewQuery["teacherSpeakingAttemptReview"]> {
  const accessToken = await teacherToken(locale);
  const data = await executeApolloQuery<
    TeacherSpeakingAttemptReviewQuery,
    { attemptId: string; language: "EN" }
  >(
    TeacherSpeakingAttemptReviewDocument,
    { attemptId, language: "EN" },
    { accessToken, cache: "no-store" },
  );
  return data.teacherSpeakingAttemptReview;
}
