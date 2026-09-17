export type TeacherProfileRecord = {
  displayName: string;
  email: string | null;
  phone: string | null;
  teacherSubject: string | null;
  branchName: string | null;
  preferredLanguage: "UZ" | "RU" | "EN";
  avatarMediaObjectId: string | null;
  avatarUrl: string | null;
  initials: string;
};
