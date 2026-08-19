import { useColorScheme } from "@mui/material/styles";

type UseThemeToggleOptions = {
  lightLabel: string;
  darkLabel: string;
};

export function useThemeToggle({ lightLabel, darkLabel }: UseThemeToggleOptions) {
  /* HOOKS */
  const { mode, setMode } = useColorScheme();
  const isDark = mode === "dark";
  const label = isDark ? lightLabel : darkLabel;

  /* HANDLERS */
  const handleToggleTheme = () => {
    setMode(isDark ? "light" : "dark");
  };

  return { isDark, label, handleToggleTheme };
}
