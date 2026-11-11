"use client";

import { useContext } from "react";
import { TeacherAiContext } from "@/features/teacher/ai/TeacherAiContext";

export function useTeacherAi() {
  const context = useContext(TeacherAiContext);
  if (!context) throw new Error("TeacherAiProvider is required");
  return context;
}
