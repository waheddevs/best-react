export type AdminRegistrySection = "groups" | "schedule" | "payments";
export type AdminRegistryRow = {
  id: string;
  name: string;
  status: string;
  cells: string[];
  href?: string;
  values: Record<string, string>;
  updatedAt?: string;
  details: Array<{ label: string; value: string }>;
};
