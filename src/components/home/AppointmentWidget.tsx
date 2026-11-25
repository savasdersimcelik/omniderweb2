import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type AppointmentSlot = {
  time: string;
  open: boolean;
};

type AppointmentWidgetProps = {
  monthLabel: string;
  weekdays: string[];
  selectedWeekday: string;
  selectedDate: string;
  bookLabel: string;
  slots: AppointmentSlot[];
};

const YEAR = 2026;
const MONTH = 6;
const SELECTED_DAY = 16;

function calendarCells() {
  const firstWeekday = new Date(YEAR, MONTH, 1).getDay();
  const daysInMonth = new Date(YEAR, MONTH + 1, 0).getDate();
  const prevDays = new Date(YEAR, MONTH, 0).getDate();
  const cells: Array<{ key: string; label: number; outside: boolean }> = [];

  for (let i = 0; i < firstWeekday; i += 1) {
    const label = prevDays - firstWeekday + 1 + i;
    cells.push({ key: `prev-${label}`, label, outside: true });
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ key: `day-${day}`, label: day, outside: false });
  }
  let next = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ key: `next-${next}`, label: next, outside: true });
    next += 1;
  }
  return cells;
}

export function AppointmentWidget({
  monthLabel,
  weekdays,
  selectedWeekday,
  selectedDate,
  bookLabel,
  slots,
}: AppointmentWidgetProps) {
  const openSlots = slots.filter((slot) => slot.open);
  const times = openSlots.slice(-3);
  const cells = calendarCells();

  return (
    <div className="appointment-cal" aria-hidden="true">
      <div className="appointment-cal__month">
        <div className="appointment-cal__nav">
          <span className="appointment-cal__chevron">
            <ChevronLeft className="size-4" />
          </span>
          <p className="appointment-cal__month-label">{monthLabel}</p>
          <span className="appointment-cal__chevron">
            <ChevronRight className="size-4" />
          </span>
        </div>
        <div className="appointment-cal__grid">
          {weekdays.map((day) => (
            <span key={day} className="appointment-cal__dow">
              {day}
            </span>
          ))}
          {cells.map((cell) => (
            <span
              key={cell.key}
              className={cn(
                "appointment-cal__daynum",
                cell.outside && "is-out",
                !cell.outside && cell.label === SELECTED_DAY && "is-selected",
              )}
            >
              {cell.label}
            </span>
          ))}
        </div>
      </div>

      <div className="appointment-cal__day">
        <p className="appointment-cal__weekday">{selectedWeekday}</p>
        <p className="appointment-cal__date">{selectedDate}</p>
        <div className="appointment-cal__times">
          {times.map((slot, index) =>
            index === times.length - 1 ? (
              <div key={slot.time} className="appointment-cal__bookrow">
                <span className="appointment-cal__time">{slot.time}</span>
                <span className="appointment-cal__book">{bookLabel}</span>
              </div>
            ) : (
              <span key={slot.time} className="appointment-cal__time">
                {slot.time}
              </span>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
