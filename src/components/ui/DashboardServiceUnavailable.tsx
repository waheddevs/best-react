"use client";

import CloudOffRounded from "@mui/icons-material/CloudOffRounded";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import type { Locale } from "@/config/Locales";
import { getAuthCopy } from "@/dictionaries/public/Auth";

type DashboardServiceUnavailableProps = {
  locale: Locale;
};

export function DashboardServiceUnavailable({ locale }: DashboardServiceUnavailableProps) {
  /* HOOKS */
  const router = useRouter();
  const copy = getAuthCopy(locale).serviceUnavailable;

  /* HANDLERS */
  const handleRetry = () => {
    router.refresh();
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#f6fbff] p-6 text-center">
      <section className="grid max-w-md justify-items-center gap-4 rounded-3xl border border-[#d7e8f2] bg-white p-8 shadow-[0_18px_60px_rgba(16,42,67,0.08)]">
        <span className="grid size-14 place-items-center rounded-2xl bg-[#e9f0ff] text-[#2563eb]">
          <CloudOffRounded aria-hidden="true" />
        </span>
        <div className="grid gap-2">
          <h1 className="m-0 text-xl font-extrabold text-[#102a43]">{copy.title}</h1>
          <p className="m-0 text-sm leading-6 text-[#62758a]">{copy.description}</p>
        </div>
        <Button onClick={handleRetry} shape="soft">
          {copy.retry}
        </Button>
      </section>
    </main>
  );
}
