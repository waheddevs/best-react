import InfoRounded from "@mui/icons-material/InfoRounded";

type DraftNoticeProps = {
  badge: string;
  note: string;
};

export function DraftNotice({ badge, note }: DraftNoticeProps) {
  return (
    <div className="draft-notice">
      <InfoRounded aria-hidden="true" className="draft-notice__2" />
      <p>
        <strong className="draft-notice__3">{badge}.</strong> {note}
      </p>
    </div>
  );
}
