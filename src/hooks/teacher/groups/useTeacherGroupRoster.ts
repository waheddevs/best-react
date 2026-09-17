"use client";

import { useMemo, useRef, useState, type ChangeEvent } from "react";

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
  const previewSequence = useRef(0);
  const [learners, setLearners] = useState(initialLearners);
  const [activeStatusFilter, setActiveStatusFilter] = useState<TeacherRosterStatusFilter>("total");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newLearnerName, setNewLearnerName] = useState("");
  const [newLearnerPhone, setNewLearnerPhone] = useState("");

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
    setNewLearnerName("");
    setNewLearnerPhone("");
  };

  const handleNewLearnerNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewLearnerName(event.target.value);
  };

  const handleNewLearnerPhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewLearnerPhone(event.target.value);
  };

  const handleAddLearner = () => {
    const name = newLearnerName.trim();
    if (!name || atCapacity) return false;
    const names = name.split(/\s+/);
    const learner: TeacherLearner = {
      balance: 0,
      groupSlug: initialLearners[0]?.groupSlug ?? "preview-group",
      id: `preview-learner-${++previewSequence.current}`,
      initials: `${names[0]?.[0] ?? "P"}${names[1]?.[0] ?? "L"}`.toUpperCase(),
      membershipId: `preview-membership-${previewSequence.current}`,
      name,
      phone: newLearnerPhone.trim() || "+998 00 000 00 00",
      status: "active",
      taskProgress: 0,
    };
    setLearners((currentLearners) => [learner, ...currentLearners]);
    handleAddDialogClose();
    return true;
  };

  const handleStatusToggle = (learnerId: string) => {
    setLearners((currentLearners) =>
      currentLearners.map((learner) =>
        learner.id === learnerId
          ? { ...learner, status: learner.status === "paused" ? "active" : "paused" }
          : learner,
      ),
    );
  };

  const handleStatusFilterChange = (statusFilter: TeacherRosterStatusFilter) => {
    setActiveStatusFilter(statusFilter);
  };

  return {
    handleAddDialogClose,
    handleAddDialogOpen,
    handleAddLearner,
    handleNewLearnerNameChange,
    handleNewLearnerPhoneChange,
    handleStatusFilterChange,
    handleStatusToggle,
    activeStatusFilter,
    atCapacity,
    isAddDialogOpen,
    newLearnerName,
    newLearnerPhone,
    summary: initialSummary ?? derivedSummary,
    visibleLearners,
  };
}
