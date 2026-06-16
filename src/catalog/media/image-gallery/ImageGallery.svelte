<script lang="ts">
  import { onDestroy } from "svelte";

  interface GalleryItem {
    caption: string;
    background: string;
  }

  export let items: GalleryItem[] = [
    { caption: "Aurora", background: "linear-gradient(135deg, #6366f1, #ec4899)" },
    { caption: "Sunset", background: "linear-gradient(135deg, #f97316, #ef4444)" },
    { caption: "Lagoon", background: "linear-gradient(135deg, #06b6d4, #3b82f6)" },
    { caption: "Meadow", background: "linear-gradient(135deg, #22c55e, #84cc16)" },
    { caption: "Twilight", background: "linear-gradient(135deg, #8b5cf6, #1e3a8a)" },
    { caption: "Ember", background: "linear-gradient(135deg, #f59e0b, #b91c1c)" },
  ];

  let openIndex: number | null = null;

  $: active = openIndex === null ? null : items[openIndex];

  function open(index: number) {
    openIndex = index;
  }

  function close() {
    openIndex = null;
  }

  function next() {
    if (openIndex !== null) openIndex = (openIndex + 1) % items.length;
  }

  function prev() {
    if (openIndex !== null)
      openIndex = (openIndex - 1 + items.length) % items.length;
  }

  function handleKey(event: KeyboardEvent) {
    if (openIndex === null) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowRight") next();
    if (event.key === "ArrowLeft") prev();
  }

  if (typeof window !== "undefined") {
    window.addEventListener("keydown", handleKey);
    onDestroy(() => window.removeEventListener("keydown", handleKey));
  }
</script>

<div class="image-gallery">
  <div class="image-gallery__grid">
    {#each items as item, index (item.caption)}
      <button
        type="button"
        class="image-gallery__tile"
        style="background: {item.background}"
        on:click={() => open(index)}
      >
        <span class="image-gallery__tile-caption">{item.caption}</span>
      </button>
    {/each}
  </div>

  {#if active}
    <div
      class="image-gallery__lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={active.caption}
      on:click={close}
    >
      <button
        type="button"
        class="image-gallery__close"
        aria-label="Close"
        on:click={close}
      >
        ×
      </button>

      <button
        type="button"
        class="image-gallery__nav image-gallery__nav--prev"
        aria-label="Previous"
        on:click|stopPropagation={prev}
      >
        ‹
      </button>

      <figure class="image-gallery__stage" on:click|stopPropagation>
        <div class="image-gallery__hero" style="background: {active.background}" />
        <figcaption class="image-gallery__hero-caption">
          {active.caption}
        </figcaption>
      </figure>

      <button
        type="button"
        class="image-gallery__nav image-gallery__nav--next"
        aria-label="Next"
        on:click|stopPropagation={next}
      >
        ›
      </button>
    </div>
  {/if}
</div>

<style>
  .image-gallery {
    width: 100%;
  }

  .image-gallery__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  .image-gallery__tile {
    position: relative;
    aspect-ratio: 4 / 3;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    overflow: hidden;
    padding: 0;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    box-shadow: 0 4px 16px -8px rgba(0, 0, 0, 0.7);
  }

  .image-gallery__tile:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 10px 28px -8px rgba(0, 0, 0, 0.8);
  }

  .image-gallery__tile-caption {
    position: absolute;
    inset: auto 0 0 0;
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
    font-weight: 600;
    text-align: left;
    color: #fff;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.55), transparent);
  }

  .image-gallery__lightbox {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(5, 5, 12, 0.85);
    backdrop-filter: blur(4px);
    animation: image-gallery-fade 0.2s ease;
  }

  .image-gallery__stage {
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    animation: image-gallery-pop 0.22s ease;
  }

  .image-gallery__hero {
    width: min(70vw, 520px);
    aspect-ratio: 4 / 3;
    border-radius: 1rem;
    box-shadow: 0 24px 60px -20px rgba(0, 0, 0, 0.9);
  }

  .image-gallery__hero-caption {
    font-size: 1rem;
    font-weight: 600;
    color: #f4f4f5;
  }

  .image-gallery__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    border: none;
    border-radius: 9999px;
    font-size: 1.5rem;
    line-height: 1;
    color: #f4f4f5;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.1);
    transition: background 0.15s ease;
  }

  .image-gallery__close:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .image-gallery__nav {
    flex: none;
    width: 2.75rem;
    height: 2.75rem;
    border: none;
    border-radius: 9999px;
    font-size: 1.75rem;
    line-height: 1;
    color: #f4f4f5;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.1);
    transition: background 0.15s ease, transform 0.15s ease;
  }

  .image-gallery__nav:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.08);
  }

  @keyframes image-gallery-fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes image-gallery-pop {
    from {
      opacity: 0;
      transform: scale(0.94);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .image-gallery__lightbox,
    .image-gallery__stage {
      animation: none;
    }
  }
</style>
