import { useEffect, useRef, useState } from "react";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() === startOfDay(b).getTime();
}

function formatField(date: Date | null): string {
  if (!date) return "";
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/** Build a 6-row x 7-col grid of dates covering the given month. */
function buildGrid(viewYear: number, viewMonth: number): Date[] {
  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(1 - firstOfMonth.getDay());

  const cells: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const day = new Date(gridStart);
    day.setDate(gridStart.getDate() + i);
    cells.push(day);
  }
  return cells;
}

interface DatePickerProps {
  defaultValue?: Date;
  placeholder?: string;
  onChange?: (date: Date) => void;
}

export function DatePicker({
  defaultValue,
  placeholder = "Pick a date",
  onChange,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date | null>(defaultValue ?? null);
  const initial = defaultValue ?? new Date();
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());
  const rootRef = useRef<HTMLDivElement>(null);

  const today = new Date();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function goToMonth(delta: number) {
    const next = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  }

  function choose(day: Date) {
    setSelected(day);
    setViewYear(day.getFullYear());
    setViewMonth(day.getMonth());
    onChange?.(day);
    setOpen(false);
  }

  const grid = buildGrid(viewYear, viewMonth);

  return (
    <div ref={rootRef} className="relative w-full">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-left text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/25"
      >
        <span className={selected ? "text-[#f8f8fc]" : "text-white/40"}>
          {selected ? formatField(selected) : placeholder}
        </span>
        <svg
          className="h-4 w-4 flex-shrink-0 text-white/50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Choose a date"
          className="absolute z-10 mt-2 w-72 rounded-xl border border-white/10 bg-[#15151f] p-3 shadow-2xl shadow-black/50"
        >
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => goToMonth(-1)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <span className="text-sm font-semibold text-[#f8f8fc]">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => goToMonth(1)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7 gap-1">
            {WEEKDAYS.map((day) => (
              <span
                key={day}
                className="flex h-8 items-center justify-center text-xs font-medium text-white/40"
              >
                {day}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {grid.map((day) => {
              const inMonth = day.getMonth() === viewMonth;
              const isToday = isSameDay(day, today);
              const isSelected = selected ? isSameDay(day, selected) : false;
              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  aria-label={formatField(day)}
                  aria-selected={isSelected}
                  onClick={() => choose(day)}
                  className={`flex h-8 w-full items-center justify-center rounded-md text-sm transition ${
                    isSelected
                      ? "bg-gradient-to-br from-indigo-500 to-fuchsia-500 font-semibold text-white"
                      : isToday
                      ? "border border-indigo-400/60 text-[#f8f8fc] hover:bg-white/10"
                      : inMonth
                      ? "text-white/85 hover:bg-white/10"
                      : "text-white/30 hover:bg-white/5"
                  }`}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
