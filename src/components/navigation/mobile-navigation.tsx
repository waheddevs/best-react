"use client";

import CloseRounded from "@mui/icons-material/CloseRounded";
import MenuRounded from "@mui/icons-material/MenuRounded";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";

import { navigationItems } from "@/config/navigation";
import type { Dictionary } from "@/dictionaries/types";
import { useMobileNavigation } from "@/hooks/useMobileNavigation";

type MobileNavigationProps = {
  labels: Dictionary["navigation"];
};

export function MobileNavigation({ labels }: MobileNavigationProps) {
  const { closeNavigation, isOpen, openNavigation, pathname } = useMobileNavigation();

  return (
    <div className="mobile-navigation">
      <Tooltip title={labels.menu} arrow>
        <IconButton
          aria-label={labels.menu}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={openNavigation}
          size="small"
          sx={{ width: 44, height: 44 }}
        >
          <MenuRounded />
        </IconButton>
      </Tooltip>
      <Drawer
        id="mobile-navigation"
        anchor="right"
        open={isOpen}
        onClose={closeNavigation}
        slotProps={{ paper: { sx: { width: "min(88vw, 360px)", p: 2.5 } } }}
      >
        <div className="mobile-navigation__2">
          <span className="mobile-navigation__3">BEST LC</span>
          <IconButton
            aria-label={labels.closeMenu}
            onClick={closeNavigation}
            size="small"
            sx={{ width: 44, height: 44 }}
          >
            <CloseRounded />
          </IconButton>
        </div>
        <nav aria-label={labels.menu} className="mobile-navigation__4">
          {navigationItems.map((item) => {
            const href = item.href;
            const isActive = pathname === href;
            return (
              <Link
                key={item.key}
                href={href}
                onClick={closeNavigation}
                aria-current={isActive ? "page" : undefined}
                className={`mobile-navigation__link ${isActive ? "mobile-navigation__link--active" : ""}`}
              >
                {labels[item.key]}
              </Link>
            );
          })}
        </nav>
      </Drawer>
    </div>
  );
}
