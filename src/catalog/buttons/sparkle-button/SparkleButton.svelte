<script lang="ts">
  import { onDestroy } from "svelte";

  export let label: string = "Make Magic";

  interface Sparkle {
    id: number;
    dx: number;
    dy: number;
    left: number;
    top: number;
    rotate: number;
    scale: number;
  }

  const SPARKLE_LIFETIME = 700;

  let sparkles: Sparkle[] = [];
  let nextId = 0;
  let timers: ReturnType<typeof setTimeout>[] = [];

  function spawnSparkles() {
    const count = 6;
    const created: Sparkle[] = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 26 + Math.random() * 34;
      return {
        id: nextId++,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        left: 30 + Math.random() * 40,
        top: 30 + Math.random() * 40,
        rotate: Math.random() * 180 - 90,
        scale: 0.6 + Math.random() * 0.6,
      };
    });

    sparkles = [...sparkles, ...created];

    const idsToRemove = new Set(created.map((s) => s.id));
    const timer = setTimeout(() => {
      sparkles = sparkles.filter((s) => !idsToRemove.has(s.id));
      timers = timers.filter((t) => t !== timer);
    }, SPARKLE_LIFETIME);
    timers = [...timers, timer];
  }

  onDestroy(() => {
    timers.forEach(clearTimeout);
  });
</script>

<button
  class="sparkle-button"
  on:click={spawnSparkles}
  on:click
>
  <span class="sparkle-button__label">{label}</span>
  <span class="sparkle-button__sparkles" aria-hidden="true">
    {#each sparkles as s (s.id)}
      <span
        class="sparkle-button__star"
        style="left: {s.left}%; top: {s.top}%; --dx: {s.dx}px; --dy: {s.dy}px; --rot: {s.rotate}deg; --scale: {s.scale};"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <path d="M12 0l2.6 8.4L23 12l-8.4 2.6L12 24l-2.6-9.4L1 12l8.4-3.6z" />
        </svg>
      </span>
    {/each}
  </span>
</button>

<style>
  .sparkle-button {
    position: relative;
    border: none;
    border-radius: 9999px;
    padding: 0.8rem 2rem;
    font-size: 0.95rem;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    background: linear-gradient(135deg, #8b5cf6, #d946ef);
    box-shadow: 0 8px 24px -8px rgba(217, 70, 239, 0.8);
    transition: transform 0.15s ease, box-shadow 0.2s ease;
    overflow: visible;
  }

  .sparkle-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 30px -8px rgba(217, 70, 239, 0.95);
  }

  .sparkle-button:active {
    transform: translateY(1px) scale(0.98);
  }

  .sparkle-button:focus-visible {
    outline: 3px solid #f5d0fe;
    outline-offset: 2px;
  }

  .sparkle-button__label {
    position: relative;
    z-index: 1;
    pointer-events: none;
  }

  .sparkle-button__sparkles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 2;
  }

  .sparkle-button__star {
    position: absolute;
    color: #fde047;
    transform: translate(-50%, -50%);
    animation: sparkle-fly 0.7s ease-out forwards;
    will-change: transform, opacity;
  }

  @keyframes sparkle-fly {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0) rotate(0deg);
    }
    20% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(var(--scale)) rotate(0deg);
    }
    100% {
      opacity: 0;
      transform: translate(
          calc(-50% + var(--dx)),
          calc(-50% + var(--dy))
        )
        scale(0) rotate(var(--rot));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sparkle-button__star {
      animation: none;
      display: none;
    }
  }
</style>
