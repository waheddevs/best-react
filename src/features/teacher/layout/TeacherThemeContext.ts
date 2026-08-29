"use client";

import { createContext } from "react";

import type { TeacherThemeMode } from "@/types/teacher/Teacher";

export type TeacherThemeContextValue = {
  mode: TeacherThemeMode;
  toggleMode: () => void;
};

export const TeacherThemeContext = createContext<TeacherThemeContextValue | null>(null);
