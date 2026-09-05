import Link from "next/link";

import type { Locale } from "@/config/Locales";

type WorkspaceLocaleNavigationProps = {
  className: string;
  label: string;
  onNavigate: () => void;
  options: Array<{ active: boolean; href: string; locale: Locale }>;
};

export function WorkspaceLocaleNavigation({
  className,
  label,
  onNavigate,
  options,
}: WorkspaceLocaleNavigationProps) {
  return (
    <div aria-label={label} className={className} role="navigation">
      {options.map((option) => (
        <Link
          aria-current={option.active ? "page" : undefined}
          href={option.href}
          key={option.locale}
          onClick={onNavigate}
        >
          {option.locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
