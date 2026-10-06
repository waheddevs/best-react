"use client";

import { createContext } from "react";

import type { StudentThemeMode } from "@/types/student/StudentWorkspace";

export type StudentThemeContextValue = {
  mode: StudentThemeMode;
  toggleMode: () => void;
};

export const StudentThemeContext = createContext<StudentThemeContextValue | null>(null);
