import { print, type DocumentNode } from "graphql";

import { PublicApiError } from "@/lib/ApiError";

export { PublicApiError } from "@/lib/ApiError";

type GraphqlResponse<TResult> = {
  data?: TResult;
  errors?: Array<{ extensions?: { code?: string }; message?: string }>;
};

function getGraphqlUrl(baseUrl: string): string {
  return `${baseUrl.replace(/\/graphql\/?$/, "").replace(/\/$/, "")}/graphql`;
}

export async function executePublicApi<TResult, TVariables>(
  document: DocumentNode,
  variables: TVariables,
  options: { accessToken?: string; cache?: RequestCache; revalidate?: number } = {},
): Promise<TResult> {
  const baseUrl =
    typeof window === "undefined"
      ? (process.env.BEST_API_INTERNAL_URL ?? "http://127.0.0.1:4000")
      : "/best-api";
  let response: Response;
  try {
    response = await fetch(getGraphqlUrl(baseUrl), {
      body: JSON.stringify({ query: print(document), variables }),
      cache: options.cache,
      headers: {
        ...(options.accessToken ? { authorization: `Bearer ${options.accessToken}` } : {}),
        "content-type": "application/json",
      },
      method: "POST",
      ...(options.revalidate === undefined ? {} : { next: { revalidate: options.revalidate } }),
    });
  } catch {
    throw new PublicApiError("API service unavailable.", "SERVICE_UNAVAILABLE");
  }
  let payload: GraphqlResponse<TResult>;
  try {
    payload = (await response.json()) as GraphqlResponse<TResult>;
  } catch {
    throw new PublicApiError(
      "API returned an unreadable response.",
      response.status >= 500 ? "SERVICE_UNAVAILABLE" : undefined,
    );
  }
  const error = payload.errors?.[0];
  const message = error?.message;

  if (!response.ok || payload.data === undefined || message) {
    throw new PublicApiError(
      message ?? `Public API request failed (${response.status}).`,
      response.status >= 500 ? "SERVICE_UNAVAILABLE" : error?.extensions?.code,
    );
  }

  return payload.data;
}
