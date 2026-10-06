"use client";

import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import LanguageRounded from "@mui/icons-material/LanguageRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useId } from "react";

import { locales, type Locale } from "@/config/Locales";
import { useLocaleSwitcher } from "@/hooks/navigation/useLocaleSwitcher";

type StudentLocaleMenuProps = {
  label: string;
  locale: Locale;
};

export function StudentLocaleMenu({ label, locale }: StudentLocaleMenuProps) {
  const menuId = useId();
  const localeSwitcher = useLocaleSwitcher();
  const isOpen = Boolean(localeSwitcher.anchorElement);

  const handleLocaleSelect = (nextLocale: Locale) => {
    if (nextLocale === locale) {
      localeSwitcher.handleMenuClose();
      return;
    }
    localeSwitcher.handleLocaleSelect(nextLocale);
  };

  return (
    <>
      <button
        aria-controls={isOpen ? menuId : undefined}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`${label}: ${locale.toUpperCase()}`}
        className="studentShell__localeTrigger"
        onClick={localeSwitcher.handleMenuOpen}
        type="button"
      >
        <LanguageRounded aria-hidden="true" />
        <span>{locale.toUpperCase()}</span>
        <KeyboardArrowDownRounded aria-hidden="true" />
      </button>
      <Menu
        anchorEl={localeSwitcher.anchorElement}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        id={menuId}
        onClose={localeSwitcher.handleMenuClose}
        open={isOpen}
        slotProps={{
          paper: {
            className: "studentShell__localeMenu",
            style: { width: localeSwitcher.anchorElement?.offsetWidth },
          },
        }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {locales.map((item) => (
          <MenuItem
            className="studentShell__localeMenuItem"
            data-active={item === locale}
            key={item}
            onClick={() => handleLocaleSelect(item)}
            selected={item === locale}
          >
            {item.toUpperCase()}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
