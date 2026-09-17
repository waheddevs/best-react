import { CombinedGraphQLErrors } from "@apollo/client";

import { PublicApiError } from "@/lib/ApiError";

export function toPublicApiError(error: unknown): PublicApiError {
  if (error instanceof PublicApiError) return error;

  if (CombinedGraphQLErrors.is(error)) {
    const graphqlError = error.errors[0];
    const code = graphqlError?.extensions?.code;
    return new PublicApiError(
      graphqlError?.message ?? "GraphQL operation failed.",
      typeof code === "string" ? code : undefined,
    );
  }

  return new PublicApiError("API service unavailable.", "SERVICE_UNAVAILABLE");
}
