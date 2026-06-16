<script lang="ts">
  import { onDestroy } from "svelte";

  export let defaultSplit: number = 50;
  export let min: number = 15;
  export let max: number = 85;

  let container: HTMLDivElement;
  let split = defaultSplit;
  let dragging = false;

  const clamp = (value: number) => Math.min(max, Math.max(min, value));

  function handleMove(event: PointerEvent) {
    if (!container) return;
    const rect = container.getBoundingClientRect();
    if (rect.width === 0) return;
    const percent = ((event.clientX - rect.left) / rect.width) * 100;
    split = clamp(percent);
  }

  function handleUp() {
    dragging = false;
    window.removeEventListener("pointermove", handleMove);
    window.removeEventListener("pointerup", handleUp);
  }

  function startDrag() {
    dragging = true;
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  }

  onDestroy(() => {
    window.removeEventListener("pointermove", handleMove);
    window.removeEventListener("pointerup", handleUp);
  });
</script>

<div
  bind:this={container}
  class="splitter"
  class:splitter--dragging={dragging}
>
  <div class="splitter__pane" style="width: {split}%">
    <slot name="start" />
  </div>
  <div
    class="splitter__handle"
    role="separator"
    aria-orientation="vertical"
    aria-valuenow={Math.round(split)}
    aria-valuemin={min}
    aria-valuemax={max}
    on:pointerdown={startDrag}
  >
    <span class="splitter__grip" />
  </div>
  <div class="splitter__pane" style="width: {100 - split}%">
    <slot name="end" />
  </div>
</div>

<style>
  .splitter {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 0.75rem;
    background: rgba(15, 23, 42, 0.6);
  }

  .splitter--dragging {
    cursor: col-resize;
    /* Prevent text selection while dragging the handle. */
    user-select: none;
  }

  .splitter__pane {
    flex: 0 0 auto;
    min-width: 0;
    overflow: auto;
  }

  .splitter__handle {
    flex: 0 0 auto;
    width: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: col-resize;
    background: rgba(148, 163, 184, 0.12);
    transition: background 0.15s ease;
    touch-action: none;
  }

  .splitter__handle:hover,
  .splitter--dragging .splitter__handle {
    background: rgba(99, 102, 241, 0.4);
  }

  .splitter__grip {
    width: 2px;
    height: 1.75rem;
    border-radius: 9999px;
    background: rgba(226, 232, 240, 0.6);
  }
</style>
