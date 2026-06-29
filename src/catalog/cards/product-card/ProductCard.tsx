import { useState } from "react";

interface ProductCardProps {
  name?: string;
  category?: string;
  price?: number;
  oldPrice?: number;
  rating?: number;
  /** Two-tone gradient stops for the product thumbnail. */
  imageFrom?: string;
  imageTo?: string;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 ${
            i < Math.round(rating) ? "text-amber-400" : "text-white/15"
          }`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.74.99-5.79-4.21-4.1 5.82-.85z" />
        </svg>
      ))}
    </span>
  );
}

export function ProductCard({
  name = "Aurora Wireless Headphones",
  category = "Audio",
  price = 149,
  oldPrice = 199,
  rating = 4,
  imageFrom = "#6366f1",
  imageTo = "#d946ef",
}: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const discount =
    oldPrice && oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  return (
    <div className="group w-full max-w-xs overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left transition-transform hover:-translate-y-1">
      <div
        className="relative flex h-40 items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(135deg, ${imageFrom}, ${imageTo})`,
        }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-16 w-16 text-white/80 transition-transform duration-300 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
          <rect x="2" y="14" width="4" height="6" rx="1.5" />
          <rect x="18" y="14" width="4" height="6" rx="1.5" />
        </svg>
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur">
            -{discount}%
          </span>
        )}
      </div>

      <div className="p-4">
        <span className="text-xs uppercase tracking-wide text-indigo-300">
          {category}
        </span>
        <h3 className="mt-1 truncate text-base font-semibold text-white">
          {name}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <Stars rating={rating} />
          <span className="text-xs text-white/40">{rating.toFixed(1)}</span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white">${price}</span>
            {oldPrice && oldPrice > price && (
              <span className="text-sm text-white/40 line-through">
                ${oldPrice}
              </span>
            )}
          </div>
          <button
            onClick={() => setAdded((v) => !v)}
            aria-pressed={added}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
              added
                ? "bg-emerald-500/20 text-emerald-300"
                : "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:opacity-90"
            }`}
          >
            {added ? "Added ✓" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
