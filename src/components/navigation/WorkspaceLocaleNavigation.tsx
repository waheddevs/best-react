"use client";

import CheckRounded from "@mui/icons-material/CheckRounded";
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import TranslateRounded from "@mui/icons-material/TranslateRounded";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useId, useState, type MouseEvent } from "react";

import type { Locale } from "@/config/Locales";

const localeNames: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  uz: "O‘zbekcha",
};

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
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const menuId = useId();
  const activeOption = options.find((option) => option.active) ?? options[0];
  const open = Boolean(anchor);

  const close = () => setAnchor(null);
  const select = () => {
    close();
    onNavigate();
  };

  return (
    <div className={className}>
      <Button
        aria-controls={open ? menuId : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="menu"
        aria-label={label}
        className="adminLocaleTrigger"
        endIcon={<ExpandMoreRounded />}
        onClick={(event: MouseEvent<HTMLButtonElement>) => setAnchor(event.currentTarget)}
        startIcon={<TranslateRounded />}
        variant="outlined"
      >
        {activeOption.locale.toUpperCase()}
      </Button>
      <Menu
        anchorEl={anchor}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        id={menuId}
        onClose={close}
        open={open}
        slotProps={{
          list: { "aria-label": label, className: "adminLocaleMenu__list", dense: true },
          paper: { className: "adminLocaleMenu" },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        {options.map((option) => (
          <MenuItem
            aria-checked={option.active}
            className="adminLocaleMenu__item"
            component={Link}
            href={option.href}
            key={option.locale}
            onClick={select}
            prefetch={true}
            replace
            role="menuitemradio"
            scroll={false}
            selected={option.active}
          >
            <span>{localeNames[option.locale]}</span>
            <small>{option.locale.toUpperCase()}</small>
            {option.active ? <CheckRounded aria-hidden="true" /> : null}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
