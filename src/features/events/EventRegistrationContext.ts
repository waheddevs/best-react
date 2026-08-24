"use client";

import { createContext } from "react";

import type { PublicEvent } from "@/types/PublicContent";

export type EventRegistrationContextValue = {
  openRegistration: (event: PublicEvent) => void;
};

export const EventRegistrationContext = createContext<EventRegistrationContextValue | null>(null);
