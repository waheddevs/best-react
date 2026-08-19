import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  const variantClass =
    variant === "primary"
      ? "border-transparent bg-(image:--gradient-cta) text-white shadow-[0_12px_30px_rgb(37_99_235/22%)] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgb(37_99_235/28%)]"
      : "border-border bg-surface text-heading hover:border-brand hover:bg-[color-mix(in_srgb,var(--brand-turquoise)_8%,var(--surface))]";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-sm font-bold transition duration-200 sm:px-6 sm:text-base ${variantClass}`}
    >
      {children}
      {variant === "primary" ? (
        <ArrowForwardRounded aria-hidden="true" className="text-[20px]" />
      ) : null}
    </Link>
  );
}
