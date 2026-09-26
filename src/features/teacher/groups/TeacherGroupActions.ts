"use server";

import { auth } from "@/Auth";
import {
  TeacherCreateGroupDocument,
  TeacherCreateStudentInGroupDocument,
  TeacherDeleteGroupDocument,
  TeacherDeleteStudentDocument,
  TeacherSetStudentParticipationStatusDocument,
  TeacherUpdateGroupDocument,
  type CreateTeacherGroupInput,
  type TeacherCreateStudentInGroupInput,
  type TeacherCreateStudentInGroupMutation,
  type TeacherCreateGroupMutation,
  type TeacherDeleteGroupMutation,
  type TeacherDeleteStudentMutation,
  type TeacherDeleteStudentInput,
  type SetGroupMembershipParticipationStatusInput,
  type TeacherSetStudentParticipationStatusMutation,
  type TeacherUpdateGroupMutation,
  type UpdateTeacherGroupInput,
} from "@/gql/graphql";
import { PublicApiError } from "@/lib/ApiError";
import { executeApolloMutation } from "@/lib/apollo/ApolloServerClient";

const TEACHER_SCHEDULE_CONFLICT_MESSAGE =
  "The teacher already has an active group during this time";

function getGroupWriteErrorCode(error: unknown) {
  if (!(error instanceof PublicApiError)) return "FAILED" as const;
  if (error.code === "NOT_FOUND") return "NOT_FOUND" as const;
  if (error.code !== "CONFLICT") return "FAILED" as const;
  return error.message.includes(TEACHER_SCHEDULE_CONFLICT_MESSAGE)
    ? ("SCHEDULE_CONFLICT" as const)
    : ("CONFLICT" as const);
}

export async function createConnectedTeacherGroup(input: CreateTeacherGroupInput) {
  try {
    const session = await auth();
    if (session?.bestApi?.role !== "TEACHER" || !session.bestApi.accessToken) {
      return { ok: false as const, code: "UNAUTHORIZED" };
    }
    const data = await executeApolloMutation<
      TeacherCreateGroupMutation,
      { input: CreateTeacherGroupInput }
    >(
      TeacherCreateGroupDocument,
      { input },
      { accessToken: session.bestApi.accessToken, cache: "no-store" },
    );
    return { ok: true as const, group: data.createTeacherGroup.group };
  } catch (error) {
    return {
      ok: false as const,
      code: getGroupWriteErrorCode(error),
    };
  }
}

export async function updateConnectedTeacherGroup(input: UpdateTeacherGroupInput) {
  try {
    const session = await auth();
    if (session?.bestApi?.role !== "TEACHER" || !session.bestApi.accessToken) {
      return { ok: false as const, code: "UNAUTHORIZED" };
    }
    const data = await executeApolloMutation<
      TeacherUpdateGroupMutation,
      { input: UpdateTeacherGroupInput }
    >(
      TeacherUpdateGroupDocument,
      { input },
      { accessToken: session.bestApi.accessToken, cache: "no-store" },
    );
    return { ok: true as const, group: data.updateTeacherGroup.group };
  } catch (error) {
    return {
      ok: false as const,
      code: getGroupWriteErrorCode(error),
    };
  }
}

export async function deleteConnectedTeacherGroup(groupId: string) {
  try {
    const session = await auth();
    if (session?.bestApi?.role !== "TEACHER" || !session.bestApi.accessToken) {
      return { ok: false as const, code: "UNAUTHORIZED" };
    }
    const data = await executeApolloMutation<TeacherDeleteGroupMutation, { groupId: string }>(
      TeacherDeleteGroupDocument,
      { groupId },
      { accessToken: session.bestApi.accessToken, cache: "no-store" },
    );
    return { ok: true as const, group: data.deleteTeacherGroup.group };
  } catch (error) {
    return {
      ok: false as const,
      code: error instanceof PublicApiError && error.code === "CONFLICT" ? "CONFLICT" : "FAILED",
    };
  }
}

export async function createConnectedStudentInGroup(input: TeacherCreateStudentInGroupInput) {
  try {
    const session = await auth();
    if (session?.bestApi?.role !== "TEACHER" || !session.bestApi.accessToken) {
      return { ok: false as const, code: "UNAUTHORIZED" };
    }
    const data = await executeApolloMutation<
      TeacherCreateStudentInGroupMutation,
      { input: TeacherCreateStudentInGroupInput }
    >(
      TeacherCreateStudentInGroupDocument,
      { input },
      { accessToken: session.bestApi.accessToken, cache: "no-store" },
    );
    return { ok: true as const, membership: data.teacherCreateStudentInGroup.membership };
  } catch (error) {
    return {
      ok: false as const,
      code: error instanceof PublicApiError ? (error.code ?? "FAILED") : "FAILED",
      field:
        error instanceof PublicApiError &&
        (error.code === "CONFLICT" || error.code === "BAD_USER_INPUT")
          ? (["firstName", "lastName", "phone", "email", "password"] as const).find((field) =>
              error.message.includes(field),
            )
          : undefined,
    };
  }
}

export async function deleteConnectedTeacherStudent(input: TeacherDeleteStudentInput) {
  try {
    const session = await auth();
    if (session?.bestApi?.role !== "TEACHER" || !session.bestApi.accessToken) {
      return { ok: false as const, code: "UNAUTHORIZED" };
    }
    const data = await executeApolloMutation<
      TeacherDeleteStudentMutation,
      { input: TeacherDeleteStudentInput }
    >(
      TeacherDeleteStudentDocument,
      { input },
      { accessToken: session.bestApi.accessToken, cache: "no-store" },
    );
    return { ok: true as const, membership: data.teacherDeleteStudent.membership };
  } catch (error) {
    return {
      ok: false as const,
      code: error instanceof PublicApiError ? (error.code ?? "FAILED") : "FAILED",
    };
  }
}

export async function setConnectedTeacherStudentParticipationStatus(
  input: SetGroupMembershipParticipationStatusInput,
) {
  try {
    const session = await auth();
    if (session?.bestApi?.role !== "TEACHER" || !session.bestApi.accessToken) {
      return { ok: false as const, code: "UNAUTHORIZED" };
    }
    const data = await executeApolloMutation<
      TeacherSetStudentParticipationStatusMutation,
      { input: SetGroupMembershipParticipationStatusInput }
    >(
      TeacherSetStudentParticipationStatusDocument,
      { input },
      { accessToken: session.bestApi.accessToken, cache: "no-store" },
    );
    return {
      ok: true as const,
      membership: data.setGroupMembershipParticipationStatus.membership,
    };
  } catch (error) {
    return {
      ok: false as const,
      code: error instanceof PublicApiError ? (error.code ?? "FAILED") : "FAILED",
    };
  }
}
