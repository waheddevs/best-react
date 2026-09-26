export type TeacherLessonPlanStatus = "CANCELLED" | "COMPLETED" | "DRAFT" | "SCHEDULED";

export type TeacherLessonPlan = {
  createdAt: string;
  endsAt: string;
  groupId: string;
  id: string;
  lessonNumber: number;
  name: string;
  room: string | null;
  startsAt: string;
  status: TeacherLessonPlanStatus;
  summary: string | null;
};

export type TeacherLessonResourceKind = "MATERIAL" | "TASK";

export type TeacherLessonResource = {
  createdAt: string;
  description: string | null;
  id: string;
  kind: TeacherLessonResourceKind;
  lessonId: string | null;
  libraryItemId: string;
  mediaObjectId: string;
  mimeType: string;
  originalName: string;
  previewUrl?: string;
  sizeBytes: number | null;
  title: string;
};

export type TeacherLessonWorkspaceData = {
  categoryId: string | null;
  lessons: TeacherLessonPlan[];
  resources: TeacherLessonResource[];
};

export type TeacherLessonSchedule = {
  endsAtMinutes: number | null;
  room: string;
  scheduleDays: number[];
  startsAtMinutes: number | null;
};
