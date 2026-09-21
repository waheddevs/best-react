"use server";

import { auth } from "@/Auth";
import {
  TeacherCreateGroupDocument,
  TeacherCreateStudentInGroupDocument,
  TeacherDeleteGroupDocument,
  TeacherUpdateGroupDocument,
  type CreateTeacherGroupInput,
  type TeacherCreateStudentInGroupInput,
  type TeacherCreateStudentInGroupMutation,
  type TeacherCreateGroupMutation,
  type TeacherDeleteGroupMutation,
  type TeacherUpdateGroupMutation,
  type UpdateTeacherGroupInput,
} from "@/gql/graphql";
import { PublicApiError } from "@/lib/ApiError";
import { executeApolloMutation } from "@/lib/apollo/ApolloServerClient";

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
      code: error instanceof PublicApiError && error.code === "CONFLICT" ? "CONFLICT" : "FAILED",
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
      code:
        error instanceof PublicApiError && error.code === "CONFLICT"
          ? "CONFLICT"
          : error instanceof PublicApiError && error.code === "NOT_FOUND"
            ? "NOT_FOUND"
            : "FAILED",
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
