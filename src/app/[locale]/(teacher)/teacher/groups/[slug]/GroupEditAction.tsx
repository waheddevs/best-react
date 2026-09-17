"use client";

import EditRounded from "@mui/icons-material/EditRounded";
import { useState } from "react";

import styles from "@/css/teacher/groups.module.css";
import type { TeacherCopy, TeacherGroup } from "@/types/teacher/Teacher";

import { GroupFormDialog } from "../GroupFormDialog";

type GroupEditActionProps = {
  connected: boolean;
  copy: TeacherCopy;
  group: TeacherGroup;
};

export function GroupEditAction({ connected, copy, group }: GroupEditActionProps) {
  /* HOOKS */
  const [open, setOpen] = useState(false);

  /* HANDLERS */
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button className={styles.teacherGroups__editButton} onClick={handleOpen} type="button">
        <EditRounded aria-hidden="true" />
        <span>{copy.groups.editGroup}</span>
      </button>
      {open ? (
        <GroupFormDialog
          connected={connected}
          copy={copy}
          group={group}
          mode="edit"
          onClose={handleClose}
        />
      ) : null}
    </>
  );
}
