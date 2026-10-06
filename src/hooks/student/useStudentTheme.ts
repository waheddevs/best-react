"use client";

import { useContext } from "react";

import { StudentThemeContext } from "@/features/student/layout/StudentThemeContext";

export function useStudentTheme() {
  const context = useContext(StudentThemeContext);
  if (!context) {
    throw new Error("useStudentTheme must be used within StudentThemeProvider.");
  }
  return context;
}
