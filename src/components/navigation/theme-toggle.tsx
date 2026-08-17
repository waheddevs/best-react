"use client";

import DarkModeRounded from "@mui/icons-material/DarkModeRounded";
import LightModeRounded from "@mui/icons-material/LightModeRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useColorScheme } from "@mui/material/styles";

type ThemeToggleProps = {
  lightLabel: string;
  darkLabel: string;
};

export function ThemeToggle({ lightLabel, darkLabel }: ThemeToggleProps) {
  const { mode, setMode } = useColorScheme();
  const isDark = mode === "dark";
  const label = isDark ? lightLabel : darkLabel;

  return (
    <Tooltip title={label} arrow>
      <IconButton
        aria-label={label}
        onClick={() => setMode(isDark ? "light" : "dark")}
        size="small"
        sx={{ width: 44, height: 44 }}
      >
        {isDark ? <LightModeRounded /> : <DarkModeRounded />}
      </IconButton>
    </Tooltip>
  );
}
