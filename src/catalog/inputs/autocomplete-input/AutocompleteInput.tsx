import { useEffect, useId, useRef, useState } from "react";

interface AutocompleteInputProps {
  suggestions: string[];
  placeholder?: string;
  onSelect?: (value: string) => void;
}

/** Splits a label around the (case-insensitive) match so the match can be bolded. */
function splitMatch(
  label: string,
  query: string
): { before: string; match: string; after: string } {
  if (!query) return { before: label, match: "", after: "" };
  const index = label.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return { before: label, match: "", after: "" };
  return {
    before: label.slice(0, index),
    match: label.slice(index, index + query.length),
    after: label.slice(index + query.length),
  };
}

export function AutocompleteInput({
  suggestions,
  placeholder = "Type a country…",
  onSelect,
}: AutocompleteInputProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const filtered = query
    ? suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    : suggestions;

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  function choose(value: string) {
    setQuery(value);
    setOpen(false);
    onSelect?.(value);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      if (filtered.length === 0) return;
      setActiveIndex((i) => (i + 1) % filtered.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      if (filtered.length === 0) return;
      setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (event.key === "Enter") {
      if (open && filtered[activeIndex]) {
        event.preventDefault();
        choose(filtered[activeIndex]);
      }
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative w-full">
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            open && filtered[activeIndex]
              ? `${listId}-opt-${activeIndex}`
              : undefined
          }
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-3 text-sm text-[#f8f8fc] placeholder:text-white/40 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/25"
        />
      </div>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-white/10 bg-[#15151f] p-1 shadow-2xl shadow-black/50"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-white/40">No matches</li>
          ) : (
            filtered.map((item, index) => {
              const { before, match, after } = splitMatch(item, query);
              const isActive = index === activeIndex;
              return (
                <li
                  key={item}
                  id={`${listId}-opt-${index}`}
                  role="option"
                  aria-selected={isActive}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    choose(item);
                  }}
                  className={`cursor-pointer rounded-md px-3 py-2 text-sm transition ${
                    isActive
                      ? "bg-indigo-500/20 text-[#f8f8fc]"
                      : "text-white/80"
                  }`}
                >
                  {before}
                  {match && (
                    <span className="font-semibold text-indigo-300">
                      {match}
                    </span>
                  )}
                  {after}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
