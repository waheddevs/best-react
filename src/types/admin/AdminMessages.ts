import type { AdminContactRequestsQuery } from "@/gql/graphql";

export type AdminMessage =
  AdminContactRequestsQuery["adminContactRequests"]["edges"][number]["node"];
export type AdminMessageFilters = { search: string; status: string; from: string; to: string };
