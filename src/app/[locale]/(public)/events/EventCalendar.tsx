import styles from "@/css/public/events.module.css";

const calendarCells = Array.from({ length: 12 }, (_, index) => index);
const jumpingCells = new Set([1, 3, 6, 8, 11]);

export function EventCalendar() {
  return (
    <div aria-hidden="true" className={styles.events__heroCalendarVisual}>
      <span className={styles.events__heroCalendarShadow} />
      <span className={styles.events__heroCalendarStack} />
      <span className={styles.events__heroCalendarBase} />
      <span className={styles.events__heroCalendarPage}>
        <span className={styles.events__heroCalendarBand} />
        <span className={styles.events__heroCalendarBindings}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.events__heroCalendarGrid}>
          {calendarCells.map((cell) => (
            <i
              className={jumpingCells.has(cell) ? styles.events__heroCalendarCellJump : undefined}
              key={cell}
            />
          ))}
        </span>
      </span>
    </div>
  );
}
