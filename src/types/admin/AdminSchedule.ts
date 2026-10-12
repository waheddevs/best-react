import type { AdminOperationsQuery } from "@/gql/graphql";

export type AdminScheduleLesson = NonNullable<
  AdminOperationsQuery["adminLessonDirectory"]
>["nodes"][number];
export type AdminScheduleOptions = AdminOperationsQuery["adminDirectoryOptions"];
export type AdminScheduleView = "day" | "week";
export type AdminScheduleSegment = {
  lesson: AdminScheduleLesson;
  start: number;
  end: number;
  column: number;
  columns: number;
};
