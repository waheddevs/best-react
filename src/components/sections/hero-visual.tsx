import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import BoltRounded from "@mui/icons-material/BoltRounded";
import SchoolRounded from "@mui/icons-material/SchoolRounded";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";

type HeroVisualProps = {
  label: string;
  title: string;
  progress: string;
};

export function HeroVisual({ label, title, progress }: HeroVisualProps) {
  return (
    <div className="relative mx-auto aspect-5/4 w-full max-w-[590px]" aria-label={label} role="img">
      <div className="absolute inset-[4%] rounded-[38%_62%_48%_52%/44%_38%_62%_56%] bg-[color-mix(in_srgb,var(--brand-turquoise)_18%,transparent)]" />
      <div className="absolute inset-x-[10%] top-[10%] bottom-[8%] overflow-hidden rounded-4xl border border-white/70 bg-surface/90 p-5 shadow-(--shadow-soft) backdrop-blur-sm sm:p-7">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-[color-mix(in_srgb,var(--brand-turquoise)_16%,transparent)] px-3 py-1.5 text-xs font-bold text-heading">
            {label}
          </span>
          <span className="grid size-10 place-items-center rounded-xl bg-sun text-heading">
            <BoltRounded aria-hidden="true" />
          </span>
        </div>
        <div className="mt-7 grid place-items-center sm:mt-9">
          <div className="relative grid size-32 place-items-center rounded-full border-14 border-[color-mix(in_srgb,var(--brand-turquoise)_20%,transparent)] bg-(image:--gradient-cta) text-white shadow-[0_18px_40px_rgb(37_99_235_/_24%)] sm:size-40">
            <SchoolRounded aria-hidden="true" sx={{ fontSize: 52 }} />
            <span className="absolute -right-6 bottom-1 grid size-12 place-items-center rounded-2xl border border-border bg-surface text-action shadow-lg">
              <TrendingUpRounded aria-hidden="true" />
            </span>
          </div>
        </div>
        <p className="mx-auto mt-7 max-w-sm text-center text-xl font-extrabold tracking-[-0.03em] text-heading sm:text-2xl">
          {title}
        </p>
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border bg-background/70 p-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[color-mix(in_srgb,var(--action-blue)_10%,transparent)] text-action">
            <AutoStoriesRounded aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-muted">{progress}</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--border)_65%,transparent)]">
              <div className="h-full w-3/4 rounded-full bg-(image:--gradient-cta)" />
            </div>
          </div>
        </div>
      </div>
      <span className="absolute top-[18%] left-[2%] size-4 rounded-full bg-sun shadow-[0_0_0_8px_color-mix(in_srgb,var(--sunny-yellow)_20%,transparent)]" />
      <span className="absolute right-[1%] bottom-[16%] size-5 rotate-12 rounded-lg bg-brand/70" />
    </div>
  );
}
