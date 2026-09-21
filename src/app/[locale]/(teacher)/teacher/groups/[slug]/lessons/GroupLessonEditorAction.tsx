"use client";

import AddRounded from "@mui/icons-material/AddRounded";
import EditRounded from "@mui/icons-material/EditRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/Button";
import type { Locale } from "@/config/Locales";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import type {
  TeacherCopy,
  TeacherLessonAssignment,
  TeacherLessonFormValue,
  TeacherLessonMaterial,
  TeacherLessonSession,
  TeacherLessonStatus,
  TeacherLessonTest,
} from "@/types/teacher/Teacher";

type GroupLessonEditorActionProps = {
  assignments: TeacherLessonAssignment[];
  copy: TeacherCopy;
  lesson?: TeacherLessonSession;
  locale: Locale;
  materials: TeacherLessonMaterial[];
  mode: "create" | "edit";
  onPreviewChange?: (value: TeacherLessonFormValue) => void;
  tests: TeacherLessonTest[];
};

type LessonLinkGroup = {
  emptyMessage: string;
  label: string;
  name: "assignmentIds" | "materialIds" | "testIds";
  options: Array<{ id: string; title: string }>;
  selectedIds: string[];
};

const lessonStatuses: TeacherLessonStatus[] = ["planned", "completed", "cancelled"];

function resolveLessonStatus(value: FormDataEntryValue | null): TeacherLessonStatus {
  const status = String(value);
  return lessonStatuses.find((item) => item === status) ?? "planned";
}

