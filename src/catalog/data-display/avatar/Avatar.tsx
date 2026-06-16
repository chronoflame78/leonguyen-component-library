type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  name: string;
  size?: AvatarSize;
  online?: boolean;
}

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
  xl: "h-20 w-20 text-2xl",
};

const DOT_CLASSES: Record<AvatarSize, string> = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3.5 w-3.5",
  xl: "h-5 w-5",
};

const PALETTE = [
  "bg-rose-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-sky-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-fuchsia-500",
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function colorFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length];
}

export function Avatar({ name, size = "md", online }: AvatarProps) {
  return (
    <span className="relative inline-flex">
      <span
        className={`inline-flex items-center justify-center rounded-full font-semibold text-white select-none ${SIZE_CLASSES[size]} ${colorFor(
          name,
        )}`}
        title={name}
      >
        {initials(name)}
      </span>
      {online !== undefined && (
        <span
          className={`absolute bottom-0 right-0 rounded-full ring-2 ring-[#0d0d14] ${DOT_CLASSES[size]} ${
            online ? "bg-emerald-400" : "bg-slate-500"
          }`}
        />
      )}
    </span>
  );
}
