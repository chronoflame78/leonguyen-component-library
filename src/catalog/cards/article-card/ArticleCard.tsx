interface ArticleCardProps {
  category?: string;
  title?: string;
  excerpt?: string;
  author?: string;
  readTime?: string;
  date?: string;
  /** Two-tone gradient stops for the cover banner. */
  coverFrom?: string;
  coverTo?: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ArticleCard({
  category = "Engineering",
  title = "Designing resilient component systems",
  excerpt = "How small, well-named primitives compose into interfaces that scale without turning into a maze of one-off overrides.",
  author = "Ada Lovelace",
  readTime = "6 min read",
  date = "Jun 24",
  coverFrom = "#6366f1",
  coverTo = "#d946ef",
}: ArticleCardProps) {
  return (
    <article className="group w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left transition-transform hover:-translate-y-1">
      <div
        className="relative h-36"
        style={{
          backgroundImage: `linear-gradient(135deg, ${coverFrom}, ${coverTo})`,
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
        <span className="absolute left-4 top-4 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          {category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold leading-snug text-white transition-colors group-hover:text-indigo-300">
          {title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/60">
          {excerpt}
        </p>

        <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{
              backgroundImage: `linear-gradient(135deg, ${coverFrom}, ${coverTo})`,
            }}
            aria-hidden="true"
          >
            {initials(author)}
          </span>
          <div className="min-w-0 text-xs">
            <div className="truncate font-medium text-white/90">{author}</div>
            <div className="text-white/40">
              {date} · {readTime}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
