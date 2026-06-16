<script lang="ts">
  interface Slide {
    background: string;
    title: string;
    caption: string;
  }

  export let slides: Slide[] = [
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

  let index = 0;
  $: count = slides.length;

  const goTo = (next: number) => {
    index = (next + count) % count;
  };
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);
</script>

<div class="image-carousel">
  <div class="image-carousel__viewport">
    <div
      class="image-carousel__track"
      style="transform: translateX(-{index * 100}%)"
    >
      {#each slides as slide, i}
        <div
          class="image-carousel__slide"
          style="background: {slide.background}"
          aria-hidden={i !== index}
        >
          <div class="image-carousel__caption">
            <h3 class="image-carousel__title">{slide.title}</h3>
            <p class="image-carousel__text">{slide.caption}</p>
          </div>
        </div>
      {/each}
    </div>

    <button
      type="button"
      class="image-carousel__arrow image-carousel__arrow--prev"
      on:click={prev}
      aria-label="Previous slide"
    >
      ‹
    </button>
    <button
      type="button"
      class="image-carousel__arrow image-carousel__arrow--next"
      on:click={next}
      aria-label="Next slide"
    >
      ›
    </button>
  </div>

  <div class="image-carousel__dots">
    {#each slides as _, i}
      <button
        type="button"
        class="image-carousel__dot"
        class:image-carousel__dot--active={i === index}
        on:click={() => goTo(i)}
        aria-label={`Go to slide ${i + 1}`}
        aria-current={i === index}
      />
    {/each}
  </div>
</div>

<style>
  .image-carousel {
    width: 100%;
  }

  .image-carousel__viewport {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    box-shadow: 0 18px 40px -18px rgba(0, 0, 0, 0.7);
  }

  .image-carousel__track {
    display: flex;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .image-carousel__slide {
    position: relative;
    flex: 0 0 100%;
    aspect-ratio: 16 / 9;
    display: flex;
    align-items: flex-end;
  }

  .image-carousel__caption {
    width: 100%;
    padding: 1.25rem 1.5rem;
    color: #fff;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent);
  }

  .image-carousel__title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
  }

  .image-carousel__text {
    margin: 0.25rem 0 0;
    font-size: 0.875rem;
    opacity: 0.9;
  }

  .image-carousel__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 2.25rem;
    height: 2.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 9999px;
    font-size: 1.5rem;
    line-height: 1;
    color: #fff;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    transition: background 0.15s ease, transform 0.15s ease;
  }

  .image-carousel__arrow:hover {
    background: rgba(0, 0, 0, 0.65);
  }

  .image-carousel__arrow:active {
    transform: translateY(-50%) scale(0.92);
  }

  .image-carousel__arrow--prev {
    left: 0.75rem;
  }

  .image-carousel__arrow--next {
    right: 0.75rem;
  }

  .image-carousel__dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.875rem;
  }

  .image-carousel__dot {
    width: 0.625rem;
    height: 0.625rem;
    padding: 0;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.3);
    transition: background 0.2s ease, transform 0.2s ease;
  }

  .image-carousel__dot:hover {
    background: rgba(255, 255, 255, 0.55);
  }

  .image-carousel__dot--active {
    background: #fff;
    transform: scale(1.25);
  }

  @media (prefers-reduced-motion: reduce) {
    .image-carousel__track {
      transition: none;
    }
  }
</style>
