<script lang="ts">
  import { onDestroy } from "svelte";

  let open = false;

  function show() {
    open = true;
  }

  function close() {
    open = false;
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") close();
  }

  $: if (typeof window !== "undefined") {
    if (open) {
      window.addEventListener("keydown", onKeyDown);
    } else {
      window.removeEventListener("keydown", onKeyDown);
    }
  }

  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", onKeyDown);
    }
  });
</script>

<div class="drawer-demo">
  <button class="drawer-trigger" on:click={show}>Open drawer</button>

  {#if open}
    <div class="drawer-backdrop" role="presentation" on:click={close}>
      <aside
        class="drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        on:click|stopPropagation
      >
        <header class="drawer-header">
          <h2 id="drawer-title" class="drawer-title">Settings</h2>
          <button class="drawer-close" aria-label="Close" on:click={close}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div class="drawer-body">
          <p class="drawer-text">
            This panel slides in from the side. Click the backdrop, press
            Escape, or use the close button to dismiss it.
          </p>
          <label class="drawer-row">
            <span>Notifications</span>
            <span class="drawer-pill">On</span>
          </label>
          <label class="drawer-row">
            <span>Dark mode</span>
            <span class="drawer-pill">On</span>
          </label>
          <label class="drawer-row">
            <span>Auto-save</span>
            <span class="drawer-pill drawer-pill--off">Off</span>
          </label>
        </div>

        <footer class="drawer-footer">
          <button class="drawer-btn drawer-btn--ghost" on:click={close}>Cancel</button>
          <button class="drawer-btn drawer-btn--solid" on:click={close}>Save</button>
        </footer>
      </aside>
    </div>
  {/if}
</div>

<style>
  .drawer-demo {
    display: flex;
    justify-content: center;
  }

  .drawer-trigger {
    border: none;
    border-radius: 0.6rem;
    padding: 0.65rem 1.4rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    background: #6366f1;
    transition: background 0.15s ease, transform 0.15s ease;
  }

  .drawer-trigger:hover {
    background: #4f46e5;
    transform: translateY(-1px);
  }

  .drawer-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    justify-content: flex-end;
    background: rgba(5, 5, 12, 0.7);
    backdrop-filter: blur(2px);
    animation: drawer-fade-in 0.2s ease both;
  }

  .drawer-panel {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 22rem;
    height: 100%;
    color: #e5e7eb;
    background: #16161f;
    border-left: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: -24px 0 60px -12px rgba(0, 0, 0, 0.7);
    animation: drawer-slide-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .drawer-title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
    color: #fff;
  }

  .drawer-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    color: #9ca3af;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 0.4rem;
    transition: color 0.15s ease, background 0.15s ease;
  }

  .drawer-close:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
  }

  .drawer-body {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
  }

  .drawer-text {
    margin: 0 0 1.25rem;
    font-size: 0.9rem;
    line-height: 1.5;
    color: #b6b8c3;
  }

  .drawer-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 0;
    font-size: 0.9rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .drawer-pill {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.2rem 0.6rem;
    border-radius: 9999px;
    color: #c7d2fe;
    background: rgba(99, 102, 241, 0.25);
  }

  .drawer-pill--off {
    color: #9ca3af;
    background: rgba(255, 255, 255, 0.06);
  }

  .drawer-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.6rem;
    padding: 1.25rem 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .drawer-btn {
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1.1rem;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .drawer-btn--ghost {
    color: #d1d5db;
    background: rgba(255, 255, 255, 0.06);
  }

  .drawer-btn--ghost:hover {
    background: rgba(255, 255, 255, 0.12);
  }

  .drawer-btn--solid {
    color: #fff;
    background: #6366f1;
  }

  .drawer-btn--solid:hover {
    background: #4f46e5;
  }

  @keyframes drawer-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes drawer-slide-in {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .drawer-backdrop,
    .drawer-panel {
      animation: none;
    }
  }
</style>
