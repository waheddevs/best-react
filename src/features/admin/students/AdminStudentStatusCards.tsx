import { AdminMetricCard } from "@/features/admin/workspace/AdminMetricCard";
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
};

const cards: StatusCard[] = [
  { icon: PeopleAltRounded, status: "ALL" },
  { icon: CheckCircleOutlineRounded, status: "ACTIVE" },
  { icon: PauseCircleOutlineRounded, status: "PAUSED" },
  { icon: PaymentsRounded, status: "DEBTOR" },
  { icon: PersonOffRounded, status: "DEPARTED" },
];

export function AdminStudentStatusCards({ copy, counts, total }: AdminStudentStatusCardsProps) {
  return (
    <section aria-label={copy.summaryLabel} className="adminStudentStatusCards">
      {cards.map(({ icon: Icon, status }) => {
        const count = status === "ALL" ? total : counts[status];
        const percentage = total === 0 ? 0 : Number(((count / total) * 100).toFixed(1));

        return (
          <AdminMetricCard
            key={status}
            metricKey={status}
            label={copy.statusLabels[status]}
            value={count}
            icon={<Icon />}
            badge={{ label: `${percentage}%` }}
            hint={copy.shareLabel}
          />
        );
      })}
    </section>
  );
}
