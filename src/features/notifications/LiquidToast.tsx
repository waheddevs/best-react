"use client";

import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import WarningAmberRounded from "@mui/icons-material/WarningAmberRounded";
import CircularProgress from "@mui/material/CircularProgress";
import { forwardRef, type CSSProperties } from "react";

import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import styles from "@/css/public/shared.module.css";
import type { NotificationAction, NotificationTone } from "@/types/Notification";

type LiquidToastProps = {
  tone: NotificationTone;
  title: string;
  message: string;
  closeAriaLabel: string;
  action?: NotificationAction;
  onDismiss: () => void;
  style?: CSSProperties;
};

const toneClassNames: Record<NotificationTone, string> = {
  success: styles.publicShared__notificationToastSuccess,
  error: styles.publicShared__notificationToastError,
  warning: styles.publicShared__notificationToastWarning,
  info: styles.publicShared__notificationToastInfo,
  loading: styles.publicShared__notificationToastLoading,
};

function renderIcon(tone: NotificationTone) {
  if (tone === "success") return <CheckCircleRounded aria-hidden="true" />;
  if (tone === "error") return <ErrorOutlineRounded aria-hidden="true" />;
  if (tone === "warning") return <WarningAmberRounded aria-hidden="true" />;
  if (tone === "loading") {
    return (
      <CircularProgress aria-hidden="true" className={styles.publicShared__notificationSpinner} />
    );
  }
  return <InfoOutlined aria-hidden="true" />;
}

export const LiquidToast = forwardRef<HTMLDivElement, LiquidToastProps>(function LiquidToast(
  { tone, title, message, closeAriaLabel, action, onDismiss, style },
  ref,
) {
  /* HANDLERS */
  const handleActionClick = () => {
    action?.onClick();
    onDismiss();
  };

  return (
    <div
      aria-atomic="true"
      aria-live={tone === "error" ? "assertive" : "polite"}
      className={`${styles.publicShared__notificationToast} ${toneClassNames[tone]}`}
      ref={ref}
      role={tone === "error" ? "alert" : "status"}
      style={style}
    >
      <span className={styles.publicShared__notificationIcon}>{renderIcon(tone)}</span>
      <div className={styles.publicShared__notificationContent}>
        <p className={styles.publicShared__notificationTitle}>{title}</p>
        <p className={styles.publicShared__notificationMessage}>{message}</p>
        {action ? (
          <Button
            className={styles.publicShared__notificationAction}
            onClick={handleActionClick}
            shape="soft"
            size="small"
            variant="secondary"
          >
            {action.label}
          </Button>
        ) : null}
      </div>
      <IconButton
        className={styles.publicShared__notificationClose}
        label={closeAriaLabel}
        onClick={onDismiss}
      >
        <CloseRounded aria-hidden="true" />
      </IconButton>
    </div>
  );
});
