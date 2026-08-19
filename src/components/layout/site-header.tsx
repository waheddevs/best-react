import Link from "next/link";

import { Container } from "@/components/ui/container";
import { LocaleSwitcher } from "@/components/navigation/locale-switcher";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";
import { navbarNavigationItems } from "@/config/navigation";
import type { Locale } from "@/config/locales";
import type { Dictionary } from "@/dictionaries/types";

type SiteHeaderProps = {
  locale: Locale;
  labels: Dictionary["navigation"];
};

export function SiteHeader({ locale, labels }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <Container className="flex min-h-20 items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          aria-label={labels.home}
          className="group flex min-h-11 items-center gap-3"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-brand font-black text-heading transition-transform group-hover:rotate-3">
            B
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block text-xl font-black tracking-tighter text-heading">BEST</span>
            <span className="mt-1 block text-[9px] font-bold tracking-[0.18em] text-muted">
              LEARNING CENTER
            </span>
          </span>
        </Link>

        <nav aria-label={labels.menu} className="hidden items-center gap-1 xl:flex">
          {navbarNavigationItems.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              className="rounded-xl px-3 py-2 text-sm font-semibold text-heading transition-colors hover:bg-[color-mix(in_srgb,var(--brand-turquoise)_10%,transparent)]"
            >
              {labels[item.key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <div className="hidden sm:block">
            <LocaleSwitcher locale={locale} label={labels.language} />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[var(--brand-navy)] bg-transparent px-3 text-xs font-bold text-[var(--brand-navy)] transition-all duration-200 hover:bg-[var(--brand-navy)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action sm:px-4 sm:text-sm"
            >
              {labels.login}
            </button>
            <button
              type="button"
              className="inline-flex min-h-10 items-center justify-center rounded-xl border border-transparent bg-(image:--gradient-cta) px-3 text-xs font-bold text-white shadow-[0_8px_20px_rgb(37_99_235/20%)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action sm:px-4 sm:text-sm"
            >
              {labels.signup}
            </button>
          </div>
          <MobileNavigation locale={locale} labels={labels} />
        </div>
      </Container>
    </header>
  );
}
