"use client";

import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import HelpOutlineRounded from "@mui/icons-material/HelpOutlineRounded";
import WarningAmberRounded from "@mui/icons-material/WarningAmberRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useId } from "react";

import { Button } from "@/components/ui/Button";
import styles from "@/css/public/shared.module.css";
import type { ConfirmDialogTone, ResolvedConfirmDialogOptions } from "@/types/Notification";

type LiquidAlertDialogProps = {
  options: ResolvedConfirmDialogOptions | null;
  onCancel: () => void;
  onConfirm: () => void;
};

const toneClassNames: Record<ConfirmDialogTone, string> = {
  default: styles.publicShared__notificationDialogDefault,
  warning: styles.publicShared__notificationDialogWarning,
  danger: styles.publicShared__notificationDialogDanger,
};

function renderDialogIcon(tone: ConfirmDialogTone) {
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
        backdrop: { className: styles.publicShared__notificationDialogBackdrop },
        paper: {
          className: `${styles.publicShared__notificationDialog} ${toneClassNames[options.tone]}`,
        },
      }}
    >
      <DialogContent className={styles.publicShared__notificationDialogContent}>
        <span className={styles.publicShared__notificationDialogIcon}>
          {renderDialogIcon(options.tone)}
        </span>
        <div>
          <h2 className={styles.publicShared__notificationDialogTitle} id={titleId}>
            {options.title}
          </h2>
          <p className={styles.publicShared__notificationDialogMessage} id={messageId}>
            {options.message}
          </p>
        </div>
      </DialogContent>
      <DialogActions className={styles.publicShared__notificationDialogActions}>
        <Button
          className={styles.publicShared__notificationDialogCancel}
          onClick={onCancel}
          shape="soft"
          size="small"
          variant="secondary"
        >
          {options.cancelLabel}
        </Button>
        <Button
          className={styles.publicShared__notificationDialogConfirm}
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
