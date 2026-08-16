import Link from "next/link";

import { Container } from "@/components/ui/container";
import { navigationItems } from "@/config/navigation";
import type { Dictionary } from "@/dictionaries/types";
import type { PageCopy } from "@/dictionaries/page-copy";

type SiteFooterProps = {
  navigation: Dictionary["navigation"];
  copy: PageCopy["footer"];
};

export function SiteFooter({ navigation, copy }: SiteFooterProps) {
  return (
    <footer className="footer">
      <Container className="footer__2">
        <div className="footer__3">
          <Link href="/website" className="footer__4">
            <span className="footer__5">B</span>
            <span className="footer__6">BEST LC</span>
          </Link>
          <p className="footer__7">{copy.summary}</p>
        </div>
        <div>
          <h2 className="footer__8">{copy.pages}</h2>
          <nav className="footer__9" aria-label={copy.pages}>
            {navigationItems.slice(1).map((item) => (
              <Link key={item.key} href={item.href} className="footer__10">
                {navigation[item.key]}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h2 className="footer__11">{copy.contact}</h2>
          <p className="footer__12">{copy.contactPlaceholder}</p>
          <p className="footer__13">{copy.legalPlaceholder}</p>
        </div>
      </Container>
      <div className="footer__14">
        <Container className="footer__15">
          © {new Date().getFullYear()} {copy.copyright}
        </Container>
      </div>
    </footer>
  );
}
