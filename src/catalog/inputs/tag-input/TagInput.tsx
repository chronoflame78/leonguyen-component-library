import { useRef, useState } from "react";

interface TagInputProps {
  /** Initial tags. */
  defaultTags?: string[];
  placeholder?: string;
  onChange?: (tags: string[]) => void;
}

export function TagInput({
  defaultTags = [],
  placeholder = "Add a tag…",
  onChange,
}: TagInputProps) {
  const [tags, setTags] = useState<string[]>(defaultTags);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  function commit(next: string[]) {
    setTags(next);
    onChange?.(next);
  }

  function addTag(raw: string) {
    const value = raw.trim().replace(/,$/, "").trim();
    if (!value || tags.includes(value)) {
      setDraft("");
      return;
    }
    commit([...tags, value]);
    setDraft("");
  }

  function removeTag(index: number) {
    commit(tags.filter((_, i) => i !== index));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(draft);
    } else if (e.key === "Backspace" && draft === "" && tags.length > 0) {
      e.preventDefault();
      removeTag(tags.length - 1);
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex w-full flex-wrap items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-2 text-sm outline-none transition focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-400/25"
    >
      {tags.map((tag, i) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-md bg-indigo-500/20 py-1 pl-2.5 pr-1 text-indigo-200 ring-1 ring-inset ring-indigo-400/30"
        >
          {tag}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeTag(i);
            }}
            aria-label={`Remove ${tag}`}
            className="flex h-4 w-4 items-center justify-center rounded-full text-indigo-200/70 transition hover:bg-indigo-400/30 hover:text-white"
          >
            <svg
              className="h-2.5 w-2.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={draft}
        placeholder={tags.length === 0 ? placeholder : ""}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => addTag(draft)}
        className="min-w-[6rem] flex-1 bg-transparent text-[#f8f8fc] placeholder:text-white/40 outline-none"
      />
    </div>
  );
}
