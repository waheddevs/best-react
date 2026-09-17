"use client";

import AddRounded from "@mui/icons-material/AddRounded";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import styles from "@/css/teacher/groups.module.css";
import type { TeacherCopy } from "@/types/teacher/Teacher";

import { GroupFormDialog } from "./GroupFormDialog";

type CreateGroupDialogProps = { connected: boolean; copy: TeacherCopy };

export function CreateGroupDialog({ connected, copy }: CreateGroupDialogProps) {
  /* HOOKS */
  const [open, setOpen] = useState(false);

  /* HANDLERS */
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        className={styles.teacherGroups__createButton}
        hoverEffect="jump"
        onClick={handleOpen}
        shape="soft"
        size="small"
        startIcon={<AddRounded />}
        variant="primary"
      >
        {copy.groups.createGroup}
      </Button>
      {open ? (
        <GroupFormDialog connected={connected} copy={copy} mode="create" onClose={handleClose} />
      ) : null}
    </>
  );
}
