"use client";

import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import CancelRounded from "@mui/icons-material/CancelRounded";
import CampaignRounded from "@mui/icons-material/CampaignRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useId } from "react";

import { Button } from "@/components/ui/Button";
import type { CenterAlertTone, ResolvedCenterAlertOptions } from "@/types/Notification";

type LiquidCenterAlertProps = {
  options: ResolvedCenterAlertOptions | null;
  open: boolean;
  onClose: () => void;
  onExited: () => void;
};

const toneClassNames: Record<CenterAlertTone, string> = {
  success: "publicShared__centerAlertSuccess",
  error: "publicShared__centerAlertError",
  info: "publicShared__centerAlertInfo",
  comingSoon: "publicShared__centerAlertComingSoon",
};

function renderCenterAlertIcon(tone: CenterAlertTone) {
  if (tone === "success") return <CheckCircleRounded aria-hidden="true" />;
  if (tone === "error") return <CancelRounded aria-hidden="true" />;
  if (tone === "comingSoon") return <CampaignRounded aria-hidden="true" />;
  return <InfoOutlined aria-hidden="true" />;
}

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
        backdrop: { className: "publicShared__centerAlertBackdrop" },
        paper: {
          className: `publicShared__centerAlert ${toneClassNames[options.tone]} ${open ? "publicShared__centerAlertOpen" : "publicShared__centerAlertClosed"}`,
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
      <DialogContent className="publicShared__centerAlertContent">
        <span className="publicShared__centerAlertIcon">{renderCenterAlertIcon(options.tone)}</span>
        <h2 className="publicShared__centerAlertTitle" id={titleId}>
          {options.title}
        </h2>
        <p className="publicShared__centerAlertMessage" id={messageId}>
          {options.message}
        </p>
        <div className="publicShared__centerAlertCloseSlot">
          <Button
            className="publicShared__centerAlertClose"
            hoverEffect="jump"
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
