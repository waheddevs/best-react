"use client";

import { createContext } from "react";

import type { NotificationContextValue } from "@/types/Notification";

export const NotificationContext = createContext<NotificationContextValue | null>(null);
