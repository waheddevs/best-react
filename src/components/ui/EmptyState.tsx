import SearchOffRounded from "@mui/icons-material/SearchOffRounded";

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="publicShared__emptyState">
      <div>
        <span className="publicShared__emptyStateIcon">
          <SearchOffRounded aria-hidden="true" />
        </span>
        <p className="publicShared__emptyStateMessage">{message}</p>
      </div>
    </div>
  );
}
