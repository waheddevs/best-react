"use client";

import { useMemo, useState } from "react";

import type { TeacherTask, TeacherTaskStatus } from "@/types/teacher/Teacher";

type TeacherTaskFilter = "all" | TeacherTaskStatus;

export function useTeacherTasks(initialTasks: TeacherTask[]) {
  /* HOOKS */
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState<TeacherTaskFilter>("pending");
  const visibleTasks = useMemo(
    () => tasks.filter((task) => filter === "all" || task.status === filter),
    [filter, tasks],
  );

  /* HANDLERS */
  const handleFilterChange = (nextFilter: TeacherTaskFilter) => {
    setFilter(nextFilter);
  };

  const handleTaskComplete = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, status: "completed" } : task)),
    );
  };

  return { filter, handleFilterChange, handleTaskComplete, visibleTasks };
}
