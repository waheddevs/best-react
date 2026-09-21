"use client";

import CompareArrowsRounded from "@mui/icons-material/CompareArrowsRounded";
import { useMemo, useState } from "react";
import { TeacherPageHeader } from "@/features/teacher/layout/TeacherPageHeader";
import type {
  TeacherCopy,
  TeacherTransferRequest,
  TeacherTransferRequestStatus,
} from "@/types/teacher/Teacher";

type TransferRequestListProps = { copy: TeacherCopy; requests: TeacherTransferRequest[] };
export function TransferRequestList({ copy, requests }: TransferRequestListProps) {
  /* HOOKS */
  const [filter, setFilter] = useState<TeacherTransferRequestStatus>("pending");
  const visibleRequests = useMemo(
    () => requests.filter((request) => request.status === filter),
    [filter, requests],
  );

  /* HANDLERS */
  const handleFilterChange = (nextFilter: TeacherTransferRequestStatus) => setFilter(nextFilter);

  return (
    <main>
      <TeacherPageHeader
        eyebrow={copy.transferRequests.eyebrow}
        title={copy.transferRequests.pageTitle}
      />
      <div className="teacherTransfers__filters" role="group">
        {(["pending", "approved", "declined"] as const).map((status) => (
          <button
            aria-pressed={filter === status}
            data-active={filter === status}
            key={status}
            onClick={() => handleFilterChange(status)}
            type="button"
          >
            {copy.transferRequests[status]}
          </button>
        ))}
      </div>
      {visibleRequests.length ? (
        <section className="teacherTransfers__list">
          {visibleRequests.map((request) => (
            <article key={request.id}>
              <strong>{request.learnerName}</strong>
              <span>
                {request.fromGroup} → {request.toGroup}
              </span>
            </article>
          ))}
        </section>
      ) : (
        <section className="teacherShared__emptyState">
          <div>
            <span className="teacherShared__emptyIcon">
              <CompareArrowsRounded />
            </span>
            <h2 className="teacherShared__emptyTitle">{copy.transferRequests.emptyTitle}</h2>
            <p className="teacherShared__emptyDescription">
              {copy.transferRequests.emptyDescription}
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
