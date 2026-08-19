import Link from "next/link";

import { Container } from "@/components/ui/container";
import { navigationItems } from "@/config/navigation";
import type { Locale } from "@/config/locales";
import type { Dictionary } from "@/dictionaries/types";
import type { PageCopy } from "@/dictionaries/page-copy";

type SiteFooterProps = {
  locale: Locale;
  navigation: Dictionary["navigation"];
  copy: PageCopy["footer"];
};

export function SiteFooter({ locale, navigation, copy }: SiteFooterProps) {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:py-16">
        <div className="max-w-sm">
          <Link href={`/${locale}`} className="inline-flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-brand text-lg font-black text-heading">
              B
            </span>
            <span className="text-2xl font-black tracking-tighter text-heading">BEST LC</span>
          </Link>
          <p className="mt-5 text-sm leading-6 text-muted">{copy.summary}</p>
        </div>
        <div>
          <h2 className="text-sm font-black tracking-[0.16em] text-heading uppercase">
            {copy.pages}
          </h2>
          <nav className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3" aria-label={copy.pages}>
            {navigationItems.slice(1).map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className="text-sm text-muted transition-colors hover:text-action"
              >
                {navigation[item.key]}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h2 className="text-sm font-black tracking-[0.16em] text-heading uppercase">
            {copy.contact}
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted">{copy.contactPlaceholder}</p>
          <p className="mt-4 text-xs leading-5 text-muted">{copy.legalPlaceholder}</p>
        </div>
      </Container>
      <div className="border-t border-border">
        <Container className="py-5 text-xs text-muted">
          © {new Date().getFullYear()} {copy.copyright}
        </Container>
      </div>
    </footer>
  );
}
