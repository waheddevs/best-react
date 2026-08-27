export const authProviderIds = ["google", "facebook", "apple"] as const;
export const authRoles = ["student", "teacher", "admin"] as const;

export type AuthProviderId = (typeof authProviderIds)[number];

export type AuthRole = (typeof authRoles)[number];

export type AuthMode = "login" | "signup";

export type AuthProviderAvailability = Record<AuthProviderId, boolean>;

export function isAuthProviderId(value: string): value is AuthProviderId {
  return authProviderIds.includes(value as AuthProviderId);
}

export function isAuthRole(value: string): value is AuthRole {
  return authRoles.includes(value as AuthRole);
}
