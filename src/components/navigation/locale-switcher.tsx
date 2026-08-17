"use client";

import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import LanguageRounded from "@mui/icons-material/LanguageRounded";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { locales, type Locale } from "@/config/locales";

const localeNames: Record<Locale, string> = {
  uz: "O‘zbek",
  ru: "Русский",
  en: "English",
};

type LocaleSwitcherProps = {
  locale: Locale;
  label: string;
};

export function LocaleSwitcher({ locale, label }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  const selectLocale = (nextLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/") || `/${nextLocale}`);
    setAnchorElement(null);
  };

  return (
    <>
      <Button
        aria-label={label}
        aria-controls={anchorElement ? "locale-menu" : undefined}
        aria-expanded={Boolean(anchorElement)}
        aria-haspopup="menu"
        onClick={(event) => setAnchorElement(event.currentTarget)}
        startIcon={<LanguageRounded />}
        endIcon={<ExpandMoreRounded />}
        sx={{ minHeight: 44, color: "var(--heading)", borderRadius: 3, px: 1.25 }}
      >
        {locale.toUpperCase()}
      </Button>
      <Menu
        id="locale-menu"
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={() => setAnchorElement(null)}
        slotProps={{ paper: { sx: { mt: 1, minWidth: 150 } } }}
      >
        {locales.map((item) => (
          <MenuItem key={item} selected={item === locale} onClick={() => selectLocale(item)}>
            {localeNames[item]}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
