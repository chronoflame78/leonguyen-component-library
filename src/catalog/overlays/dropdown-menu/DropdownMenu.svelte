<script lang="ts">
  import { onDestroy } from "svelte";

  let open = false;
  let selected: string | null = null;
  let root: HTMLDivElement;

  function toggle() {
    open = !open;
  }

  function close() {
    open = false;
  }

  function pick(action: string) {
    selected = action;
    open = false;
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") close();
  }

  function onClickOutside(event: MouseEvent) {
    if (root && !root.contains(event.target as Node)) {
      close();
    }
  }

  $: if (typeof window !== "undefined") {
    if (open) {
      window.addEventListener("keydown", onKeyDown);
      document.addEventListener("mousedown", onClickOutside);
    } else {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    }
  }

  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    }
  });
</script>

<div class="dropdown-demo">
  <div class="dropdown" bind:this={root}>
    <button
      class="dropdown-trigger"
      aria-haspopup="menu"
      aria-expanded={open}
      on:click={toggle}
    >
      Actions
      <svg
        class="dropdown-caret"
        class:dropdown-caret--open={open}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>

    {#if open}
      <div class="dropdown-menu" role="menu">
        <button class="dropdown-item" role="menuitem" on:click={() => pick("Edit")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
          Edit
        </button>
        <button class="dropdown-item" role="menuitem" on:click={() => pick("Duplicate")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </svg>
          Duplicate
        </button>
        <button class="dropdown-item" role="menuitem" on:click={() => pick("Share")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
          </svg>
          Share
        </button>
        <div class="dropdown-divider" role="separator" />
        <button
          class="dropdown-item dropdown-item--danger"
          role="menuitem"
          on:click={() => pick("Delete")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m1 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
          </svg>
          Delete
        </button>
      </div>
    {/if}
  </div>

  {#if selected}
    <p class="dropdown-result">Selected: {selected}</p>
  {/if}
</div>

<style>
  .dropdown-demo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 0.6rem;
    padding: 0.6rem 1.1rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #e5e7eb;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.05);
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .dropdown-trigger:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .dropdown-caret {
    transition: transform 0.2s ease;
  }

  .dropdown-caret--open {
    transform: rotate(180deg);
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    z-index: 1000;
    min-width: 12rem;
    padding: 0.4rem;
    border-radius: 0.7rem;
    background: #16161f;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 18px 40px -12px rgba(0, 0, 0, 0.7);
    animation: dropdown-pop 0.15s ease both;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    width: 100%;
    border: none;
    border-radius: 0.45rem;
    padding: 0.55rem 0.7rem;
    font-size: 0.875rem;
    font-weight: 500;
    text-align: left;
    color: #d1d5db;
    cursor: pointer;
    background: transparent;
    transition: background 0.12s ease, color 0.12s ease;
  }

  .dropdown-item:hover {
    background: rgba(99, 102, 241, 0.18);
    color: #fff;
  }

  .dropdown-item svg {
    flex-shrink: 0;
    color: #9ca3af;
  }

  .dropdown-item:hover svg {
    color: #c7d2fe;
  }

  .dropdown-item--danger {
    color: #fca5a5;
  }

  .dropdown-item--danger:hover {
    background: rgba(239, 68, 68, 0.18);
    color: #fecaca;
  }

  .dropdown-item--danger svg,
  .dropdown-item--danger:hover svg {
    color: currentColor;
  }

  .dropdown-divider {
    height: 1px;
    margin: 0.35rem 0.3rem;
    background: rgba(255, 255, 255, 0.08);
  }

  .dropdown-result {
    margin: 0;
    font-size: 0.85rem;
    color: #9ca3af;
  }

  @keyframes dropdown-pop {
    from {
      opacity: 0;
      transform: translateY(-6px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .dropdown-menu {
      animation: none;
    }
  }
</style>
