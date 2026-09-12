export type ProvisionableUserRole = "STUDENT" | "TEACHER";

export type AdminProvisionUserCopy = {
  description: string;
  emailLabel: string;
  emailPlaceholder: string;
  error: string;
  nameLabel: string;
  namePlaceholder: string;
  passwordHint: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  pending: string;
  submit: string;
  success: string;
  title: string;
};

export type AdminProvisionUserValues = {
  displayName: string;
  email: string;
  password: string;
};
