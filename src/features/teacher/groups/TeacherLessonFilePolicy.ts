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
