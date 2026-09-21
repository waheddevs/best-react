"use client";

import AddRounded from "@mui/icons-material/AddRounded";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import Dialog from "@mui/material/Dialog";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import { useRef, useState, type ChangeEvent, type FormEvent, type MouseEvent } from "react";

import { Button } from "@/components/ui/Button";
import {
  createConnectedTeacherGroup,
  updateConnectedTeacherGroup,
} from "@/features/teacher/groups/TeacherGroupActions";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { isTeacherTimeValueValid } from "@/lib/teacher/TeacherTimeInput";
import type { TeacherCopy, TeacherGroup, TeacherGroupCategory } from "@/types/teacher/Teacher";

import { CreateGroupTimeField } from "./CreateGroupTimeField";

type GroupFormMode = "create" | "edit";
type GroupFormCategory = "" | "IELTS" | "CEFR" | "GENERAL_ENGLISH";

type GroupFormDialogProps = {
  connected: boolean;
  copy: TeacherCopy;
  group?: TeacherGroup;
  mode: GroupFormMode;
  onClose: () => void;
};

function timeToMinutes(value: string): number {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(value: number | null | undefined): string {
  if (value == null) return "";
  return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
}

function makeSlug(name: string): string {
  const stem = name
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
  return `${stem || "group"}-${crypto.randomUUID().slice(0, 8)}`;
}

function formCategory(category: TeacherGroupCategory | null | undefined): GroupFormCategory {
  if (category === "ielts") return "IELTS";
  if (category === "cefr") return "CEFR";
  if (category === "generalEnglish") return "GENERAL_ENGLISH";
  return "";
}

export function GroupFormDialog({ connected, copy, group, mode, onClose }: GroupFormDialogProps) {
  /* HOOKS */
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState(group?.name ?? "");
  const [nameTouched, setNameTouched] = useState(false);
  const nameInteracted = useRef(false);
  const [serverNameError, setServerNameError] = useState("");
  const [category, setCategory] = useState<GroupFormCategory>(() => formCategory(group?.category));
  const [categoryTouched, setCategoryTouched] = useState(false);
  const [categoryAnchor, setCategoryAnchor] = useState<HTMLElement | null>(null);
  const [room, setRoom] = useState(group?.room === "—" ? "" : (group?.room ?? ""));
  const [roomTouched, setRoomTouched] = useState(false);
  const [tuition, setTuition] = useState(String(group?.monthlyTuitionUzs ?? 300000));
  const [tuitionTouched, setTuitionTouched] = useState(false);
  const [scheduleDays, setScheduleDays] = useState<number[]>(group?.scheduleDays ?? []);
  const [daysTouched, setDaysTouched] = useState(false);
  const [start, setStart] = useState(() => minutesToTime(group?.startsAtMinutes));
  const [end, setEnd] = useState(() => minutesToTime(group?.endsAtMinutes));
  const router = useRouter();
  const notifications = useNotifications();
  const nameError =
    (submitted || nameTouched) && !name.trim() ? copy.groups.groupNameRequired : serverNameError;
  const categoryError =
    (submitted || categoryTouched) && !category ? copy.groups.groupTypeRequired : "";
  const roomError = (submitted || roomTouched) && !room.trim() ? copy.groups.groupRoomRequired : "";
  const tuitionError =
    (submitted || tuitionTouched) &&
    (!/^[1-9]\d{0,9}$/.test(tuition) || Number(tuition) > 2000000000)
      ? copy.groups.groupTuitionError
      : "";
  const daysError =
    (submitted || daysTouched) && scheduleDays.length === 0 ? copy.groups.groupDaysRequired : "";
  const endBeforeStart =
    isTeacherTimeValueValid(start) &&
    isTeacherTimeValueValid(end) &&
    timeToMinutes(end) <= timeToMinutes(start);
  const idPrefix = `${mode}-teacher-group`;
  const title = mode === "create" ? copy.groups.createGroup : copy.groups.editGroup;

  /* HANDLERS */
  const handleClose = () => {
    if (!pending) {
      setCategoryAnchor(null);
      onClose();
    }
  };

  const handleCategoryOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setCategoryAnchor(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setCategoryTouched(true);
    setCategoryAnchor(null);
  };

  const handleCategorySelect = (value: Exclude<GroupFormCategory, "">) => {
    setCategory(value);
    setCategoryTouched(true);
    setCategoryAnchor(null);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    nameInteracted.current = true;
    setName(event.currentTarget.value);
    setServerNameError("");
  };

  const handleNameInteraction = () => {
    nameInteracted.current = true;
  };

  const handleNameBlur = () => {
    if (nameInteracted.current) setNameTouched(true);
  };

  const handleRoomChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoom(event.currentTarget.value);
  };

  const handleDayChange = (day: number) => {
    setDaysTouched(true);
    setScheduleDays((current) =>
      current.includes(day)
        ? current.filter((item) => item !== day)
        : [...current, day].sort((a, b) => a - b),
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    setSubmitted(true);
    setError("");
    if (
      !name.trim() ||
      !category ||
      !room.trim() ||
      !/^[1-9]\d{0,9}$/.test(tuition) ||
      Number(tuition) > 2000000000 ||
      !scheduleDays.length ||
      !isTeacherTimeValueValid(start) ||
      !isTeacherTimeValueValid(end) ||
      endBeforeStart
    ) {
      return;
    }
    if (!connected) {
      setError(
        mode === "create" ? copy.groups.createGroupUnavailable : copy.groups.editGroupUnavailable,
      );
      return;
    }
    if (mode === "edit" && !group) {
      setError(copy.groups.editGroupError);
      return;
    }
    setServerNameError("");
    setPending(true);
    try {
      const commonInput = {
        category,
        endsAtMinutes: timeToMinutes(end),
        name: name.trim(),
        monthlyTuitionUzs: tuition,
        room: room.trim(),
        scheduleDays,
        startsAtMinutes: timeToMinutes(start),
        timeZone: "Asia/Tashkent",
      };
      const result =
        mode === "create"
          ? await createConnectedTeacherGroup({ ...commonInput, slug: makeSlug(name) })
          : await updateConnectedTeacherGroup({
              ...commonInput,
              groupId: group?.id ?? "",
              slug: group?.recordSlug ?? "",
            });
      if (!result.ok) {
        if (result.code === "CONFLICT") {
          setServerNameError(
            mode === "create" ? copy.groups.createGroupConflict : copy.groups.editGroupConflict,
          );
        } else {
          setError(mode === "create" ? copy.groups.createGroupError : copy.groups.editGroupError);
        }
        return;
      }
      onClose();
      notifications.success({
        title,
        message: mode === "create" ? copy.groups.createGroupSuccess : copy.groups.editGroupSuccess,
      });
      router.refresh();
    } catch {
      setError(mode === "create" ? copy.groups.createGroupError : copy.groups.editGroupError);
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog
      aria-labelledby={`${idPrefix}-title`}
      onClose={handleClose}
      open
      slotProps={{
        backdrop: { className: "teacherGroups__createBackdrop" },
        paper: { className: "teacherGroups__createPaper" },
      }}
    >
      <form className="teacherGroups__createForm" noValidate onSubmit={handleSubmit}>
        <h2 id={`${idPrefix}-title`}>{title}</h2>
        <div className="teacherGroups__createField">
          <label htmlFor={`${idPrefix}-name`}>{copy.groups.groupNameField}</label>
          <input
            aria-describedby={nameError ? `${idPrefix}-name-error` : undefined}
            aria-invalid={Boolean(nameError)}
            id={`${idPrefix}-name`}
            maxLength={160}
            name="name"
            onBlur={handleNameBlur}
            onChange={handleNameChange}
            onKeyDown={handleNameInteraction}
            onPointerDown={handleNameInteraction}
            required
            value={name}
          />
          <span
            className="teacherGroups__createFieldError"
            data-visible={Boolean(nameError)}
            id={`${idPrefix}-name-error`}
            role={nameError ? "alert" : undefined}
          >
            {nameError}
          </span>
        </div>
        <div className="teacherGroups__createGrid">
          <div className="teacherGroups__createField">
            <span id={`${idPrefix}-type-label`}>{copy.groups.groupTypeField}</span>
            <input name="category" type="hidden" value={category} />
            <button
              aria-controls={categoryAnchor ? `${idPrefix}-type-menu` : undefined}
              aria-describedby={categoryError ? `${idPrefix}-type-error` : undefined}
              aria-expanded={Boolean(categoryAnchor)}
              aria-haspopup="menu"
              aria-labelledby={`${idPrefix}-type-label`}
              className="teacherGroups__createPickerTrigger"
              data-invalid={Boolean(categoryError)}
              onClick={handleCategoryOpen}
              type="button"
            >
              <span>
                {category === "GENERAL_ENGLISH"
                  ? copy.groups.categories.generalEnglish
                  : category || copy.groups.groupTypeField}
              </span>
              <KeyboardArrowDownRounded aria-hidden="true" />
            </button>
            <Menu
              anchorEl={categoryAnchor}
              id={`${idPrefix}-type-menu`}
              onClose={handleCategoryClose}
              open={Boolean(categoryAnchor)}
              slotProps={{
                paper: {
                  className: "teacherGroups__createMenu",
                  style: { width: categoryAnchor?.offsetWidth },
                },
              }}
            >
              {(["IELTS", "CEFR", "GENERAL_ENGLISH"] as const).map((value) => (
                <MenuItem
                  className="teacherGroups__createMenuItem"
                  key={value}
                  onClick={() => handleCategorySelect(value)}
                  selected={category === value}
                >
                  {value === "GENERAL_ENGLISH" ? copy.groups.categories.generalEnglish : value}
                </MenuItem>
              ))}
            </Menu>
            <span
              className="teacherGroups__createFieldError"
              data-visible={Boolean(categoryError)}
              id={`${idPrefix}-type-error`}
              role={categoryError ? "alert" : undefined}
            >
              {categoryError}
            </span>
          </div>
          <div className="teacherGroups__createField">
            <label htmlFor={`${idPrefix}-room`}>{copy.groups.groupRoomField}</label>
            <input
              aria-describedby={roomError ? `${idPrefix}-room-error` : undefined}
              aria-invalid={Boolean(roomError)}
              id={`${idPrefix}-room`}
              maxLength={80}
              name="room"
              onBlur={() => setRoomTouched(true)}
              onChange={handleRoomChange}
              required
              value={room}
            />
            <span
              className="teacherGroups__createFieldError"
              data-visible={Boolean(roomError)}
              id={`${idPrefix}-room-error`}
              role={roomError ? "alert" : undefined}
            >
              {roomError}
            </span>
          </div>
        </div>
        <div className="teacherGroups__createField">
          <label htmlFor={`${idPrefix}-tuition`}>{copy.groups.groupTuitionField}</label>
          <input
            aria-describedby={tuitionError ? `${idPrefix}-tuition-error` : undefined}
            aria-invalid={Boolean(tuitionError)}
            id={`${idPrefix}-tuition`}
            inputMode="numeric"
            maxLength={10}
            name="monthlyTuitionUzs"
            onBlur={() => setTuitionTouched(true)}
            onChange={(event) => setTuition(event.currentTarget.value)}
            required
            value={tuition}
          />
          <span
            className="teacherGroups__createFieldError"
            data-visible={Boolean(tuitionError)}
            id={`${idPrefix}-tuition-error`}
            role={tuitionError ? "alert" : undefined}
          >
            {tuitionError}
          </span>
        </div>
        <fieldset
          aria-describedby={daysError ? `${idPrefix}-days-error` : undefined}
          aria-invalid={Boolean(daysError)}
          aria-required="true"
          className="teacherGroups__createDays"
        >
          <legend>{copy.groups.groupDaysField}</legend>
          <div>
            {copy.groups.weekdays.map((day, index) => (
              <label key={index}>
                <input
                  checked={scheduleDays.includes(index + 1)}
                  name="scheduleDays"
                  onChange={() => handleDayChange(index + 1)}
                  type="checkbox"
                  value={index + 1}
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
          <span
            className="teacherGroups__createFieldError"
            data-visible={Boolean(daysError)}
            id={`${idPrefix}-days-error`}
            role={daysError ? "alert" : undefined}
          >
            {daysError}
          </span>
        </fieldset>
        <div className="teacherGroups__createGrid">
          <CreateGroupTimeField
            formatMessage={copy.groups.groupTimeFormat}
            idPrefix={idPrefix}
            label={copy.groups.groupStartsField}
            name="start"
            onChange={setStart}
            requiredMessage={copy.groups.groupStartsRequired}
            submitted={submitted}
            value={start}
          />
          <CreateGroupTimeField
            formatMessage={copy.groups.groupTimeFormat}
            idPrefix={idPrefix}
            label={copy.groups.groupEndsField}
            name="end"
            onChange={setEnd}
            rangeMessage={endBeforeStart ? copy.groups.groupTimeError : undefined}
            requiredMessage={copy.groups.groupEndsRequired}
            submitted={submitted}
            value={end}
          />
        </div>
        {error ? (
          <p className="teacherGroups__createError" role="alert">
            {error}
          </p>
        ) : null}
        <div className="teacherGroups__createActions">
          <Button
            disabled={pending}
            onClick={handleClose}
            shape="soft"
            size="small"
            variant="secondary"
          >
            {copy.common.cancel}
          </Button>
          <Button
            disabled={pending}
            endIcon={mode === "create" ? <AddRounded /> : undefined}
            hoverEffect="jump"
            shape="soft"
            size="small"
            type="submit"
            variant="primary"
          >
            {mode === "create" ? title : copy.common.save}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
