"use client";

import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import LanguageRounded from "@mui/icons-material/LanguageRounded";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { locales, type Locale } from "@/config/Locales";
import styles from "@/css/layout/navbar.module.css";
import { useLocaleSwitcher } from "@/hooks/navigation/useLocaleSwitcher";

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
  /* HOOKS */
  const localeSwitcher = useLocaleSwitcher();
  const { anchorElement } = localeSwitcher;

  /* HANDLERS */
  const { handleMenuOpen, handleMenuClose, handleLocaleSelect } = localeSwitcher;

  return (
    <>
      <Button
        aria-label={label}
        aria-controls={anchorElement ? "locale-menu" : undefined}
        aria-expanded={Boolean(anchorElement)}
        aria-haspopup="menu"
        onClick={handleMenuOpen}
        startIcon={<LanguageRounded />}
        endIcon={<ExpandMoreRounded />}
        className={styles.navbar__localeButton}
      >
        {locale.toUpperCase()}
      </Button>
      <Menu
        id="locale-menu"
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={handleMenuClose}
        slotProps={{ paper: { className: styles.navbar__localeMenu } }}
      >
        {locales.map((item) => (
          <MenuItem key={item} selected={item === locale} onClick={() => handleLocaleSelect(item)}>
            {localeNames[item]}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
