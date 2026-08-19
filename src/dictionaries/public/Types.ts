import type { CourseNavigationKey, ExamNavigationKey, NavigationKey } from "@/config/Navigation";

export type Dictionary = {
  navigation: Record<NavigationKey, string> & {
    menu: string;
    closeMenu: string;
    language: string;
    coursesCta: string;
    login: string;
    signup: string;
    courseMenu: Record<CourseNavigationKey, string>;
    examMenu: Record<ExamNavigationKey, string>;
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
