"use client";

import { useContext } from "react";

import { TeacherThemeContext } from "@/features/teacher/layout/TeacherThemeContext";

export function useTeacherTheme() {
  /* HOOKS */
  const context = useContext(TeacherThemeContext);

  if (!context) {
    throw new Error("useTeacherTheme must be used within TeacherThemeProvider.");
  }

  return context;
}
