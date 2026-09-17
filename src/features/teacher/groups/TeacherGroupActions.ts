"use server";

import { auth } from "@/Auth";
import {
  TeacherCreateGroupDocument,
  TeacherDeleteGroupDocument,
  TeacherSetGroupMembershipParticipationStatusDocument,
  TeacherUpdateGroupDocument,
  type CreateTeacherGroupInput,
  type SetGroupMembershipParticipationStatusInput,
  type TeacherCreateGroupMutation,
  type TeacherDeleteGroupMutation,
  type TeacherSetGroupMembershipParticipationStatusMutation,
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

export async function setConnectedGroupMembershipParticipationStatus(
  input: SetGroupMembershipParticipationStatusInput,
) {
  try {
    const session = await auth();
    if (session?.bestApi?.role !== "TEACHER" || !session.bestApi.accessToken) {
      return { ok: false as const, code: "UNAUTHORIZED" };
    }
    const data = await executeApolloMutation<
      TeacherSetGroupMembershipParticipationStatusMutation,
      { input: SetGroupMembershipParticipationStatusInput }
    >(
      TeacherSetGroupMembershipParticipationStatusDocument,
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
