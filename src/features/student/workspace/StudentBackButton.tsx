"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";

type StudentBackButtonProps = {
  label: string;
} & ({ href: string; onClick?: never } | { href?: never; onClick: () => void });

export function StudentBackButton({ href, label, onClick }: StudentBackButtonProps) {
  if (href !== undefined) {
    return (
      <ScrollToTopLink aria-label={label} className="studentBackButton" href={href}>
        <ArrowBackRounded aria-hidden="true" />
      </ScrollToTopLink>
    );
  }

  return (
    <button aria-label={label} className="studentBackButton" onClick={onClick} type="button">
      <ArrowBackRounded aria-hidden="true" />
    </button>
  );
}
