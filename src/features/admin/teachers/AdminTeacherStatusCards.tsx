import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import PauseCircleOutlineRounded from "@mui/icons-material/PauseCircleOutlineRounded";
import PaymentsRounded from "@mui/icons-material/PaymentsRounded";
import PeopleAltRounded from "@mui/icons-material/PeopleAltRounded";
import type { ComponentType } from "react";

import type {
  AdminTeachersCopy,
  AdminTeacherStatus,
  AdminTeacherStatusFilter,
} from "@/types/admin/AdminTeachers";

type AdminTeacherStatusCardsProps = {
  copy: AdminTeachersCopy;
  counts: Record<AdminTeacherStatus, number>;
  total: number;
};

type StatusCard = {
  icon: ComponentType<{ "aria-hidden"?: boolean }>;
  status: AdminTeacherStatusFilter;
  tone: "all" | "active" | "paused" | "debtor";
};

const cards: StatusCard[] = [
  { icon: PeopleAltRounded, status: "ALL", tone: "all" },
  { icon: CheckCircleOutlineRounded, status: "ACTIVE", tone: "active" },
  { icon: PauseCircleOutlineRounded, status: "PAUSED", tone: "paused" },
  { icon: PaymentsRounded, status: "DEBTOR", tone: "debtor" },
];

export function AdminTeacherStatusCards({ copy, counts, total }: AdminTeacherStatusCardsProps) {
  return (
    <section aria-label={copy.summaryLabel} className="adminTeacherStatusCards">
      {cards.map(({ icon: Icon, status, tone }) => {
        const count = status === "ALL" ? total : counts[status];
        const percentage = total === 0 ? 0 : Number(((count / total) * 100).toFixed(1));
        return (
          <article className="adminTeacherStatusCards__card" data-tone={tone} key={status}>
            <span aria-hidden="true" className="adminTeacherStatusCards__icon">
              <Icon />
            </span>
            <span className="adminTeacherStatusCards__content">
              <span>{copy.statusLabels[status]}</span>
              <strong>{count}</strong>
              <small>
                {percentage}% {copy.shareLabel}
              </small>
            </span>
            <span aria-hidden="true" className="adminTeacherStatusCards__progress">
              <i style={{ width: `${percentage}%` }} />
            </span>
          </article>
        );
      })}
    </section>
  );
}
