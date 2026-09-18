const calendarCells = Array.from({ length: 12 }, (_, index) => index);
const jumpingCells = new Set([1, 3, 6, 8, 11]);

export function EventCalendar() {
  return (
    <div aria-hidden="true" className="events__heroCalendarVisual">
      <span className="events__heroCalendarShadow" />
      <span className="events__heroCalendarStack" />
      <span className="events__heroCalendarBase" />
      <span className="events__heroCalendarPage">
        <span className="events__heroCalendarBand" />
        <span className="events__heroCalendarBindings">
          <i />
          <i />
          <i />
        </span>
        <span className="events__heroCalendarGrid">
          {calendarCells.map((cell) => (
            <i
              className={jumpingCells.has(cell) ? "events__heroCalendarCellJump" : undefined}
              key={cell}
            />
          ))}
        </span>
      </span>
    </div>
  );
}
