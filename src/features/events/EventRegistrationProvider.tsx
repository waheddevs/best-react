"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import type { Locale } from "@/config/Locales";
import { EventRegistrationContext } from "@/features/events/EventRegistrationContext";
import { EventRegistrationDialog } from "@/features/events/EventRegistrationDialog";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import type { EventRegistrationCopy } from "@/types/EventRegistration";
import type { CenterAlertInput } from "@/types/Notification";
import type { PublicEvent } from "@/types/PublicContent";

type EventRegistrationProviderProps = {
  children: ReactNode;
  copy: EventRegistrationCopy;
  locale: Locale;
};

export function EventRegistrationProvider({
  children,
  copy,
  locale,
}: EventRegistrationProviderProps) {
  /* HOOKS */
  const openFrameRef = useRef<number | null>(null);
  const pendingAlertRef = useRef<CenterAlertInput | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<PublicEvent | null>(null);
  const { showCenterAlert } = useNotifications();

  const openRegistration = useCallback(
    (event: PublicEvent) => {
      if (openFrameRef.current !== null) {
        window.cancelAnimationFrame(openFrameRef.current);
      }

      pendingAlertRef.current = null;
      setIsDialogOpen(false);

      if (event.status === "past") {
        setSelectedEvent(null);
        showCenterAlert({
          closeLabel: copy.close,
          message: copy.pastEventMessage
            .replace("{event}", event.title[locale])
            .replace("{date}", event.dateLabel[locale]),
          title: copy.pastEventTitle,
          tone: "error",
        });
        return;
      }

      setSelectedEvent(event);

      openFrameRef.current = window.requestAnimationFrame(() => {
        openFrameRef.current = null;
        setIsDialogOpen(true);
      });
    },
    [copy.close, copy.pastEventMessage, copy.pastEventTitle, locale, showCenterAlert],
  );

  const contextValue = useMemo(() => ({ openRegistration }), [openRegistration]);

  useEffect(() => {
    return () => {
      if (openFrameRef.current !== null) {
        window.cancelAnimationFrame(openFrameRef.current);
      }
    };
  }, []);

  /* HANDLERS */
  const handleClose = useCallback(() => {
    pendingAlertRef.current = null;
    setIsDialogOpen(false);
  }, []);

  const handleRegister = useCallback(() => {
    if (!selectedEvent) return;

    const eventTitle = selectedEvent.title[locale];
    pendingAlertRef.current = {
      closeLabel: copy.close,
      message: copy.successMessage.replace("{event}", eventTitle),
      title: copy.successTitle,
      tone: "success",
    };
    setIsDialogOpen(false);
  }, [copy.close, copy.successMessage, copy.successTitle, locale, selectedEvent]);

  const handleExited = useCallback(() => {
    setSelectedEvent(null);

    if (pendingAlertRef.current) {
      showCenterAlert(pendingAlertRef.current);
      pendingAlertRef.current = null;
    }
  }, [showCenterAlert]);

  return (
    <EventRegistrationContext.Provider value={contextValue}>
      {children}
      <EventRegistrationDialog
        copy={copy}
        event={selectedEvent}
        open={isDialogOpen}
        locale={locale}
        onClose={handleClose}
        onExited={handleExited}
        onRegister={handleRegister}
      />
    </EventRegistrationContext.Provider>
  );
}
