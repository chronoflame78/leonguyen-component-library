import { useState } from "react";

interface PaginationProps {
  totalPages?: number;
  /** Number of page buttons shown around the current page. */
  siblingCount?: number;
}

type PageItem = number | "ellipsis-left" | "ellipsis-right";

function getPageItems(
  current: number,
  total: number,
  siblingCount: number,
): PageItem[] {
  // Always show first and last; show a window around the current page.
  const totalNumbers = siblingCount * 2 + 5;
  if (total <= totalNumbers) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(current - siblingCount, 2);
  const rightSibling = Math.min(current + siblingCount, total - 1);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < total - 1;

  const items: PageItem[] = [1];

  if (showLeftDots) {
    items.push("ellipsis-left");
  } else {
    for (let p = 2; p < leftSibling; p++) items.push(p);
  }

  for (let p = leftSibling; p <= rightSibling; p++) items.push(p);

  if (showRightDots) {
    items.push("ellipsis-right");
  } else {
    for (let p = rightSibling + 1; p < total; p++) items.push(p);
  }

  items.push(total);
  return items;
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
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
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}

export function Pagination({
  totalPages = 12,
  siblingCount = 1,
}: PaginationProps) {
  const [page, setPage] = useState(1);
  const items = getPageItems(page, totalPages, siblingCount);

  const goTo = (next: number) =>
    setPage(Math.min(Math.max(next, 1), totalPages));

  return (
    <nav aria-label="Pagination" className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-40"
      >
        <Arrow direction="left" />
      </button>

      {items.map((item) =>
        typeof item === "number" ? (
          <button
            key={item}
            type="button"
            onClick={() => goTo(item)}
            aria-current={item === page ? "page" : undefined}
            className={
              item === page
                ? "flex h-9 min-w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 px-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30"
                : "flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            }
          >
            {item}
          </button>
        ) : (
          <span
            key={item}
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center text-slate-500"
          >
            …
          </span>
        ),
      )}

      <button
        type="button"
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-40"
      >
        <Arrow direction="right" />
      </button>
    </nav>
  );
}
