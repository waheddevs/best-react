import { AdminMetricCard } from "@/features/admin/workspace/AdminMetricCard";
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
};

const cards: StatusCard[] = [
  { icon: PeopleAltRounded, status: "ALL" },
  { icon: CheckCircleOutlineRounded, status: "ACTIVE" },
  { icon: PauseCircleOutlineRounded, status: "PAUSED" },
  { icon: PaymentsRounded, status: "DEBTOR" },
];

export function AdminTeacherStatusCards({ copy, counts, total }: AdminTeacherStatusCardsProps) {
  return (
    <section aria-label={copy.summaryLabel} className="adminTeacherStatusCards">
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
