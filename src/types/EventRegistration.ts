export type EventRegistrationCopy = {
  eyebrow: string;
  title: string;
  description: string;
  selectedEvent: string;
  fullName: string;
  fullNamePlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  participants: string;
  cancel: string;
  consentLabel: string;
  register: string;
  close: string;
  successTitle: string;
  successMessage: string;
  pastEventTitle: string;
  pastEventMessage: string;
  required: string;
  invalidEmail: string;
  invalidPhone: string;
};

export type EventRegistrationValues = {
  consent: boolean;
  email: string;
  fullName: string;
  participantCount: number;
  phone: string;
};
