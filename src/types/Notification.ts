export type NotificationTone = "success" | "error" | "warning" | "info" | "loading";

export type NotificationIcon = "tone" | "delete" | "logout";

export type NotificationId = string | number;

export type NotificationMessage = {
  title: string;
  message: string;
};

export type NotificationAction = {
  label: string;
  onClick: () => void;
};

export type NotificationInput = Partial<NotificationMessage> & {
  action?: NotificationAction;
  duration?: number;
  icon?: NotificationIcon;
};

export type PromiseNotificationInput<Data> = {
  loading?: NotificationInput;
  success?: NotificationInput | ((data: Data) => NotificationInput);
  error?: NotificationInput | ((error: unknown) => NotificationInput);
};

export type ConfirmDialogTone = "default" | "warning" | "danger";

export type CenterAlertTone = "success" | "error" | "info" | "comingSoon";

export type CenterAlertInput = NotificationMessage & {
  closeLabel: string;
  tone?: CenterAlertTone;
};

export type ResolvedCenterAlertOptions = NotificationMessage & {
  closeLabel: string;
  tone: CenterAlertTone;
};

export type ConfirmDialogInput = Partial<NotificationMessage> & {
  brand?: "default" | "student" | "student-reading" | "student-writing" | "student-speaking";
  confirmLabel?: string;
  cancelLabel?: string;
  icon?: NotificationIcon;
  tone?: ConfirmDialogTone;
};

export type ResolvedConfirmDialogOptions = NotificationMessage & {
  brand: "default" | "student" | "student-reading" | "student-writing" | "student-speaking";
  confirmLabel: string;
  cancelLabel: string;
  icon: NotificationIcon;
  tone: ConfirmDialogTone;
};

export type NotificationCopy = {
  containerAriaLabel: string;
  closeAriaLabel: string;
  defaults: Record<NotificationTone, NotificationMessage>;
  confirm: NotificationMessage & {
    confirmLabel: string;
    cancelLabel: string;
  };
};

export type NotificationContextValue = {
  copy: NotificationCopy;
  confirm: (input?: ConfirmDialogInput) => Promise<boolean>;
  dismissNotification: (id?: NotificationId) => void;
  showNotification: (
    tone: NotificationTone,
    input?: NotificationInput,
    id?: NotificationId,
  ) => NotificationId;
  showCenterAlert: (input: CenterAlertInput) => void;
};
