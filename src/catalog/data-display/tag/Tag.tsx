import { useState } from "react";

type TagColor = "slate" | "indigo" | "emerald" | "amber" | "rose";

const COLOR_CLASSES: Record<TagColor, string> = {
  slate: "bg-slate-500/15 text-slate-300 ring-slate-400/20",
  indigo: "bg-indigo-500/15 text-indigo-300 ring-indigo-400/20",
  emerald: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/20",
  amber: "bg-amber-500/15 text-amber-300 ring-amber-400/20",
  rose: "bg-rose-500/15 text-rose-300 ring-rose-400/20",
};

interface TagProps {
  label: string;
  color?: TagColor;
  onRemove?: () => void;
}

export function Tag({ label, color = "slate", onRemove }: TagProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset ${COLOR_CLASSES[color]}`}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label}`}
          className="-mr-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-current transition-colors hover:bg-white/15"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path
              d="M1 1l8 8M9 1l-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  );
}

interface TagItem {
  id: number;
  label: string;
  color: TagColor;
}

const INITIAL_TAGS: TagItem[] = [
  { id: 1, label: "React", color: "indigo" },
  { id: 2, label: "TypeScript", color: "emerald" },
  { id: 3, label: "Tailwind", color: "amber" },
  { id: 4, label: "Vite", color: "rose" },
];

export function TagList() {
  const [tags, setTags] = useState<TagItem[]>(INITIAL_TAGS);

  function remove(id: number) {
    setTags((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.length === 0 ? (
        <button
          type="button"
          onClick={() => setTags(INITIAL_TAGS)}
          className="rounded-full px-3 py-1 text-sm font-medium text-slate-400 ring-1 ring-inset ring-white/15 transition-colors hover:text-slate-200"
        >
          Reset tags
        </button>
      ) : (
        tags.map((tag) => (
          <Tag
            key={tag.id}
            label={tag.label}
            color={tag.color}
            onRemove={() => remove(tag.id)}
          />
        ))
      )}
    </div>
  );
}
