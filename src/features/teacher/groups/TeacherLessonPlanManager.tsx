"use client";

import AddRounded from "@mui/icons-material/AddRounded";
import AttachFileOutlined from "@mui/icons-material/AttachFileOutlined";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
import DownloadOutlined from "@mui/icons-material/DownloadOutlined";
import Edit from "@mui/icons-material/Edit";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import SearchRounded from "@mui/icons-material/SearchRounded";
import { useRouter } from "next/navigation";
import { type FormEvent, type RefObject, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import type { Locale } from "@/config/Locales";
import { getTeacherLessonPlanCopy } from "@/dictionaries/teacher/TeacherLessonPlans";
import {
  archiveConnectedTeacherLessonPlan,
  confirmTeacherLessonUpload,
  createConnectedTeacherLessonPlan,
  createTeacherLessonUploadIntent,
  getTeacherLessonFileDownload,
  replaceConnectedTeacherLessonResource,
  updateConnectedTeacherLessonPlan,
} from "@/features/teacher/groups/TeacherLessonPlanActions";
import {
  getTeacherLessonFileMimeType,
  getTeacherLessonFileSizeLimit,
  isAcceptedTeacherLessonFile,
  teacherLessonFileAccept,
} from "@/features/teacher/groups/TeacherLessonFilePolicy";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import type {
  TeacherLessonPlan,
  TeacherLessonResource,
  TeacherLessonSchedule,
  TeacherLessonWorkspaceData,
} from "@/types/teacher/TeacherLessonPlan";

type TeacherLessonPlanManagerProps = {
  connected: boolean;
  emptyMessage: string;
  groupId: string;
  initialData: TeacherLessonWorkspaceData;
  locale: Locale;
  schedule: TeacherLessonSchedule;
};

export function TeacherLessonPlanManager({
  connected,
  emptyMessage,
  groupId,
  initialData,
  locale,
  schedule,
}: TeacherLessonPlanManagerProps) {
  const copy = getTeacherLessonPlanCopy(locale);
  const confirm = useConfirmDialog();
  const notifications = useNotifications();
  const router = useRouter();
  const materialInputRef = useRef<HTMLInputElement>(null);
  const taskInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState(initialData);
  const [name, setName] = useState("");
  const [materialFile, setMaterialFile] = useState<File | null>(null);
  const [taskFile, setTaskFile] = useState<File | null>(null);
  const [editingLesson, setEditingLesson] = useState<TeacherLessonPlan | null>(null);
  const [pending, setPending] = useState(false);
  const lessons = useMemo(
    () =>
      [...data.lessons].sort(
        (first, second) =>
          second.createdAt.localeCompare(first.createdAt) ||
          second.lessonNumber - first.lessonNumber,
      ),
    [data.lessons],
  );
  const visibleLessonIds = new Set(lessons.map(({ id }) => id));
  const materialCount = data.resources.filter(
    ({ kind, lessonId }) =>
      kind === "MATERIAL" && lessonId !== null && visibleLessonIds.has(lessonId),
  ).length;
  const editingMaterial = editingLesson
    ? data.resources.find(
        (resource) => resource.lessonId === editingLesson.id && resource.kind === "MATERIAL",
      )
    : undefined;
  const editingTask = editingLesson
    ? data.resources.find(
        (resource) => resource.lessonId === editingLesson.id && resource.kind === "TASK",
      )
    : undefined;

  const selectFile = (file: File | undefined, setFile: (next: File | null) => void) => {
    if (!file) return;
    if (!isAcceptedTeacherLessonFile(file)) {
      notifications.error({ title: copy.file, message: copy.fileFormatError });
      return;
    }
    if (file.size > getTeacherLessonFileSizeLimit(file)) {
      notifications.error({ title: copy.file, message: copy.fileSizeError });
      return;
    }
    setFile(file);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedName = name.trim();
    if (!normalizedName || pending) return;
    setPending(true);
    try {
      if (editingLesson) {
        if (!connected) {
          const updatedLesson = { ...editingLesson, name: normalizedName };
          const replacementKinds = new Set<TeacherLessonResource["kind"]>();
          const replacementResources: TeacherLessonResource[] = [];
          if (materialFile) {
            replacementKinds.add("MATERIAL");
            replacementResources.push(previewResource(updatedLesson, materialFile, "MATERIAL"));
          }
          if (taskFile) {
            replacementKinds.add("TASK");
            replacementResources.push(previewResource(updatedLesson, taskFile, "TASK"));
          }
          setData((current) => ({
            ...current,
            lessons: current.lessons.map((lesson) =>
              lesson.id === editingLesson.id ? updatedLesson : lesson,
            ),
            resources: [
              ...replacementResources,
              ...current.resources.filter(
                (resource) =>
                  resource.lessonId !== editingLesson.id || !replacementKinds.has(resource.kind),
              ),
            ],
          }));
        } else {
          const result = await updateConnectedTeacherLessonPlan({
            endsAt: editingLesson.endsAt,
            groupId,
            lessonId: editingLesson.id,
            name: normalizedName,
            room: editingLesson.room,
            startsAt: editingLesson.startsAt,
          });
          if (!result.ok) throw new Error(result.code);

          const [materialMediaObjectId, taskMediaObjectId] = await Promise.all([
            materialFile ? uploadFile(materialFile) : Promise.resolve(undefined),
            taskFile ? uploadFile(taskFile) : Promise.resolve(undefined),
          ]);
          const [materialReplacement, taskReplacement] = await Promise.all([
            materialMediaObjectId
              ? replaceConnectedTeacherLessonResource({
                  categoryId: data.categoryId,
                  groupId,
                  kind: "MATERIAL",
                  lessonId: editingLesson.id,
                  locale,
                  mediaObjectId: materialMediaObjectId,
                  name: normalizedName,
                  replacedMaterialId: editingMaterial?.id,
                })
              : Promise.resolve(null),
            taskMediaObjectId
              ? replaceConnectedTeacherLessonResource({
                  categoryId: data.categoryId,
                  groupId,
                  kind: "TASK",
                  lessonId: editingLesson.id,
                  locale,
                  mediaObjectId: taskMediaObjectId,
                  name: normalizedName,
                  replacedMaterialId: editingTask?.id,
                })
              : Promise.resolve(null),
          ]);
          if (
            (materialReplacement && !materialReplacement.ok) ||
            (taskReplacement && !taskReplacement.ok)
          ) {
            throw new Error("RESOURCE_REPLACEMENT_FAILED");
          }

          const updatedLesson = { ...editingLesson, name: normalizedName };
          const replacementKinds = new Set<TeacherLessonResource["kind"]>();
          const replacementResources: TeacherLessonResource[] = [];
          if (materialReplacement?.ok && materialFile && materialMediaObjectId) {
            replacementKinds.add("MATERIAL");
            replacementResources.push(
              connectedReplacementResource({
                existing: editingMaterial,
                file: materialFile,
                kind: "MATERIAL",
                lesson: updatedLesson,
                materialId: materialReplacement.material.id,
                mediaObjectId: materialMediaObjectId,
              }),
            );
          }
          if (taskReplacement?.ok && taskFile && taskMediaObjectId) {
            replacementKinds.add("TASK");
            replacementResources.push(
              connectedReplacementResource({
                existing: editingTask,
                file: taskFile,
                kind: "TASK",
                lesson: updatedLesson,
                materialId: taskReplacement.material.id,
                mediaObjectId: taskMediaObjectId,
              }),
            );
          }
          setData((current) => ({
            ...current,
            lessons: current.lessons.map((lesson) =>
              lesson.id === editingLesson.id ? updatedLesson : lesson,
            ),
            resources: [
              ...replacementResources,
              ...current.resources.filter(
                (resource) =>
                  resource.lessonId !== editingLesson.id || !replacementKinds.has(resource.kind),
              ),
            ],
          }));
        }
        notifications.success({ title: copy.savedTitle, message: copy.savedMessage });
      } else if (!connected) {
        const lesson = createPreviewLesson(data.lessons, groupId, normalizedName, schedule.room);
        const resources = [
          materialFile ? previewResource(lesson, materialFile, "MATERIAL") : null,
          taskFile ? previewResource(lesson, taskFile, "TASK") : null,
        ].filter((resource): resource is TeacherLessonResource => resource !== null);
        setData((current) => ({
          ...current,
          lessons: [lesson, ...current.lessons],
          resources: [...resources, ...current.resources],
        }));
        notifications.success({
          title: copy.createdTitle,
          message: copy.createdMessage(normalizedName),
        });
      } else {
        const [materialMediaObjectId, taskMediaObjectId] = await Promise.all([
          materialFile ? uploadFile(materialFile) : Promise.resolve(undefined),
          taskFile ? uploadFile(taskFile) : Promise.resolve(undefined),
        ]);
        const result = await createConnectedTeacherLessonPlan({
          categoryId: data.categoryId,
          groupId,
          locale,
          materialMediaObjectId,
          name: normalizedName,
          schedule,
          taskMediaObjectId,
        });
        if (!result.ok) throw new Error(result.code);
        notifications.success({
          title: copy.createdTitle,
          message: copy.createdMessage(normalizedName),
        });
      }
      resetForm();
      router.refresh();
    } catch {
      notifications.error({
        title: editingLesson ? copy.editTitle : copy.createTitle,
        message: copy.createFailed,
      });
    } finally {
      setPending(false);
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const intent = await createTeacherLessonUploadIntent({
      mimeType: getTeacherLessonFileMimeType(file),
      originalName: file.name,
      sizeBytes: file.size,
    });
    if (!intent.ok) throw new Error(intent.code);
    const headers = new Headers(
      intent.uploadIntent.requiredHeaders.map(
        ({ name: headerName, value }): [string, string] => [headerName, value],
      ),
    );
    const response = await fetch(intent.uploadIntent.url, {
      body: file,
      headers,
      method: intent.uploadIntent.method,
    });
    if (!response.ok) throw new Error("UPLOAD_FAILED");
    const confirmed = await confirmTeacherLessonUpload(intent.uploadIntent.mediaObjectId);
    if (!confirmed.ok) throw new Error(confirmed.code);
    return confirmed.mediaObject.id;
  };

  const resetForm = () => {
    setEditingLesson(null);
    setMaterialFile(null);
    setName("");
    setTaskFile(null);
    if (materialInputRef.current) materialInputRef.current.value = "";
    if (taskInputRef.current) taskInputRef.current.value = "";
  };

  const handleEdit = (lesson: TeacherLessonPlan) => {
    setMaterialFile(null);
    setTaskFile(null);
    if (materialInputRef.current) materialInputRef.current.value = "";
    if (taskInputRef.current) taskInputRef.current.value = "";
    setEditingLesson(lesson);
    setName(lesson.name);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  const handleDelete = async (lesson: TeacherLessonPlan) => {
    const accepted = await confirm({
      cancelLabel: copy.cancel,
      confirmLabel: copy.deleteConfirm,
      icon: "delete",
      message: copy.deleteMessage(lesson.name),
      title: copy.deleteTitle,
      tone: "danger",
    });
    if (!accepted) return;
    setPending(true);
    const result = connected
      ? await archiveConnectedTeacherLessonPlan(lesson.id)
      : ({ ok: true } as const);
    if (result.ok) {
      setData((current) => ({
        ...current,
        lessons: current.lessons.filter(({ id }) => id !== lesson.id),
        resources: current.resources.filter(({ lessonId }) => lessonId !== lesson.id),
      }));
      notifications.success({
        icon: "delete",
        message: copy.deletedMessage(lesson.name),
        title: copy.deletedTitle,
      });
      router.refresh();
    } else {
      notifications.error({ title: copy.delete, message: copy.createFailed });
    }
    setPending(false);
  };

  const openResource = async (resource: TeacherLessonResource, download: boolean) => {
    const url = resource.previewUrl ?? (await resolveConnectedUrl(resource.mediaObjectId));
    if (!url) {
      notifications.error({ title: copy.file, message: copy.uploadFailed });
      return;
    }
    if (!download) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = resource.originalName;
    anchor.rel = "noopener";
    anchor.click();
  };

  const resolveConnectedUrl = async (mediaObjectId: string) => {
    if (!connected) return null;
    const result = await getTeacherLessonFileDownload(mediaObjectId);
    return result.ok ? result.downloadIntent.url : null;
  };

  return (
    <div className="teacherGroups__lessonPlanWorkspace">
      <form className="teacherGroups__lessonPlanForm" onSubmit={handleSubmit}>
        <div className="teacherGroups__lessonPlanFormHeading">
          <h3>{editingLesson ? copy.editTitle : copy.createTitle}</h3>
        </div>
        <label className="teacherGroups__lessonPlanName">
          <input
            aria-label={copy.name}
            disabled={pending}
            maxLength={240}
            onChange={(event) => setName(event.target.value)}
            placeholder={copy.name}
            required
            value={name}
          />
        </label>
        <div className="teacherGroups__lessonUploadFields">
          <FilePicker
            currentFileName={editingMaterial?.originalName}
            file={materialFile}
            inputRef={materialInputRef}
            label={copy.addMaterial}
            onChange={(file) => selectFile(file, setMaterialFile)}
          />
          <FilePicker
            currentFileName={editingTask?.originalName}
            file={taskFile}
            inputRef={taskInputRef}
            label={copy.addTask}
            onChange={(file) => selectFile(file, setTaskFile)}
          />
        </div>
        <div className="teacherGroups__lessonPlanFormActions">
          {editingLesson ? (
            <Button
              disabled={pending}
              onClick={resetForm}
              shape="soft"
              size="small"
              type="button"
              variant="secondary"
            >
              {copy.cancel}
            </Button>
          ) : null}
          <Button
            disabled={pending}
            hoverEffect="jump"
            shape="soft"
            size="small"
            startIcon={editingLesson ? <SaveOutlined /> : <AddRounded />}
            type="submit"
          >
            {pending ? copy.uploading : editingLesson ? copy.save : copy.add}
          </Button>
        </div>
      </form>

      <section aria-labelledby="lesson-list-title" className="teacherGroups__lessonTableSection">
        <div className="teacherGroups__rosterHeader teacherGroups__lessonListHeader">
          <div>
            <h2 className="teacherShared__sectionTitle" id="lesson-list-title">
              {copy.lessonList}
            </h2>
            <span className="teacherGroups__resultCount">{copy.materialCount(materialCount)}</span>
          </div>
        </div>
        {lessons.length > 0 ? (
          <div className="teacherGroups__learnerList teacherGroups__lessonTableWrap">
            <table
              aria-label={copy.lessonList}
              className="teacherGroups__learnerTable teacherGroups__lessonTable"
            >
              <thead>
                <tr>
                  <th>{copy.name}</th>
                  <th>{copy.material}</th>
                  <th>{copy.task}</th>
                  <th>{copy.created}</th>
                  <th>{copy.actions}</th>
                </tr>
              </thead>
              <tbody>
                {lessons.map((lesson, index) => {
                  const material = data.resources.find(
                    (resource) => resource.lessonId === lesson.id && resource.kind === "MATERIAL",
                  );
                  const task = data.resources.find(
                    (resource) => resource.lessonId === lesson.id && resource.kind === "TASK",
                  );
                  return (
                    <tr key={lesson.id}>
                      <td>
                        <div className="teacherGroups__learnerIdentity teacherGroups__lessonIdentity">
                          <span className="teacherGroups__learnerIndex">{index + 1}</span>
                          <strong>{lesson.name}</strong>
                        </div>
                      </td>
                      <td>
                        <ResourceCell copy={copy} onOpen={openResource} resource={material} />
                      </td>
                      <td>
                        <ResourceCell copy={copy} onOpen={openResource} resource={task} />
                      </td>
                      <td>{formatDate(lesson.createdAt, locale)}</td>
                      <td>
                        <div className="teacherGroups__learnerActions teacherGroups__lessonActions">
                          <button
                            aria-label={copy.edit}
                            disabled={pending}
                            onClick={() => handleEdit(lesson)}
                            type="button"
                          >
                            <Edit />
                          </button>
                          <button
                            aria-label={copy.delete}
                            className="teacherGroups__learnerDeleteButton teacherGroups__lessonActionButton--delete"
                            disabled={pending}
                            onClick={() => void handleDelete(lesson)}
                            type="button"
                          >
                            <DeleteOutlineRounded />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="teacherShared__emptyState">
            <div>
              <span className="teacherShared__emptyIcon">
                <SearchRounded aria-hidden="true" />
              </span>
              <h3 className="teacherShared__emptyTitle">{emptyMessage}</h3>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

type FilePickerProps = {
  currentFileName?: string;
  file: File | null;
  inputRef: RefObject<HTMLInputElement | null>;
  label: string;
  onChange: (file: File | undefined) => void;
};

function FilePicker({ currentFileName, file, inputRef, label, onChange }: FilePickerProps) {
  const displayedFileName = file?.name ?? currentFileName;
  return (
    <label className="teacherGroups__lessonFilePicker">
      <span className="teacherGroups__lessonFileButton">
        <AttachFileOutlined />
        <span title={displayedFileName}>
          {displayedFileName ? truncateFileName(displayedFileName) : label}
        </span>
      </span>
      <input
        accept={teacherLessonFileAccept}
        onChange={(event) => onChange(event.target.files?.[0])}
        ref={inputRef}
        type="file"
      />
    </label>
  );
}

function truncateFileName(name: string): string {
  const maxLength = 16;
  if (name.length <= maxLength) return name;

  const extensionStart = name.lastIndexOf(".");
  const extension = extensionStart > 0 ? name.slice(extensionStart) : "";
  const visibleNameLength = Math.max(4, maxLength - extension.length - 3);
  return `${name.slice(0, visibleNameLength)}...${extension}`;
}

function ResourceCell({
  copy,
  onOpen,
  resource,
}: {
  copy: ReturnType<typeof getTeacherLessonPlanCopy>;
  onOpen: (resource: TeacherLessonResource, download: boolean) => Promise<void>;
  resource: TeacherLessonResource | undefined;
}) {
  if (!resource) return <span className="teacherGroups__lessonEmptyFile">—</span>;
  return (
    <div className="teacherGroups__lessonFileCell">
      <span className="teacherGroups__lessonFileName" title={resource.originalName}>
        {resource.originalName}
      </span>
      <div className="teacherGroups__learnerActions teacherGroups__lessonFileActions">
        <button
          aria-label={copy.preview}
          onClick={() => void onOpen(resource, false)}
          type="button"
        >
          <DescriptionOutlined />
        </button>
        <button
          aria-label={copy.download}
          onClick={() => void onOpen(resource, true)}
          type="button"
        >
          <DownloadOutlined />
        </button>
      </div>
    </div>
  );
}

function previewResource(
  lesson: TeacherLessonPlan,
  file: File,
  kind: TeacherLessonResource["kind"],
): TeacherLessonResource {
  return {
    createdAt: lesson.createdAt,
    description: null,
    id: crypto.randomUUID(),
    kind,
    lessonId: lesson.id,
    libraryItemId: crypto.randomUUID(),
    mediaObjectId: crypto.randomUUID(),
    mimeType: getTeacherLessonFileMimeType(file),
    originalName: file.name,
    previewUrl: URL.createObjectURL(file),
    sizeBytes: file.size,
    title: lesson.name,
  };
}

function connectedReplacementResource({
  existing,
  file,
  kind,
  lesson,
  materialId,
  mediaObjectId,
}: {
  existing: TeacherLessonResource | undefined;
  file: File;
  kind: TeacherLessonResource["kind"];
  lesson: TeacherLessonPlan;
  materialId: string;
  mediaObjectId: string;
}): TeacherLessonResource {
  return {
    createdAt: new Date().toISOString(),
    description: null,
    id: materialId,
    kind,
    lessonId: lesson.id,
    libraryItemId: existing?.libraryItemId ?? materialId,
    mediaObjectId,
    mimeType: getTeacherLessonFileMimeType(file),
    originalName: file.name,
    sizeBytes: file.size,
    title: lesson.name,
  };
}

function createPreviewLesson(
  lessons: TeacherLessonPlan[],
  groupId: string,
  name: string,
  room: string,
): TeacherLessonPlan {
  const now = Date.now();
  const startsAt = new Date(now + 86_400_000).toISOString();
  return {
    createdAt: new Date(now).toISOString(),
    endsAt: new Date(new Date(startsAt).getTime() + 90 * 60_000).toISOString(),
    groupId,
    id: `preview-lesson-${crypto.randomUUID()}`,
    lessonNumber: Math.max(0, ...lessons.map((item) => item.lessonNumber)) + 1,
    name,
    room,
    startsAt,
    status: "DRAFT",
    summary: null,
  };
}

function formatDate(value: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