export function GroupLessonEditorAction({
  assignments,
  copy,
  lesson,
  locale,
  materials,
  mode,
  onPreviewChange,
  tests,
}: GroupLessonEditorActionProps) {
  /* HOOKS */
  const [isOpen, setIsOpen] = useState(false);
  const notifications = useNotifications();

  const isEditing = mode === "edit";
  const actionLabel = isEditing
    ? copy.groupWorkspace.editLesson
    : copy.groupWorkspace.createActions.lesson;
  const description = isEditing
    ? copy.groupWorkspace.editLessonDescription
    : copy.groupWorkspace.createDescriptions.lesson;
  const statusLabels: Record<TeacherLessonStatus, string> = {
    cancelled: copy.groupWorkspace.cancelled,
    completed: copy.groupWorkspace.completed,
    planned: copy.groupWorkspace.planned,
  };
  const linkGroups: LessonLinkGroup[] = [
    {
      emptyMessage: copy.groupWorkspace.noMaterials,
      label: copy.groupWorkspace.linkedMaterials,
      name: "materialIds",
      options: materials.map((material) => ({ id: material.id, title: material.title[locale] })),
      selectedIds: lesson?.materialIds ?? [],
    },
    {
      emptyMessage: copy.groupWorkspace.noAssignments,
      label: copy.groupWorkspace.linkedAssignments,
      name: "assignmentIds",
      options: assignments.map((assignment) => ({
        id: assignment.id,
        title: assignment.title[locale],
      })),
      selectedIds: lesson?.assignmentIds ?? [],
    },
    {
      emptyMessage: copy.groupWorkspace.noTests,
      label: copy.groupWorkspace.linkedTests,
      name: "testIds",
      options: tests.map((test) => ({ id: test.id, title: test.title[locale] })),
      selectedIds: lesson?.testIds ?? [],
    },
  ];

  /* HANDLERS */
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value: TeacherLessonFormValue = {
      assignmentIds: formData.getAll("assignmentIds").map(String),
      attendancePresent: Number(formData.get("attendancePresent")),
      attendanceTotal: Number(formData.get("attendanceTotal")),
      date: String(formData.get("date")),
      endsAt: String(formData.get("endsAt")),
      materialIds: formData.getAll("materialIds").map(String),
      objective: String(formData.get("objective")),
      room: String(formData.get("room")),
      startsAt: String(formData.get("startsAt")),
      status: resolveLessonStatus(formData.get("status")),
      testIds: formData.getAll("testIds").map(String),
      topic: String(formData.get("topic")),
    };

    onPreviewChange?.(value);
    setIsOpen(false);
    notifications.info({
      message: isEditing
        ? copy.groupWorkspace.lessonEditPreviewMessage
        : copy.groupWorkspace.createPreviewMessage,
      title: isEditing
        ? copy.groupWorkspace.lessonEditPreviewTitle
        : copy.groupWorkspace.createPreviewTitle,
    });
  };

  return (
    <>
      <Button
        hoverEffect="jump"
        onClick={handleOpen}
        shape="soft"
        size="small"
        startIcon={isEditing ? <EditRounded /> : <AddRounded />}
        variant={isEditing ? "secondary" : "primary"}
      >
        {actionLabel}
      </Button>

      <Dialog fullWidth maxWidth="md" onClose={handleClose} open={isOpen}>
        <form
          key={lesson ? `${lesson.id}-${lesson.date}-${lesson.startsAt}-${lesson.endsAt}` : "new"}
          onSubmit={handleSubmit}
        >
          <DialogTitle>{actionLabel}</DialogTitle>
          <DialogContent className="teacherGroups__lessonEditorContent">
            <p>{description}</p>

            <div className="teacherGroups__lessonEditorGrid">
              <TextField
                autoFocus
                defaultValue={lesson?.topic[locale] ?? ""}
                fullWidth
                label={copy.groupWorkspace.topic}
                name="topic"
                required
              />
              <TextField
                defaultValue={lesson?.status ?? "planned"}
                fullWidth
                label={copy.groupWorkspace.status}
                name="status"
                select
              >
                {lessonStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {statusLabels[status]}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                className="teacherGroups__lessonEditorWideField"
                defaultValue={lesson?.objective[locale] ?? ""}
                fullWidth
                label={copy.groupWorkspace.objective}
                minRows={3}
                multiline
                name="objective"
                required
              />
              <TextField
                defaultValue={lesson?.date ?? ""}
                fullWidth
                label={copy.groupWorkspace.date}
                name="date"
                required
                slotProps={{ inputLabel: { shrink: true } }}
                type="date"
              />
              <TextField
                defaultValue={lesson?.room ?? ""}
                fullWidth
                label={copy.groupWorkspace.room}
                name="room"
                required
              />
              <TextField
                defaultValue={lesson?.startsAt ?? ""}
                fullWidth
                label={copy.groupWorkspace.startTime}
                name="startsAt"
                required
                slotProps={{ inputLabel: { shrink: true } }}
                type="time"
              />
              <TextField
                defaultValue={lesson?.endsAt ?? ""}
                fullWidth
                label={copy.groupWorkspace.endTime}
                name="endsAt"
                required
                slotProps={{ inputLabel: { shrink: true } }}
                type="time"
              />
              <TextField
                defaultValue={lesson?.attendancePresent ?? 0}
                fullWidth
                label={copy.groupWorkspace.attendancePresent}
                name="attendancePresent"
                required
                slotProps={{ htmlInput: { min: 0 } }}
                type="number"
              />
              <TextField
                defaultValue={lesson?.attendanceTotal ?? 0}
                fullWidth
                label={copy.groupWorkspace.attendanceTotal}
                name="attendanceTotal"
                required
                slotProps={{ htmlInput: { min: 0 } }}
                type="number"
              />
            </div>

            <div className="teacherGroups__lessonLinkPickerGrid">
              {linkGroups.map((group) => (
                <fieldset className="teacherGroups__lessonLinkPicker" key={group.name}>
                  <legend>{group.label}</legend>
                  {group.options.length > 0 ? (
                    <div>
                      {group.options.map((option) => (
                        <label key={option.id}>
                          <input
                            defaultChecked={group.selectedIds.includes(option.id)}
                            name={group.name}
                            type="checkbox"
                            value={option.id}
                          />
                          <span>{option.title}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <p>{group.emptyMessage}</p>
                  )}
                </fieldset>
              ))}
            </div>
          </DialogContent>
          <DialogActions className="teacherGroups__createDialogActions">
            <Button onClick={handleClose} variant="ghost">
              {copy.common.cancel}
            </Button>
            <Button hoverEffect="jump" type="submit">
              {copy.common.savePreview}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
