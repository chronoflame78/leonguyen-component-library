import type { ReactNode } from "react";

type BadgeColor = "gray" | "blue" | "green" | "amber" | "red" | "purple";
type BadgeVariant = "solid" | "soft" | "dot";

interface BadgeProps {
  color?: BadgeColor;
  variant?: BadgeVariant;
  children: ReactNode;
}

const solidStyles: Record<BadgeColor, string> = {
  gray: "bg-slate-500 text-white",
  blue: "bg-sky-500 text-white",
  green: "bg-emerald-500 text-white",
  amber: "bg-amber-500 text-slate-900",
  red: "bg-rose-500 text-white",
  purple: "bg-violet-500 text-white",
};

const softStyles: Record<BadgeColor, string> = {
  gray: "bg-slate-500/15 text-slate-300",
  blue: "bg-sky-500/15 text-sky-300",
  green: "bg-emerald-500/15 text-emerald-300",
  amber: "bg-amber-500/15 text-amber-300",
  red: "bg-rose-500/15 text-rose-300",
  purple: "bg-violet-500/15 text-violet-300",
};

const dotColors: Record<BadgeColor, string> = {
  gray: "bg-slate-400",
  blue: "bg-sky-400",
  green: "bg-emerald-400",
  amber: "bg-amber-400",
  red: "bg-rose-400",
  purple: "bg-violet-400",
};

export function Badge({ color = "gray", variant = "soft", children }: BadgeProps) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium";

  if (variant === "dot") {
    return (
      <span className={`${base} ${softStyles[color]}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${dotColors[color]}`} />
        {children}
      </span>
    );
  }

  const palette = variant === "solid" ? solidStyles[color] : softStyles[color];
  return <span className={`${base} ${palette}`}>{children}</span>;
}
