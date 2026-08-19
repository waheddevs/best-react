"use client";

import DarkModeRounded from "@mui/icons-material/DarkModeRounded";
import LightModeRounded from "@mui/icons-material/LightModeRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import styles from "@/css/layout/navbar.module.css";
import { useThemeToggle } from "@/hooks/navigation/useThemeToggle";

type ThemeToggleProps = {
  lightLabel: string;
  darkLabel: string;
};

export function ThemeToggle({ lightLabel, darkLabel }: ThemeToggleProps) {
  /* HOOKS */
  const themeToggle = useThemeToggle({ lightLabel, darkLabel });
  const { isDark, label } = themeToggle;

  /* HANDLERS */
  const { handleToggleTheme } = themeToggle;

  return (
    <Tooltip title={label} arrow>
      <IconButton
        aria-label={label}
        onClick={handleToggleTheme}
        size="small"
        className={styles.navbar__iconButton}
      >
        {isDark ? <LightModeRounded /> : <DarkModeRounded />}
      </IconButton>
    </Tooltip>
  );
}
