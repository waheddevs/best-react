"use client";

import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { useAdminTheme } from "./AdminThemeContext";

type AdminThemeToggleProps = {
  darkModeLabel: string;
  lightModeLabel: string;
};

export function AdminThemeToggle({ darkModeLabel, lightModeLabel }: AdminThemeToggleProps) {
  const { mode, toggleMode } = useAdminTheme();
  const label = mode === "light" ? darkModeLabel : lightModeLabel;

  return (
    <Tooltip title={label}>
      <IconButton
        aria-label={label}
        className="adminShell__themeToggle"
        onClick={toggleMode}
        size="small"
      >
        {mode === "light" ? <DarkModeOutlined /> : <LightModeOutlined />}
      </IconButton>
    </Tooltip>
  );
}
