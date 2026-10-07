import type { StudentGroupView } from "@/types/student/StudentGroup";

// Fictional layout-preview content; connected mode always reads PostgreSQL.
export const studentGroupPreview: StudentGroupView = {
  category: "IELTS",
  days: [1, 3, 5],
  endMinutes: 1050,
  lessons: [
    { id: "preview-1", name: "Listening practice", number: 1, material: null, task: null },
    { id: "preview-2", name: "Academic reading", number: 2, material: null, task: null },
    { id: "preview-3", name: "Writing workshop", number: 3, material: null, task: null },
  ],
  memberCount: 11,
  name: "IELTS Bridge",
  room: "204",
  startMinutes: 960,
};
