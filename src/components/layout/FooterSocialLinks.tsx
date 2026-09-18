"use client";

import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Telegram from "@mui/icons-material/Telegram";
import Twitter from "@mui/icons-material/Twitter";

import { useNotifications } from "@/hooks/notifications/useNotifications";

type FooterSocialLinksProps = {
  ariaLabel: string;
  closeLabel: string;
  message: string;
  title: string;
};

const socialItems = [
  { label: "Instagram", Icon: Instagram },
  { label: "Facebook", Icon: Facebook },
  { label: "Twitter", Icon: Twitter },
  { label: "Telegram", Icon: Telegram },
] as const;

export function FooterSocialLinks({
  ariaLabel,
  closeLabel,
  message,
  title,
}: FooterSocialLinksProps) {
  /* HOOKS */
  const notifications = useNotifications();

  /* HANDLERS */
  const handleSocialClick = () => {
    notifications.showCenterAlert({
      closeLabel,
      message,
      title,
      tone: "comingSoon",
    });
  };

  return (
    <div aria-label={ariaLabel} className="footer__socials">
      {socialItems.map(({ label, Icon }) => (
        <button
          aria-label={label}
          className="footer__socialIcon"
          key={label}
          onClick={handleSocialClick}
          type="button"
        >
          <Icon aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
