import { useEffect, useId, useRef, useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export function Select({
  options,
  defaultValue,
  placeholder = "Select an option",
  onChange,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue ?? "");
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.value === value);

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

  function choose(option: SelectOption) {
    setValue(option.value);
    onChange?.(option.value);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative w-full">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-left text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/25"
      >
        <span className={selected ? "text-[#f8f8fc]" : "text-white/40"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`h-4 w-4 flex-shrink-0 text-white/50 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-white/10 bg-[#15151f] p-1 shadow-2xl shadow-black/50"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => choose(option)}
                  className={`flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition ${
                    isSelected
                      ? "bg-indigo-500/20 text-[#f8f8fc]"
                      : "text-white/80 hover:bg-white/5"
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <svg
                      className="h-4 w-4 text-indigo-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
