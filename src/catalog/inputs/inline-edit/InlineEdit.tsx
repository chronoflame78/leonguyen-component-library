import { useEffect, useRef, useState } from "react";

interface InlineEditProps {
  defaultValue?: string;
  placeholder?: string;
  onCommit?: (value: string) => void;
}

export function InlineEdit({
  defaultValue = "",
  placeholder = "Empty",
  onCommit,
}: InlineEditProps) {
  const [value, setValue] = useState(defaultValue);
  const [draft, setDraft] = useState(defaultValue);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus + select the text when entering edit mode.
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  function startEditing() {
    setDraft(value);
    setEditing(true);
  }

  function save() {
    const trimmed = draft.trim();
    setValue(trimmed);
    setEditing(false);
    onCommit?.(trimmed);
  }

  function cancel() {
    setDraft(value);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      save();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancel();
    }
  }

  if (editing) {
    return (
      <div className="flex w-full items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-w-0 flex-1 rounded-md border border-indigo-400 bg-white/[0.03] px-2.5 py-1.5 text-sm text-[#f8f8fc] outline-none ring-2 ring-indigo-400/25"
        />
        <button
          type="button"
          onClick={save}
          className="shrink-0 rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-400"
        >
          Save
        </button>
        <button
          type="button"
          onClick={cancel}
          className="shrink-0 rounded-md px-2.5 py-1.5 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={startEditing}
      className="group flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-sm transition hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40"
    >
      <span className={value ? "text-[#f8f8fc]" : "text-white/40"}>
        {value || placeholder}
      </span>
      <svg
        className="ml-auto h-3.5 w-3.5 shrink-0 text-white/30 opacity-0 transition group-hover:opacity-100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    </button>
  );
}
