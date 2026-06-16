<script lang="ts">
  import { onDestroy } from "svelte";

  export let before: string = "linear-gradient(135deg, #1e293b, #334155)";
  export let after: string = "linear-gradient(135deg, #f59e0b, #ec4899)";
  export let beforeLabel: string = "Before";
  export let afterLabel: string = "After";

  let container: HTMLDivElement;
  let split = 50;
  let dragging = false;

  function updateFromClientX(clientX: number) {
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    split = Math.min(100, Math.max(0, pct));
  }

  function handleMove(event: PointerEvent) {
    if (dragging) updateFromClientX(event.clientX);
  }

  function handleUp() {
    dragging = false;
  }

  function start(event: PointerEvent) {
    dragging = true;
    updateFromClientX(event.clientX);
  }

  function handleKey(event: KeyboardEvent) {
    if (event.key === "ArrowLeft") split = Math.max(0, split - 2);
    if (event.key === "ArrowRight") split = Math.min(100, split + 2);
  }

  if (typeof window !== "undefined") {
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    onDestroy(() => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    });
  }
</script>

<div
  class="comparison-slider"
  bind:this={container}
  on:pointerdown={start}
>
  <div class="comparison-slider__panel comparison-slider__after" style="background: {after}">
    <span class="comparison-slider__label comparison-slider__label--right">
      {afterLabel}
    </span>
  </div>

  <div
    class="comparison-slider__panel comparison-slider__before"
    style="background: {before}; clip-path: inset(0 {100 - split}% 0 0)"
  >
    <span class="comparison-slider__label comparison-slider__label--left">
      {beforeLabel}
    </span>
  </div>

  <div
    class="comparison-slider__handle"
    style="left: {split}%"
    role="slider"
    aria-label="Comparison position"
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={Math.round(split)}
    tabindex="0"
    on:keydown={handleKey}
  >
    <span class="comparison-slider__grip">⇆</span>
  </div>
</div>

<style>
  .comparison-slider {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    border-radius: 1rem;
    overflow: hidden;
    cursor: ew-resize;
    user-select: none;
    touch-action: none;
    box-shadow: 0 12px 36px -16px rgba(0, 0, 0, 0.8);
  }

  .comparison-slider__panel {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
  }

  .comparison-slider__before {
    z-index: 1;
  }

  .comparison-slider__label {
    position: absolute;
    bottom: 0.75rem;
    padding: 0.25rem 0.6rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: #fff;
    border-radius: 9999px;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(2px);
  }

  .comparison-slider__label--left {
    left: 0.75rem;
  }

  .comparison-slider__label--right {
    right: 0.75rem;
  }

  .comparison-slider__handle {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 2;
    width: 2px;
    transform: translateX(-1px);
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ew-resize;
  }

  .comparison-slider__handle:focus-visible {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
  }

  .comparison-slider__grip {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 9999px;
    font-size: 1rem;
    color: #0d0d14;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.6);
  }
</style>
