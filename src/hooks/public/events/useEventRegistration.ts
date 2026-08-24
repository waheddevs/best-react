"use client";

import { useContext } from "react";

import { EventRegistrationContext } from "@/features/events/EventRegistrationContext";

export function useEventRegistration() {
  /* HOOKS */
  const context = useContext(EventRegistrationContext);

  if (!context) {
    throw new Error("useEventRegistration must be used within EventRegistrationProvider.");
  }

  return context;
}
