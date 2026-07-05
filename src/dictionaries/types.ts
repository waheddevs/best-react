import type { NavigationKey } from "@/config/navigation";

export type Dictionary = {
  navigation: Record<NavigationKey, string> & {
    menu: string;
    closeMenu: string;
    language: string;
    themeLight: string;
    themeDark: string;
    coursesCta: string;
  };
  home: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    visualLabel: string;
    visualTitle: string;
    visualProgress: string;
    benefits: Array<{ title: string; description: string }>;
  };
};
