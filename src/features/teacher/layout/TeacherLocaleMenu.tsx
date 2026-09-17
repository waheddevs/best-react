"use client";

import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import LanguageRounded from "@mui/icons-material/LanguageRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { locales, type Locale } from "@/config/Locales";
import styles from "@/css/teacher/shell.module.css";
import { useLocaleSwitcher } from "@/hooks/navigation/useLocaleSwitcher";

type TeacherLocaleMenuProps = {
  label: string;
  locale: Locale;
};

export function TeacherLocaleMenu({ label, locale }: TeacherLocaleMenuProps) {
  /* HOOKS */
  const localeSwitcher = useLocaleSwitcher();
  const isOpen = Boolean(localeSwitcher.anchorElement);

  /* HANDLERS */
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
        aria-controls={isOpen ? "teacher-locale-menu" : undefined}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`${label}: ${locale.toUpperCase()}`}
        className={styles.teacherShell__localeTrigger}
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
        id="teacher-locale-menu"
        onClose={localeSwitcher.handleMenuClose}
        open={isOpen}
        slotProps={{
          paper: {
            className: styles.teacherShell__localeMenu,
            style: { width: localeSwitcher.anchorElement?.offsetWidth },
          },
        }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {locales.map((item) => (
          <MenuItem
            className={styles.teacherShell__localeMenuItem}
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
