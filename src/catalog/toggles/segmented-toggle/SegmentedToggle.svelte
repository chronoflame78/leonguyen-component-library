<script lang="ts">
  export let options: string[] = ["Monthly", "Yearly"];
  export let index: number = 0;
  export let label: string = "Billing period";

  function select(next: number) {
    index = next;
  }
</script>

<div
  role="radiogroup"
  aria-label={label}
  class="segmented-toggle"
  style="--count:{options.length};--index:{index}"
>
  <span class="segmented-toggle__pill" aria-hidden="true" />
  {#each options as option, i}
    <button
      type="button"
      role="radio"
      aria-checked={i === index}
      tabindex={i === index ? 0 : -1}
      class="segmented-toggle__option"
      on:click={() => select(i)}
    >
      {option}
    </button>
  {/each}
</div>

<style>
  .segmented-toggle {
    --count: 2;
    --index: 0;
    position: relative;
    display: inline-grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    align-items: stretch;
    padding: 0.25rem;
    border-radius: 9999px;
    background: #1c1c28;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
  }

  .segmented-toggle__pill {
    position: absolute;
    top: 0.25rem;
    bottom: 0.25rem;
    left: 0.25rem;
    width: calc((100% - 0.5rem) / var(--count));
    border-radius: 9999px;
    background: linear-gradient(90deg, #6366f1, #a855f7);
    box-shadow: 0 4px 12px -3px rgba(168, 85, 247, 0.7);
    transform: translateX(calc(var(--index) * 100%));
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  .segmented-toggle__option {
    position: relative;
    z-index: 1;
    border: none;
    background: transparent;
    padding: 0.5rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #9ca0b5;
    cursor: pointer;
    border-radius: 9999px;
    white-space: nowrap;
    transition: color 0.25s ease;
  }

  .segmented-toggle__option[aria-checked="true"] {
    color: #ffffff;
  }

  .segmented-toggle__option:hover[aria-checked="false"] {
    color: #d4d7e6;
  }

  .segmented-toggle__option:focus-visible {
    outline: 2px solid #a855f7;
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    .segmented-toggle__pill,
    .segmented-toggle__option {
      transition: none;
    }
  }
</style>
