export const authRoles = ["student", "teacher", "admin"] as const;

export type AuthRole = (typeof authRoles)[number];
export type BackendAuthRole = "ADMIN" | "STUDENT" | "TEACHER";
export type AuthStep = "credentials" | "verification";

export type AuthLoginValues = {
  code: string;
  email: string;
  lastName: string;
  name: string;
  password: string;
};

export type AuthLoginErrors = Partial<Record<keyof AuthLoginValues | "form", string>>;

export type AuthLoginChallenge = {
  challengeId: string;
  expiresAt: string;
  maskedEmail: string;
  resendAvailableAt: string;
};

export function isAuthRole(value: string): value is AuthRole {
  return authRoles.includes(value as AuthRole);
}

export function getAuthRoleFromBackend(value: string): AuthRole | undefined {
  const normalized = value.toLowerCase();
  return isAuthRole(normalized) ? normalized : undefined;
}
