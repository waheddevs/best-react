import { toPublicApiError } from "@/lib/apollo/ApolloError";

export function getTeacherTestAuthoringError(error: unknown, fallback: string): string {
  const apiError = toPublicApiError(error);

  // Only expose expected, teacher-facing validation messages, never internal failures.
  if (apiError.code === "BAD_USER_INPUT" || apiError.code === "CONFLICT") {
    return `${fallback} ${apiError.message}`;
  }

  return fallback;
}
