import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import PauseCircleOutlineRounded from "@mui/icons-material/PauseCircleOutlineRounded";
import PaymentsRounded from "@mui/icons-material/PaymentsRounded";
import PeopleAltRounded from "@mui/icons-material/PeopleAltRounded";
import PersonOffRounded from "@mui/icons-material/PersonOffRounded";
import type { ComponentType } from "react";

import type {
  AdminStudentsCopy,
  AdminStudentStatus,
  AdminStudentStatusFilter,
} from "@/types/admin/AdminStudents";

type AdminStudentStatusCardsProps = {
  copy: AdminStudentsCopy;
  counts: Record<AdminStudentStatus, number>;
  total: number;
};

type StatusCard = {
  icon: ComponentType<{ "aria-hidden"?: boolean }>;
  status: AdminStudentStatusFilter;
  tone: "all" | "active" | "paused" | "debtor" | "departed";
};

const cards: StatusCard[] = [
  { icon: PeopleAltRounded, status: "ALL", tone: "all" },
  { icon: CheckCircleOutlineRounded, status: "ACTIVE", tone: "active" },
  { icon: PauseCircleOutlineRounded, status: "PAUSED", tone: "paused" },
  { icon: PaymentsRounded, status: "DEBTOR", tone: "debtor" },
  { icon: PersonOffRounded, status: "DEPARTED", tone: "departed" },
];

export function AdminStudentStatusCards({ copy, counts, total }: AdminStudentStatusCardsProps) {
  return (
    <section aria-label={copy.summaryLabel} className="adminStudentStatusCards">
      {cards.map(({ icon: Icon, status, tone }) => {
        const count = status === "ALL" ? total : counts[status];
        const percentage = total === 0 ? 0 : Number(((count / total) * 100).toFixed(1));

        return (
          <article className="adminStudentStatusCards__card" data-tone={tone} key={status}>
            <span aria-hidden="true" className="adminStudentStatusCards__icon">
              <Icon />
            </span>
            <span className="adminStudentStatusCards__content">
              <span>{copy.statusLabels[status]}</span>
              <strong>{count}</strong>
              <small>
                {percentage}% {copy.shareLabel}
              </small>
            </span>
            <span aria-hidden="true" className="adminStudentStatusCards__progress">
              <i style={{ width: `${percentage}%` }} />
            </span>
          </article>
        );
      })}
    </section>
  );
}
