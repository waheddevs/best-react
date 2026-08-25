"use client";

import type { MouseEvent } from "react";

import { Button } from "@/components/ui/Button";
import type { Locale } from "@/config/Locales";
import { useEventRegistration } from "@/hooks/public/events/useEventRegistration";
import type { ButtonSize } from "@/types/Button";
import type { PublicEvent } from "@/types/PublicContent";

type EventAttendActionProps = {
  className?: string;
  event: PublicEvent;
  fullWidth?: boolean;
  label: string;
  locale: Locale;
  size?: ButtonSize;
};

export function EventAttendAction({
  className,
  event,
  fullWidth = false,
  label,
  locale,
  size = "medium",
}: EventAttendActionProps) {
  /* HOOKS */
  const { openRegistration } = useEventRegistration();

  /* HANDLERS */
  const handleAttendClick = (clickEvent: MouseEvent<HTMLButtonElement>) => {
    clickEvent.currentTarget.blur();
    openRegistration(event);
  };

  return (
    <Button
      aria-label={`${label}: ${event.title[locale]}`}
      className={className}
      fullWidth={fullWidth}
      hoverEffect="jump"
      onClick={handleAttendClick}
      size={size}
    >
      {label}
    </Button>
  );
}
