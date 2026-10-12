import type { AdminSalaryReportQuery } from "@/gql/graphql";
export type AdminSalaryRecord = AdminSalaryReportQuery["adminSalaryReport"]["nodes"][number];
