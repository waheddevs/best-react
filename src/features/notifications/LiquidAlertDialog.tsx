"use client";

import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import HelpOutlineRounded from "@mui/icons-material/HelpOutlineRounded";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import WarningAmberRounded from "@mui/icons-material/WarningAmberRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useId } from "react";

import { Button } from "@/components/ui/Button";
import type {
  ConfirmDialogTone,
  NotificationIcon,
  ResolvedConfirmDialogOptions,
} from "@/types/Notification";

type LiquidAlertDialogProps = {
  options: ResolvedConfirmDialogOptions | null;
  onCancel: () => void;
  onConfirm: () => void;
};

const toneClassNames: Record<ConfirmDialogTone, string> = {
  default: "publicShared__notificationDialogDefault",
  warning: "publicShared__notificationDialogWarning",
  danger: "publicShared__notificationDialogDanger",
};

function renderDialogIcon(tone: ConfirmDialogTone, icon: NotificationIcon) {
  if (icon === "delete") return <DeleteOutlineRounded aria-hidden="true" />;
  if (icon === "logout") return <LogoutRounded aria-hidden="true" />;
  if (tone === "danger") return <ErrorOutlineRounded aria-hidden="true" />;
  if (tone === "warning") return <WarningAmberRounded aria-hidden="true" />;
  return <HelpOutlineRounded aria-hidden="true" />;
}

export function LiquidAlertDialog({ options, onCancel, onConfirm }: LiquidAlertDialogProps) {
  /* HOOKS */
  const titleId = useId();
  const messageId = useId();

  if (!options) return null;

  /* HANDLERS */
  const handleDialogClose = () => {
    onCancel();
  };

  return (
    <Dialog
      aria-describedby={messageId}
      aria-labelledby={titleId}
      onClose={handleDialogClose}
      open
      role="alertdialog"
      slotProps={{
        backdrop: { className: "publicShared__notificationDialogBackdrop" },
        paper: {
          className: `publicShared__notificationDialog ${toneClassNames[options.tone]}${options.brand === "admin" ? " publicShared__notificationDialogAdmin" : ""}${options.brand === "student" || options.brand === "student-reading" || options.brand === "student-writing" || options.brand === "student-speaking" ? " publicShared__notificationDialogStudent" : ""}${options.brand === "student-reading" ? " studentReadingWarning" : ""}${options.brand === "student-writing" ? " studentWritingWarning" : ""}${options.brand === "student-speaking" ? " studentSpeakingWarning" : ""}`,
        },
      }}
    >
      <DialogContent className="publicShared__notificationDialogContent">
        <span className="publicShared__notificationDialogIcon">
          {renderDialogIcon(options.tone, options.icon)}
        </span>
        <div>
          <h2 className="publicShared__notificationDialogTitle" id={titleId}>
            {options.title}
          </h2>
          <p className="publicShared__notificationDialogMessage" id={messageId}>
            {options.message}
          </p>
        </div>
      </DialogContent>
      <DialogActions className="publicShared__notificationDialogActions">
        <Button
          className="publicShared__notificationDialogCancel"
          onClick={onCancel}
          shape="soft"
          size="small"
          variant="secondary"
        >
          {options.cancelLabel}
        </Button>
        <Button
          className="publicShared__notificationDialogConfirm"
          hoverEffect="jump"
          onClick={onConfirm}
          shape="soft"
          size="small"
        >
          {options.confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
