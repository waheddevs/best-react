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
  const [newUnpaidMembershipIds, setNewUnpaidMembershipIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [removedMembershipIds, setRemovedMembershipIds] = useState<Set<string>>(() => new Set());
  const [statusOverrides, setStatusOverrides] = useState<Map<string, TeacherLearner["status"]>>(
    () => new Map(),
  );
  const learners = useMemo(
    () =>
      initialLearners
        .filter((learner) => !removedMembershipIds.has(learner.membershipId))
        .map((learner) => ({
          ...learner,
          status: statusOverrides.get(learner.membershipId) ?? learner.status,
        })),
    [initialLearners, removedMembershipIds, statusOverrides],
  );

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

  const handleLearnerAdded = (membershipId: string) => {
    setNewUnpaidMembershipIds((current) => new Set(current).add(membershipId));
  };

  const handleLearnerDeleted = (membershipId: string) => {
    setRemovedMembershipIds((current) => new Set(current).add(membershipId));
    setNewUnpaidMembershipIds((current) => {
      const next = new Set(current);
      next.delete(membershipId);
      return next;
    });
  };

  const handleLearnerStatusChanged = (membershipId: string, status: TeacherLearner["status"]) => {
    setStatusOverrides((current) => {
      const next = new Map(current);
      next.set(membershipId, status);
      return next;
    });
  };

  return {
    handleAddDialogClose,
    handleAddDialogOpen,
    handleLearnerAdded,
    handleLearnerStatusChanged,
    handleStatusFilterChange,
    handleLearnerDeleted,
    activeStatusFilter,
    atCapacity,
    isAddDialogOpen,
    newUnpaidMembershipIds,
    summary:
      removedMembershipIds.size > 0 || statusOverrides.size > 0
        ? derivedSummary
        : (initialSummary ?? derivedSummary),
    visibleLearners,
  };
}
