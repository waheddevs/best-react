import Link from "next/link";

import { Container } from "@/components/ui/container";
import { LocaleSwitcher } from "@/components/navigation/locale-switcher";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { navigationItems } from "@/config/navigation";
import type { Locale } from "@/config/locales";
import type { Dictionary } from "@/dictionaries/types";

type SiteHeaderProps = {
  locale: Locale;
  labels: Dictionary["navigation"];
};

export function SiteHeader({ locale, labels }: SiteHeaderProps) {
  const primaryItems = navigationItems.filter((item) =>
    ["courses", "events", "results", "library", "about"].includes(item.key),
  );

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
          <span className="leading-none">
            <span className="block text-xl font-black tracking-[-0.05em] text-heading">BEST</span>
            <span className="mt-1 block text-[9px] font-bold tracking-[0.18em] text-muted">
              LEARNING CENTER
            </span>
          </span>
        </Link>

        <nav aria-label={labels.menu} className="hidden items-center gap-1 lg:flex">
          {primaryItems.map((item) => (
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
          <ThemeToggle lightLabel={labels.themeLight} darkLabel={labels.themeDark} />
          <Link
            href={`/${locale}/courses`}
            className="hidden min-h-11 items-center rounded-xl bg-(image:--gradient-cta) px-4 text-sm font-bold text-white shadow-[0_10px_24px_rgb(37_99_235_/_20%)] transition-transform hover:-translate-y-0.5 xl:inline-flex"
          >
            {labels.coursesCta}
          </Link>
          <MobileNavigation locale={locale} labels={labels} />
        </div>
      </Container>
    </header>
  );
}
