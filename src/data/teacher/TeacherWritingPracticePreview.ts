import type { TeacherWritingSessionContent } from "@/types/teacher/TeacherWriting";

// Fictional preview content used only when the Teacher workspace is in preview mode.
export const teacherWritingPracticePreview: TeacherWritingSessionContent = {
  durationMinutes: 60,
  publishedAt: null,
  tasks: [
    {
      content:
        "A town library recorded annual visits to four services in 2016 and 2026. Book lending changed from 84,000 to 71,000; study-space visits rose from 39,000 to 68,000; digital-support appointments increased from 8,000 to 31,000; and children's events rose from 14,000 to 27,000.",
      instructions: "Spend about 20 minutes on this task and write at least 150 words.",
      minimumWords: 150,
      position: 1,
      prompt:
        "Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      suggestedMinutes: 20,
      title: "Task 1 — Library service use",
    },
    {
      content:
        "Some people believe city centres should remove private cars completely, while others think limited car access remains necessary.",
      instructions: "Spend about 40 minutes on this task and write at least 250 words.",
      minimumWords: 250,
      position: 2,
      prompt: "Discuss both views and give your own opinion.",
      suggestedMinutes: 40,
      title: "Task 2 — Private cars in city centres",
    },
  ],
};
