import Link from "next/link";

import { Container } from "@/components/ui/container";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { navigationItems } from "@/config/navigation";
import type { Dictionary } from "@/dictionaries/types";

type SiteHeaderProps = {
  labels: Dictionary["navigation"];
};

export function SiteHeader({ labels }: SiteHeaderProps) {
  const primaryItems = navigationItems.filter((item) =>
    ["courses", "events", "results", "library", "about"].includes(item.key),
  );

  return (
    <header className="navbar">
      <Container className="navbar__2">
        <Link href="/website" aria-label={labels.home} className="navbar__3">
          <span className="navbar__4">B</span>
          <span className="navbar__5">
            <span className="navbar__6">BEST</span>
            <span className="navbar__7">LEARNING CENTER</span>
          </span>
        </Link>

        <nav aria-label={labels.menu} className="navbar__8">
          {primaryItems.map((item) => (
            <Link key={item.key} href={item.href} className="navbar__9">
              {labels[item.key]}
            </Link>
          ))}
        </nav>

        <div className="navbar__10">
          <ThemeToggle lightLabel={labels.themeLight} darkLabel={labels.themeDark} />
          <Link href="/website/courses" className="navbar__12">
            {labels.coursesCta}
          </Link>
          <MobileNavigation labels={labels} />
        </div>
      </Container>
    </header>
  );
}
