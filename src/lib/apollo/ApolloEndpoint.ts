function getGraphqlUrl(baseUrl: string): string {
  return `${baseUrl.replace(/\/graphql\/?$/, "").replace(/\/$/, "")}/graphql`;
}

export function getApolloGraphqlUrl(): string {
  if (typeof window !== "undefined") return "/best-api/graphql";
  return getGraphqlUrl(process.env.BEST_API_INTERNAL_URL ?? "http://127.0.0.1:4000");
}
