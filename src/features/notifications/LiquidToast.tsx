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
  success: "publicShared__notificationToastSuccess",
  error: "publicShared__notificationToastError",
  warning: "publicShared__notificationToastWarning",
  info: "publicShared__notificationToastInfo",
  loading: "publicShared__notificationToastLoading",
};

function renderIcon(tone: NotificationTone) {
  if (tone === "success") return <CheckCircleRounded aria-hidden="true" />;
  if (tone === "error") return <ErrorOutlineRounded aria-hidden="true" />;
  if (tone === "warning") return <WarningAmberRounded aria-hidden="true" />;
  if (tone === "loading") {
    return <CircularProgress aria-hidden="true" className="publicShared__notificationSpinner" />;
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
      className={`publicShared__notificationToast ${toneClassNames[tone]}`}
      ref={ref}
      role={tone === "error" ? "alert" : "status"}
      style={style}
    >
      <span className="publicShared__notificationIcon">{renderIcon(tone)}</span>
      <div className="publicShared__notificationContent">
        <p className="publicShared__notificationTitle">{title}</p>
        <p className="publicShared__notificationMessage">{message}</p>
        {action ? (
          <Button
            className="publicShared__notificationAction"
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
        className="publicShared__notificationClose"
        label={closeAriaLabel}
        onClick={onDismiss}
      >
        <CloseRounded aria-hidden="true" />
      </IconButton>
    </div>
  );
});
