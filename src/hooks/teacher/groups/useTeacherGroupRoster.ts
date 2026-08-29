"use client";

import { useMemo, useRef, useState, type ChangeEvent } from "react";

import type { TeacherLearner } from "@/types/teacher/Teacher";

type UseTeacherGroupRosterOptions = {
  initialLearners: TeacherLearner[];
};

export function useTeacherGroupRoster({ initialLearners }: UseTeacherGroupRosterOptions) {
  /* HOOKS */
  const previewSequence = useRef(0);
  const [learners, setLearners] = useState(initialLearners);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDebtorsOnly, setShowDebtorsOnly] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newLearnerName, setNewLearnerName] = useState("");
  const [newLearnerPhone, setNewLearnerPhone] = useState("");
  const visibleLearners = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
    return learners.filter((learner) => {
      const matchesQuery =
        normalizedQuery.length === 0 || learner.name.toLocaleLowerCase().includes(normalizedQuery);
      const matchesDebtor = !showDebtorsOnly || learner.status === "debtor";
      return matchesQuery && matchesDebtor;
    });
  }, [learners, searchQuery, showDebtorsOnly]);

  const summary = useMemo(
    () => ({
      active: learners.filter((learner) => learner.status === "active").length,
      debtor: learners.filter((learner) => learner.status === "debtor").length,
      departed: learners.filter((learner) => learner.status === "departed").length,
      paused: learners.filter((learner) => learner.status === "paused").length,
      total: learners.length,
    }),
    [learners],
  );

  /* HANDLERS */
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleDebtorsToggle = () => {
    setShowDebtorsOnly((currentValue) => !currentValue);
  };

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
    if (!name) return false;
    const names = name.split(/\s+/);
    const learner: TeacherLearner = {
      balance: 0,
      groupSlug: initialLearners[0]?.groupSlug ?? "preview-group",
      id: `preview-learner-${++previewSequence.current}`,
      initials: `${names[0]?.[0] ?? "P"}${names[1]?.[0] ?? "L"}`.toUpperCase(),
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

  return {
    handleAddDialogClose,
    handleAddDialogOpen,
    handleAddLearner,
    handleDebtorsToggle,
    handleNewLearnerNameChange,
    handleNewLearnerPhoneChange,
    handleSearchChange,
    handleStatusToggle,
    isAddDialogOpen,
    newLearnerName,
    newLearnerPhone,
    searchQuery,
    showDebtorsOnly,
    summary,
    visibleLearners,
  };
}
