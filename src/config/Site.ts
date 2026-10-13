export const siteConfig = {
  name: "BEST LC",
  url: new URL(process.env.BEST_SITE_URL ?? "https://best-lc.example"),
} as const;
