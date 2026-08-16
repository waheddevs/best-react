import SearchOffRounded from "@mui/icons-material/SearchOffRounded";

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="empty-state">
      <div>
        <span className="empty-state__2">
          <SearchOffRounded aria-hidden="true" />
        </span>
        <p className="empty-state__3">{message}</p>
      </div>
    </div>
  );
}
