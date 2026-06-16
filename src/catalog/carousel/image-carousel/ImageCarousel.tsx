import "./ImageCarousel.css";
import { useState } from "react";

interface Slide {
  /** Any valid CSS background value, e.g. a gradient. */
  background: string;
  title: string;
  caption: string;
}

interface ImageCarouselProps {
  slides?: Slide[];
}

const defaultSlides: Slide[] = [
  {
    background: "linear-gradient(135deg, #6366f1, #a855f7)",
    title: "Aurora",
    caption: "Indigo melts into violet.",
  },
  {
    background: "linear-gradient(135deg, #ec4899, #f97316)",
    title: "Sunset",
    caption: "Pink fades through to amber.",
  },
  {
    background: "linear-gradient(135deg, #06b6d4, #22c55e)",
    title: "Lagoon",
    caption: "Cyan drifts into a fresh green.",
  },
  {
    background: "linear-gradient(135deg, #f43f5e, #8b5cf6)",
    title: "Nebula",
    caption: "Rose collides with deep purple.",
  },
];

export function ImageCarousel({ slides = defaultSlides }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const goTo = (next: number) => setIndex((next + count) % count);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  return (
    <div className="image-carousel">
      <div className="image-carousel__viewport">
        <div
          className="image-carousel__track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="image-carousel__slide"
              style={{ background: slide.background }}
              aria-hidden={i !== index}
            >
              <div className="image-carousel__caption">
                <h3 className="image-carousel__title">{slide.title}</h3>
                <p className="image-carousel__text">{slide.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="image-carousel__arrow image-carousel__arrow--prev"
          onClick={prev}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          type="button"
          className="image-carousel__arrow image-carousel__arrow--next"
          onClick={next}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      <div className="image-carousel__dots">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={
              "image-carousel__dot" +
              (i === index ? " image-carousel__dot--active" : "")
            }
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </div>
  );
}
