"use client";

import { createContext } from "react";
import type { TeacherAiCopy } from "@/dictionaries/teacher/TeacherAiAssistant";
import type { Locale } from "@/config/Locales";
import type { useTeacherAiController } from "@/hooks/teacher/ai/useTeacherAiController";

export type TeacherAiContextValue = ReturnType<typeof useTeacherAiController> & {
  copy: TeacherAiCopy;
  locale: Locale;
  initializing: boolean;
};
export const TeacherAiContext = createContext<TeacherAiContextValue | null>(null);
