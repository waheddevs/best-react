import CloseRounded from "@mui/icons-material/CloseRounded";
import type { ReactNode } from "react";

type Props = {
  titleId: string;
  title: string;
  eyebrow: string;
  icon: ReactNode;
  description?: string;
  closeLabel: string;
  onClose: () => void;
};

export function AdminDetailsHeader({
  titleId,
  title,
  eyebrow,
  icon,
  description,
  closeLabel,
  onClose,
}: Props) {
  return (
    <header className="adminDetailsHeader">
      <span className="adminDetailsHeader__icon" aria-hidden="true">
        {icon}
      </span>
      <div className="adminDetailsHeader__identity">
        <p className="adminDetailsHeader__eyebrow">{eyebrow}</p>
        <h2 id={titleId}>{title}</h2>
        {description && <p className="adminDetailsHeader__description">{description}</p>}
      </div>
      <button
        className="adminDetailsHeader__close"
        type="button"
        autoFocus
        onClick={onClose}
        aria-label={closeLabel}
      >
        <CloseRounded aria-hidden="true" />
      </button>
    </header>
  );
}
