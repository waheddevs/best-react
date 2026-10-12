import InboxOutlined from "@mui/icons-material/InboxOutlined";
import HourglassEmptyRounded from "@mui/icons-material/HourglassEmptyRounded";
import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import CancelOutlined from "@mui/icons-material/CancelOutlined";
import EditNoteRounded from "@mui/icons-material/EditNoteRounded";
import ArchiveOutlined from "@mui/icons-material/ArchiveOutlined";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import GridViewRounded from "@mui/icons-material/GridViewRounded";
import EventSeatOutlined from "@mui/icons-material/EventSeatOutlined";
import NorthEastRounded from "@mui/icons-material/NorthEastRounded";
import SouthEastRounded from "@mui/icons-material/SouthEastRounded";
import type { ReactNode } from "react";

type Tone = "blue" | "green" | "amber" | "red" | "neutral" | "violet";

const statuses = {
  NEW: { Icon: InboxOutlined, tone: "blue" },
  IN_REVIEW: { Icon: HourglassEmptyRounded, tone: "amber" },
  REVIEW_REQUIRED: { Icon: HourglassEmptyRounded, tone: "amber" },
  RESOLVED: { Icon: CheckCircleOutlineRounded, tone: "green" },
  ACTIVE: { Icon: CheckCircleOutlineRounded, tone: "green" },
  PUBLISHED: { Icon: CheckCircleOutlineRounded, tone: "green" },
  REJECTED: { Icon: CancelOutlined, tone: "red" },
  DEBTOR: { Icon: CancelOutlined, tone: "red" },
  PAUSED: { Icon: HourglassEmptyRounded, tone: "amber" },
  DRAFT: { Icon: EditNoteRounded, tone: "amber" },
  ARCHIVED: { Icon: ArchiveOutlined, tone: "neutral" },
  DEPARTED: { Icon: ArchiveOutlined, tone: "neutral" },
  STUDENTS: { Icon: GroupsOutlined, tone: "violet" },
  FULL: { Icon: GroupsOutlined, tone: "amber" },
  SEATS: { Icon: EventSeatOutlined, tone: "violet" },
} satisfies Record<string, { Icon: typeof InboxOutlined; tone: Tone }>;

export function AdminMetricCard({
  label,
  value,
  metricKey = "all",
  icon,
  tone,
  unit,
  hint,
  badge,
}: {
  label: string;
  value: ReactNode;
  metricKey?: string;
  icon?: ReactNode;
  tone?: Tone;
  unit?: string;
  hint?: string;
  badge?: { label: string; tone?: Tone; trend?: "up" | "down" };
}) {
  const status = statuses[metricKey.toUpperCase() as keyof typeof statuses];
  const Icon = status?.Icon ?? GridViewRounded;
  return (
    <article
      className="adminMetricCard"
      data-tone={tone ?? status?.tone ?? "blue"}
      data-has-unit={unit ? "true" : undefined}
    >
      <span aria-hidden="true" className="adminMetricCard__pattern">
        {icon ?? <Icon />}
      </span>
      <div className="adminMetricCard__content">
        <span className="adminMetricCard__label">{label}</span>
        <div className="adminMetricCard__value">
          <strong>{value}</strong>
          {unit && <span>{unit}</span>}
        </div>
      </div>
      <span aria-hidden="true" className="adminMetricCard__icon">
        {icon ?? <Icon />}
      </span>
      {(badge || hint) && (
        <div className="adminMetricCard__footer">
          {badge && (
            <span className="adminMetricCard__badge" data-tone={badge.tone}>
              {badge.trend === "up" && <NorthEastRounded aria-hidden="true" />}
              {badge.trend === "down" && <SouthEastRounded aria-hidden="true" />}
              {badge.label}
            </span>
          )}
          {hint && <small className="adminMetricCard__hint">{hint}</small>}
        </div>
      )}
    </article>
  );
}
