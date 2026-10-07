const imageMimeTypes = new Set(["image/jpeg", "image/png"]);
const acceptedMimeTypes = new Set(["application/pdf", ...imageMimeTypes, "application/zip"]);

const imageLimit = 10 * 1024 * 1024;
const generalFileLimit = 50 * 1024 * 1024;

export const teacherLessonFileAccept =
  ".pdf,.jpg,.jpeg,.png,.zip,application/pdf,image/jpeg,image/png,application/zip,application/x-zip-compressed";

export function getTeacherLessonFileMimeType(file: File): string {
  return file.name.toLowerCase().endsWith(".zip") ? "application/zip" : file.type;
}

export function isAcceptedTeacherLessonFile(file: File): boolean {
  return acceptedMimeTypes.has(getTeacherLessonFileMimeType(file));
}

export function getTeacherLessonFileSizeLimit(file: File): number {
  return imageMimeTypes.has(getTeacherLessonFileMimeType(file)) ? imageLimit : generalFileLimit;
}

export type TeacherLessonFileValidationError = "type" | "size" | null;

export function getTeacherLessonFileValidationError(
  file: File | null,
): TeacherLessonFileValidationError {
  if (!file) return null;
  if (!isAcceptedTeacherLessonFile(file)) return "type";
  if (file.size <= 0 || file.size > getTeacherLessonFileSizeLimit(file)) return "size";
  return null;
}

export function isTeacherLessonFormValid(input: {
  editing: boolean;
  materialFile: File | null;
  name: string;
  taskFile: File | null;
}): boolean {
  if (!input.name.trim() || input.name.trim().length > 240) return false;
  if (!input.editing && (!input.materialFile || !input.taskFile)) return false;
  return (
    getTeacherLessonFileValidationError(input.materialFile) === null &&
    getTeacherLessonFileValidationError(input.taskFile) === null
  );
}
