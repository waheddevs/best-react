import type { TeacherLessonWorkspaceData } from "@/types/teacher/TeacherLessonPlan";

const sampleFiles = [
  {
    mimeType: "application/pdf",
    name: "ielts-reading-sample.pdf",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    mimeType: "image/png",
    name: "lesson-vocabulary.png",
    url: "https://www.w3.org/Icons/w3c_home.png",
  },
  {
    mimeType: "image/jpeg",
    name: "speaking-prompts.jpg",
    url: "https://www.w3.org/People/mimasa/test/imgformat/img/w3c_home.jpg",
  },
] as const;

export function getTeacherLessonPlanPreview(groupId: string): TeacherLessonWorkspaceData {
  const base = Date.now() + 86_400_000;
  const names = ["Reading: Matching headings", "Writing Task 2 structure", "Speaking Part 2"];
  const lessons = names.map((name, index) => {
    const startsAt = new Date(base + index * 2 * 86_400_000);
    startsAt.setUTCHours(4, 0, 0, 0);
    return {
      createdAt: new Date(base - index * 3_600_000).toISOString(),
      endsAt: new Date(startsAt.getTime() + 90 * 60_000).toISOString(),
      groupId,
      id: `preview-lesson-${String(index + 1)}`,
      lessonNumber: index + 1,
      name,
      room: "204",
      startsAt: startsAt.toISOString(),
      status: "DRAFT" as const,
      summary: null,
    };
  });

  return {
    categoryId: null,
    lessons: [...lessons].reverse(),
    resources: lessons.flatMap((lesson, index) => {
      const sample = sampleFiles[index];
      const taskSample = sampleFiles[(index + 1) % sampleFiles.length];
      return [
        {
          createdAt: lesson.createdAt,
          description: null,
          id: `preview-material-${String(index + 1)}`,
          kind: "MATERIAL" as const,
          lessonId: lesson.id,
          libraryItemId: `preview-library-${String(index + 1)}`,
          mediaObjectId: `preview-media-${String(index + 1)}`,
          mimeType: sample.mimeType,
          originalName: sample.name,
          previewUrl: sample.url,
          sizeBytes: null,
          title: `${lesson.name} — material`,
        },
        {
          createdAt: lesson.createdAt,
          description: null,
          id: `preview-task-${String(index + 1)}`,
          kind: "TASK" as const,
          lessonId: lesson.id,
          libraryItemId: `preview-task-library-${String(index + 1)}`,
          mediaObjectId: `preview-task-media-${String(index + 1)}`,
          mimeType: taskSample.mimeType,
          originalName: `task-${taskSample.name}`,
          previewUrl: taskSample.url,
          sizeBytes: null,
          title: `${lesson.name} — task`,
        },
      ];
    }),
  };
}
