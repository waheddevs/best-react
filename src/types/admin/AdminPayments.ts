import type { AdminOperationsQuery } from "@/gql/graphql";

export type AdminPaymentRecord = NonNullable<
  AdminOperationsQuery["adminPaymentDirectory"]
>["nodes"][number];
