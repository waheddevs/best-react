"use client";

import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useId } from "react";

import { Button } from "@/components/ui/Button";
import styles from "@/css/public/shared.module.css";
import type { CenterAlertTone, ResolvedCenterAlertOptions } from "@/types/Notification";

type LiquidCenterAlertProps = {
  options: ResolvedCenterAlertOptions | null;
  open: boolean;
  onClose: () => void;
  onExited: () => void;
};

const toneClassNames: Record<CenterAlertTone, string> = {
  success: styles.publicShared__centerAlertSuccess,
  info: styles.publicShared__centerAlertInfo,
};

export function LiquidCenterAlert({ options, open, onClose, onExited }: LiquidCenterAlertProps) {
  /* HOOKS */
  const titleId = useId();
  const messageId = useId();

  if (!options) return null;

  /* HANDLERS */
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      aria-describedby={messageId}
      aria-labelledby={titleId}
      disableRestoreFocus
      keepMounted
      onClose={handleClose}
      open={open}
      slotProps={{
        backdrop: { className: styles.publicShared__centerAlertBackdrop },
        paper: {
          className: `${styles.publicShared__centerAlert} ${toneClassNames[options.tone]} ${open ? styles.publicShared__centerAlertOpen : styles.publicShared__centerAlertClosed}`,
        },
        transition: {
          easing: {
            enter: "cubic-bezier(0.22, 1, 0.36, 1)",
            exit: "cubic-bezier(0.4, 0, 1, 1)",
          },
          onExited,
          timeout: { enter: 320, exit: 240 },
        },
      }}
      transitionDuration={{ enter: 320, exit: 240 }}
    >
      <DialogContent className={styles.publicShared__centerAlertContent}>
        <span className={styles.publicShared__centerAlertIcon}>
          {options.tone === "success" ? (
            <CheckCircleRounded aria-hidden="true" />
          ) : (
            <InfoOutlined aria-hidden="true" />
          )}
        </span>
        <h2 className={styles.publicShared__centerAlertTitle} id={titleId}>
          {options.title}
        </h2>
        <p className={styles.publicShared__centerAlertMessage} id={messageId}>
          {options.message}
        </p>
        <div className={styles.publicShared__centerAlertCloseSlot}>
          <Button
            className={styles.publicShared__centerAlertClose}
            hoverEffect="grow"
            onClick={handleClose}
            shape="soft"
          >
            {options.closeLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
