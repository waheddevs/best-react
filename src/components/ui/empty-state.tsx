import SearchOffRounded from "@mui/icons-material/SearchOffRounded";

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="col-span-full grid min-h-64 place-items-center rounded-[1.75rem] border border-dashed border-border bg-surface p-8 text-center">
      <div>
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--brand-turquoise)_14%,transparent)] text-heading">
          <SearchOffRounded aria-hidden="true" />
        </span>
        <p className="mt-4 font-semibold text-muted">{message}</p>
      </div>
    </div>
  );
}
