"use client";

import AddRounded from "@mui/icons-material/AddRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
import DownloadOutlined from "@mui/icons-material/DownloadOutlined";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import SearchRounded from "@mui/icons-material/SearchRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import { type FormEvent, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import type { Locale } from "@/config/Locales";
import { getTeacherLessonPlanCopy } from "@/dictionaries/teacher/TeacherLessonPlans";
import {
  archiveConnectedTeacherLessonResource,
  confirmTeacherLessonUpload,
  createConnectedTeacherMaterial,
  createTeacherLessonUploadIntent,
  getTeacherLessonFileDownload,
} from "@/features/teacher/groups/TeacherLessonPlanActions";
import {
  getTeacherLessonFileMimeType,
  getTeacherLessonFileSizeLimit,
  isAcceptedTeacherLessonFile,
  teacherLessonFileAccept,
} from "@/features/teacher/groups/TeacherLessonFilePolicy";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import type { TeacherLessonResource } from "@/types/teacher/TeacherLessonPlan";

type TeacherGroupMaterialsManagerProps = {
  actionLabel: string;
  categoryId: string | null;
  connected: boolean;
  emptyMessage: string;
  groupId: string;
  initialResources: TeacherLessonResource[];
  locale: Locale;
};

type MaterialSort = "name" | "newest" | "oldest" | "type";

const materialSortOptions: MaterialSort[] = ["newest", "oldest", "name", "type"];

