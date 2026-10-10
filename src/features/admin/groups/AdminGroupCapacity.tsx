type AdminGroupCapacityProps = {
  current: number;
  label: string;
  total: number;
};

export function AdminGroupCapacity({ current, label, total }: AdminGroupCapacityProps) {
  const percentage = Math.min(100, Math.round((current / Math.max(total, 1)) * 100));

  return (
    <div aria-label={`${label}: ${current}/${total}`} className="adminGroups__capacity" role="img">
      <span>
        <i style={{ width: `${percentage}%` }} />
      </span>
      <strong>
        {current}/{total}
      </strong>
    </div>
  );
}
