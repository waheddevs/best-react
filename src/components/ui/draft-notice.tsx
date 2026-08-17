import InfoRounded from "@mui/icons-material/InfoRounded";

type DraftNoticeProps = {
  badge: string;
  note: string;
};

export function DraftNotice({ badge, note }: DraftNoticeProps) {
  return (
    <div className="flex gap-3 rounded-2xl border border-[color-mix(in_srgb,var(--sunny-yellow)_55%,var(--border))] bg-[color-mix(in_srgb,var(--sunny-yellow)_12%,var(--surface))] p-4 text-sm leading-6 text-text">
      <InfoRounded aria-hidden="true" className="mt-0.5 shrink-0 text-heading" />
      <p>
        <strong className="text-heading">{badge}.</strong> {note}
      </p>
    </div>
  );
}
