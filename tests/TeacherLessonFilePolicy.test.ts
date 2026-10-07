import assert from "node:assert/strict";
import test from "node:test";

const { getTeacherLessonFileValidationError, isTeacherLessonFormValid } = (await import(
  new URL("../src/features/teacher/groups/TeacherLessonFilePolicy.ts", import.meta.url).href
)) as typeof import("../src/features/teacher/groups/TeacherLessonFilePolicy");

function mockFile(name: string, type: string, size: number): File {
  return { name, size, type } as File;
}

test("validates lesson file type separately from size", () => {
  assert.equal(
    getTeacherLessonFileValidationError(mockFile("notes.txt", "text/plain", 100)),
    "type",
  );
  assert.equal(
    getTeacherLessonFileValidationError(
      mockFile("large.pdf", "application/pdf", 50 * 1024 * 1024 + 1),
    ),
    "size",
  );
  assert.equal(
    getTeacherLessonFileValidationError(mockFile("empty.pdf", "application/pdf", 0)),
    "size",
  );
  assert.equal(
    getTeacherLessonFileValidationError(mockFile("notes.pdf", "application/pdf", 100)),
    null,
  );
});

test("create requires name, material, and task before any request", () => {
  const materialFile = mockFile("material.pdf", "application/pdf", 100);
  const taskFile = mockFile("task.pdf", "application/pdf", 100);
  assert.equal(
    isTeacherLessonFormValid({ editing: false, materialFile, name: "  ", taskFile }),
    false,
  );
  assert.equal(
    isTeacherLessonFormValid({ editing: false, materialFile: null, name: "Lesson", taskFile }),
    false,
  );
  assert.equal(
    isTeacherLessonFormValid({ editing: false, materialFile, name: "Lesson", taskFile: null }),
    false,
  );
  assert.equal(
    isTeacherLessonFormValid({ editing: false, materialFile, name: "Lesson", taskFile }),
    true,
  );
});

test("invalid selected files block create and edit; unchanged edit files are optional", () => {
  const invalidFile = mockFile("wrong.txt", "text/plain", 100);
  const validFile = mockFile("task.pdf", "application/pdf", 100);
  assert.equal(
    isTeacherLessonFormValid({
      editing: false,
      materialFile: invalidFile,
      name: "Lesson",
      taskFile: validFile,
    }),
    false,
  );
  assert.equal(
    isTeacherLessonFormValid({
      editing: true,
      materialFile: invalidFile,
      name: "Lesson",
      taskFile: null,
    }),
    false,
  );
  assert.equal(
    isTeacherLessonFormValid({ editing: true, materialFile: null, name: "Lesson", taskFile: null }),
    true,
  );
});
