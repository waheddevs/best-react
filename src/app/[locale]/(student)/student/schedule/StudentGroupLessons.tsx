"use client";

import FileDownloadOutlined from "@mui/icons-material/FileDownloadOutlined";
import InsertDriveFileOutlined from "@mui/icons-material/InsertDriveFileOutlined";
import MenuBookOutlined from "@mui/icons-material/MenuBookOutlined";
import OpenInNewOutlined from "@mui/icons-material/OpenInNewOutlined";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { StudentGroupCopy } from "@/dictionaries/student/StudentGroup";
import { getStudentLibraryBookDownload } from "@/features/student/library/StudentLibraryActions";
import type { StudentGroupResource, StudentGroupView } from "@/types/student/StudentGroup";

type StudentGroupLessonsProps = {
  connected: boolean;
  copy: StudentGroupCopy;
  group: StudentGroupView | null;
};

export function StudentGroupLessons({ connected, copy, group }: StudentGroupLessonsProps) {
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!connected) return;
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") router.refresh();
    };
    document.addEventListener("visibilitychange", refreshWhenVisible);
    window.addEventListener("focus", refreshWhenVisible);
    const interval = window.setInterval(refreshWhenVisible, 45_000);
    return () => {
      document.removeEventListener("visibilitychange", refreshWhenVisible);
      window.removeEventListener("focus", refreshWhenVisible);
      window.clearInterval(interval);
    };
  }, [connected, router]);

  const openResource = async (resource: StudentGroupResource, download: boolean) => {
    const tab = download ? null : window.open("", "_blank");
    const result = await getStudentLibraryBookDownload(
      resource.libraryItemId,
      resource.mediaObjectId,
    );
    if (!result.ok) {
      tab?.close();
      setError(true);
      return;
    }
    setError(false);
    if (download) {
      const anchor = document.createElement("a");
      anchor.href = result.url;
      anchor.download = resource.name;
      anchor.rel = "noopener";
      anchor.click();
    } else if (tab) {
      tab.opener = null;
      tab.location.assign(result.url);
    } else {
      window.location.assign(result.url);
    }
  };

  return (
    <section
      aria-labelledby="student-group-lessons-title"
      className="studentGroup__card studentGroup__lessons"
    >
      <div className="studentGroup__heading">
        <h2 id="student-group-lessons-title">{copy.lessonsTitle}</h2>
      </div>
      {error ? (
        <p className="studentGroup__fileError" role="alert">
          {copy.fileError}
        </p>
      ) : null}
      {group?.lessons.length ? (
        <div
          className="studentGroup__tableScroll"
          role="region"
          aria-label={copy.lessonsTitle}
          tabIndex={0}
        >
          <table className="studentGroup__table">
            <thead>
              <tr>
                <th scope="col">{copy.name}</th>
                <th scope="col">{copy.material}</th>
                <th scope="col">{copy.task}</th>
              </tr>
            </thead>
            <tbody>
              {group.lessons.map((lesson, index) => (
                <tr key={lesson.id}>
                  <td>
                    <span className="studentGroup__lessonNumber">{index + 1}</span>
                    <strong>{lesson.name}</strong>
                  </td>
                  <td>
                    <ResourceCell copy={copy} onOpen={openResource} resource={lesson.material} />
                  </td>
                  <td>
                    <ResourceCell copy={copy} onOpen={openResource} resource={lesson.task} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="studentGroup__empty studentGroup__empty--lessons">
          <span className="studentGroup__emptyIcon">
            <MenuBookOutlined aria-hidden="true" />
          </span>
          <p>{copy.emptyLessons}</p>
        </div>
      )}
    </section>
  );
}

function ResourceCell({
  copy,
  onOpen,
  resource,
}: {
  copy: StudentGroupCopy;
  onOpen: (resource: StudentGroupResource, download: boolean) => Promise<void>;
  resource: StudentGroupResource | null;
}) {
  if (!resource) return <span className="studentGroup__missing">{copy.unavailable}</span>;
  return (
    <div className="studentGroup__resource">
      <InsertDriveFileOutlined aria-hidden="true" />
      <span title={resource.name}>{resource.name}</span>
      <div className="studentGroup__resourceActions">
        <button
          aria-label={`${copy.open}: ${resource.name}`}
          onClick={() => void onOpen(resource, false)}
          title={copy.open}
          type="button"
        >
          <OpenInNewOutlined aria-hidden="true" />
        </button>
        <button
          aria-label={`${copy.download}: ${resource.name}`}
          onClick={() => void onOpen(resource, true)}
          title={copy.download}
          type="button"
        >
          <FileDownloadOutlined aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
