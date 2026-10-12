export type AdminRegistrySection = "groups" | "schedule" | "payments" | "salary";
export type AdminRegistryRow = {
  id: string;
  name: string;
  status: string;
  cells: string[];
  href?: string;
  values: Record<string, string>;
  version?: number;
  updatedAt?: string;
  details: Array<{ label: string; value: string }>;
};
