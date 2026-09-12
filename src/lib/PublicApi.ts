import { print, type DocumentNode } from "graphql";

type GraphqlResponse<TResult> = {
  data?: TResult;
  errors?: Array<{ message?: string }>;
};

export class PublicApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PublicApiError";
  }
}

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
  const response = await fetch(getGraphqlUrl(baseUrl), {
    body: JSON.stringify({ query: print(document), variables }),
    cache: options.cache,
    headers: {
      ...(options.accessToken ? { authorization: `Bearer ${options.accessToken}` } : {}),
      "content-type": "application/json",
    },
    method: "POST",
    ...(options.revalidate === undefined ? {} : { next: { revalidate: options.revalidate } }),
  });
  const payload = (await response.json()) as GraphqlResponse<TResult>;
  const message = payload.errors?.[0]?.message;

  if (!response.ok || payload.data === undefined || message) {
    throw new PublicApiError(message ?? `Public API request failed (${response.status}).`);
  }

  return payload.data;
}
