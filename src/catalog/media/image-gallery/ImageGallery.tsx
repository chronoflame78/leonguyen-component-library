import { useEffect, useState } from "react";
import "./ImageGallery.css";

interface GalleryItem {
  caption: string;
  /** Any valid CSS background value — gradients keep this offline-friendly. */
  background: string;
}

const defaultItems: GalleryItem[] = [
  { caption: "Aurora", background: "linear-gradient(135deg, #6366f1, #ec4899)" },
  { caption: "Sunset", background: "linear-gradient(135deg, #f97316, #ef4444)" },
  { caption: "Lagoon", background: "linear-gradient(135deg, #06b6d4, #3b82f6)" },
  { caption: "Meadow", background: "linear-gradient(135deg, #22c55e, #84cc16)" },
  { caption: "Twilight", background: "linear-gradient(135deg, #8b5cf6, #1e3a8a)" },
  { caption: "Ember", background: "linear-gradient(135deg, #f59e0b, #b91c1c)" },
];

interface ImageGalleryProps {
  items?: GalleryItem[];
}

export function ImageGallery({ items = defaultItems }: ImageGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenIndex(null);
      if (event.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? i : (i + 1) % items.length));
      if (event.key === "ArrowLeft")
        setOpenIndex((i) =>
          i === null ? i : (i - 1 + items.length) % items.length,
        );
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openIndex, items.length]);

  const active = openIndex === null ? null : items[openIndex];

  return (
    <div className="image-gallery">
      <div className="image-gallery__grid">
        {items.map((item, index) => (
          <button
            key={item.caption}
            type="button"
            className="image-gallery__tile"
            style={{ background: item.background }}
            onClick={() => setOpenIndex(index)}
          >
            <span className="image-gallery__tile-caption">{item.caption}</span>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="image-gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            className="image-gallery__close"
            aria-label="Close"
            onClick={() => setOpenIndex(null)}
          >
            ×
          </button>

          <button
            type="button"
            className="image-gallery__nav image-gallery__nav--prev"
            aria-label="Previous"
            onClick={(event) => {
              event.stopPropagation();
              setOpenIndex(
                (i) => (i! - 1 + items.length) % items.length,
              );
            }}
          >
            ‹
          </button>

          <figure
            className="image-gallery__stage"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="image-gallery__hero"
              style={{ background: active.background }}
            />
            <figcaption className="image-gallery__hero-caption">
              {active.caption}
            </figcaption>
          </figure>

          <button
            type="button"
            className="image-gallery__nav image-gallery__nav--next"
            aria-label="Next"
            onClick={(event) => {
              event.stopPropagation();
              setOpenIndex((i) => (i! + 1) % items.length);
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
