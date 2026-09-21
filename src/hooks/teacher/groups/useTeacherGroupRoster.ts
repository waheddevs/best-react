"use client";

import { useMemo, useState } from "react";

import { teacherGroupCapacity } from "@/config/teacher/TeacherGroupCapacity";
import type { TeacherGroupRosterSummary, TeacherLearner } from "@/types/teacher/Teacher";

type UseTeacherGroupRosterOptions = {
  initialLearners: TeacherLearner[];
  initialSummary?: TeacherGroupRosterSummary;
};

export type TeacherRosterStatusFilter = "total" | TeacherLearner["status"];

export function useTeacherGroupRoster({
  initialLearners,
  initialSummary,
}: UseTeacherGroupRosterOptions) {
  /* HOOKS */
  const [activeStatusFilter, setActiveStatusFilter] = useState<TeacherRosterStatusFilter>("total");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const learners = initialLearners;

  const derivedSummary = useMemo(
    () => ({
      active: learners.filter((learner) => learner.status === "active").length,
      debtor: learners.filter((learner) => learner.status === "debtor").length,
      departed: learners.filter((learner) => learner.status === "departed").length,
      historicalTotal: learners.length,
      paused: learners.filter((learner) => learner.status === "paused").length,
      total: learners.filter((learner) => learner.status !== "departed").length,
    }),
    [learners],
  );
  const activeMembershipCount = learners.filter((learner) => learner.status !== "departed").length;
  const atCapacity = activeMembershipCount >= teacherGroupCapacity;
  const visibleLearners = useMemo(
    () =>
      learners.filter((learner) =>
        activeStatusFilter === "total"
          ? learner.status !== "departed"
          : learner.status === activeStatusFilter,
      ),
    [activeStatusFilter, learners],
  );

  /* HANDLERS */
  const handleAddDialogOpen = () => {
    setIsAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setIsAddDialogOpen(false);
  };

  const handleStatusFilterChange = (statusFilter: TeacherRosterStatusFilter) => {
    setActiveStatusFilter(statusFilter);
  };

  return {
    handleAddDialogClose,
    handleAddDialogOpen,
    handleStatusFilterChange,
    activeStatusFilter,
    atCapacity,
    isAddDialogOpen,
    summary: initialSummary ?? derivedSummary,
    visibleLearners,
  };
}
