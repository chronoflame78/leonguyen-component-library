<script lang="ts">
  export let label: string = "Magnetic";

  const MAX_OFFSET = 10;
  let x = 0;
  let y = 0;

  const clamp = (value: number, limit: number) =>
    Math.max(-limit, Math.min(limit, value));

  function handleMouseMove(event: MouseEvent) {
    const el = event.currentTarget as HTMLButtonElement;
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    x = clamp(relX * 0.4, MAX_OFFSET);
    y = clamp(relY * 0.4, MAX_OFFSET);
  }

  function handleMouseLeave() {
    x = 0;
    y = 0;
  }
</script>

<button
  class="magnetic-button"
  style="transform: translate({x}px, {y}px)"
  on:mousemove={handleMouseMove}
  on:mouseleave={handleMouseLeave}
  on:click
>
  <span class="magnetic-button__label">{label}</span>
</button>

<style>
  .magnetic-button {
    position: relative;
    border: none;
    border-radius: 9999px;
    padding: 0.85rem 2.25rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    box-shadow: 0 8px 24px -8px rgba(99, 102, 241, 0.7);
    /* spring-like ease back to center; transform is driven inline by JS */
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 0.2s ease;
    will-change: transform;
  }

  .magnetic-button:hover {
    box-shadow: 0 12px 30px -8px rgba(99, 102, 241, 0.85);
  }

  .magnetic-button:active {
    box-shadow: 0 6px 18px -8px rgba(99, 102, 241, 0.7);
  }

  .magnetic-button__label {
    position: relative;
    z-index: 1;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .magnetic-button {
      transition: box-shadow 0.2s ease;
      transform: none !important;
    }
  }
</style>