export function TeacherGroupMaterialsManager({
  actionLabel,
  categoryId,
  connected,
  emptyMessage,
  groupId,
  initialResources,
  locale,
}: TeacherGroupMaterialsManagerProps) {
  const copy = getTeacherLessonPlanCopy(locale);
  const confirm = useConfirmDialog();
  const notifications = useNotifications();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [resources, setResources] = useState(
    initialResources.filter((resource) => resource.kind === "MATERIAL"),
  );
  const [sort, setSort] = useState<MaterialSort>("newest");
  const [sortAnchorElement, setSortAnchorElement] = useState<HTMLElement | null>(null);
  const sortMenuIsOpen = Boolean(sortAnchorElement);
  const sortLabels: Record<MaterialSort, string> = {
    name: copy.sortName,
    newest: copy.sortNewest,
    oldest: copy.sortOldest,
    type: copy.sortType,
  };

  const sortedResources = useMemo(() => {
    const next = [...resources];
    if (sort === "oldest") return next.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    if (sort === "name") return next.sort((a, b) => a.title.localeCompare(b.title, locale));
    if (sort === "type") return next.sort((a, b) => a.mimeType.localeCompare(b.mimeType));
    return next.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [locale, resources, sort]);

  const handleFile = (next: File | undefined) => {
    if (!next) return;
    if (!isAcceptedTeacherLessonFile(next)) {
      notifications.error({ title: copy.file, message: copy.fileFormatError });
      return;
    }
    if (next.size > getTeacherLessonFileSizeLimit(next)) {
      notifications.error({ title: copy.file, message: copy.fileSizeError });
      return;
    }
    setFile(next);
    if (!name) setName(next.name.replace(/\.[^.]+$/, ""));
  };

  const handleSortSelect = (nextSort: MaterialSort) => {
    setSort(nextSort);
    setSortAnchorElement(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file || !name.trim() || pending) return;
    setPending(true);
    try {
      if (!connected) {
        const preview: TeacherLessonResource = {
          createdAt: new Date().toISOString(),
          description: null,
          id: crypto.randomUUID(),
          kind: "MATERIAL",
          lessonId: null,
          libraryItemId: crypto.randomUUID(),
          mediaObjectId: crypto.randomUUID(),
          mimeType: getTeacherLessonFileMimeType(file),
          originalName: file.name,
          previewUrl: URL.createObjectURL(file),
          sizeBytes: file.size,
          title: name.trim(),
        };
        setResources((current) => [preview, ...current]);
      } else {
        const mediaObjectId = await uploadFile(file);
        const result = await createConnectedTeacherMaterial({
          categoryId,
          groupId,
          locale,
          mediaObjectId,
          name: name.trim(),
        });
        if (!result.ok) throw new Error(result.code);
      }
      notifications.success({ title: copy.savedTitle, message: copy.materialAdded });
      setFile(null);
      setName("");
      setOpen(false);
      if (inputRef.current) inputRef.current.value = "";
      router.refresh();
    } catch {
      notifications.error({ title: copy.material, message: copy.uploadFailed });
    } finally {
      setPending(false);
    }
  };

  const uploadFile = async (upload: File): Promise<string> => {
    const intent = await createTeacherLessonUploadIntent({
      mimeType: getTeacherLessonFileMimeType(upload),
      originalName: upload.name,
      sizeBytes: upload.size,
    });
    if (!intent.ok) throw new Error(intent.code);
    const response = await fetch(intent.uploadIntent.url, {
      body: upload,
      headers: new Headers(
        intent.uploadIntent.requiredHeaders.map(
          ({ name: headerName, value }): [string, string] => [headerName, value],
        ),
      ),
      method: intent.uploadIntent.method,
    });
    if (!response.ok) throw new Error("UPLOAD_FAILED");
    const confirmed = await confirmTeacherLessonUpload(intent.uploadIntent.mediaObjectId);
    if (!confirmed.ok) throw new Error(confirmed.code);
    return confirmed.mediaObject.id;
  };

  const openResource = async (resource: TeacherLessonResource, download: boolean) => {
    const result = resource.previewUrl
      ? { ok: true as const, url: resource.previewUrl }
      : connected
        ? await getTeacherLessonFileDownload(resource.mediaObjectId).then((value) =>
            value.ok ? { ok: true as const, url: value.downloadIntent.url } : value,
          )
        : { ok: false as const };
    if (!result.ok) {
      notifications.error({ title: copy.file, message: copy.uploadFailed });
      return;
    }
    if (!download) {
      window.open(result.url, "_blank", "noopener,noreferrer");
      return;
    }
    const anchor = document.createElement("a");
    anchor.href = result.url;
    anchor.download = resource.originalName;
    anchor.rel = "noopener";
    anchor.click();
  };

  const handleArchive = async (resource: TeacherLessonResource) => {
    const accepted = await confirm({
      cancelLabel: copy.cancel,
      confirmLabel: copy.deleteConfirm,
      icon: "delete",
      message: copy.deleteMessage(resource.title),
      title: copy.delete,
      tone: "danger",
    });
    if (!accepted) return;
    const result = connected
      ? await archiveConnectedTeacherLessonResource(resource.id)
      : ({ ok: true } as const);
    if (!result.ok) {
      notifications.error({ title: copy.delete, message: copy.createFailed });
      return;
    }
    setResources((current) => current.filter(({ id }) => id !== resource.id));
    notifications.success({
      icon: "delete",
      message: copy.deletedMessage(resource.title),
      title: copy.deletedTitle,
    });
    router.refresh();
  };

  return (
    <div className="teacherGroups__materialsManager">
      <div className="teacherGroups__materialsToolbar">
        <Button
          hoverEffect="jump"
          onClick={() => setOpen((current) => !current)}
          shape="soft"
          size="small"
          startIcon={<AddRounded />}
        >
          {actionLabel}
        </Button>
      </div>

      {open ? (
        <form className="teacherGroups__materialCreatePanel" onSubmit={handleSubmit}>
          <label>
            <span>{copy.materialName}</span>
            <input
              maxLength={240}
              onChange={(event) => setName(event.target.value)}
              required
              value={name}
            />
          </label>
          <label className="teacherGroups__materialUploadButton">
            <DescriptionOutlined />
            <span>{file?.name ?? copy.addMaterial}</span>
            <input
              accept={teacherLessonFileAccept}
              onChange={(event) => handleFile(event.target.files?.[0])}
              ref={inputRef}
              required
              type="file"
            />
          </label>
          <Button disabled={pending} startIcon={<SaveOutlined />} type="submit">
            {pending ? copy.uploading : copy.save}
          </Button>
        </form>
      ) : null}

      <section aria-labelledby="material-list-title" className="teacherGroups__materialListSection">
        <div className="teacherGroups__rosterHeader teacherGroups__materialListHeader">
          <div>
            <h3 className="teacherGroups__materialListTitle" id="material-list-title">
              {copy.materialList}
            </h3>
            <span className="teacherGroups__resultCount">
              {copy.materialCount(sortedResources.length)}
            </span>
          </div>
          <div className="teacherGroups__sortMenu">
            <span className="teacherGroups__sortLabel">{copy.sort}:</span>
            <button
              aria-controls={sortMenuIsOpen ? "teacher-material-sort-menu" : undefined}
              aria-expanded={sortMenuIsOpen}
              aria-haspopup="menu"
              aria-label={`${copy.sort}: ${sortLabels[sort]}`}
              className="teacherShell__localeTrigger teacherGroups__sortTrigger"
              onClick={(event) => setSortAnchorElement(event.currentTarget)}
              type="button"
            >
              <span>{sortLabels[sort]}</span>
              <KeyboardArrowDownRounded aria-hidden="true" />
            </button>
            <Menu
              anchorEl={sortAnchorElement}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              id="teacher-material-sort-menu"
              onClose={() => setSortAnchorElement(null)}
              open={sortMenuIsOpen}
              slotProps={{
                paper: {
                  className: "teacherShell__localeMenu",
                  style: { width: sortAnchorElement?.offsetWidth },
                },
              }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              {materialSortOptions.map((option) => (
                <MenuItem
                  className="teacherShell__localeMenuItem"
                  data-active={option === sort}
                  key={option}
                  onClick={() => handleSortSelect(option)}
                  selected={option === sort}
                >
                  {sortLabels[option]}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>

        {sortedResources.length > 0 ? (
          <div className="teacherGroups__materialList">
            {sortedResources.map((resource) => (
              <article className="teacherGroups__materialRow" key={resource.id}>
                <span className="teacherGroups__materialFileIcon">
                  <DescriptionOutlined />
                </span>
                <div className="teacherGroups__materialFileCopy">
                  <strong>{resource.title}</strong>
                  <span>{resource.originalName}</span>
                </div>
                <span className="teacherGroups__materialMeta">{fileType(resource.mimeType)}</span>
                <span className="teacherGroups__materialMeta">
                  {formatBytes(resource.sizeBytes)}
                </span>
                <span className="teacherGroups__materialMeta">
                  {formatDate(resource.createdAt, locale)}
                </span>
                <div className="teacherGroups__materialActions">
                  <IconButton
                    label={copy.preview}
                    onClick={() => void openResource(resource, false)}
                  >
                    <DescriptionOutlined />
                  </IconButton>
                  <IconButton
                    label={copy.download}
                    onClick={() => void openResource(resource, true)}
                  >
                    <DownloadOutlined />
                  </IconButton>
                  <IconButton
                    className="teacherGroups__lessonActionButton--delete"
                    label={copy.delete}
                    onClick={() => void handleArchive(resource)}
                  >
                    <DeleteOutlineRounded />
                  </IconButton>
                </div>
              </article>
            ))}
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

function fileType(mimeType: string): string {
  if (mimeType === "application/pdf") return "PDF";
  if (mimeType === "image/png") return "PNG";
  if (mimeType === "application/zip" || mimeType === "application/x-zip-compressed") return "ZIP";
  return "JPG";
}

function formatBytes(value: number | null): string {
  if (value === null) return "—";
  if (value < 1024 * 1024) return `${Math.max(1, Math.round(value / 1024))} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(value: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
