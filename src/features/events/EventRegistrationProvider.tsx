"use client";

import { useMutation } from "@apollo/client/react";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import type { Locale } from "@/config/Locales";
import { getNotificationCopy } from "@/dictionaries/public/Notifications";
import { EventRegistrationContext } from "@/features/events/EventRegistrationContext";
import { EventRegistrationDialog } from "@/features/events/EventRegistrationDialog";
import { RegisterForEventDocument } from "@/gql/graphql";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { toPublicApiError } from "@/lib/apollo/ApolloError";
import { getApiLanguage } from "@/lib/ApiLanguage";
import { normalizePhoneNumber } from "@/lib/PhoneNumber";
import type { EventRegistrationCopy, EventRegistrationValues } from "@/types/EventRegistration";
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
  /* APOLLO REQUESTS */
  const [registerForEvent] = useMutation(RegisterForEventDocument, {
    fetchPolicy: "no-cache",
  });

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

  const handleRegister = useCallback(
    async (values: EventRegistrationValues) => {
      if (!selectedEvent?.id) return false;

      try {
        await registerForEvent({
          variables: {
            input: {
              consent: values.consent,
              email: values.email.trim() || undefined,
              eventId: selectedEvent.id,
              locale: getApiLanguage(locale),
              name: values.fullName.trim(),
              participantCount: values.participantCount,
              phone: normalizePhoneNumber(values.phone),
            },
          },
        });
        const eventTitle = selectedEvent.title[locale];
        pendingAlertRef.current = {
          closeLabel: copy.close,
          message: copy.successMessage.replace("{event}", eventTitle),
          title: copy.successTitle,
          tone: "success",
        };
        setIsDialogOpen(false);
        return true;
      } catch (error) {
        const apiError = toPublicApiError(error);
        const isDuplicate =
          apiError.code === "CONFLICT" &&
          apiError.message === "Registration has already been received";
        const fallback = getNotificationCopy(locale).defaults.error;
        pendingAlertRef.current = {
          closeLabel: copy.close,
          message: isDuplicate ? copy.alreadySubmittedMessage : fallback.message,
          title: isDuplicate ? copy.alreadySubmittedTitle : fallback.title,
          tone: "error",
        };
        setIsDialogOpen(false);
        return false;
      }
    },
    [
      copy.alreadySubmittedMessage,
      copy.alreadySubmittedTitle,
      copy.close,
      copy.successMessage,
      copy.successTitle,
      locale,
      registerForEvent,
      selectedEvent,
    ],
  );

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
        key={selectedEvent?.slug ?? "closed"}
        open={isDialogOpen}
        locale={locale}
        onClose={handleClose}
        onExited={handleExited}
        onRegister={handleRegister}
      />
    </EventRegistrationContext.Provider>
  );
}
